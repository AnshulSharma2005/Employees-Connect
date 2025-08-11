import React from 'react';
import { User, Clock, Hash } from 'lucide-react';
import { Message } from '../types/Message';
import '../styles/MessageCard.css';

interface MessageCardProps {
  message: Message;
}

const MessageCard: React.FC<MessageCardProps> = ({ message }) => {
  const formatTimestamp = (timestamp?: string | number) => {
    if (!timestamp) return 'Unknown time';
    const date = new Date(timestamp);
    return date.toLocaleString();
  };

  const formatText = (text?: string) => {
    if (!text) return 'No content';
    return text.length > 200 ? text.substring(0, 200) + '...' : text;
  };

  return (
    <div className="message-card">
      <div className="message-card__header">
        <div className="message-card__user">
          <User className="user-icon" />
          <span className="user-name">{message.user || 'Unknown User'}</span>
        </div>
        <div className="message-card__meta">
          <Clock className="time-icon" />
          <span className="timestamp">{formatTimestamp(message.timestamp)}</span>
        </div>
      </div>
      
      <div className="message-card__content">
        <p className="message-text">{formatText(message.text)}</p>
      </div>
      
      <div className="message-card__footer">
        {message.channel && (
          <div className="message-card__channel">
            <Hash className="channel-icon" />
            <span className="channel-name">{message.channel}</span>
          </div>
        )}
        <div className="message-card__id">
          ID: {message.id || 'N/A'}
        </div>
      </div>
    </div>
  );
};

export default MessageCard;