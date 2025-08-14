import { render, screen } from "@testing-library/react";
import PhotoDetail from "../../pages/PhotoDetail";
import * as api from "../../services/api";
import { MemoryRouter } from "react-router-dom";

describe("API - getPhotoDetail", () => {
  it("should fetch users successfully", async () => {
    const mockData = [{ id: 1, name: "John Doe", email: "john@example.com" }];

    // Mock API agar tidak memanggil server asli
    vi.spyOn(api, "getPhotoDetail").mockResolvedValue({ data: mockData });

    const res = await api.getPhotoDetail();
    expect(res.data).toEqual(mockData);
  });
});

test("renders text Album ID in Photo Detail", async () => {
  vi.spyOn(api, "getPhotoDetail").mockResolvedValue({
    data: [{ id: 1, name: "John Doe", email: "john@example.com" }],
  });

  render(
    <MemoryRouter>
      <PhotoDetail />
    </MemoryRouter>
  );

  expect(await screen.findByText(/Album ID/i)).toBeInTheDocument();
});
