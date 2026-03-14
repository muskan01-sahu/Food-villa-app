import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Body from "../components/Body";
import useSearch from "../utils/useSearch";

jest.mock("../utils/useSearch");

const renderBody = () =>
  render(
    <MemoryRouter>
      <Body />
    </MemoryRouter>
  );

const createRestaurant = (id, name) => ({
  info: {
    id,
    name,
    cloudinaryImageId: "img",
    costForTwo: "₹200 for two",
    avgRatingString: "4.5",
    sla: { lastMileTravelString: "2 km" },
  },
});

describe("Body component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("shows shimmer while restaurants are loading", () => {
    useSearch.mockReturnValue([[], [], jest.fn()]);
    renderBody();
    expect(screen.getByTestId("shimmer")).toBeInTheDocument();
  });

  it("renders restaurants when data is available", () => {
    const restaurants = [createRestaurant("1", "Pizza Palace"), createRestaurant("2", "Burger Hub")];
    useSearch.mockReturnValue([restaurants, restaurants, jest.fn()]);

    renderBody();
    expect(screen.getByTestId("restaurant-list").children).toHaveLength(2);
    expect(screen.getByText("Pizza Palace")).toBeInTheDocument();
    expect(screen.getByText("Burger Hub")).toBeInTheDocument();
  });

  it("filters restaurants when search button is clicked", () => {
    const restaurants = [createRestaurant("1", "Pizza Palace"), createRestaurant("2", "Burger Hub")];
    const setFilteredRestaurants = jest.fn();
    useSearch.mockReturnValue([restaurants, restaurants, setFilteredRestaurants]);

    renderBody();
    fireEvent.change(screen.getByPlaceholderText("Search"), { target: { value: "pizza" } });
    fireEvent.click(screen.getByText("Search"));

    expect(setFilteredRestaurants).toHaveBeenCalledWith([restaurants[0]]);
  });

  it("shows empty message when no restaurants match", () => {
    const restaurants = [createRestaurant("1", "Pizza Palace")];
    useSearch.mockReturnValue([restaurants, [], jest.fn()]);

    renderBody();
    expect(screen.getByText("No Restaurant matches your filter")).toBeInTheDocument();
  });
});

