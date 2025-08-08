import "@testing-library/jest-dom";
import { render, screen, fireEvent, act } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import LoginForm from "../LoginForm";

// Mock onSubmit function
const mockOnSubmit = jest.fn();

describe("LoginForm", () => {
  beforeEach(() => {
    mockOnSubmit.mockClear();
  });

  it("renders email and password inputs and login button", () => {
    render(
      <MemoryRouter>
        <LoginForm onSubmit={mockOnSubmit} />
      </MemoryRouter>
    );
    expect(screen.getByPlaceholderText(/email/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/password/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /log in/i })).toBeInTheDocument();
  });

  it("disables login button when fields are empty", () => {
    render(
      <MemoryRouter>
        <LoginForm onSubmit={mockOnSubmit} />
      </MemoryRouter>
    );
    expect(screen.getByRole("button", { name: /log in/i })).toBeDisabled();
  });

  it("enables login button when fields are filled", () => {
    render(
      <MemoryRouter>
        <LoginForm onSubmit={mockOnSubmit} />
      </MemoryRouter>
    );
    fireEvent.change(screen.getByPlaceholderText(/email/i), {
      target: { value: "test@example.com" },
    });
    fireEvent.change(screen.getByPlaceholderText(/password/i), {
      target: { value: "password123" },
    });
    expect(screen.getByRole("button", { name: /log in/i })).not.toBeDisabled();
  });

  it("calls onSubmit with correct data when form is submitted", async () => {
    render(
      <MemoryRouter>
        <LoginForm onSubmit={mockOnSubmit} />
      </MemoryRouter>
    );

    await act(async () => {
      fireEvent.change(screen.getByPlaceholderText(/email/i), {
        target: { value: "test@example.com" },
      });
      fireEvent.change(screen.getByPlaceholderText(/password/i), {
        target: { value: "password123" },
      });
      fireEvent.click(screen.getByRole("button", { name: /log in/i }));
    });

    expect(mockOnSubmit).toHaveBeenCalledWith({
      email: "test@example.com",
      password: "password123",
    });
  });

  it("shows password when show button is clicked", async () => {
    render(
      <MemoryRouter>
        <LoginForm onSubmit={mockOnSubmit} />
      </MemoryRouter>
    );
    const passwordInput = screen.getByPlaceholderText(/password/i);
    const showButton = screen.getByText(/show/i);
    expect(passwordInput).toHaveAttribute("type", "password");

    await act(async () => {
      fireEvent.click(showButton);
    });

    // This assumes PasswordInput toggles type to text
    expect(passwordInput).toHaveAttribute("type", "text");
  });

  it("navigates or triggers forgot password action", () => {
    render(
      <MemoryRouter>
        <LoginForm onSubmit={mockOnSubmit} />
      </MemoryRouter>
    );
    const forgotLink = screen.getByText(/forgot password/i);
    expect(forgotLink).toBeInTheDocument();
    fireEvent.click(forgotLink);
  });
});
