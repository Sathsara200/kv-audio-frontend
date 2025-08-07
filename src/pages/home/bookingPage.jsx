import { useEffect, useState } from "react";
import { formatDate, loadCart } from "../../utils/cart";
import BookingItem from "../../components/bookingItem";
import axios from "axios";
import toast from "react-hot-toast";

export default function BookingPage() {
  const [cart, setCart] = useState(loadCart());
  const [startingDate, setStartingDate] = useState(formatDate(new Date()));
  const [endingDate, setEndingDate] = useState(
    formatDate(new Date(Date.now() + 24 * 60 * 60 * 1000))
  );
  const [total, setTotal] = useState(0);

  const daysBetween = Math.max(
    (new Date(endingDate) - new Date(startingDate)) / (1000 * 60 * 60 * 24),
    1
  );

  function reloadCart() {
    setCart(loadCart());
    calculateTotal();
  }

  function calculateTotal() {
    const cartInfo = loadCart();
    cartInfo.startingDate = startingDate;
    cartInfo.endingDate = endingDate;
    cartInfo.days = daysBetween;

    axios
      .post(`${import.meta.env.VITE_BACKEND_URL}/api/orders/quote`, cartInfo)
      .then((res) => {
        setTotal(res.data.total);
      })
      .catch((err) => {
        console.error(err);
      });
  }

  useEffect(() => {
    calculateTotal();
  }, [startingDate, endingDate]);

  function handleBookingCreation() {
    const cart = loadCart();
    cart.startingDate = startingDate;
    cart.endingDate = endingDate;
    cart.days = daysBetween;

    const token = localStorage.getItem("token");
    axios
      .post(`${import.meta.env.VITE_BACKEND_URL}/api/orders`, cart, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        localStorage.removeItem("cart");
        toast.success("Booking Created");
        setCart(loadCart());
      })
      .catch((err) => {
        console.error(err);
        toast.error("Failed to create booking");
      });
  }

  return (
    <div className="w-full min-h-screen bg-gray-50">
      <div className="max-w-screen-md mx-auto px-4 py-6">
        <h1 className="text-2xl font-bold text-black text-center mb-6">Create Booking</h1>

        {/* Date Inputs */}
        <div className="flex flex-col gap-4">
          <label className="flex flex-col">
            <span className="text-black font-semibold">Starting Date:</span>
            <input
              type="date"
              value={startingDate}
              onChange={(e) => setStartingDate(e.target.value)}
              className="border border-gray-300 rounded-md p-2"
            />
          </label>

          <label className="flex flex-col">
            <span className="text-black font-semibold">Ending Date:</span>
            <input
              type="date"
              value={endingDate}
              onChange={(e) => setEndingDate(e.target.value)}
              className="border border-gray-300 rounded-md p-2"
            />
          </label>

          <p className="text-black font-medium">Total Days: {daysBetween}</p>
        </div>

        {/* Booking Items */}
        <div className="flex flex-col gap-4 mt-6">
          {cart.orderedItems.map((item) => (
            <BookingItem
              key={item.key}
              itemKey={item.key}
              qty={item.qty}
              refresh={reloadCart}
            />
          ))}
        </div>

        {/* Total Price */}
        <div className="flex justify-center mt-6">
          <p className="text-black font-semibold text-lg">
            Total: Rs. {total.toFixed(2)}
          </p>
        </div>

        {/* Create Booking Button */}
        <div className="flex justify-center mt-4 mb-10">
          <button
            className="bg-yellow-300 hover:bg-yellow-400 text-black font-semibold px-6 py-3 rounded-md"
            onClick={handleBookingCreation}
          >
            Create Booking
          </button>
        </div>
      </div>
    </div>
  );
}

