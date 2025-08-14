import { render, screen } from "@testing-library/react";
import PostDetail from "../../pages/PostDetail";
import * as api from "../../services/api";
import { MemoryRouter } from "react-router-dom";

test("renders name in Post Detail", async () => {
  vi.spyOn(api, "getPostComments").mockResolvedValue({
    data: [{ id: 1, name: "John Doe", email: "john@example.com" }],
  });
  vi.spyOn(api, "getPostDetail").mockResolvedValue({
    data: [{ id: 1, name: "John Doe", email: "john@example.com" }],
  });

  render(
    <MemoryRouter>
      <PostDetail />
    </MemoryRouter>
  );

  expect(await screen.findByText(/John Doe/i)).toBeInTheDocument();
});
