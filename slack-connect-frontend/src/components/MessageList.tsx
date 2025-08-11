import React from 'react';
import MessageCard from './MessageCard';
import LoadingSpinner from './LoadingSpinner';
import { Message } from '../types/Message';
import '../styles/MessageList.css';

interface MessageListProps {
  messages: Message[];
  loading: boolean;
  onRefresh: () => void;
}

const MessageList: React.FC<MessageListProps> = ({ messages, loading, onRefresh }) => {
  if (loading) {
    return <LoadingSpinner />;
  }

  if (messages.length === 0) {
    return (
      <div className="empty-state">
        <div className="empty-state__icon">📭</div>
        <h3 className="empty-state__title">No messages found</h3>
        <p className="empty-state__description">
          No messages are available or match your search criteria.
        </p>
        <button className="empty-state__button" onClick={onRefresh}>
          Refresh Messages
        </button>
      </div>
    );
  }

  return (
    <div className="message-list">
      <div className="message-list__header">
        <h2 className="message-list__title">Messages ({messages.length})</h2>
      </div>
      <div className="message-list__grid">
        {messages.map((message, index) => (
          <MessageCard key={message.id || index} message={message} />
        ))}
      </div>
    </div>
  );
};

export default MessageList;