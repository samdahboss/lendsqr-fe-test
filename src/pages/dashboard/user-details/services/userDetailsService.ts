import { UserDetails } from "../types";

// Mock data that matches the Figma design
const mockUserDetails: UserDetails = {
  id: "1",
  userId: "LSQFF587g90",
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

const STORAGE_KEY = "lendsqr_user_details";

export const fetchUserDetails = async (
  userId: string
): Promise<UserDetails> => {
  // Check localStorage first
  const storageKey = `${STORAGE_KEY}_${userId}`;

  try {
    const cachedData = localStorage.getItem(storageKey);
    if (cachedData) {
      console.log(`Retrieved user details for ${userId} from localStorage`);
      return JSON.parse(cachedData);
    }
  } catch (error) {
    console.warn("Failed to retrieve from localStorage:", error);
  }

  // Simulate API call
  console.log(`Fetching user details for ${userId} from API`);

  return new Promise((resolve) => {
    setTimeout(() => {
      // Create user-specific data
      const userDetails: UserDetails = {
        ...mockUserDetails,
        id: userId,
        userId: userId === "1" ? "LSQFF587g90" : `LSQFF${userId}g90`,
      };

      // Store in localStorage
      try {
        localStorage.setItem(storageKey, JSON.stringify(userDetails));
        console.log(`Stored user details for ${userId} in localStorage`);
      } catch (error) {
        console.warn("Failed to store in localStorage:", error);
      }

      resolve(userDetails);
    }, 500);
  });
};

// Helper function to clear user details from localStorage
export const clearUserDetailsCache = (userId?: string): void => {
  if (userId) {
    const storageKey = `${STORAGE_KEY}_${userId}`;
    localStorage.removeItem(storageKey);
    console.log(`Cleared user details for ${userId} from localStorage`);
  } else {
    // Clear all user details
    Object.keys(localStorage).forEach((key) => {
      if (key.startsWith(STORAGE_KEY)) {
        localStorage.removeItem(key);
      }
    });
    console.log("Cleared all user details from localStorage");
  }
};

// Helper function to check if user details exist in localStorage
export const hasUserDetailsCache = (userId: string): boolean => {
  const storageKey = `${STORAGE_KEY}_${userId}`;
  return localStorage.getItem(storageKey) !== null;
};
