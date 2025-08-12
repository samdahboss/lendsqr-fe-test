export interface UserDetails {
  id: string;
  userId: string;
  avatar?: string;
  personalInformation: {
    fullName: string;
    phoneNumber: string;
    emailAddress: string;
    bvn: string;
    gender: string;
    maritalStatus: string;
    children: string;
    typeOfResidence: string;
  };
  educationAndEmployment: {
    levelOfEducation: string;
    employmentStatus: string;
    sectorOfEmployment: string;
    durationOfEmployment: string;
    officeEmail: string;
    monthlyIncome: string[];
    loanRepayment: string;
  };
  socials: {
    twitter: string;
    facebook: string;
    instagram: string;
  };
  guarantors: Array<{
    fullName: string;
    phoneNumber: string;
    emailAddress: string;
    relationship: string;
  }>;
  userTier: number;
  accountBalance: string;
  accountNumber: string;
  bank: string;
}

export interface UserDetailsHeaderProps {
  user: UserDetails;
}

export interface UserDetailsTabsProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export interface UserDetailsContentProps {
  user: UserDetails;
  activeTab: string;
}
