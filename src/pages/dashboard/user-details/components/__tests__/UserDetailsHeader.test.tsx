import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import UserDetailsHeader from "../UserDetailsHeader";

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

describe("UserDetailsHeader", () => {
  it("renders user basic information correctly", () => {
    render(<UserDetailsHeader user={mockUserData} />);

    expect(screen.getByText("Grace Effiom")).toBeInTheDocument();
    expect(screen.getByText("LSQFF587g90")).toBeInTheDocument();
  });

  it("renders user tier with correct number of stars", () => {
    render(<UserDetailsHeader user={mockUserData} />);

    expect(screen.getByText("User's Tier")).toBeInTheDocument();

    // Check for stars (userTier is 1, so 1 filled star and 2 empty stars)
    const stars = screen.getAllByText("★");
    expect(stars).toHaveLength(3);
  });

  it("renders account balance and bank information", () => {
    render(<UserDetailsHeader user={mockUserData} />);

    expect(screen.getByText("₦200,000.00")).toBeInTheDocument();
    expect(screen.getByText("9912345678/Providus Bank")).toBeInTheDocument();
  });

  it("renders avatar SVG when no image is provided", () => {
    render(<UserDetailsHeader user={mockUserData} />);

    const avatar = screen.getByRole("img", { hidden: true }); // SVG elements have implicit img role
    expect(avatar).toBeInTheDocument();
  });

  it("renders with different user tier levels", () => {
    const userWithDifferentTier = {
      ...mockUserData,
      userTier: 3,
    };

    render(<UserDetailsHeader user={userWithDifferentTier} />);

    const stars = screen.getAllByText("★");
    expect(stars).toHaveLength(3);

    // All 3 stars should be filled for tier 3
    const filledStars = stars.filter((star) =>
      star.classList.contains("filled")
    );
    expect(filledStars).toHaveLength(3);
  });

  it("handles long user names gracefully", () => {
    const userWithLongName = {
      ...mockUserData,
      personalInformation: {
        ...mockUserData.personalInformation,
        fullName: "Very Long User Name That Should Break Into Multiple Lines",
      },
    };

    render(<UserDetailsHeader user={userWithLongName} />);

    expect(
      screen.getByText(
        "Very Long User Name That Should Break Into Multiple Lines"
      )
    ).toBeInTheDocument();
  });

  it("handles long account numbers and bank names", () => {
    const userWithLongBankInfo = {
      ...mockUserData,
      accountNumber: "1234567890123456",
      bank: "Very Long Bank Name That Should Handle Overflow",
    };

    render(<UserDetailsHeader user={userWithLongBankInfo} />);

    expect(
      screen.getByText(
        "1234567890123456/Very Long Bank Name That Should Handle Overflow"
      )
    ).toBeInTheDocument();
  });

  it("applies correct CSS classes for styling", () => {
    const { container } = render(<UserDetailsHeader user={mockUserData} />);

    expect(container.querySelector(".user-details-header")).toBeInTheDocument();
    expect(container.querySelector(".user-summary")).toBeInTheDocument();
    expect(container.querySelector(".user-info")).toBeInTheDocument();
    expect(container.querySelector(".user-tier")).toBeInTheDocument();
    expect(container.querySelector(".user-balance")).toBeInTheDocument();
  });
});
