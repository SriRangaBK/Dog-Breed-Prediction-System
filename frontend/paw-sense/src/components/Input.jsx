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
    console.log(data);
    
    setResultImage(data);
    
    
  } catch (err) {

    console.error("API Error:", err);

  }finally{
    setIsLoading(false)
  }
};
return(
<>
<div className="flex flex-col items-center  min-h-screen gap-6 py-10">
  

  <label
    htmlFor="fl"
    className="cursor-pointer order-2 bg-yellow-600 hover:bg-yellow-700 text-white px-10 py-4 rounded-full text-2xl  font-semibold shadow-lg"
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

  <span className="text-stone-200 order-3 text-lg">
    Supports .png, .jpg
  </span>

{isLoading?(
  <Loader />
):(<>
{preview && (<div className="grid grid-cols-2 gap-6 w-[1400px] bg-white rounded-xl shadow-lg p-6">

  {preview && (
    <div className="grid grid-rows-[750px_auto] gap-4">

      <div
        style={{
          background: `url(${preview})`,
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
          backgroundSize: "cover",
        }}
        className="rounded-xl shadow-md"
      />

      <div className="border rounded-[10px] px-5 py-4 bg-orange-50 shadow-xs">
        <div className="flex justify-between items-center">
          <h2 className="text-4xl capitalize font-[700]">
            {resultimage.breed}
          </h2>

          <span className="text-3xl bg-amber-100 px-4 py-1 rounded-full">
            {resultimage.confidence}%
          </span>
        </div>
      </div>

    </div>
  )}
 
    {resultimage && (
    <div className="grid grid-rows-[auto_auto_auto_auto] gap-4">

      {/* Description */}
      <div className="border rounded-[10px] px-5 py-4 bg-orange-50 shadow-xs">
        <h2 className="text-2xl font-bold mb-2">
          DESCRIPTION
        </h2>

        <p className="text-[15px] indent-[50px] text-justify leading-7">
          {resultimage.desc.info}
        </p>
      </div>

      {/* Temperament */}
      <div className="border rounded-[10px] px-5 py-4 bg-orange-50 shadow-xs">
        <h2 className="text-2xl font-bold mb-2">
          TEMPERAMENT
        </h2>

        <p className="text-[15px] indent-[50px] text-justify leading-7">
          {resultimage.desc.temperament}
        </p>
      </div>

      {/* Diet */}
      <div className="border rounded-xl px-5 py-5 bg-orange-50 shadow-sm">
        <h2 className="text-2xl font-bold text-orange-800 mb-4">
          🍖 Dietary Preference
        </h2>

        <div className="space-y-4">

          <div>
            <h3 className="font-semibold text-lg text-orange-700">
              Recommended Foods
            </h3>

            <p className="text-gray-700 leading-7">
              {resultimage.desc.diet.recommended_foods}
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-lg text-red-600">
              Foods to Avoid
            </h3>

            <p className="text-gray-700 leading-7">
              {resultimage.desc.diet.avoid_foods}
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-lg text-green-700">
              Feeding Frequency
            </h3>

            <p className="text-gray-700">
              {resultimage.desc.diet.feeding_frequency}
            </p>
          </div>

        </div>
      </div>

      {/* Price */}
      <div className="border rounded-[10px] px-5 py-4 bg-orange-50 shadow-xs">
        <h2 className="text-2xl font-bold">
          PRICE: ₹{resultimage.desc.price}
        </h2>
      </div>

    </div>
  )}


  </div>
)}
</>
)}
</div>
</>
)}