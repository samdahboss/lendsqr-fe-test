import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useUserDetails } from "./hooks/useUserDetails";
import {
  UserDetailsHeader,
  UserDetailsTabs,
  UserDetailsContent,
} from "./components";
import "./UserDetails.scss";

export default function UserDetails() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { userDetails, isLoading, error } = useUserDetails(id || "1");
  const [activeTab, setActiveTab] = useState("General Details");

  const handleBack = () => {
    navigate("/dashboard/users");
  };

  const handleBlacklist = () => {
    // TODO: Implement blacklist functionality
    console.log("Blacklist user");
  };

  const handleActivate = () => {
    // TODO: Implement activate functionality
    console.log("Activate user");
  };

  if (isLoading) {
    return (
      <div className='user-details'>
        <div className='back-navigation'>
          <button className='back-button' onClick={handleBack}>
            ← Back to Users
          </button>
        </div>
        <div className='user-details-loading'>
          <div className='loading-spinner'>Loading user details...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className='user-details'>
        <div className='back-navigation'>
          <button className='back-button' onClick={handleBack}>
            ← Back to Users
          </button>
        </div>
        <div className='user-details-error'>
          <div className='error-message'>
            <h3>Error loading user details</h3>
            <p>{error}</p>
            <button onClick={handleBack}>Back to Users</button>
          </div>
        </div>
      </div>
    );
  }

  if (!userDetails) {
    return (
      <div className='user-details'>
        <div className='back-navigation'>
          <button className='back-button' onClick={handleBack}>
            ← Back to Users
          </button>
        </div>
        <div className='user-details-error'>
          <div className='error-message'>
            <h3>User not found</h3>
            <p>The requested user could not be found.</p>
            <button onClick={handleBack}>Back to Users</button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className='user-details'>
      <div className='back-navigation'>
        <button className='back-button' onClick={handleBack}>
          ← Back to Users
        </button>
      </div>

      <div className='page-header'>
        <h1>User Details</h1>
        <div className='header-actions'>
          <button className='blacklist-btn' onClick={handleBlacklist}>
            BLACKLIST USER
          </button>
          <button className='activate-btn' onClick={handleActivate}>
            ACTIVATE USER
          </button>
        </div>
      </div>

      <div className='user-details-container'>
        <UserDetailsHeader user={userDetails} />
        <UserDetailsTabs activeTab={activeTab} onTabChange={setActiveTab} />
      </div>

      <UserDetailsContent user={userDetails} activeTab={activeTab} />
    </div>
  );
}
