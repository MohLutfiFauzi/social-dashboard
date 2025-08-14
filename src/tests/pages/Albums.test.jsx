import { render, screen } from "@testing-library/react";
import Albums from "../../pages/Albums";
import * as api from "../../services/api";
import { MemoryRouter } from "react-router-dom";

describe("API - getUserAlbums", () => {
  it("should fetch users successfully", async () => {
    const mockData = [{ id: 1, name: "John Doe", email: "john@example.com" }];

    // Mock API agar tidak memanggil server asli
    vi.spyOn(api, "getUserAlbums").mockResolvedValue({ data: mockData });

    const res = await api.getUserAlbums();
    expect(res.data).toEqual(mockData);
  });
});

test("renders user album page title", async () => {
  vi.spyOn(api, "getUserAlbums").mockResolvedValue({
    data: [{ id: 1, name: "John Doe", email: "john@example.com" }],
  });

  render(
    <MemoryRouter>
      <Albums />
    </MemoryRouter>
  );

  expect(await screen.findByText(/Albums/i)).toBeInTheDocument();
});
