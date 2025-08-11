import React from 'react';
import { Search, X } from 'lucide-react';
import '../styles/SearchBar.css';

interface SearchBarProps {
  onSearch: (term: string) => void;
  searchTerm: string;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch, searchTerm }) => {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onSearch(e.target.value);
  };

  const clearSearch = () => {
    onSearch('');
  };

  return (
    <div className="search-container">
      <div className="search-box">
        <Search className="search-icon" />
        <input
          type="text"
          className="search-input"
          placeholder="Search messages or users..."
          value={searchTerm}
          onChange={handleInputChange}
        />
        {searchTerm && (
          <button className="search-clear" onClick={clearSearch}>
            <X />
          </button>
        )}
      </div>
    </div>
  );
};

export default SearchBar;