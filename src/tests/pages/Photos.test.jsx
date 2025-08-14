import { render, screen } from "@testing-library/react";
import Photos from "../../pages/Photos";
import * as api from "../../services/api";
import { MemoryRouter } from "react-router-dom";

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
