import React, { useState } from 'react';
import { Send, Loader2 } from 'lucide-react';
import '../styles/MessageForm.css';

interface MessageFormProps {
  onSendMessage: (message: string, channel: string) => Promise<void>;
}

const MessageForm: React.FC<MessageFormProps> = ({ onSendMessage }) => {
  const [message, setMessage] = useState('');
  const [channel, setChannel] = useState('general');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;

    setIsLoading(true);
    try {
      await onSendMessage(message, channel);
      setMessage('');
    } catch (error) {
      console.error('Failed to send message:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="message-form-container">
      <form onSubmit={handleSubmit} className="message-form">
        <div className="form-header">
          <h3 className="form-title">Send Message to Slack</h3>
        </div>
        
        <div className="form-group">
          <label htmlFor="channel" className="form-label">
            Channel
          </label>
          <select
            id="channel"
            value={channel}
            onChange={(e) => setChannel(e.target.value)}
            className="form-select"
          >
            <option value="general">general</option>
            <option value="random">random</option>
            <option value="development">development</option>
            <option value="testing">testing</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="message" className="form-label">
            Message
          </label>
          <textarea
            id="message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type your message here..."
            className="form-textarea"
            rows={4}
            required
          />
        </div>

        <button
          type="submit"
          disabled={isLoading || !message.trim()}
          className="send-button"
        >
          {isLoading ? (
            <>
              <Loader2 className="button-icon spinning" />
              Sending...
            </>
          ) : (
            <>
              <Send className="button-icon" />
              Send Message
            </>
          )}
        </button>
      </form>
    </div>
  );
};

export default MessageForm;