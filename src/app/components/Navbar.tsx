"use client";

export default function Navbar() {
    return (
        <nav className="w-full fixed top-0 z-50 bg-black/70 backdrop-blur-md text-white">
            <div className="max-w-6xl mx-auto flex justify-between items-center p-4">
                <h1 className="text-xl font-bold">MyPortfolio</h1>

                <div className="space-x-6 hidden md:flex">
                    <a href="#projects" className="hover:text-blue-400">Projects</a>
                    <a href="#about" className="hover:text-blue-400">About</a>
                    <a href="#contact" className="hover:text-blue-400">Contact</a>
                </div>
            </div>
        </nav>
    );
}