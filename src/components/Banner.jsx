import { useEffect, useState } from "react";

export default function Banner({ image = "/img/background.webp", title = "Ideas", subtitle = "Where all our great things begin" }) {
    const [offsetY, setOffsetY] = useState(0);

    useEffect(() => {
        const handleScroll = () => setOffsetY(window.scrollY);
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <div
            className="relative h-[300px] overflow-hidden"
            style={{
                backgroundImage: `url('${image}')`,
                backgroundAttachment: "fixed",
                backgroundSize: "cover",
                backgroundPosition: "center",
                clipPath: "polygon(0 0, 100% 0, 100% 90%, 0% 100%)",
            }}
        >
            <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                <div className="text-center text-white drop-shadow transition-transform duration-300 max-w-7xl mx-auto w-full px-4" style={{ transform: `translateY(${offsetY * 0.3}px)` }}>
                    <h2 className="text-4xl font-bold mb-2">{title}</h2>
                    <p className="text-sm">{subtitle}</p>
                </div>
            </div>
        </div>
    );
}
