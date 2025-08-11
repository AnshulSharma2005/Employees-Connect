import express from 'express';
import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const router = express.Router();

router.post('/events', async (req, res) => {
  const { type, challenge, event } = req.body;

  // Slack's URL verification challenge
  if (type === 'url_verification') {
    return res.send({ challenge });
  }

  // Respond to app mentions
  if (event && event.type === 'app_mention') {
    try {
      await axios.post(
        'https://slack.com/api/chat.postMessage',
        {
          channel: event.channel,
          text: `Hi <@${event.user}>! 👋 How can I help you today?`
        },
        {
          headers: {
            Authorization: `Bearer ${process.env.SLACK_BOT_TOKEN}`,
            'Content-Type': 'application/json'
          }
        }
      );
    } catch (err) {
      console.error('Failed to respond to mention:', err);
    }
  }

  res.sendStatus(200);
});

export default router;
