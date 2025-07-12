import React, { useState, useEffect } from "react";

const Header = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [activeMenu, setActiveMenu] = useState("");

    useEffect(() => {
        const handleScroll = () => {
            const scrollTop = window.pageYOffset;
            setIsScrolled(scrollTop > 50);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const navItems = [
        { name: "Work", href: "#" },
        { name: "About", href: "#" },
        { name: "Services", href: "#" },
        { name: "Ideas", href: "#", id: "nav-ideas" },
        { name: "Careers", href: "#" },
        { name: "Contact", href: "#" },
    ];

    const handleMenuClick = (menuName) => {
        setActiveMenu(menuName);
    };

    return (
        <header id="site-header" className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${isScrolled ? "bg-white/90 backdrop-blur-md shadow-lg" : "bg-transparent"}`}>
            <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
                <div className="text-orange-500 font-bold text-xl">
                    <img src="/img/site-logo.webp" alt="Logo Suitmedia" />
                </div>

                <nav className="text-sm">
                    <ul className="flex space-x-6">
                        {navItems.map((item, index) => (
                            <li key={index}>
                                <a href={item.href} id={item.id} onClick={() => handleMenuClick(item.name)} className={`relative group font-inter font-semibold inline-block transition-colors duration-200 ${activeMenu === item.name ? "text-orange-500" : "text-gray-700 hover:text-orange-500"}`}>
                                    {item.name}
                                    <span className={`absolute left-0 -bottom-1 h-0.5 bg-orange-500 transition-all duration-300 ${activeMenu === item.name ? "w-full" : "w-0 group-hover:w-full"}`}></span>
                                </a>
                            </li>
                        ))}
                    </ul>
                </nav>
            </div>
        </header>
    );
};

export default Header;
