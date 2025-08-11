import React, { useState, useEffect } from 'react';
import { Clock, Calendar, Trash2, Plus } from 'lucide-react';
import '../styles/ScheduledMessages.css';

interface ScheduledMessage {
  id: string;
  message: string;
  channel: string;
  scheduledTime: string;
  status: 'pending' | 'sent' | 'failed';
  createdAt: string;
}

const ScheduledMessages: React.FC = () => {
  const [scheduledMessages, setScheduledMessages] = useState<ScheduledMessage[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [newMessage, setNewMessage] = useState({
    message: '',
    channel: 'general',
    scheduledTime: '',
  });

  useEffect(() => {
    // Mock data for demonstration
    setScheduledMessages([
      {
        id: '1',
        message: 'Daily standup reminder',
        channel: 'general',
        scheduledTime: '2024-01-15T09:00:00Z',
        status: 'pending',
        createdAt: '2024-01-14T10:00:00Z',
      },
      {
        id: '2',
        message: 'Weekly team meeting',
        channel: 'development',
        scheduledTime: '2024-01-12T14:00:00Z',
        status: 'sent',
        createdAt: '2024-01-10T15:30:00Z',
      },
    ]);
  }, []);

  const handleScheduleMessage = (e: React.FormEvent) => {
    e.preventDefault();
    const scheduled: ScheduledMessage = {
      id: Date.now().toString(),
      ...newMessage,
      status: 'pending',
      createdAt: new Date().toISOString(),
    };
    
    setScheduledMessages(prev => [scheduled, ...prev]);
    setNewMessage({ message: '', channel: 'general', scheduledTime: '' });
    setShowForm(false);
  };

  const handleDeleteMessage = (id: string) => {
    setScheduledMessages(prev => prev.filter(msg => msg.id !== id));
  };

  const formatDateTime = (dateString: string) => {
    return new Date(dateString).toLocaleString();
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'status-pending';
      case 'sent': return 'status-sent';
      case 'failed': return 'status-failed';
      default: return 'status-pending';
    }
  };

  return (
    <div className="scheduled-messages">
      <div className="scheduled-header">
        <h2 className="scheduled-title">Scheduled Messages</h2>
        <button
          className="add-scheduled-button"
          onClick={() => setShowForm(!showForm)}
        >
          <Plus className="button-icon" />
          Schedule Message
        </button>
      </div>

      {showForm && (
        <div className="schedule-form-container">
          <form onSubmit={handleScheduleMessage} className="schedule-form">
            <div className="form-group">
              <label className="form-label">Channel</label>
              <select
                value={newMessage.channel}
                onChange={(e) => setNewMessage(prev => ({ ...prev, channel: e.target.value }))}
                className="form-select"
              >
                <option value="general">general</option>
                <option value="random">random</option>
                <option value="development">development</option>
                <option value="testing">testing</option>
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">Message</label>
              <textarea
                value={newMessage.message}
                onChange={(e) => setNewMessage(prev => ({ ...prev, message: e.target.value }))}
                placeholder="Enter your message..."
                className="form-textarea"
                rows={3}
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">Schedule Time</label>
              <input
                type="datetime-local"
                value={newMessage.scheduledTime}
                onChange={(e) => setNewMessage(prev => ({ ...prev, scheduledTime: e.target.value }))}
                className="form-input"
                required
              />
            </div>

            <div className="form-actions">
              <button type="submit" className="schedule-button">
                <Calendar className="button-icon" />
                Schedule
              </button>
              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="cancel-button"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="scheduled-list">
        {scheduledMessages.length === 0 ? (
          <div className="empty-scheduled">
            <Clock className="empty-icon" />
            <p>No scheduled messages</p>
          </div>
        ) : (
          scheduledMessages.map((msg) => (
            <div key={msg.id} className="scheduled-item">
              <div className="scheduled-content">
                <div className="scheduled-meta">
                  <span className="scheduled-channel">#{msg.channel}</span>
                  <span className={`scheduled-status ${getStatusColor(msg.status)}`}>
                    {msg.status}
                  </span>
                </div>
                <p className="scheduled-text">{msg.message}</p>
                <div className="scheduled-time">
                  <Clock className="time-icon" />
                  <span>Scheduled for: {formatDateTime(msg.scheduledTime)}</span>
                </div>
              </div>
              <button
                onClick={() => handleDeleteMessage(msg.id)}
                className="delete-scheduled"
                title="Delete scheduled message"
              >
                <Trash2 className="delete-icon" />
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ScheduledMessages;