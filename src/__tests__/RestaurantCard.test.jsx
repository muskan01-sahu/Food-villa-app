import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import RestaurantCard from "../components/RestaurantCard";

const renderCard = (props) => render(<RestaurantCard {...props} />);

describe("RestaurantCard component", () => {
  it("displays restaurant details and image", () => {
    const props = {
      name: "Pizza Place",
      costForTwo: "₹400 for two",
      avgRatingString: "4.5",
      cloudinaryImageId: "pizza.jpg",
      sla: { lastMileTravelString: "5 km" },
    };

    renderCard(props);

    expect(screen.getByRole("img", { name: /pizza place/i })).toBeInTheDocument();
    expect(screen.getByText("Pizza Place")).toBeInTheDocument();
    expect(screen.getByText("₹400 for two")).toBeInTheDocument();
    expect(screen.getByText(/⭐ 4.5/)).toBeInTheDocument();
    expect(screen.getByText("5 km")).toBeInTheDocument();
  });
});

