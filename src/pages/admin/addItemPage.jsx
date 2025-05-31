import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import mediaUpload from "../../utils/mediaUpload";

export default function AddItemPage() {
    const [productKey, setProductKey] = useState("");
    const [productName, setProductName] = useState("");
    const [productPrice, setProductPrice] = useState(0);
    const [productCategory, setProductCategory] = useState("audio");
    const [productDimensions, setProductDimensions] = useState("");
    const [productDescription, setProductDescription] = useState("");
    const [productImages, setProductImages] = useState([])
    const navigate = useNavigate()
    async function handleAddItem(){
        console.log(productImages)
        const promises = []
        for(let i = 0; i<productImages.length; i++){
            const promise = mediaUpload(productImages[i])
            console.log(promise);
            promises.push(promise)
            if(i == 5 ){
                toast.error("You can only upload 5 images at a time");
                break
            }
        }

      

        console.log(
            productKey, 
            productName, 
            productPrice, 
            productCategory, 
            productDimensions, 
            productDescription,
        );
        const token = localStorage.getItem("token")

        if(token){
            try{
                    //Promise.all(promises).then((result)=>{
                        //console.log(result)
                    //}).catch((err)=>{
                        //toast.error(err)
                    //})

                    const imageUrls = await Promise.all(promises);
                
                    const result = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/products`,{
                        key : productKey,
                        name : productName,
                        price : productPrice,
                        category : productCategory,
                        dimensions : productDimensions,
                        description : productDescription,
                        image : imageUrls,
                        },
                        {
                            headers: {
                            Authorization : "Bearer " + token,
                            }   
                        }
                
                    );
                toast.success(result.data.message);
                navigate("/admin/items")
            }catch(err){
                toast.error("You are not autherized to add items")
            }
        }else{
            
            toast.error("You are not authorized to add items")
        }
    }

    return (
        <div className="w-full h-full flex flex-col items-center p-4">
            <h1 className="text-2xl font-bold mb-4">Add Item</h1>
            <div className="w-[400px] border p-4 flex flex-col items-center gap-2">
                <input 
                    type="text" 
                    placeholder="Product Key" 
                    value={productKey} 
                    onChange={(e) => setProductKey(e.target.value)} 
                    className="border p-2 w-full"
                />
                <input 
                    type="text" 
                    placeholder="Product Name" 
                    value={productName} 
                    onChange={(e) => setProductName(e.target.value)} 
                    className="border p-2 w-full"
                />
                <input 
                    type="number" 
                    placeholder="Product Price" 
                    value={productPrice} 
                    onChange={(e) => setProductPrice(e.target.value)} 
                    className="border p-2 w-full"
                />
                <select 
                    value={productCategory} 
                    onChange={(e) => setProductCategory(e.target.value)} 
                    className="border p-2 w-full"
                >
                    <option value="audio">Audio</option>
                    <option value="lights">Lights</option>
                </select>
                <input 
                    type="text" 
                    placeholder="Product Dimensions" 
                    value={productDimensions} 
                    onChange={(e) => setProductDimensions(e.target.value)} 
                    className="border p-2 w-full"
                />
                <textarea 
                    type="text" 
                    placeholder="Product Description" 
                    value={productDescription} 
                    onChange={(e) => setProductDescription(e.target.value)} 
                    className="border p-2 w-full"
                />
                <input type="file" multiple onChange={(e)=>{setProductImages(e.target.files)}} className="border p-2 w-full" />
                <button onClick={handleAddItem} className="bg-blue-500 text-white p-2 w-full mt-2 hover:bg-blue-600"> Add </button>
                <button onClick={()=>{navigate("/admin/items")}} className="bg-red-500 text-white p-2 w-full mt-2 hover:bg-red-600"> Cancel </button>
            </div>
        </div>
    );
}
