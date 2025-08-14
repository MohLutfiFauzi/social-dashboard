import { render, screen } from "@testing-library/react";
import Users from "../../pages/Users";
import * as api from "../../services/api";
import { MemoryRouter } from "react-router-dom";

test("renders Users page title", async () => {
  vi.spyOn(api, "getUsers").mockResolvedValue({
    data: [{ id: 1, name: "John Doe", email: "john@example.com" }],
  });

  render(
    <MemoryRouter>
      <Users />
    </MemoryRouter>
  );

  expect(await screen.findByText(/Users/i)).toBeInTheDocument();
});
