import axios from "axios";
import { useEffect, useState } from "react";

export default function AdminReviewPage() {
	const [reviews, setReviews] = useState([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const fetchReviews = async () => {
			try {
				const token = localStorage.getItem("token");
				const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/reviews`, {
					headers: {
						Authorization: `Bearer ${token}`,
					},
				});
				console.log(res.data);
				setReviews(res.data);
			} catch (error) {
				console.error("Error fetching reviews:", error);
			} finally {
				setLoading(false);
			}
		};

		if (loading) {
			fetchReviews();
		}
	}, [loading]);

	const handleApproveReview = (email) => {
		const token = localStorage.getItem("token");

		axios
			.put(`${import.meta.env.VITE_BACKEND_URL}/api/reviews/approve/${email}`, {}, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			})
			.then(() => {
				setLoading(true); // Refresh the list
			})
			.catch((err) => {
				console.error(err);
			});
	};

	const handleDeleteReview = (email) => {
		const token = localStorage.getItem("token");

		axios
			.delete(`${import.meta.env.VITE_BACKEND_URL}/api/reviews/${email}`, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			})
			.then(() => {
				setLoading(true);
			})
			.catch((err) => {
				console.error(err);
			});
	};

	return (
		<div className="p-6">
			<h1 className="text-2xl font-semibold mb-4">Admin Reviews</h1>
			{loading ? (
				<p className="text-center text-gray-600">Loading...</p>
			) : (
				<div className="overflow-x-auto">
					<table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-md">
						<thead className="bg-gray-200">
							<tr>
								<th className="px-4 py-2 text-left">Profile</th>
								<th className="px-4 py-2 text-left">Name</th>
								<th className="px-4 py-2 text-left">Email</th>
								<th className="px-4 py-2 text-left">Rating</th>
								<th className="px-4 py-2 text-left">Comment</th>
								<th className="px-4 py-2 text-left">Date</th>
								<th className="px-4 py-2 text-left">Status</th>
								<th className="px-4 py-2 text-left">Actions</th>
							</tr>
						</thead>
						<tbody>
							{reviews.map((review) => (
								<tr key={review.email} className="border-t hover:bg-gray-100">
									<td className="px-4 py-2">
										<img
											src={review.profilePicture}
											alt="Profile"
											className="w-10 h-10 rounded-full"
										/>
									</td>
									<td className="px-4 py-2">{review.name}</td>
									<td className="px-4 py-2">{review.email}</td>
									<td className="px-4 py-2">{review.rating}</td>
									<td className="px-4 py-2 max-w-xs overflow-auto">
										{review.comment}
									</td>
									<td className="px-4 py-2">
										{new Date(review.date).toLocaleDateString()}
									</td>
									<td className="px-4 py-2">
										{review.isApproved ? "APPROVED" : "PENDING"}
									</td>
									<td className="px-4 py-2 space-x-2 ">
                                        <div className="flex flex-col justify-center">
										    {!review.isApproved && (
											    <button
												    onClick={() => handleApproveReview(review.email)}
												    className="bg-green-500 hover:bg-green-600 text-white px-2 py-1 rounded h-7 w-[75px] mb-1"
											    >
												    Approve
											    </button>
										    )}
										    <button
											    onClick={() => handleDeleteReview(review.email)}
											    className="bg-red-500 hover:bg-red-600 text-white px-2 py-1 rounded h-7 w-[75px]"
										    >
											    Delete
										    </button>
                                        </div>
									</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			)}
		</div>
	);
}
