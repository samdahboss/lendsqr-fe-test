import  { useState } from "react";
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
      <div className='user-details-loading'>
        <div className='loading-spinner'>Loading user details...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className='user-details-error'>
        <div className='error-message'>
          <h3>Error loading user details</h3>
          <p>{error}</p>
          <button onClick={handleBack}>Back to Users</button>
        </div>
      </div>
    );
  }

  if (!userDetails) {
    return (
      <div className='user-details-error'>
        <div className='error-message'>
          <h3>User not found</h3>
          <p>The requested user could not be found.</p>
          <button onClick={handleBack}>Back to Users</button>
        </div>
      </div>
    );
  }

  return (
    <div className='user-details'>
      <UserDetailsHeader
        user={userDetails}
        onBack={handleBack}
        onBlacklist={handleBlacklist}
        onActivate={handleActivate}
      />
      <UserDetailsTabs activeTab={activeTab} onTabChange={setActiveTab} />
      <UserDetailsContent user={userDetails} activeTab={activeTab} />
    </div>
  );
}
