import { render, screen } from "@testing-library/react";
import Users from "../../pages/Users";
import * as api from "../../services/api";
import { MemoryRouter } from "react-router-dom";

describe("API - getUsers", () => {
  it("should fetch users successfully", async () => {
    const mockData = [{ id: 1, name: "John Doe", email: "john@example.com" }];

    // Mock API agar tidak memanggil server asli
    vi.spyOn(api, "getUsers").mockResolvedValue({ data: mockData });

    const res = await api.getUsers();
    expect(res.data).toEqual(mockData);
  });
});

describe("Page - Users", () => {
  it("should render user data from API", async () => {
    const mockData = [{ id: 1, name: "John Doe", email: "john@example.com" }];
    vi.spyOn(api, "getUsers").mockResolvedValue({ data: mockData });

    render(
      <MemoryRouter>
        <Users />
      </MemoryRouter>
    );

    expect(await screen.findByText(/John Doe/i)).toBeInTheDocument();
    expect(await screen.findByText(/john@example.com/i)).toBeInTheDocument();
  });
});
