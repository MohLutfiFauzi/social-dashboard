import { render, screen } from "@testing-library/react";
import Posts from "../../pages/Posts";
import * as api from "../../services/api";
import { MemoryRouter } from "react-router-dom";

describe("API - getUserPosts", () => {
  it("should fetch users successfully", async () => {
    const mockData = [{ id: 1, name: "John Doe", email: "john@example.com" }];

    // Mock API agar tidak memanggil server asli
    vi.spyOn(api, "getUserPosts").mockResolvedValue({ data: mockData });

    const res = await api.getUserPosts();
    expect(res.data).toEqual(mockData);
  });
});

test("renders Posts page title", async () => {
  vi.spyOn(api, "getUserPosts").mockResolvedValue({
    data: [{ id: 1, name: "John Doe", email: "john@example.com" }],
  });

  render(
    <MemoryRouter>
      <Posts />
    </MemoryRouter>
  );

  expect(await screen.findByText(/User/i)).toBeInTheDocument();
});
