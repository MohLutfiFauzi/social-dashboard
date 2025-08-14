// src/tests/components/NavbarMenu.test.jsx
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import NavbarMenu from "../../components/NavbarMenu";

describe("NavbarMenu component", () => {
  test("renders navbar with brand link", () => {
    render(
      <MemoryRouter>
        <NavbarMenu />
      </MemoryRouter>
    );

    // Pastikan ada teks "Social Dashboard"
    const brand = screen.getByText(/Social Dashboard/i);
    expect(brand).toBeInTheDocument();

    // Pastikan brand adalah link ke "/"
    expect(brand.closest("a")).toHaveAttribute("href", "/");
  });
});
