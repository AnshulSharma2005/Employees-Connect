import express from 'express';
import axios from 'axios';
import { Message } from '../models/Message';
import { AppDataSource } from '../utils/dataSource';

const router = express.Router();
const messageRepo = AppDataSource.getRepository(Message);

router.get('/auth', (req, res) => {
  const slackRedirectUrl = `https://slack.com/oauth/v2/authorize?client_id=${process.env.SLACK_CLIENT_ID}&scope=chat:write,channels:read&redirect_uri=${process.env.SLACK_REDIRECT_URI}`;
  res.redirect(slackRedirectUrl);
});

router.get('/oauth/callback', async (req, res) => {
  const { code } = req.query;
  const response = await axios.post('https://slack.com/api/oauth.v2.access', null, {
    params: {
      code,
      client_id: process.env.SLACK_CLIENT_ID,
      client_secret: process.env.SLACK_CLIENT_SECRET,
      redirect_uri: process.env.SLACK_REDIRECT_URI,
    }
  });
  const { access_token } = response.data;
  res.json({ access_token });
});

router.post('/send-message', async (req, res) => {
  const { token, channel, text } = req.body;
  const result = await axios.post('https://slack.com/api/chat.postMessage', { channel, text }, {
    headers: { Authorization: `Bearer ${token}` }
  });
  res.json(result.data);
});

router.post('/schedule-message', async (req, res) => {
  const { token, channel, text, time } = req.body;
  const msg = messageRepo.create({ token, channel, text, time });
  await messageRepo.save(msg);
  res.json({ success: true });
});

router.get('/scheduled-messages', async (_req, res) => {
  console.log("✅ /slack/scheduled-messages route hit");
  try {
    const messages = await messageRepo.find();
    res.json({ success: true, data: messages });
  } catch (err) {
    console.error("❌ Error fetching scheduled messages:", err);
    res.status(500).json({ success: false, error: "Failed to fetch messages" });
  }
});


export default router;