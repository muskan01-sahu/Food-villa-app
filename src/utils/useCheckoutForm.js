import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateCheckoutDetails } from "./checkoutSlice";

const useCheckoutForm = () => {
  const dispatch = useDispatch();
  const checkoutDetails = useSelector((state) => state.checkout);
  const [form, setForm] = useState(checkoutDetails);
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    setForm(checkoutDetails);
  }, [checkoutDetails]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setIsSaved(false);
  };

  const saveDetails = () => {
    dispatch(updateCheckoutDetails(form));
    setIsSaved(true);
  };

  return { form, handleChange, saveDetails, isSaved };
};

export default useCheckoutForm;

