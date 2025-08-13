import { fetchUserDetails } from "../userDetailsService";

// Mock localStorage for testing
const mockLocalStorage = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  clear: jest.fn(),
};
Object.defineProperty(window, "localStorage", { value: mockLocalStorage });

describe("userDetailsService", () => {
  beforeEach(() => {
    mockLocalStorage.getItem.mockClear();
    mockLocalStorage.setItem.mockClear();
  });

  it("fetches user details successfully", async () => {
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
  });

  it("simulates network delay", async () => {
    const startTime = Date.now();
    await fetchUserDetails("1");
    const endTime = Date.now();

    // Should take at least 500ms due to the delay in the service
    expect(endTime - startTime).toBeGreaterThanOrEqual(500);
  });

  it("returns user details for any valid userId", async () => {
    const result1 = await fetchUserDetails("1");
    const result2 = await fetchUserDetails("999");

    expect(result1.id).toBe("1");
    expect(result2.id).toBe("1");
    expect(result1.personalInformation.fullName).toBe("Grace Effiom");
    expect(result2.personalInformation.fullName).toBe("Grace Effiom");
  });

  it("handles different user IDs but returns consistent data structure", async () => {
    const userIds = ["1", "2", "100", "abc"];

    for (const userId of userIds) {
      const result = await fetchUserDetails(userId);

      expect(result).toMatchObject({
        id: expect.any(String),
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
    const result = await fetchUserDetails("1");

    expect(result.userTier).toBeGreaterThanOrEqual(1);
    expect(result.userTier).toBeLessThanOrEqual(3);
  });

  it("returns monthly income as array", async () => {
    const result = await fetchUserDetails("1");

    expect(Array.isArray(result.educationAndEmployment.monthlyIncome)).toBe(
      true
    );
    expect(result.educationAndEmployment.monthlyIncome).toHaveLength(2);
  });

  it("maintains data consistency across multiple calls", async () => {
    const result1 = await fetchUserDetails("1");
    const result2 = await fetchUserDetails("1");

    expect(result1).toEqual(result2);
  });

  // Test error scenarios (if the service were to be enhanced with error handling)
  it("handles empty userId gracefully", async () => {
    const result = await fetchUserDetails("");

    expect(result.id).toBe("1");
    expect(result.personalInformation).toBeDefined();
  });

  // Performance test
  it("completes within reasonable time", async () => {
    const startTime = Date.now();
    await fetchUserDetails("1");
    const endTime = Date.now();

    // Should complete within 2 seconds (including the 500ms delay)
    expect(endTime - startTime).toBeLessThan(2000);
  });
});
