import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import UserDetailsContent from "../UserDetailsContent";

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
    {
      fullName: "John Doe",
      phoneNumber: "08012345678",
      emailAddress: "john@example.com",
      relationship: "Friend",
    },
  ],
  userTier: 1,
  accountBalance: "₦200,000.00",
  accountNumber: "9912345678",
  bank: "Providus Bank",
};

describe("UserDetailsContent", () => {
  describe("General Details Tab", () => {
    it("renders personal information section", () => {
      render(
        <UserDetailsContent user={mockUserData} activeTab='General Details' />
      );

      expect(screen.getByText("Personal Information")).toBeInTheDocument();
      expect(screen.getByText("Grace Effiom")).toBeInTheDocument();
      expect(screen.getByText("07060780922")).toBeInTheDocument();
      expect(screen.getByText("grace@gmail.com")).toBeInTheDocument();
      expect(screen.getByText("Female")).toBeInTheDocument();
      expect(screen.getByText("Single")).toBeInTheDocument();
    });

    it("renders education and employment section", () => {
      render(
        <UserDetailsContent user={mockUserData} activeTab='General Details' />
      );

      expect(screen.getByText("Education and Employment")).toBeInTheDocument();
      expect(screen.getByText("B.Sc")).toBeInTheDocument();
      expect(screen.getByText("Employed")).toBeInTheDocument();
      expect(screen.getByText("FinTech")).toBeInTheDocument();
      expect(screen.getByText("grace@lendsqr.com")).toBeInTheDocument();
      expect(screen.getByText("₦200,000.00 - ₦400,000.00")).toBeInTheDocument();
    });

    it("renders socials section", () => {
      render(
        <UserDetailsContent user={mockUserData} activeTab='General Details' />
      );

      expect(screen.getByText("Socials")).toBeInTheDocument();
      expect(screen.getByText("@grace_effiom")).toBeInTheDocument();
      expect(screen.getByText("Grace Effiom")).toBeInTheDocument();
    });

    it("renders guarantor section with multiple guarantors", () => {
      render(
        <UserDetailsContent user={mockUserData} activeTab='General Details' />
      );

      expect(screen.getByText("Guarantor")).toBeInTheDocument();
      expect(screen.getByText("Debby Ogana")).toBeInTheDocument();
      expect(screen.getByText("John Doe")).toBeInTheDocument();
      expect(screen.getByText("Sister")).toBeInTheDocument();
      expect(screen.getByText("Friend")).toBeInTheDocument();
    });

    it("renders field labels in uppercase", () => {
      render(
        <UserDetailsContent user={mockUserData} activeTab='General Details' />
      );

      expect(screen.getByText("FULL NAME")).toBeInTheDocument();
      expect(screen.getByText("PHONE NUMBER")).toBeInTheDocument();
      expect(screen.getByText("EMAIL ADDRESS")).toBeInTheDocument();
      expect(screen.getByText("LEVEL OF EDUCATION")).toBeInTheDocument();
    });

    it("displays guarantor divider between multiple guarantors", () => {
      const { container } = render(
        <UserDetailsContent user={mockUserData} activeTab='General Details' />
      );

      const dividers = container.querySelectorAll(".guarantor-divider");
      expect(dividers).toHaveLength(1); // One divider between two guarantors
    });
  });

  describe("Other Tabs", () => {
    const otherTabs = [
      "Documents",
      "Bank Details",
      "Loans",
      "Savings",
      "App and System",
    ];

    otherTabs.forEach((tab) => {
      it(`renders coming soon message for ${tab} tab`, () => {
        render(<UserDetailsContent user={mockUserData} activeTab={tab} />);

        expect(screen.getByText(tab)).toBeInTheDocument();
        expect(
          screen.getByText("This section is coming soon...")
        ).toBeInTheDocument();
      });
    });
  });

  describe("Data Edge Cases", () => {
    it("handles empty guarantors array", () => {
      const userWithNoGuarantors = {
        ...mockUserData,
        guarantors: [],
      };

      render(
        <UserDetailsContent
          user={userWithNoGuarantors}
          activeTab='General Details'
        />
      );

      expect(screen.getByText("Guarantor")).toBeInTheDocument();
      // Should not have any guarantor data displayed
      expect(screen.queryByText("Debby Ogana")).not.toBeInTheDocument();
    });

    it("handles single guarantor without divider", () => {
      const userWithOneGuarantor = {
        ...mockUserData,
        guarantors: [mockUserData.guarantors[0]],
      };

      const { container } = render(
        <UserDetailsContent
          user={userWithOneGuarantor}
          activeTab='General Details'
        />
      );

      expect(screen.getByText("Debby Ogana")).toBeInTheDocument();

      // Should not have any dividers for single guarantor
      const dividers = container.querySelectorAll(".guarantor-divider");
      expect(dividers).toHaveLength(0);
    });

    it("handles long text content gracefully", () => {
      const userWithLongContent = {
        ...mockUserData,
        personalInformation: {
          ...mockUserData.personalInformation,
          fullName:
            "Very Long Name That Should Be Handled Gracefully By The Component",
          emailAddress: "very.long.email.address.that.should.wrap@example.com",
        },
      };

      render(
        <UserDetailsContent
          user={userWithLongContent}
          activeTab='General Details'
        />
      );

      expect(
        screen.getByText(
          "Very Long Name That Should Be Handled Gracefully By The Component"
        )
      ).toBeInTheDocument();
      expect(
        screen.getByText("very.long.email.address.that.should.wrap@example.com")
      ).toBeInTheDocument();
    });

    it("handles special characters in content", () => {
      const userWithSpecialChars = {
        ...mockUserData,
        personalInformation: {
          ...mockUserData.personalInformation,
          fullName: "Name with @#$% special characters",
        },
        socials: {
          ...mockUserData.socials,
          twitter: "@user_with-special.chars123",
        },
      };

      render(
        <UserDetailsContent
          user={userWithSpecialChars}
          activeTab='General Details'
        />
      );

      expect(
        screen.getByText("Name with @#$% special characters")
      ).toBeInTheDocument();
      expect(
        screen.getByText("@user_with-special.chars123")
      ).toBeInTheDocument();
    });
  });

  describe("CSS Classes and Structure", () => {
    it("applies correct CSS classes", () => {
      const { container } = render(
        <UserDetailsContent user={mockUserData} activeTab='General Details' />
      );

      expect(
        container.querySelector(".user-details-content")
      ).toBeInTheDocument();
      expect(container.querySelectorAll(".details-section")).toHaveLength(4);
      expect(container.querySelectorAll(".details-grid")).toHaveLength(4);
    });

    it("applies coming soon styles for other tabs", () => {
      const { container } = render(
        <UserDetailsContent user={mockUserData} activeTab='Documents' />
      );

      expect(container.querySelector(".coming-soon")).toBeInTheDocument();
    });
  });
});
