import { useSelector, useDispatch } from "react-redux";
import { addItem, removeItem, increasesQuantity, decreasesQuantity, clearCart } from "../utils/cartSlice";
import { IMG_CDN_URL } from "../Constants";

export const useCart = () => {
  const dispatch = useDispatch();
  const items = useSelector((store) => store.cart.items);

  // Convert paise to rupees (supports price OR defaultPrice)
  const getItemPriceInRupees = (item) => {
    const price = item?.price ?? item?.defaultPrice ?? 0;
    return price / 100;
  };

  // Add to cart
  const addToCart = (item) => {
    dispatch(
      addItem({
        ...item,
        price: Number(item.price ?? item.defaultPrice ?? 0),
        image: item.image ?? null,
      })
    );
  };

  const removeFromCart = (id) => dispatch(removeItem(id));
  const increment = (id) => dispatch(increasesQuantity(id));
  const decrement = (id) => dispatch(decreasesQuantity(id));
  const clear = () => dispatch(clearCart());

  // ------- PRICE CALCULATIONS -------
  const subtotal = items.reduce(
    (sum, item) => sum + getItemPriceInRupees(item) * item.quantity,
    0
  );

  const taxRate = 0.05;
  const tax = subtotal * taxRate;

  const deliveryFee = items.length ? 30 : 0;

  const discount = subtotal >= 500 ? 50 : 0;

  const total = Math.max(subtotal + tax + deliveryFee - discount, 0);

  // Image URL handling
  const getImageUrl = (imageId) =>
    imageId ? `${IMG_CDN_URL}${imageId}` : "https://via.placeholder.com/150";

  return {
    items,
    addToCart,
    removeFromCart,
    increment,
    decrement,
    clear,
    subtotal,
    tax,
    deliveryFee,
    discount,
    total,
    getImageUrl,
  };
};
