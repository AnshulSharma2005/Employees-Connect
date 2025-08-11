import React, { useState, useEffect } from 'react';
import { useAuth } from '../hooks/useAuth';
import MessageList from './MessageList';
import MessageForm from './MessageForm';
import ScheduledMessages from './ScheduledMessages';
import ChannelSelector from './ChannelSelector';
import SearchBar from './SearchBar';
import StatsCards from './StatsCards';
import Header from './Header';
import { Message } from '../types/Message';
import { messageService } from '../services/messageService';
import '../styles/Dashboard.css';

const Dashboard: React.FC = () => {
  const { user } = useAuth();
  const [messages, setMessages] = useState<Message[]>([]);
  const [filteredMessages, setFilteredMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedChannel, setSelectedChannel] = useState('general');
  const [activeTab, setActiveTab] = useState<'messages' | 'send' | 'scheduled'>('messages');

  useEffect(() => {
    fetchMessages();
  }, []);

  useEffect(() => {
    if (searchTerm) {
      const filtered = messages.filter(message =>
        message.text?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        message.user?.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredMessages(filtered);
    } else {
      setFilteredMessages(messages);
    }
  }, [messages, searchTerm]);

  const fetchMessages = async () => {
    try {
      setLoading(true);
      const data = await messageService.getAllMessages();
      setMessages(data);
      setError(null);
    } catch (err) {
      setError('Failed to fetch messages');
      console.error('Error fetching messages:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (term: string) => {
    setSearchTerm(term);
  };

  const handleRefresh = () => {
    fetchMessages();
  };

  const handleSendMessage = async (message: string, channel: string) => {
    // This would integrate with your Slack bot backend
    console.log('Sending message:', { message, channel });
    // After sending, refresh messages
    await fetchMessages();
  };

  const handleChannelSelect = (channelId: string) => {
    setSelectedChannel(channelId);
    // Filter messages by channel if needed
  };

  return (
    <div className="dashboard">
      <Header onRefresh={handleRefresh} />
      
      <div className="dashboard-container">
        <div className="dashboard-header">
          <h1 className="dashboard-title">Welcome back, {user?.name}!</h1>
          <p className="dashboard-subtitle">Manage your Slack workspace messages and automation</p>
        </div>

        <StatsCards messages={messages} />

        <div className="dashboard-tabs">
          <button
            className={`tab-button ${activeTab === 'messages' ? 'tab-button--active' : ''}`}
            onClick={() => setActiveTab('messages')}
          >
            Messages
          </button>
          <button
            className={`tab-button ${activeTab === 'send' ? 'tab-button--active' : ''}`}
            onClick={() => setActiveTab('send')}
          >
            Send Message
          </button>
          <button
            className={`tab-button ${activeTab === 'scheduled' ? 'tab-button--active' : ''}`}
            onClick={() => setActiveTab('scheduled')}
          >
            Scheduled
          </button>
        </div>

        {activeTab === 'messages' && (
          <>
            <ChannelSelector
              selectedChannel={selectedChannel}
              onChannelSelect={handleChannelSelect}
            />
        
            <SearchBar onSearch={handleSearch} searchTerm={searchTerm} />

            {error && (
              <div className="error-message">
                <span className="error-icon">⚠️</span>
                {error}
              </div>
            )}

            <MessageList 
              messages={filteredMessages} 
              loading={loading}
              onRefresh={handleRefresh}
            />
          </>
        )}

        {activeTab === 'send' && (
          <MessageForm onSendMessage={handleSendMessage} />
        )}

        {activeTab === 'scheduled' && (
          <ScheduledMessages />
        )}
      </div>
    </div>
  );
};

export default Dashboard;