import { useEffect, useState } from "react";
import { formatDate, loadCart } from "../../utils/cart";
import BookingItem from "../../components/bookingItem";
import axios from "axios";
import toast from "react-hot-toast";
import { use } from "react";

export default function BookingPage(){
    const [cart, setCart] = useState(loadCart());
    const [startingDate, setStartingDate] = useState(formatDate(new Date()));
    const [endingDate, setEndingDate] = useState(formatDate(new Date(Date.now() + 24 * 60 * 60 * 1000)));
    const [total , setTotal] = useState(0);
    const daysBetween = Math.max((new Date(endingDate) - new Date(startingDate)) / (1000 * 60 * 60 * 24), 1);

    function reloadCart(){
        setCart(loadCart());
        calculateTotal();
        
    }
    function calculateTotal(){
        const cartInfo = loadCart();
        cartInfo.startingDate = startingDate;
        cartInfo.endingDate = endingDate;
        cartInfo.days = daysBetween;
        axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/orders/quote`,
            cartInfo
        ).then((res)=>{
            console.log(res.data)
            setTotal(res.data.total);
        }).catch((err)=>{   
            console.error(err);
        })
    }

    useEffect(()=>{
        calculateTotal();
    },[startingDate, endingDate])
    
    function handleBookingCreation(){
        const cart = loadCart();
        cart.startingDate = startingDate;
        cart.endingDate = endingDate;
        cart.days = daysBetween;

        const token = localStorage.getItem("token");
        axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/orders`, cart, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then((res)=>{
            console.log(res.data);
            localStorage.removeItem("cart");
            toast.success("Booking Created");
            setCart(loadCart());
        }).catch((err)=>{
            console.error(err);
            toast.error("Failed to create booking");
        })
    }

    return(
        <div className="w-full h-[400px] flex flex-col items-center mt-[30px]">
            <h1 className="text-2xl font-bold text-black">Create Booking</h1>
            <div className="w-full flex flex-col items-center gap-4 mt-4">
                <label className="flex flex-col">
                    <span className="text-black font-semibold">Starting Date:</span>
                    <input 
                        type="date" 
                        value={startingDate} 
                        onChange={(e) => setStartingDate(e.target.value)} 
                        className="border border-secondary rounded-md p-2" 
                    />
                </label>
                <label className="flex flex-col">
                    <span className="text-black font-semibold">Ending Date:</span>
                    <input 
                        type="date" 
                        value={endingDate} 
                        onChange={(e) => setEndingDate(e.target.value)} 
                        className="border border-secondary rounded-md p-2" 
                    />
                </label>
                <p className="text-black font-medium">Total Days: {daysBetween}</p>
            </div>
            <div className="w-full flex flex-col items-center mt-4">
                {
                    cart.orderedItems.map((item)=>{
                        return <BookingItem itemKey={item.key} key={item.key} qty={item.qty} refresh={reloadCart}/>
                    })
                }
            </div>
            <div className="w-full flex justify-center mt-4">
                <p className="text-black font-semibold">Total: {total.toFixed(2)}</p>
            </div>
            <div className="w-full flex justify-center mt-4">
                <button className="bg-yellow-300 text-black px-4 py-2 rounded-md" onClick={handleBookingCreation}>Create Booking</button>
            </div>
        </div>
    )
}