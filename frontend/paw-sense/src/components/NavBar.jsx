export default function NavBar(){
    return(
        <>
            <nav className="flex h-[150px] justify-between items-center  md:w-full md:h-[50px] md:flex-row flex-col">
                <h1 className="text-5xl font-[700]">Pawsense</h1>
                <a className="text-3xl font-mono" href="#about">🗨️About PawSense</a>
            </nav>
            

        </>
    )
}