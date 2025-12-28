import axios from "axios";
import { useEffect, useState } from "react";
import { IoMdCloseCircleOutline } from "react-icons/io";

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeOrder, setActiveOrder] = useState(null);
  const [modalOpened, setModalOpened] = useState(false);

  useEffect(() => {
    if (loading) {
      const token = localStorage.getItem("token");
      axios
        .get(`${import.meta.env.VITE_BACKEND_URL}/api/orders/`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => setOrders(res.data))
        .catch((err) => console.error(err))
        .finally(() => setLoading(false));
    }
  }, [loading]);

  function handleOrderStatusChange(orderId, status) {
    const token = localStorage.getItem("token");
    axios
      .put(
        `${import.meta.env.VITE_BACKEND_URL}/api/orders/status/${orderId}`,
        { status },
        { headers: { Authorization: `Bearer ${token}` } }
      )
      .then(() => {
        setModalOpened(false);
        setLoading(true);
      })
      .catch((err) => console.error(err));
  }

  return (
    <div className="p-4">
      <h1 className="text-xl md:text-2xl font-semibold mb-4">Admin Orders</h1>

      {/* Loader */}
      {loading && <p className="text-center text-gray-600">Loading...</p>}

      {/* ================= DESKTOP TABLE ================= */}
      {!loading && (
        <div className="hidden md:block overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-md">
            <thead className="bg-gray-200">
              <tr>
                <th className="px-4 py-2 text-left">Order ID</th>
                <th className="px-4 py-2 text-left">Email</th>
                <th className="px-4 py-2 text-left">Days</th>
                <th className="px-4 py-2 text-left">Start</th>
                <th className="px-4 py-2 text-left">End</th>
                <th className="px-4 py-2 text-left">Total</th>
                <th className="px-4 py-2 text-left">Status</th>
                <th className="px-4 py-2 text-left">Order Date</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr
                  key={order._id}
                  className="border-t hover:bg-gray-100 cursor-pointer"
                  onClick={() => {
                    setActiveOrder(order);
                    setModalOpened(true);
                  }}
                >
                  <td className="px-4 py-2">{order.orderId}</td>
                  <td className="px-4 py-2">{order.email}</td>
                  <td className="px-4 py-2">{order.days}</td>
                  <td className="px-4 py-2">
                    {new Date(order.startingDate).toLocaleDateString()}
                  </td>
                  <td className="px-4 py-2">
                    {new Date(order.endingDate).toLocaleDateString()}
                  </td>
                  <td className="px-4 py-2">
                    ${order.totalAmount.toFixed(2)}
                  </td>
                  <td className="px-4 py-2">{order.status}</td>
                  <td className="px-4 py-2">
                    {new Date(order.orderDate).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* ================= MOBILE CARDS ================= */}
      {!loading && (
        <div className="md:hidden space-y-4 pb-24">
          {orders.map((order) => (
            <div
              key={order._id}
              className="bg-white rounded-lg shadow p-4 space-y-2"
              onClick={() => {
                setActiveOrder(order);
                setModalOpened(true);
              }}
            >
              <div className="flex justify-between">
                <span className="font-semibold">#{order.orderId}</span>
                <span className="text-sm text-gray-500">
                  ${order.totalAmount.toFixed(2)}
                </span>
              </div>

              <p className="text-sm text-gray-600">{order.email}</p>

              <div className="flex justify-between text-sm">
                <span>Status:</span>
                <span
                  className={
                    order.status === "approved"
                      ? "text-green-600"
                      : order.status === "Rejected"
                      ? "text-red-600"
                      : "text-yellow-600"
                  }
                >
                  {order.status}
                </span>
              </div>

              <div className="text-xs text-gray-500">
                {new Date(order.orderDate).toLocaleDateString()}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ================= MODAL ================= */}
      {modalOpened && activeOrder && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-3">
          <div className="w-full md:w-[500px] bg-white rounded-lg shadow-lg relative max-h-[90vh] overflow-y-auto">
            <IoMdCloseCircleOutline
              className="absolute top-2 right-2 text-3xl cursor-pointer hover:text-red-600"
              onClick={() => setModalOpened(false)}
            />

            <div className="p-4">
              <h2 className="text-xl font-semibold mb-3">Order Details</h2>

              <div className="space-y-1 text-sm">
                <p><b>Order ID:</b> {activeOrder.orderId}</p>
                <p><b>Email:</b> {activeOrder.email}</p>
                <p><b>Days:</b> {activeOrder.days}</p>
                <p><b>Status:</b> {activeOrder.status}</p>
                <p>
                  <b>Total:</b> ${activeOrder.totalAmount.toFixed(2)}
                </p>
              </div>

              <div className="flex gap-3 my-4">
                <button
                  onClick={() =>
                    handleOrderStatusChange(activeOrder.orderId, "approved")
                  }
                  className="flex-1 bg-green-500 text-white py-2 rounded-md"
                >
                  Approve
                </button>
                <button
                  onClick={() =>
                    handleOrderStatusChange(activeOrder.orderId, "Rejected")
                  }
                  className="flex-1 bg-red-500 text-white py-2 rounded-md"
                >
                  Reject
                </button>
              </div>

              <table className="w-full text-sm mt-4">
                <thead>
                  <tr className="border-b">
                    <th></th>
                    <th>Product</th>
                    <th>Qty</th>
                    <th>Price</th>
                  </tr>
                </thead>
                <tbody>
                  {activeOrder.orderedItems.map((item) => (
                    <tr key={item.product.key} className="border-b">
                      <td>
                        <img
                          src={item.product.image}
                          alt={item.product.name}
                          className="w-10 h-10 object-cover"
                        />
                      </td>
                      <td>{item.product.name}</td>
                      <td>{item.quantity}</td>
                      <td>${item.product.price}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
