import { Link, useNavigate } from "react-router-dom"

export default function Content() {

    return (
        <>
            <div className="relative h-200 bg-[url(/dog1.jpg)] bg-no-repeat bg-cover bg-center rounded-b-[10px] shadow-xl shadow-black/30">
                <div className="absolute inset-0 bg-black/50"></div>
                <div className="flex justify-center items-center flex-col gap-10">
                    <h2 className=" text-7xl relative font-[Georgia] z-10 text-white p-10 font-[500]">Welcome to PawSense</h2>
                    <h3 className=" text-4xl text-center font-[SFMono-Regular]  relative z-10 text-white ">Upload a photo and let the AI identify the dog breeds <br />
                        with food recommendations and price insights.
                    </h3>


                    <Link className="text-3xl flex justify-center items-center text-center font-bold font-serif text-center bg-yellow-600 h-20 z-10 text-white px-10 border-2 border-black rounded-[50px] shadow-xl shadow-black/30 cursor-pointer hover:bg-yellow-700 " to="/predict">🚀 Start Prediction</Link>
                </div>
            </div>
            <hr />
            <div className="my-10 bg-amber-100 rounded-b-[25px] shadow-md shadow-black/50">
                <h1 className="font-sans font-extrabold text-center text-6xl py-5">About US</h1>
                <p id="about" className="text-2xl px-10 text-justify indent-[50px] ">
                    At PawSense, we believe every dog deserves better understanding and care. Our platform combines artificial intelligence with real world pet knowledge to help dog owners identify breeds instantly from a simple photo.
                    Using advanced image recognition technology, our system analyzes facial features and physical traits to accurately detect dog breeds in seconds. But we do not stop there.
                    We go beyond identification by providing helpful insights such as:</p>
                    <ul className="list-disc text-2xl py-3 px-10 indent-0">
                        <li>Recommended food options</li>
                        <li>General price range information</li>
                        <li>Basic care guidance</li>
                        <li>Breed characteristics and temperament</li>
                    </ul>
                    
                    <p className="text-2xl px-10 text-justify indent-[50px]">Our goal is to make pet parenting easier, smarter, and more informed.
                    Whether you are a new dog owner, a breeder, or simply curious about a furry friend you spotted, PawSense gives you quick, reliable answers powered by AI.

                    We are building more than a tool. We are building a smarter way to care for dogs.
                </p>
            </div>
        </>
    )
}