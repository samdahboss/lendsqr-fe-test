import { UserDetails } from "../types";

// Mock data that matches the Figma design
const mockUserDetails: UserDetails = {
  id: "1",
  avatar:
    "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face",
  personalInformation: {
    fullName: "Grace Effiom",
    phoneNumber: "07060780922",
    emailAddress: "grace@gmail.com",
    bvn: "07060780922",
    gender: "Female",
    maritalStatus: "Single",
    children: "None",
    typeOfResidence: "Parent's Apartment",
  },
  educationAndEmployment: {
    levelOfEducation: "B.Sc",
    employmentStatus: "Employed",
    sectorOfEmployment: "FinTech",
    durationOfEmployment: "2 years",
    officeEmail: "grace@lendsqr.com",
    monthlyIncome: ["₦200,000.00", "₦400,000.00"],
    loanRepayment: "₦40,000",
  },
  socials: {
    twitter: "@grace_effiom",
    facebook: "Grace Effiom",
    instagram: "@grace_effiom",
  },
  guarantors: [
    {
      fullName: "Debby Ogana",
      phoneNumber: "07060780922",
      emailAddress: "debby@gmail.com",
      relationship: "Sister",
    },
    {
      fullName: "Debby Ogana",
      phoneNumber: "07060780922",
      emailAddress: "debby@gmail.com",
      relationship: "Sister",
    },
  ],
  userTier: 1,
  accountBalance: "₦200,000.00",
  accountNumber: "9912345678",
  bank: "Providus Bank",
};

export const fetchUserDetails = async (
  userId: string
): Promise<UserDetails> => {
  // Simulate API call
  console.log(userId);
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockUserDetails);
    }, 500);
  });
};
