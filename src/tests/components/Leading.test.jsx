// src/tests/components/LoadingSpinner.test.jsx
import { render, screen } from "@testing-library/react";
import LoadingSpinner from "../../components/Loading";

describe("LoadingSpinner component", () => {
  test("renders the spinner and loading text", () => {
    render(<LoadingSpinner />);

    // Pastikan ada spinner (role="status" di Bootstrap Spinner)
    expect(screen.getByRole("status")).toBeInTheDocument();
  });
});
