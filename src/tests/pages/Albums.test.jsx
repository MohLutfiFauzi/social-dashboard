import { render, screen } from "@testing-library/react";
import Albums from "../../pages/Albums";
import * as api from "../../services/api";
import { MemoryRouter } from "react-router-dom";

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
