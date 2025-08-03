import { useEffect, useState } from "react";
import axios from "axios";
import { FaCheckCircle, FaTrash } from "react-icons/fa";

export default function AdminInquiryPage() {
	const [inquiries, setInquiries] = useState([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const fetchInquiries = async () => {
			try {
				const token = localStorage.getItem("token");
				const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/inquiries`, {
					headers: { Authorization: `Bearer ${token}` },
				});
				setInquiries(res.data);
			} catch (error) {
				console.error("Failed to fetch inquiries", error);
			} finally {
				setLoading(false);
			}
		};

		if (loading) fetchInquiries();
	}, [loading]);

	const handleDelete = async (id) => {
		try {
			const token = localStorage.getItem("token");
			await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/api/inquiries/${id}`, {
				headers: { Authorization: `Bearer ${token}` },
			});
			setLoading(true);
		} catch (error) {
			console.error("Failed to delete inquiry", error);
		}
	};

	const handleResolve = async (id) => {
		try {
			const token = localStorage.getItem("token");
			await axios.put(`${import.meta.env.VITE_BACKEND_URL}/api/inquiries/${id}`, {
				isResolved: true,
			}, {
				headers: { Authorization: `Bearer ${token}` },
			});
			setLoading(true);
		} catch (error) {
			console.error("Failed to update inquiry", error);
		}
	};

	return (
		<div className="p-6">
			<h1 className="text-2xl font-bold mb-4">Admin Inquiries</h1>
			{loading ? (
				<p className="text-gray-600 text-center">Loading inquiries...</p>
			) : (
				<div className="overflow-x-auto">
					<table className="min-w-full bg-white border rounded-lg shadow-md">
						<thead className="bg-gray-100">
							<tr>
								<th className="px-4 py-2 text-left">ID</th>
								<th className="px-4 py-2 text-left">Email</th>
								<th className="px-4 py-2 text-left">Phone</th>
								<th className="px-4 py-2 text-left">Message</th>
								<th className="px-4 py-2 text-left">Date</th>
								<th className="px-4 py-2 text-left">Resolved</th>
								<th className="px-4 py-2 text-center">Actions</th>
							</tr>
						</thead>
						<tbody>
							{inquiries.map((inq) => (
								<tr key={inq.id} className="border-t hover:bg-gray-50">
									<td className="px-4 py-2">{inq.id}</td>
									<td className="px-4 py-2">{inq.email}</td>
									<td className="px-4 py-2">{inq.phone}</td>
									<td className="px-4 py-2 max-w-xs overflow-auto">{inq.message}</td>
									<td className="px-4 py-2">{new Date(inq.date).toLocaleDateString()}</td>
									<td className="px-4 py-2">{inq.isResolved ? "Yes" : "No"}</td>
									<td className="px-4 py-2 text-center">
										<div className="flex justify-center gap-2">
											{!inq.isResolved && (
												<button
													title="Mark as Resolved"
													onClick={() => handleResolve(inq.id)}
													className="bg-green-500 hover:bg-green-600 text-white p-2 rounded"
												>
													<FaCheckCircle size={16} />
												</button>
											)}
											<button
												title="Delete Inquiry"
												onClick={() => handleDelete(inq.id)}
												className="bg-red-500 hover:bg-red-600 text-white p-2 rounded"
											>
												<FaTrash size={16} />
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
