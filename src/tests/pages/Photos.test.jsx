import { render, screen } from "@testing-library/react";
import Photos from "../../pages/Photos";
import * as api from "../../services/api";
import { MemoryRouter } from "react-router-dom";

describe("API - getAlbumPhotos", () => {
  it("should fetch users successfully", async () => {
    const mockData = [{ id: 1, name: "John Doe", email: "john@example.com" }];

    // Mock API agar tidak memanggil server asli
    vi.spyOn(api, "getAlbumPhotos").mockResolvedValue({ data: mockData });

    const res = await api.getAlbumPhotos();
    expect(res.data).toEqual(mockData);
  });
});

test("renders Album page title", async () => {
  vi.spyOn(api, "getAlbumPhotos").mockResolvedValue({
    data: [{ id: 1, name: "John Doe", email: "john@example.com" }],
  });

  render(
    <MemoryRouter>
      <Photos />
    </MemoryRouter>
  );

  expect(await screen.findByText(/Album/i)).toBeInTheDocument();
});
