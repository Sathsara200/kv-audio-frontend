import axios from "axios";
import { useEffect, useState } from "react";
import { addToCart, removeFromCart } from "../utils/cart";
import { FaArrowDown, FaArrowUp, FaTrash } from "react-icons/fa";

export default function BookingItem({ itemKey, qty, refresh }) {
	const [item, setItem] = useState(null);
	const [status, setStatus] = useState("loading");

	useEffect(() => {
		if (status === "loading") {
			axios
				.get(`${import.meta.env.VITE_BACKEND_URL}/api/products/${itemKey}`)
				.then((res) => {
					setItem(res.data);
					setStatus("success");
				})
				.catch((err) => {
					console.error(err);
					setStatus("error");
					removeFromCart(itemKey);
					refresh();
				});
		}
	}, [status]);

	if (status === "loading") return <div className="text-accent">Loading...</div>;
	if (status === "error") return <div className="text-red-500">Failed to load product.</div>;

	return (
		<div className="w-full max-w-2xl mx-auto my-3 p-4 bg-white rounded-xl shadow-md border border-gray-200 flex items-center gap-4">
			{/* Product Image */}
			<img
				src={item.image[0]}
				alt={item.name}
				className="w-20 h-20 object-cover rounded-lg border border-gray-300"
			/>

			{/* Details Section */}
			<div className="flex-1 flex flex-col justify-between h-full">
				<div className="flex justify-between items-start">
					<div>
						<h3 className="text-lg font-semibold text-gray-800">{item.name}</h3>
						<p className="text-sm text-gray-500">Rs. {item.price.toFixed(2)}</p>
					</div>
					{/* Trash */}
					<button
						onClick={() => {
							removeFromCart(itemKey);
							refresh();
						}}
						className="text-red-500 hover:text-white hover:bg-red-500 p-2 rounded-full transition"
						title="Remove"
					>
						<FaTrash />
					</button>
				</div>

				{/* Quantity & Total */}
				<div className="mt-2 flex justify-between items-center">
					{/* Quantity Controls */}
					<div className="flex items-center gap-2">
						<button
							onClick={() => {
								if (qty === 1) {
									removeFromCart(itemKey);
								} else {
									addToCart(itemKey, -1);
								}
								refresh();
							}}
							className="p-1 rounded border hover:bg-gray-100"
							title="Decrease"
						>
							<FaArrowDown />
						</button>
						<span className="text-base font-medium">{qty}</span>
						<button
							onClick={() => {
								addToCart(itemKey, 1);
								refresh();
							}}
							className="p-1 rounded border hover:bg-gray-100"
							title="Increase"
						>
							<FaArrowUp />
						</button>
					</div>

					{/* Total Price */}
					<p className="text-yellow-600 font-semibold text-lg">
						Rs. {(item.price * qty).toFixed(2)}
					</p>
				</div>
			</div>
		</div>
	);
}
