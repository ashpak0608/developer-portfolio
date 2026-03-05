"use client";

import { useEffect, useRef } from "react";
import Typed from "typed.js";

export default function Hero() {

    const el = useRef(null);

    useEffect(() => {
        const typed = new Typed(el.current, {
            strings: [
                "Full Stack Developer",
                "React & Next.js Developer",
                "Node.js Backend Engineer",
                "AI Systems Builder"
            ],
            typeSpeed: 60,
            backSpeed: 40,
            loop: true
        });

        return () => {
            typed.destroy();
        };
    }, []);

    return (
        <section className="h-screen flex flex-col justify-center px-10">

            <h1 className="text-5xl font-bold mb-4">
                Hi, I'm Ashpak Shaikh
            </h1>

            <h2 className="text-3xl text-purple-500">
                <span ref={el}></span>
            </h2>

            <p className="mt-4 text-gray-400 max-w-lg">
                I build scalable web applications using modern technologies.
            </p>

            <button className="mt-6 bg-purple-600 px-6 py-3 rounded-lg">
                View Projects
            </button>

        </section>
    );
}