import { render, screen } from "@testing-library/react";
import Posts from "../../pages/Posts";
import * as api from "../../services/api";
import { MemoryRouter } from "react-router-dom";

test("renders Posts page title", async () => {
  vi.spyOn(api, "getUsers").mockResolvedValue({
    data: [{ id: 1, name: "John Doe", email: "john@example.com" }],
  });

  render(
    <MemoryRouter>
      <Posts />
    </MemoryRouter>
  );

  expect(await screen.findByText(/User/i)).toBeInTheDocument();
});
