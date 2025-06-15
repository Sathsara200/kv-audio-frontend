import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import GalleryCard from "../../components/galleryCard";
import Footer from "../../components/footer";

export default function Items() {
  const [state, setState] = useState("loading"); // loading, success, error
  const [items, setItems] = useState([]);

  useEffect(() => {
    if (state === "loading") {
      axios
        .get(`${import.meta.env.VITE_BACKEND_URL}/api/gallerys`)
        .then((res) => {
          console.log(res.data);
          setItems(res.data);
          setState("success");
        })
        .catch((err) => {
          toast.error(err?.response?.data?.error || "An error occurred");
          setState("error");
        });
    }
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <section className="flex-grow w-full h-full flex flex-wrap justify-center pt-[50px]">
        {state === "loading" && (
          <div className="w-full h-[300px] flex justify-center items-center">
            <div className="w-[50px] h-[50px] border-4 rounded-full border-t-green-500 animate-spin"></div>
          </div>
        )}

        {state === "success" &&
          items.map((item, index) => <GalleryCard key={index} item={item} />)}

        {state === "error" && (
          <p className="text-red-500 text-center w-full">Failed to load gallery items.</p>
        )}
      </section>

      {/* ✅ Show footer only after data has loaded or error happened */}
      {(state === "success" || state === "error") && (
        <section>
          <Footer />
        </section>
      )}
    </div>
  );
}
