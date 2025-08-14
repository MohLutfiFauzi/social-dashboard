import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Layout from "../../components/Layout";

vi.mock("../../components/NavbarMenu", () => ({
  default: () => <div data-testid="navbar">NavbarMenu</div>,
}));
vi.mock("../../components/Footer", () => ({
  default: () => <div data-testid="footer">Footer</div>,
}));

vi.mock("react-router-dom", async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...actual,
    Outlet: () => <div data-testid="outlet">Outlet Content</div>,
  };
});

describe("Layout component", () => {
  test("renders NavbarMenu, Outlet, and Footer", () => {
    render(
      <MemoryRouter>
        <Layout />
      </MemoryRouter>
    );

    // Cek Navbar
    expect(screen.getByTestId("navbar")).toBeInTheDocument();

    // Cek Outlet
    expect(screen.getByTestId("outlet")).toHaveTextContent("Outlet Content");

    // Cek Footer
    expect(screen.getByTestId("footer")).toBeInTheDocument();
  });
});
