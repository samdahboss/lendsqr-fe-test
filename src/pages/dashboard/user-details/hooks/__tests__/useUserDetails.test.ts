import { renderHook, waitFor } from "@testing-library/react";
import { useUserDetails } from "../useUserDetails";
import { fetchUserDetails } from "../../services/userDetailsService";
import { UserDetails } from "../../types";

// Mock the service
jest.mock("../../services/userDetailsService");
const mockFetchUserDetails = fetchUserDetails as jest.MockedFunction<
  typeof fetchUserDetails
>;

const mockUserData = {
  id: "1",
  userId: "LSQFF587g90",
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
  ],
  userTier: 1,
  accountBalance: "₦200,000.00",
  accountNumber: "9912345678",
  bank: "Providus Bank",
};

describe("useUserDetails Hook", () => {
  beforeEach(() => {
    mockFetchUserDetails.mockClear();
  });

  it("returns initial loading state", () => {
    mockFetchUserDetails.mockImplementation(() => new Promise(() => {})); // Never resolves

    const { result } = renderHook(() => useUserDetails("1"));

    expect(result.current.isLoading).toBe(true);
    expect(result.current.userDetails).toBe(null);
    expect(result.current.error).toBe(null);
  });

  it("fetches user details successfully", async () => {
    mockFetchUserDetails.mockResolvedValue(mockUserData);

    const { result } = renderHook(() => useUserDetails("1"));

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(result.current.userDetails).toEqual(mockUserData);
    expect(result.current.error).toBe(null);
    expect(mockFetchUserDetails).toHaveBeenCalledWith("1");
  });

  it("handles fetch error with Error object", async () => {
    const errorMessage = "Network error";
    mockFetchUserDetails.mockRejectedValue(new Error(errorMessage));

    const { result } = renderHook(() => useUserDetails("1"));

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(result.current.userDetails).toBe(null);
    expect(result.current.error).toBe(errorMessage);
  });

  it("handles fetch error with non-Error object", async () => {
    mockFetchUserDetails.mockRejectedValue("String error");

    const { result } = renderHook(() => useUserDetails("1"));

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(result.current.userDetails).toBe(null);
    expect(result.current.error).toBe("Failed to load user details");
  });

  it("refetches data when userId changes", async () => {
    mockFetchUserDetails.mockResolvedValue(mockUserData);

    const { result, rerender } = renderHook(
      ({ userId }) => useUserDetails(userId),
      { initialProps: { userId: "1" } }
    );

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(mockFetchUserDetails).toHaveBeenCalledWith("1");

    // Change userId
    rerender({ userId: "2" });

    expect(result.current.isLoading).toBe(true);

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(mockFetchUserDetails).toHaveBeenCalledWith("2");
    expect(mockFetchUserDetails).toHaveBeenCalledTimes(2);
  });

  it("does not fetch when userId is empty", () => {
    const { result } = renderHook(() => useUserDetails(""));

    expect(result.current.isLoading).toBe(true);
    expect(mockFetchUserDetails).not.toHaveBeenCalled();
  });

  it("resets error state when refetching", async () => {
    // First fetch fails
    mockFetchUserDetails.mockRejectedValueOnce(new Error("First error"));

    const { result, rerender } = renderHook(
      ({ userId }) => useUserDetails(userId),
      { initialProps: { userId: "1" } }
    );

    await waitFor(() => {
      expect(result.current.error).toBe("First error");
    });

    // Second fetch succeeds
    mockFetchUserDetails.mockResolvedValue(mockUserData);
    rerender({ userId: "2" });

    // Error should be reset during loading
    expect(result.current.error).toBe(null);
    expect(result.current.isLoading).toBe(true);

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(result.current.error).toBe(null);
    expect(result.current.userDetails).toEqual(mockUserData);
  });

  it("maintains loading state during the entire fetch process", async () => {
    let resolvePromise: (value: UserDetails) => void;
    const promise = new Promise<UserDetails>((resolve) => {
      resolvePromise = resolve;
    });

    mockFetchUserDetails.mockReturnValue(promise);

    const { result } = renderHook(() => useUserDetails("1"));

    // Should be loading initially
    expect(result.current.isLoading).toBe(true);

    // Resolve the promise
    resolvePromise!(mockUserData);

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(result.current.userDetails).toEqual(mockUserData);
  });
});
