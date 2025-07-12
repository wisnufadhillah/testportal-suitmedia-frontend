import React, { useState, useEffect } from "react";

const Banner = ({ image = "img/background.webp", title = "Ideas", subtitle = "Where all our great things begin" }) => {
    const [bannerImage, setBannerImage] = useState(image);
    const [bannerTitle, setBannerTitle] = useState(title);
    const [bannerSubtitle, setBannerSubtitle] = useState(subtitle);
    const [scrollY, setScrollY] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            setScrollY(window.pageYOffset);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    useEffect(() => {
        setBannerImage(image);
        setBannerTitle(title);
        setBannerSubtitle(subtitle);
    }, [image, title, subtitle]);

    const parallaxOffset = scrollY * 0.5;

    return (
        <section id="banner" className="h-[400px] relative mt-16 overflow-hidden">
            <div
                className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                style={{
                    backgroundImage: `url('${bannerImage}')`,
                    transform: `translateY(${parallaxOffset}px)`,
                    height: "110%",
                    top: "-5%",
                    clipPath: "polygon(0 0, 100% 0, 100% 90%, 0 100%)",
                }}
            />

            <div
                className="absolute inset-0 bg-black/50 flex items-center justify-center text-white text-center"
                style={{
                    clipPath: "polygon(0 0, 100% 0, 100% 90%, 0 100%)",
                }}
            >
                <div>
                    <h1 className="text-4xl font-bold font-inter">{bannerTitle}</h1>
                    <p className="mt-2 text-lg font-inter">{bannerSubtitle}</p>
                </div>
            </div>
        </section>
    );
};

export default Banner;
