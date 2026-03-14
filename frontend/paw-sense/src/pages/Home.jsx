import Footer from "../components/Footer"
import NavBar from "../components/NavBar"
import Content from "../components/Content"
import { Outlet } from "react-router-dom"

export default function Home(){
    return(
        <>
        <div>
            <header className=" py-4 w-full bg-stone-300  text-white px-20 sticky top-0 z-1000">
            <NavBar />
            </header>
            <div className="space-y-2">
            <Content />
            </div>
            <footer>
                <Footer />
            </footer>
            <Outlet/>
        </div>
        </>
    )
}