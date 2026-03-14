import { useEffect, useState } from "react";
import Loader from "./Loader";

export default function Input() {

const [image, setImage] = useState(null);
const [resultimage,setResultImage] = useState(null)
const [preview, setPreview] = useState(null);
const [isLoading, setIsLoading] = useState(false);

const handleImageChange = (event) => {
const file = event.target.files[0];
if (file) {
  setImage(file);
  setPreview(URL.createObjectURL(file));
}
handlePredict(file);
};

// useEffect(()=>{
//   post('http://127.0.0.1:8000/api/predict/',image);
// },[image])

// useEffect(()=>{
//   fetch(()=>{
//     const resultimage = await Response;

//   })

// })

const handlePredict = async (file) => {
  setIsLoading(true)
  if (!file) return;

  

  const formData = new FormData();
  formData.append("image", file);

  try {

    const res = await fetch("http://127.0.0.1:8000/api/predict/", {
      method: "POST",
      body: formData
    });

    const data = await res.json();

    setResultImage(data);
    console.log(data);
    
  } catch (err) {

    console.error("API Error:", err);

  }finally{
    setIsLoading(false)
    console.log(resultimage)
  }
};
return(
  <>
<div className="flex flex-col justify-center w-screen h-screen  items-center gap-6">

  <label
    htmlFor="fl"
    className="cursor-pointer bg-yellow-600 hover:bg-yellow-700 text-white px-10 py-4 rounded-full text-2xl  font-semibold shadow-lg"
  >
    Upload Image
  </label>

  <input
    id="fl"
    type="file"
    accept="image/png, image/jpeg"
    onChange={handleImageChange}
    className="hidden"
  />

  <span className="text-stone-200 text-lg">
    Supports .png, .jpg
  </span>

{isLoading?(
  <Loader />
):(
  <>
  <div className={`flex flex-row gap-6 items-center  w-[900px]  p-[10px] ${preview ? "bg-white shadow-[5px_10px_20px_1px_rgba(0,0,0,0.5)]" : ""}   rounded-[10px] `}>
  {preview && (
    <div     style={{ background: `url(${preview})`, backgroundRepeat: "no-repeat", backgroundPositionX: "center", backgroundSize: "cover"}}
    className="w-full h-100 bg-cover bg-center rounded-xl shadow-md"></div>
  )}
 
  {resultimage && (
    <div className="w-full flex flex-col gap-5">
    <div className="w-full flex flex-row justify-between">
      <h2 className="text-4xl capitalize font-[700]">Breed: <br />{resultimage.breed}</h2>
      <span className="text-3xl bg-amber-100 h-10 px-4 rounded-[50px]">{resultimage.confidence}%</span>
    </div>
    <div className="border-1 rounded-[10px] px-5 bg-orange-50 shadow-xs">
    <h2 className="text-2xl font-bold">DESCRIPTION:  </h2>
    {/* {resultimage.desc.info} */} 
    <p className="text-[15px] indent-[50px] text-justify">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Sapiente corporis, dolore molestias corrupti architecto blanditiis quae nam voluptatem eos soluta, molestiae incidunt in vero sequi quisquam, laborum dolores. Adipisci, aliquid?
    </p>
    </div>
    <div className="border-1 rounded-[10px] px-5 bg-orange-50 shadow-xs">
    <h2 className="text-2xl font-bold">TEMPARMENT: </h2>
    {/* {resultimage.desc.temparment} */}
    <p className="text-[15px] indent-[50px] text-justify">Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolores blanditiis alias numquam autem et dolore quam quidem ipsa, nostrum, perspiciatis delectus ex voluptatem dignissimos hic? Nesciunt iure culpa deleniti quos!</p>
    </div>

    <div className="border-1 rounded-[10px] px-5 bg-orange-50 shadow-xs">
      <h2 className="text-2xl font-bold">PRICE: <span>₹15000</span> </h2>
    </div>
    {/* {resultimage.desc.price} */}
    
    </div>
  )}
  </div>
  </>
)}
</div>
</>
)
}