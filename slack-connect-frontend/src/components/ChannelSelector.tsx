import React, { useState, useEffect } from 'react';
import { Hash, Users, Lock } from 'lucide-react';
import '../styles/ChannelSelector.css';

interface Channel {
  id: string;
  name: string;
  type: 'public' | 'private' | 'dm';
  memberCount?: number;
  isActive: boolean;
}

interface ChannelSelectorProps {
  selectedChannel: string;
  onChannelSelect: (channelId: string) => void;
}

const ChannelSelector: React.FC<ChannelSelectorProps> = ({
  selectedChannel,
  onChannelSelect,
}) => {
  const [channels, setChannels] = useState<Channel[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Mock data for demonstration
    setTimeout(() => {
      setChannels([
        {
          id: 'general',
          name: 'general',
          type: 'public',
          memberCount: 25,
          isActive: true,
        },
        {
          id: 'random',
          name: 'random',
          type: 'public',
          memberCount: 18,
          isActive: true,
        },
        {
          id: 'development',
          name: 'development',
          type: 'public',
          memberCount: 12,
          isActive: true,
        },
        {
          id: 'testing',
          name: 'testing',
          type: 'private',
          memberCount: 8,
          isActive: true,
        },
        {
          id: 'design',
          name: 'design',
          type: 'public',
          memberCount: 6,
          isActive: false,
        },
      ]);
      setLoading(false);
    }, 1000);
  }, []);

  const getChannelIcon = (type: string) => {
    switch (type) {
      case 'private':
        return <Lock className="channel-icon" />;
      case 'dm':
        return <Users className="channel-icon" />;
      default:
        return <Hash className="channel-icon" />;
    }
  };

  if (loading) {
    return (
      <div className="channel-selector loading">
        <div className="loading-text">Loading channels...</div>
      </div>
    );
  }

  return (
    <div className="channel-selector">
      <div className="channel-header">
        <h3 className="channel-title">Channels</h3>
        <span className="channel-count">{channels.length}</span>
      </div>
      
      <div className="channel-list">
        {channels.map((channel) => (
          <button
            key={channel.id}
            onClick={() => onChannelSelect(channel.id)}
            className={`channel-item ${
              selectedChannel === channel.id ? 'channel-item--active' : ''
            } ${!channel.isActive ? 'channel-item--inactive' : ''}`}
          >
            <div className="channel-info">
              {getChannelIcon(channel.type)}
              <span className="channel-name">{channel.name}</span>
            </div>
            <div className="channel-meta">
              {channel.memberCount && (
                <span className="member-count">{channel.memberCount}</span>
              )}
              {!channel.isActive && (
                <span className="inactive-badge">Inactive</span>
              )}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default ChannelSelector;