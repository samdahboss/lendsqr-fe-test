import React from "react";
import { UserDetailsContentProps } from "../types";
import "./UserDetailsContent.scss";

const UserDetailsContent: React.FC<UserDetailsContentProps> = ({
  user,
  activeTab,
}) => {
  if (activeTab !== "General Details") {
    return (
      <div className='user-details-content'>
        <div className='coming-soon'>
          <h3>{activeTab}</h3>
          <p>This section is coming soon...</p>
        </div>
      </div>
    );
  }

  return (
    <div className='user-details-content'>
      <div className='details-section'>
        <h3>Personal Information</h3>
        <div className='details-grid'>
          <div className='detail-item'>
            <label>FULL NAME</label>
            <span>{user.personalInformation.fullName}</span>
          </div>
          <div className='detail-item'>
            <label>PHONE NUMBER</label>
            <span>{user.personalInformation.phoneNumber}</span>
          </div>
          <div className='detail-item'>
            <label>EMAIL ADDRESS</label>
            <span>{user.personalInformation.emailAddress}</span>
          </div>
          <div className='detail-item'>
            <label>BVN</label>
            <span>{user.personalInformation.bvn}</span>
          </div>
          <div className='detail-item'>
            <label>GENDER</label>
            <span>{user.personalInformation.gender}</span>
          </div>
          <div className='detail-item'>
            <label>MARITAL STATUS</label>
            <span>{user.personalInformation.maritalStatus}</span>
          </div>
          <div className='detail-item'>
            <label>CHILDREN</label>
            <span>{user.personalInformation.children}</span>
          </div>
          <div className='detail-item'>
            <label>TYPE OF RESIDENCE</label>
            <span>{user.personalInformation.typeOfResidence}</span>
          </div>
        </div>
      </div>

      <div className='details-section'>
        <h3>Education and Employment</h3>
        <div className='details-grid'>
          <div className='detail-item'>
            <label>LEVEL OF EDUCATION</label>
            <span>{user.educationAndEmployment.levelOfEducation}</span>
          </div>
          <div className='detail-item'>
            <label>EMPLOYMENT STATUS</label>
            <span>{user.educationAndEmployment.employmentStatus}</span>
          </div>
          <div className='detail-item'>
            <label>SECTOR OF EMPLOYMENT</label>
            <span>{user.educationAndEmployment.sectorOfEmployment}</span>
          </div>
          <div className='detail-item'>
            <label>DURATION OF EMPLOYMENT</label>
            <span>{user.educationAndEmployment.durationOfEmployment}</span>
          </div>
          <div className='detail-item'>
            <label>OFFICE EMAIL</label>
            <span>{user.educationAndEmployment.officeEmail}</span>
          </div>
          <div className='detail-item'>
            <label>MONTHLY INCOME</label>
            <span>{user.educationAndEmployment.monthlyIncome.join(" - ")}</span>
          </div>
          <div className='detail-item'>
            <label>LOAN REPAYMENT</label>
            <span>{user.educationAndEmployment.loanRepayment}</span>
          </div>
        </div>
      </div>

      <div className='details-section'>
        <h3>Socials</h3>
        <div className='details-grid'>
          <div className='detail-item'>
            <label>TWITTER</label>
            <span>{user.socials.twitter}</span>
          </div>
          <div className='detail-item'>
            <label>FACEBOOK</label>
            <span>{user.socials.facebook}</span>
          </div>
          <div className='detail-item'>
            <label>INSTAGRAM</label>
            <span>{user.socials.instagram}</span>
          </div>
        </div>
      </div>

      <div className='details-section'>
        <h3>Guarantor</h3>
        {user.guarantors.map((guarantor, index) => (
          <div key={index} className='guarantor-section'>
            <div className='details-grid'>
              <div className='detail-item'>
                <label>FULL NAME</label>
                <span>{guarantor.fullName}</span>
              </div>
              <div className='detail-item'>
                <label>PHONE NUMBER</label>
                <span>{guarantor.phoneNumber}</span>
              </div>
              <div className='detail-item'>
                <label>EMAIL ADDRESS</label>
                <span>{guarantor.emailAddress}</span>
              </div>
              <div className='detail-item'>
                <label>RELATIONSHIP</label>
                <span>{guarantor.relationship}</span>
              </div>
            </div>
            {index < user.guarantors.length - 1 && (
              <hr className='guarantor-divider' />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserDetailsContent;
