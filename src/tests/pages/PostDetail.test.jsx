import { render, screen } from "@testing-library/react";
import PostDetail from "../../pages/PostDetail";
import * as api from "../../services/api";
import { MemoryRouter } from "react-router-dom";

describe("API - getPostDetail", () => {
  it("should fetch users successfully", async () => {
    const mockData = [{ id: 1, name: "John Doe", email: "john@example.com" }];

    // Mock API agar tidak memanggil server asli
    vi.spyOn(api, "getPostDetail").mockResolvedValue({ data: mockData });

    const res = await api.getPostDetail();
    expect(res.data).toEqual(mockData);
  });
});

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
