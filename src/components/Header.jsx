import { useState, useEffect, useRef } from "react";

export default function Header() {
    const [show, setShow] = useState(true);
    const lastScrollY = useRef(0);

    const controlNavbar = () => {
        if (window.scrollY > lastScrollY.current) {
            setShow(false);
        } else {
            setShow(true);
        }
        lastScrollY.current = window.scrollY;
    };

    useEffect(() => {
        window.addEventListener("scroll", controlNavbar);
        return () => window.removeEventListener("scroll", controlNavbar);
    }, []);

    const navItems = ["Work", "About", "Services", "Ideas", "Careers", "Contact"];
    const activeItem = "Ideas";

    return (
        <header className={`fixed top-0 w-full z-50 transition-all duration-300 ${show ? "bg-white/80 backdrop-blur shadow" : "-translate-y-full"}`}>
            <div className="max-w-7xl mx-auto flex items-center justify-between px-4 py-2">
                <img src="img/site-logo.webp" alt="Logo Suitmedia" className="h-8" />
                <nav className="text-sm">
                    <ul className="flex space-x-6">
                        {navItems.map((item) => (
                            <li key={item}>
                                <a href="#" className={`relative group font-semibold inline-block`}>
                                    {item}
                                    <span className={`absolute left-0 -bottom-1 h-0.5 bg-orange-500 transition-all duration-300 ${item === activeItem ? "w-full" : "w-0 group-hover:w-full"}`}></span>
                                </a>
                            </li>
                        ))}
                    </ul>
                </nav>
            </div>
        </header>
    );
}
