import React, { useState } from "react";
import { Search, Bell, ChevronDown, Menu } from "lucide-react";
import { useSidebar } from "@/context/useSidebar";
import avatar from "@/assets/images/avatar.png";

export default function DashboardHeader() {
  const [searchQuery, setSearchQuery] = useState("");
  const { toggleMobileMenu } = useSidebar();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle search logic here
    console.log("Searching for:", searchQuery);
  };

  return (
    <header className='dashboard-header'>
      <div className='header-content'>
        {/* Logo Section */}
        <div className='header-logo'>
          <img src='/lendsqr-logo.svg' alt='Lendsqr' />
        </div>

        {/* Search Section */}
        <div className='header-search'>
          <form onSubmit={handleSearch} className='search-form'>
            <input
              type='text'
              placeholder='Search for anything'
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className='search-input'
            />
            <button type='submit' className='search-button'>
              <Search size={16} />
            </button>
          </form>
        </div>

        {/* Actions Section */}
        <div className='header-actions'>
          <a href='#' className='header-link'>
            Docs
          </a>

          <button className='notification-btn' aria-label='Notifications'>
            <Bell size={20} />
          </button>

          {/* User Profile */}
          <div className='user-profile'>
            <img src={avatar} alt='User Avatar' className='user-avatar' />
            <span className='user-name'>Adedeji</span>
            <button className='dropdown-arrow' aria-label='User menu'>
              <ChevronDown size={16} />
            </button>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className='mobile-menu-toggle'
            onClick={toggleMobileMenu}
            aria-label='Toggle navigation menu'
          >
            <Menu size={20} />
          </button>
        </div>
      </div>
    </header>
  );
}
