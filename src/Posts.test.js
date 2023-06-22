import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import axios from "axios";
import Posts from "./components/Posts";

// Mocking axios get method
jest.mock("axios");

describe("Posts", () => {
  const mockedPosts = [
    {
      id: 1,
      userId: 1,
      title: "Post 1",
      body: "Body of Post 1",
    },
    {
      id: 2,
      userId: 1,
      title: "Post 2",
      body: "Body of Post 2",
    },
  ];

  beforeEach(() => {
    // Reset the mock to clear any previous calls
    axios.get.mockReset();
  });

  it("renders loading spinner when data is loading", () => {
    render(<Posts />);
    expect(screen.getByText("Loading...")).toBeInTheDocument();
    expect(screen.getByRole("status")).toBeInTheDocument();
  });

  it("renders posts table when data is loaded", async () => {
    axios.get.mockResolvedValueOnce({ data: mockedPosts });

    render(<Posts />);
    expect(await screen.findByText("Post 1")).toBeInTheDocument();
    expect(screen.getByText("Post 2")).toBeInTheDocument();
    expect(screen.queryByText("No data found")).not.toBeInTheDocument();
    expect(screen.queryByText("Loading...")).not.toBeInTheDocument();
    expect(screen.queryByRole("status")).not.toBeInTheDocument();
  });

  it("displays 'No data found' when there are no posts", async () => {
    axios.get.mockResolvedValueOnce({ data: [] });

    render(<Posts />);
    expect(await screen.findByText("No data found")).toBeInTheDocument();
    expect(screen.queryByText("Loading...")).not.toBeInTheDocument();
    expect(screen.queryByRole("status")).not.toBeInTheDocument();
  });

  it("fetches posts data when component is mounted", () => {
    render(<Posts />);
    expect(axios.get).toHaveBeenCalledWith(
      "https://jsonplaceholder.typicode.com/posts?_start=0&_end=5"
    );
  });

  it("fetches posts data with search query when search input is changed", async () => {
    axios.get.mockResolvedValueOnce({ data: mockedPosts });

    render(<Posts />);
    const searchInput = screen.getByPlaceholderText("Type here to search...");
    fireEvent.change(searchInput, { target: { value: "Post" } });

    expect(axios.get).toHaveBeenCalledWith(
      "https://jsonplaceholder.typicode.com/posts?q=Post"
    );
    expect(await screen.findByText("Post 1")).toBeInTheDocument();
    expect(screen.getByText("Post 2")).toBeInTheDocument();
  });

  it("resets posts data when reset button is clicked", async () => {
    axios.get.mockResolvedValueOnce({ data: mockedPosts });

    render(<Posts />);
    const searchInput = screen.getByPlaceholderText("Type here to search...");
    fireEvent.change(searchInput, { target: { value: "Post" } });

    const resetButton = screen.getByText("Reset");
    fireEvent.click(resetButton);

    expect(axios.get).toHaveBeenCalledWith(
      "https://jsonplaceholder.typicode.com/posts?_start=0&_end=5"
    );
    expect(await screen.findByText("Post 1")).toBeInTheDocument();
    expect(screen.getByText("Post 2")).toBeInTheDocument();
  });

  it("sorts posts data in ascending order when ascending sort button is clicked", async () => {
    axios.get.mockResolvedValueOnce({ data: mockedPosts });

    render(<Posts />);
    const ascendingSortButton = screen.getAllByRole("button", {
      name: "Ascending",
    })[0];
    fireEvent.click(ascendingSortButton);

    expect(await screen.findByText("Post 1")).toBeInTheDocument();
    expect(screen.getByText("Post 2")).toBeInTheDocument();
    expect(axios.get).not.toHaveBeenCalledWith(
      "https://jsonplaceholder.typicode.com/posts?q=Post"
    );

    // Ensure the posts are sorted in ascending order
    const postElements = screen.getAllByRole("row", { name: /post \d/i });
    expect(postElements[0]).toHaveTextContent("Post 1");
    expect(postElements[1]).toHaveTextContent("Post 2");
  });

  it("sorts posts data in descending order when descending sort button is clicked", async () => {
    axios.get.mockResolvedValueOnce({ data: mockedPosts });

    render(<Posts />);
    const descendingSortButton = screen.getAllByRole("button", {
      name: "Descending",
    })[0];
    fireEvent.click(descendingSortButton);

    expect(await screen.findByText("Post 1")).toBeInTheDocument();
    expect(screen.getByText("Post 2")).toBeInTheDocument();
    expect(axios.get).not.toHaveBeenCalledWith(
      "https://jsonplaceholder.typicode.com/posts?q=Post"
    );

    // Ensure the posts are sorted in descending order
    const postElements = screen.getAllByRole("row", { name: /post \d/i });
    expect(postElements[0]).toHaveTextContent("Post 2");
    expect(postElements[1]).toHaveTextContent("Post 1");
  });

  
});
