"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

import Link from "next/link";
import Card from "../Card/card";

function Slider({ data, type, title, url, hideLink = false }) {
    return (
        <>
            {/* headings */}
            <div className="flex justify-between" data-aos="fade">
                <h1 className="text-lg md:text-xl lg:text-2xl">{title}</h1>

                <Link href={url} className={`lg:text-lg text-cyan-400 tracking-wide ${hideLink ? "hidden" : ""}`}>
                    Explore All
                </Link>
            </div>

            {/* movies card slider */}
            <div className="mt-6" data-aos="fade-up">
                <Swiper
                    spaceBetween={10}
                    slidesPerView={2.5}
                    breakpoints={{
                        640: {
                            slidesPerView: 4,
                            spaceBetween: 10,
                        },
                        768: {
                            slidesPerView: 4,
                            spaceBetween: 20,
                        },
                        1024: {
                            slidesPerView: 6,
                            spaceBetween: 20,
                        },
                    }}
                    navigation={{
                        nextEl: ".swiper-button-next",
                        prevEl: ".swiper-button-prev",
                    }}
                    modules={[Navigation]}
                >
                    {data.map((data, index) => (
                        <SwiperSlide key={index}>
                            <Card data={data} type={type} />
                        </SwiperSlide>
                    ))}

                    <div className="swiper-button-next !hidden lg:!block"></div>
                    <div className="swiper-button-prev !hidden lg:!block"></div>
                </Swiper>
            </div>
        </>
    );
}

export default Slider;
