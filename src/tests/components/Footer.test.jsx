// src/tests/Footer.test.jsx
import { render, screen } from "@testing-library/react";
import Footer from "../../components/Footer";
import { describe, it, expect } from "vitest";

describe("Footer component", () => {
  it("renders footer text", () => {
    render(<Footer />);
    expect(screen.getByText(/© 2025 Social Dashboard/i)).toBeInTheDocument();
  });
});
