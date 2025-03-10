import { render, screen, fireEvent } from "@testing-library/react";
import JobListingCard from "./JobListingCard";

const mockJob = {
  id: "1",
  title: "Frontend Developer",
  company: "Tech Company",
  location: "Berlin",
  description: "A job description",
  url: "https://example.com",
  visaSponsorship: true,
  tags: ["Full-time", "IT"],
  requirements: ["React", "JavaScript"],
  benefits: ["Flexible hours", "Remote work"],
  startDate: "Immediately",
  duration: "Permanent",
};

const mockGenerateLetter = jest.fn();

describe("JobListingCard", () => {
  beforeEach(() => {
    mockGenerateLetter.mockClear();
  });

  test("renders job details correctly", () => {
    render(
      <JobListingCard job={mockJob} onGenerateLetter={mockGenerateLetter} />,
    );

    expect(screen.getByText("Frontend Developer")).toBeInTheDocument();
    expect(screen.getByText("Tech Company")).toBeInTheDocument();
    expect(screen.getByText("Berlin")).toBeInTheDocument();
    expect(screen.getByText("A job description")).toBeInTheDocument();
    expect(screen.getByText("React")).toBeInTheDocument();
    expect(screen.getByText("Flexible hours")).toBeInTheDocument();
    expect(screen.getByText("Visum-Unterstützung")).toBeInTheDocument();
  });

  test("calls onGenerateLetter when button is clicked", () => {
    render(
      <JobListingCard job={mockJob} onGenerateLetter={mockGenerateLetter} />,
    );

    const generateButton = screen.getByText("Anschreiben erstellen");
    fireEvent.click(generateButton);

    expect(mockGenerateLetter).toHaveBeenCalledWith(mockJob);
  });

  test("opens URL in new tab when details button is clicked", () => {
    // Mock window.open
    const originalOpen = window.open;
    window.open = jest.fn();

    render(
      <JobListingCard job={mockJob} onGenerateLetter={mockGenerateLetter} />,
    );

    const detailsButton = screen.getByText("Mehr Details");
    fireEvent.click(detailsButton);

    expect(window.open).toHaveBeenCalledWith("https://example.com", "_blank");

    // Restore original window.open
    window.open = originalOpen;
  });
});
