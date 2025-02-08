const sampleArr = [
    {
        key: "PROD001",
        name: "Wireless Headphones",
        price: 99.99,
        category: "audio",
        dimensions: "15x10x5 cm",
        description: "High-quality wireless headphones with noise cancellation.",
        availability: true,
        image: ["https://example.com/images/headphones.jpg"]
    },
    {
        key: "PROD002",
        name: "Smart LED Light",
        price: 29.99,
        category: "lights",
        dimensions: "10x10x12 cm",
        description: "Smart LED light with customizable colors and remote control.",
        availability: true,
        image: ["https://example.com/images/smart-light.jpg"]
    },
    {
        key: "PROD003",
        name: "Bluetooth Speaker",
        price: 49.99,
        category: "audio",
        dimensions: "12x8x6 cm",
        description: "Portable Bluetooth speaker with deep bass and long battery life.",
        availability: true,
        image: ["https://example.com/images/bluetooth-speaker.jpg"]
    },
    {
        key: "PROD004",
        name: "USB Desk Lamp",
        price: 19.99,
        category: "lights",
        dimensions: "25x8x8 cm",
        description: "Flexible USB-powered desk lamp with adjustable brightness.",
        availability: true,
        image: ["https://example.com/images/desk-lamp.jpg"]
    },
    {
        key: "PROD005",
        name: "Gaming Mouse",
        price: 39.99,
        category: "accessories",
        dimensions: "12x7x4 cm",
        description: "Ergonomic gaming mouse with customizable RGB lighting.",
        availability: true,
        image: ["https://example.com/images/gaming-mouse.jpg"]
    }
];

import { useState } from "react";
import { CiCirclePlus } from "react-icons/ci";
import { Link } from "react-router-dom";
export default function AdminItemsPage(){
    const [items,setItems] = useState(sampleArr)

    return(
        <div className="w-full h-full relative">
            <table>
                <thead>
                    <th>Key</th>
                    <th>Name</th>
                    <th>Price</th>
                    <th>Category</th>
                    <th>Dimensions</th>
                    <th>Availability</th>
                </thead>
                <tbody>
                    {
                        items.map((product)=>{
                            console.log(product)
                            return (
                                <tr  key={product.key}>
                                    <td>{product.key}</td>
                                    <td>{product.name}</td>
                                    <td>{product.price}</td>
                                    <td>{product.category}</td>
                                    <td>{product.dimensions}</td>
                                    <td>{product.availability ? "Available" : true}</td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>
            <Link to="/admin/items/add">
                <CiCirclePlus className="text-[50px] absolute right-2 bottom-2 hover:text-red-900"/>
            </Link>
        </div>
    )
}