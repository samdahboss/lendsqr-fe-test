import "@testing-library/jest-dom";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import UserDetails from "../UserDetails";
import { useUserDetails } from "../hooks/useUserDetails";

// Mock the hook
jest.mock("../hooks/useUserDetails");
const mockUseUserDetails = useUserDetails as jest.MockedFunction<
  typeof useUserDetails
>;

// Mock navigate
const mockNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockNavigate,
  useParams: () => ({ id: "1" }),
}));

// Mock console methods
const consoleSpy = jest.spyOn(console, "log").mockImplementation(() => {});

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

describe("UserDetails Page", () => {
  beforeEach(() => {
    mockNavigate.mockClear();
    consoleSpy.mockClear();
  });

  afterAll(() => {
    consoleSpy.mockRestore();
  });

  describe("Loading State", () => {
    it("displays loading spinner when data is loading", () => {
      mockUseUserDetails.mockReturnValue({
        userDetails: null,
        isLoading: true,
        error: null,
      });

      render(
        <MemoryRouter>
          <UserDetails />
        </MemoryRouter>
      );

      expect(screen.getByText("Loading user details...")).toBeInTheDocument();
      expect(screen.getByText("← Back to Users")).toBeInTheDocument();
    });
  });

  describe("Error State", () => {
    it("displays error message when there is an error", () => {
      mockUseUserDetails.mockReturnValue({
        userDetails: null,
        isLoading: false,
        error: "Failed to fetch user details",
      });

      render(
        <MemoryRouter>
          <UserDetails />
        </MemoryRouter>
      );

      expect(
        screen.getByText("Error loading user details")
      ).toBeInTheDocument();
      expect(
        screen.getByText("Failed to fetch user details")
      ).toBeInTheDocument();
      expect(
        screen.getByRole("button", { name: "Back to Users" })
      ).toBeInTheDocument();
    });

    it("displays user not found message when user details is null", () => {
      mockUseUserDetails.mockReturnValue({
        userDetails: null,
        isLoading: false,
        error: null,
      });

      render(
        <MemoryRouter>
          <UserDetails />
        </MemoryRouter>
      );

      expect(screen.getByText("User not found")).toBeInTheDocument();
      expect(
        screen.getByText("The requested user could not be found.")
      ).toBeInTheDocument();
    });
  });

  describe("Success State", () => {
    beforeEach(() => {
      mockUseUserDetails.mockReturnValue({
        userDetails: mockUserData,
        isLoading: false,
        error: null,
      });
    });

    it("renders user details page with all components", () => {
      render(
        <MemoryRouter>
          <UserDetails />
        </MemoryRouter>
      );

      expect(screen.getByText("User Details")).toBeInTheDocument();
      expect(screen.getByText("BLACKLIST USER")).toBeInTheDocument();
      expect(screen.getByText("ACTIVATE USER")).toBeInTheDocument();
      expect(screen.getByText("Grace Effiom")).toBeInTheDocument();
    });

    it("navigates back to users when back button is clicked", () => {
      render(
        <MemoryRouter>
          <UserDetails />
        </MemoryRouter>
      );

      fireEvent.click(screen.getByText("← Back to Users"));
      expect(mockNavigate).toHaveBeenCalledWith("/dashboard/users");
    });

    it("handles blacklist button click", () => {
      render(
        <MemoryRouter>
          <UserDetails />
        </MemoryRouter>
      );

      fireEvent.click(screen.getByText("BLACKLIST USER"));
      expect(consoleSpy).toHaveBeenCalledWith("Blacklist user");
    });

    it("handles activate button click", () => {
      render(
        <MemoryRouter>
          <UserDetails />
        </MemoryRouter>
      );

      fireEvent.click(screen.getByText("ACTIVATE USER"));
      expect(consoleSpy).toHaveBeenCalledWith("Activate user");
    });

    it("renders with General Details tab active by default", () => {
      render(
        <MemoryRouter>
          <UserDetails />
        </MemoryRouter>
      );

      const generalDetailsTab = screen.getByRole("button", {
        name: "General Details",
      });
      expect(generalDetailsTab).toHaveClass("active");
    });

    it("changes active tab when tab is clicked", async () => {
      render(
        <MemoryRouter>
          <UserDetails />
        </MemoryRouter>
      );

      const documentsTab = screen.getByRole("button", { name: "Documents" });
      fireEvent.click(documentsTab);

      await waitFor(() => {
        expect(
          screen.getByText("This section is coming soon...")
        ).toBeInTheDocument();
      });
    });
  });

  describe("Responsive Behavior", () => {
    beforeEach(() => {
      mockUseUserDetails.mockReturnValue({
        userDetails: mockUserData,
        isLoading: false,
        error: null,
      });
    });

    it("applies correct CSS classes for responsive design", () => {
      const { container } = render(
        <MemoryRouter>
          <UserDetails />
        </MemoryRouter>
      );

      expect(container.querySelector(".user-details")).toBeInTheDocument();
      expect(container.querySelector(".page-header")).toBeInTheDocument();
      expect(container.querySelector(".header-actions")).toBeInTheDocument();
    });
  });
});
