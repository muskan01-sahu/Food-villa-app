import cartReducer, {
  addItem,
  removeItem,
  increasesQuantity,
  decreasesQuantity,
  clearCart,
} from "../utils/cartSlice";

describe("cartSlice reducer", () => {
  const initialState = { items: [] };

  it("adds a new item with quantity 1", () => {
    const result = cartReducer(
      initialState,
      addItem({ id: "1", name: "Pizza", price: 29900 })
    );

    expect(result.items).toEqual([
      { id: "1", name: "Pizza", price: 29900, quantity: 1 },
    ]);
  });

  it("increments quantity for an existing item", () => {
    const state = {
      items: [{ id: "1", name: "Pizza", price: 29900, quantity: 1 }],
    };

    const result = cartReducer(state, addItem({ id: "1" }));
    expect(result.items[0].quantity).toBe(2);
  });

  it("removes an item", () => {
    const state = {
      items: [
        { id: "1", name: "Pizza", quantity: 1 },
        { id: "2", name: "Burger", quantity: 1 },
      ],
    };

    const result = cartReducer(state, removeItem("1"));
    expect(result.items).toEqual([{ id: "2", name: "Burger", quantity: 1 }]);
  });

  it("increases and decreases quantity safely", () => {
    const state = {
      items: [{ id: "1", name: "Pizza", quantity: 1 }],
    };

    const increased = cartReducer(state, increasesQuantity("1"));
    expect(increased.items[0].quantity).toBe(2);

    const decreased = cartReducer(increased, decreasesQuantity("1"));
    expect(decreased.items[0].quantity).toBe(1);

    const shouldStayOne = cartReducer(decreased, decreasesQuantity("1"));
    expect(shouldStayOne.items[0].quantity).toBe(1);
  });

  it("clears the cart", () => {
    const state = { items: [{ id: "1", name: "Pizza", quantity: 2 }] };
    const result = cartReducer(state, clearCart());
    expect(result.items).toEqual([]);
  });
});

