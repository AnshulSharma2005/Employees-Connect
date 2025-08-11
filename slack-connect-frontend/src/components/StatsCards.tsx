import React from 'react';
import { MessageCircle, Users, Clock, TrendingUp } from 'lucide-react';
import { Message } from '../types/Message';
import '../styles/StatsCards.css';

interface StatsCardsProps {
  messages: Message[];
}

const StatsCards: React.FC<StatsCardsProps> = ({ messages }) => {
  const totalMessages = messages.length;
  const uniqueUsers = new Set(messages.map(m => m.user)).size;
  const recentMessages = messages.filter(m => {
    const messageDate = new Date(m.timestamp || Date.now());
    const oneDayAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);
    return messageDate > oneDayAgo;
  }).length;

  const stats = [
    {
      title: 'Total Messages',
      value: totalMessages,
      icon: MessageCircle,
      color: 'blue',
      change: '+12%'
    },
    {
      title: 'Active Users',
      value: uniqueUsers,
      icon: Users,
      color: 'green',
      change: '+5%'
    },
    {
      title: 'Last 24h',
      value: recentMessages,
      icon: Clock,
      color: 'purple',
      change: '+8%'
    },
    {
      title: 'Engagement',
      value: Math.round((recentMessages / totalMessages) * 100) + '%',
      icon: TrendingUp,
      color: 'orange',
      change: '+3%'
    }
  ];

  return (
    <div className="stats-grid">
      {stats.map((stat, index) => {
        const IconComponent = stat.icon;
        return (
          <div key={index} className={`stat-card stat-card--${stat.color}`}>
            <div className="stat-card__header">
              <div className="stat-card__icon">
                <IconComponent />
              </div>
              <div className="stat-card__change">
                {stat.change}
              </div>
            </div>
            <div className="stat-card__content">
              <div className="stat-card__value">{stat.value}</div>
              <div className="stat-card__title">{stat.title}</div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default StatsCards;