import React from 'react';
import { RefreshCw, MessageSquare, LogOut, User } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import '../styles/Header.css';

interface HeaderProps {
  onRefresh: () => void;
}

const Header: React.FC<HeaderProps> = ({ onRefresh }) => {
  const { user, logout } = useAuth();

  return (
    <header className="header">
      <div className="header-container">
        <div className="header-brand">
          <MessageSquare className="brand-icon" />
          <span className="brand-text">SlackBot Manager</span>
        </div>
        
        <div className="header-actions">
          <div className="user-info">
            <User className="user-icon" />
            <span className="user-name">{user?.name}</span>
          </div>
          <button 
            className="refresh-button"
            onClick={onRefresh}
            title="Refresh messages"
          >
            <RefreshCw className="refresh-icon" />
            Refresh
          </button>
          <button 
            className="logout-button"
            onClick={logout}
            title="Sign out"
          >
            <LogOut className="logout-icon" />
            Sign Out
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;