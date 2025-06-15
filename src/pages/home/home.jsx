import { useEffect, useState } from "react";
import "./hero.css";
import { FaArrowDown } from "react-icons/fa";
import axios from "axios";
import toast from "react-hot-toast";
import ReviewCard from "../../components/reveiwCard";
import Footer from "../../components/footer";
import { Link } from "react-router-dom";

// Home.jsx
export default function Home() {

   const [state,setState] = useState("loading")//loading, success, error
  const [reviews,setReviews] = useState([])

        useEffect(()=>{
            if(state == "loading"){
              const token = localStorage.getItem("token");
                axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/reviews`,{headers: {Authorization: `Bearer ${token}`},}).then((res)=>{
                console.log(res.data)
                setReviews(res.data)
                setState("success")
            }).catch((err)=>{
                console.log("An error occured")
                console.log(err)
                setState("error")
            })
        }
    },[]) 

const handleDelete = (email) => {
  const token = localStorage.getItem("token");

  // Backup the current reviews
  const originalReviews = [...reviews];

  // Optimistically update UI
  setReviews(reviews.filter((review) => review.email !== email));

  axios
    .delete(`${import.meta.env.VITE_BACKEND_URL}/api/reviews/${email}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then((res) => {
      console.log(res.data);
      setState("loading");
      toast.success(res.data.message);
    })
    .catch((err) => {
      console.error(err);
      toast.error("Something went wrong");

      // Roll back UI if deletion fails
      setReviews(originalReviews);
    });
};

  return (
 <div>
    <section className="h-screen flex items-center justify-center home text-white px-6">
      <div className="text-center max-w-2xl">
        <h1 className="text-5xl font-bold mb-4">Rent Pro Audio Gear 🎧</h1>
        <p className="text-xl mb-6 pt-10 pb-2">Fast, affordable, reliable. Everything you <br/>need for your audio project.</p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button className="bg-white text-black px-6 py-3 rounded font-semibold hover:bg-yellow-100 transition">
            Shop Now
          </button>
        </div>
      </div>

  <a href="#next-section" className="absolute bottom-10 animate-bounce">
        <FaArrowDown size={28} className="text-white hover:text-yellow-300 transition" />
      </a>

    </section>

    <section id="next-section" className="min-h-screen bg-yellow-50 p-10">
    <h2 className="text-3xl font-bold text-center mb-6">Customer Reviews</h2>
 
 
<div className="flex justify-end mb-6 mr-[2.5%]">
  <Link to="/review">
    <button className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition duration-300 ease-in-out transform hover:scale-105 flex items-center gap-2">
      Add Review
    </button>
  </Link>
</div>

    {
      state=="loading"&& 
        <div className="w-full h-full flex justify-center items-center">
          <div className="w-[50px] h-[50px] border-4 rounded-full border-t-green-500 animate-spin">

          </div>
        </div>
    }

    {reviews.map((review) => (
  <ReviewCard key={review.email} review={review} doit={handleDelete} />
))}

 
    </section>

    <section><Footer></Footer></section>
   

    </div>
  );
}

