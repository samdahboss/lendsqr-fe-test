import {
  fetchUserDetails,
  clearUserDetailsCache,
  hasUserDetailsCache,
} from "../userDetailsService";

// Mock localStorage for testing
const mockLocalStorage = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
  keys: jest.fn(() => [] as string[]),
};

// Override Object.keys to work with our mock
const originalObjectKeys = Object.keys;
Object.keys = jest.fn((obj) => {
  if (obj === localStorage) {
    return mockLocalStorage.keys();
  }
  return originalObjectKeys(obj);
});

Object.defineProperty(window, "localStorage", {
  value: mockLocalStorage,
  writable: true,
});

describe("userDetailsService", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockLocalStorage.getItem.mockClear();
    mockLocalStorage.setItem.mockClear();
    mockLocalStorage.removeItem.mockClear();
    mockLocalStorage.keys.mockReturnValue([] as string[]);
  });

  it("fetches user details successfully", async () => {
    mockLocalStorage.getItem.mockReturnValue(null); // No cached data

    const result = await fetchUserDetails("1");

    expect(result).toEqual({
      id: "1",
      userId: "LSQFF587g90",
      avatar: expect.any(String),
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
      guarantors: expect.arrayContaining([
        expect.objectContaining({
          fullName: "Debby Ogana",
          phoneNumber: "07060780922",
          emailAddress: "debby@gmail.com",
          relationship: "Sister",
        }),
      ]),
      userTier: 1,
      accountBalance: "₦200,000.00",
      accountNumber: "9912345678",
      bank: "Providus Bank",
    });

    // Verify data was stored in localStorage
    expect(mockLocalStorage.setItem).toHaveBeenCalledWith(
      "lendsqr_user_details_1",
      JSON.stringify(result)
    );
  });

  it("simulates network delay", async () => {
    mockLocalStorage.getItem.mockReturnValue(null); // No cached data

    const startTime = Date.now();
    await fetchUserDetails("1");
    const endTime = Date.now();

    // Should take at least 500ms due to the delay in the service
    expect(endTime - startTime).toBeGreaterThanOrEqual(500);
  });

  it("returns user details for any valid userId", async () => {
    mockLocalStorage.getItem.mockReturnValue(null); // No cached data

    const result1 = await fetchUserDetails("1");
    const result2 = await fetchUserDetails("999");

    expect(result1.id).toBe("1");
    expect(result2.id).toBe("999");
    expect(result1.personalInformation.fullName).toBe("Grace Effiom");
    expect(result2.personalInformation.fullName).toBe("Grace Effiom");
    expect(result1.userId).toBe("LSQFF587g90");
    expect(result2.userId).toBe("LSQFF999g90");
  });

  it("handles different user IDs but returns consistent data structure", async () => {
    mockLocalStorage.getItem.mockReturnValue(null); // No cached data

    const userIds = ["1", "2", "100", "abc"];

    for (const userId of userIds) {
      const result = await fetchUserDetails(userId);

      expect(result).toMatchObject({
        id: userId, // Should now match the provided userId
        userId: expect.any(String),
        personalInformation: expect.any(Object),
        educationAndEmployment: expect.any(Object),
        socials: expect.any(Object),
        guarantors: expect.any(Array),
        userTier: expect.any(Number),
        accountBalance: expect.any(String),
        accountNumber: expect.any(String),
        bank: expect.any(String),
      });
    }
  });

  it("returns guarantors array with correct structure", async () => {
    mockLocalStorage.getItem.mockReturnValue(null); // No cached data

    const result = await fetchUserDetails("1");

    expect(result.guarantors).toHaveLength(2);
    result.guarantors.forEach((guarantor) => {
      expect(guarantor).toMatchObject({
        fullName: expect.any(String),
        phoneNumber: expect.any(String),
        emailAddress: expect.any(String),
        relationship: expect.any(String),
      });
    });
  });

  it("returns valid user tier between 1 and 3", async () => {
    mockLocalStorage.getItem.mockReturnValue(null); // No cached data

    const result = await fetchUserDetails("1");

    expect(result.userTier).toBeGreaterThanOrEqual(1);
    expect(result.userTier).toBeLessThanOrEqual(3);
  });

  it("returns monthly income as array", async () => {
    mockLocalStorage.getItem.mockReturnValue(null); // No cached data

    const result = await fetchUserDetails("1");

    expect(Array.isArray(result.educationAndEmployment.monthlyIncome)).toBe(
      true
    );
    expect(result.educationAndEmployment.monthlyIncome).toHaveLength(2);
  });

  it("maintains data consistency across multiple calls", async () => {
    mockLocalStorage.getItem.mockReturnValue(null); // No cached data initially

    const result1 = await fetchUserDetails("1");

    // Mock that data is now in localStorage
    mockLocalStorage.getItem.mockReturnValue(JSON.stringify(result1));

    const result2 = await fetchUserDetails("1");

    expect(result1).toEqual(result2);
    // Should have been called twice (once for each fetch attempt)
    expect(mockLocalStorage.getItem).toHaveBeenCalledTimes(2);
  });

  // Test error scenarios (if the service were to be enhanced with error handling)
  it("handles empty userId gracefully", async () => {
    mockLocalStorage.getItem.mockReturnValue(null); // No cached data

    const result = await fetchUserDetails("");

    expect(result.id).toBe("");
    expect(result.personalInformation).toBeDefined();
  });

  // Performance test
  it("completes within reasonable time", async () => {
    mockLocalStorage.getItem.mockReturnValue(null); // No cached data

    const startTime = Date.now();
    await fetchUserDetails("1");
    const endTime = Date.now();

    // Should complete within 2 seconds (including the 500ms delay)
    expect(endTime - startTime).toBeLessThan(2000);
  });

  // New localStorage-specific tests
  describe("localStorage functionality", () => {
    it("retrieves data from localStorage when available", async () => {
      const cachedData = {
        id: "1",
        userId: "LSQFF587g90",
        personalInformation: { fullName: "Cached User" },
      };

      mockLocalStorage.getItem.mockReturnValue(JSON.stringify(cachedData));

      const result = await fetchUserDetails("1");

      expect(result).toEqual(cachedData);
      expect(mockLocalStorage.getItem).toHaveBeenCalledWith(
        "lendsqr_user_details_1"
      );
      expect(mockLocalStorage.setItem).not.toHaveBeenCalled();
    });

    it("stores data in localStorage after API call", async () => {
      mockLocalStorage.getItem.mockReturnValue(null);

      const result = await fetchUserDetails("123");

      expect(mockLocalStorage.setItem).toHaveBeenCalledWith(
        "lendsqr_user_details_123",
        JSON.stringify(result)
      );
    });

    it("handles localStorage errors gracefully", async () => {
      mockLocalStorage.getItem.mockImplementation(() => {
        throw new Error("localStorage error");
      });

      // Should still work even if localStorage fails
      const result = await fetchUserDetails("1");

      expect(result).toBeDefined();
      expect(result.id).toBe("1");
    });

    it("handles localStorage JSON parse errors gracefully", async () => {
      mockLocalStorage.getItem.mockReturnValue("invalid json");

      // Should fallback to API call if cached data is corrupted
      const result = await fetchUserDetails("1");

      expect(result).toBeDefined();
      expect(result.id).toBe("1");
    });
  });

  describe("cache management functions", () => {
    it("clears specific user cache", () => {
      clearUserDetailsCache("123");

      expect(mockLocalStorage.removeItem).toHaveBeenCalledWith(
        "lendsqr_user_details_123"
      );
    });

    it("clears all user cache when no userId provided", () => {
      mockLocalStorage.keys.mockReturnValue([
        "lendsqr_user_details_1",
        "lendsqr_user_details_2",
        "other_data",
      ] as string[]);

      clearUserDetailsCache();

      expect(mockLocalStorage.removeItem).toHaveBeenCalledWith(
        "lendsqr_user_details_1"
      );
      expect(mockLocalStorage.removeItem).toHaveBeenCalledWith(
        "lendsqr_user_details_2"
      );
      expect(mockLocalStorage.removeItem).not.toHaveBeenCalledWith(
        "other_data"
      );
    });

    it("checks if user cache exists", () => {
      mockLocalStorage.getItem.mockReturnValue("some data");

      const exists = hasUserDetailsCache("123");

      expect(exists).toBe(true);
      expect(mockLocalStorage.getItem).toHaveBeenCalledWith(
        "lendsqr_user_details_123"
      );
    });

    it("returns false when user cache does not exist", () => {
      mockLocalStorage.getItem.mockReturnValue(null);

      const exists = hasUserDetailsCache("123");

      expect(exists).toBe(false);
    });
  });
});
