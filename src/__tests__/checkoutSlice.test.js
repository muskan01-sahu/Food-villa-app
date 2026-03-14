import checkoutReducer, {
  updateCheckoutDetails,
  clearCheckout,
} from "../utils/checkoutSlice";

describe("checkoutSlice reducer", () => {
  const initialState = {
    name: "",
    email: "",
    phone: "",
    pincode: "",
    address: "",
    instructions: "",
  };

  it("updates provided checkout fields", () => {
    const result = checkoutReducer(
      initialState,
      updateCheckoutDetails({
        name: "John",
        email: "john@example.com",
        instructions: "Leave at door",
      })
    );

    expect(result).toMatchObject({
      name: "John",
      email: "john@example.com",
      instructions: "Leave at door",
    });
  });

  it("ignores undefined fields when updating", () => {
    const state = {
      ...initialState,
      name: "Jane",
      phone: "9999999999",
    };

    const result = checkoutReducer(
      state,
      updateCheckoutDetails({ email: "jane@example.com", phone: undefined })
    );

    expect(result).toMatchObject({
      name: "Jane",
      email: "jane@example.com",
      phone: "9999999999",
    });
  });

  it("clears checkout details", () => {
    const state = {
      name: "John",
      email: "john@example.com",
      phone: "123",
      pincode: "456789",
      address: "Street 1",
      instructions: "Ring bell",
    };

    const result = checkoutReducer(state, clearCheckout());
    expect(result).toEqual(initialState);
  });
});

