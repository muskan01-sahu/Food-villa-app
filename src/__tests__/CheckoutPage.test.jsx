import "@testing-library/jest-dom";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import { MemoryRouter } from "react-router-dom";
import CheckOutPage from "../components/CheckOutPage";
import cartReducer from "../utils/cartSlice";
import checkoutReducer from "../utils/checkoutSlice";

const mockNavigate = jest.fn();

jest.mock("react-router-dom", () => {
  const actual = jest.requireActual("react-router-dom");
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

const renderWithStore = (preloadedState) => {
  const store = configureStore({
    reducer: {
      cart: cartReducer,
      checkout: checkoutReducer,
    },
    preloadedState,
  });

  const view = render(
    <Provider store={store}>
      <MemoryRouter>
        <CheckOutPage />
      </MemoryRouter>
    </Provider>
  );

  return { store, ...view };
};

const fillCheckoutForm = () => {
  fireEvent.change(screen.getByPlaceholderText("Enter your name"), {
    target: { value: "John Doe" },
  });
  fireEvent.change(screen.getByPlaceholderText("Enter your email"), {
    target: { value: "john@example.com" },
  });
  fireEvent.change(screen.getByPlaceholderText("Enter your phone number"), {
    target: { value: "9999999999" },
  });
  fireEvent.change(screen.getByPlaceholderText("Enter your area pincode"), {
    target: { value: "560001" },
  });
  fireEvent.change(screen.getByPlaceholderText("Enter your delivery address"), {
    target: { value: "221B Baker Street" },
  });
  fireEvent.change(screen.getByPlaceholderText("Add note for delivery..."), {
    target: { value: "Ring the bell" },
  });
};

describe("CheckOutPage component", () => {
  beforeEach(() => {
    mockNavigate.mockClear();
  });

  it("shows validation error when required fields are missing", () => {
    renderWithStore({
      cart: {
        items: [
          {
            id: "1",
            name: "Pizza",
            price: 29900,
            quantity: 1,
            imageId: "pizza",
          },
        ],
      },
      checkout: {
        name: "",
        email: "",
        phone: "",
        pincode: "",
        address: "",
        instructions: "",
      },
    });

    fireEvent.click(screen.getByText("Place Order"));

    expect(
      screen.getByText(/Please complete: Name, Email, Phone number, Pincode, Address/)
    ).toBeInTheDocument();
    expect(mockNavigate).not.toHaveBeenCalled();
  });

  it("disables place order button when cart is empty", () => {
    renderWithStore({
      cart: { items: [] },
      checkout: {
        name: "",
        email: "",
        phone: "",
        pincode: "",
        address: "",
        instructions: "",
      },
    });

    expect(screen.getByText("Your cart is empty.")).toBeInTheDocument();
    expect(screen.getByText("Place Order")).toBeDisabled();
  });

  it("saves details and navigates with calculated totals", async () => {
    const { store } = renderWithStore({
      cart: {
        items: [
          {
            id: "1",
            name: "Pizza",
            price: 29900,
            quantity: 2,
            imageId: "pizza",
          },
        ],
      },
      checkout: {
        name: "",
        email: "",
        phone: "",
        pincode: "",
        address: "",
        instructions: "",
      },
    });

    fillCheckoutForm();

    fireEvent.click(screen.getByText("Save Details"));
    expect(await screen.findByText("Details saved ✔")).toBeInTheDocument();

    fireEvent.click(screen.getByText("Place Order"));

    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalled();
    });

    const [path, options] = mockNavigate.mock.calls[0];
    expect(path).toBe("/placeorder");
    expect(options.state.total).toBe("607.90");
    expect(options.state.breakdown).toMatchObject({
      subtotal: "598.00",
      tax: "29.90",
      deliveryFee: "30.00",
      discount: "50.00",
    });

    expect(store.getState().cart.items).toHaveLength(0);
    expect(store.getState().checkout).toMatchObject({
      name: "",
      email: "",
      phone: "",
      pincode: "",
      address: "",
      instructions: "",
    });
  });
});

