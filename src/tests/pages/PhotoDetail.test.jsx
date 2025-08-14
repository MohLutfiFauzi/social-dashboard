import { render, screen } from "@testing-library/react";
import PhotoDetail from "../../pages/PhotoDetail";
import * as api from "../../services/api";
import { MemoryRouter } from "react-router-dom";

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
