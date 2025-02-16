import axios from "axios";
import { useEffect, useState } from "react";
import { CiCirclePlus } from "react-icons/ci";
import { Link, useNavigate } from "react-router-dom";
import { FiEdit, FiTrash } from "react-icons/fi";



export default function AdminItemsPage() {
    const [items, setItems] = useState([]);
    const [itemsLoaded , setItemsLoaded] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        if (!itemsLoaded) {
            const token = localStorage.getItem("token");
            axios
                .get("http://localhost:3000/api/products", {
                    headers: { Authorization: `Bearer ${token}` },
                })
                .then((res) => {
                    console.log(res.data);
                    setItems(res.data);
                    setItemsLoaded(true);
                })
                .catch((err) => {
                    console.log(err);
                });
        }
    }, [itemsLoaded]);

    const handleDelete = (key) => {
        setItems(items.filter(item => item.key !== key));
        const token = localStorage.getItem("token");
        axios.delete(`http://localhost:3000/api/products/${key}`, {
            headers: { Authorization: `Bearer ${token}` },
        }).then(
            (res) => {
                console.log(res.data);
                setItemsLoaded(false);
            }
        ).catch(
            (err) => {
                console.error(err);
            }
        );
    };

    return (
        <div className="w-full min-h-screen p-5 bg-gray-100 flex flex-col items-center">
            {!itemsLoaded && <div className="border-4 my-4 border-b-green-500 rounded-full animate-spin w-[100px] h-[100px]"></div>}
            {itemsLoaded && <div className="overflow-x-auto w-full max-w-5xl bg-white shadow-md rounded-lg p-4">
                <table className="w-full border-collapse text-left">
                    <thead>
                        <tr className="bg-gray-200">
                            <th className="p-3">Key</th>
                            <th className="p-3">Name</th>
                            <th className="p-3">Price ($)</th>
                            <th className="p-3">Category</th>
                            <th className="p-3">Dimensions</th>
                            <th className="p-3">Availability</th>
                            <th className="p-3 text-center">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {items.map((product) => (
                            <tr key={product.key} className="border-b hover:bg-gray-100">
                                <td className="p-3">{product.key}</td>
                                <td className="p-3">{product.name}</td>
                                <td className="p-3">{product.price.toFixed(2)}</td>
                                <td className="p-3">{product.category}</td>
                                <td className="p-3">{product.dimensions}</td>
                                <td className="p-3">{product.availability ? "Available" : "Unavailable"}</td>
                                <td className="p-3 flex justify-center gap-3">
                                    <button
                                        onClick={() => navigate(`/admin/items/edit`, {state:product} )}
                                        className="text-blue-600 hover:text-blue-800"
                                    >
                                        <FiEdit size={20} />
                                    </button>
                                    <button onClick={() => handleDelete(product.key)} className="text-red-600 hover:text-red-800">
                                        <FiTrash size={20} />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>}
            <Link to="/admin/items/add" className="fixed bottom-6 right-6">
                <CiCirclePlus className="text-[70px] text-blue-600 hover:text-blue-800 transition duration-200 cursor-pointer" />
            </Link>
        </div>
    );
}
