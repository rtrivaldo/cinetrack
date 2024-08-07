"use client";

import { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

import Banner from "../components/Banner/banner";
import Link from "next/link";
import Card from "../components/Card/card";
import Footer from "../components/Footer/footer";

export default function Home() {
    const [bannerData, setBannerData] = useState(null);
    const [bannerTrailer, setBannerTrailer] = useState(null);
    const [airingTodayTvData, setAiringTodayTvData] = useState(null);
    const [onTheAirTvData, setOnTheAirTvData] = useState(null);
    const [popularTvData, setPopularTvData] = useState(null);
    const [topRatedTvData, setTopRatedTvData] = useState(null);

    /* initiate AOS */
    useEffect(() => {
        AOS.init({
            duration: 1200,
            once: true,
            offset: 0,
        });

        /* TMDb Public API Url */
        const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
        /* TMDb API Key */
        const secretKey = process.env.NEXT_PUBLIC_SECRET_KEY;

        /* request header */
        const options = {
            method: "GET",
            headers: {
                accept: "application/json",
                Authorization: `Bearer ${secretKey}`,
            },
        };

        /* fetch data from API */
        const fetchBannerData = async () => {
            //* get banner data */
            const reqBannerData = await fetch(`${apiUrl}/trending/tv/day?language=en-US`, options);
            const resBannerData = await reqBannerData.json();

            const resType = resBannerData.results[0].media_type;
            const resId = resBannerData.results[0].id;

            setBannerData(resBannerData.results[0]);

            /* get trailer youtube id */
            const reqTrailer = await fetch(`${apiUrl}/${resType}/${resId}/videos?language=en-US`, options);
            const resTrailer = await reqTrailer.json();

            setBannerTrailer(resTrailer.results[resTrailer.results.length - 1].key);

            /* get airing today tv */
            const reqAiringTodayTv = await fetch(`${apiUrl}/tv/airing_today?language=en-US&page=1`, options);
            const resAiringTodayTv = await reqAiringTodayTv.json();

            setAiringTodayTvData(resAiringTodayTv.results);

            /* get on the air tv */
            const reqOnTheAirTv = await fetch(`${apiUrl}/tv/on_the_air?language=en-US&page=1`, options);
            const resOnTheAirTv = await reqOnTheAirTv.json();

            setOnTheAirTvData(resOnTheAirTv.results);

            /* get popular air tv */
            const reqPopularTv = await fetch(`${apiUrl}/tv/popular?language=en-US&page=1`, options);
            const resPopularTv = await reqPopularTv.json();

            setPopularTvData(resPopularTv.results);

            /* top rated air tv */
            const reqTopRatedTv = await fetch(`${apiUrl}/tv/top_rated?language=en-US&page=1`, options);
            const resTopRatedTv = await reqTopRatedTv.json();

            setTopRatedTvData(resTopRatedTv.results);
        };

        fetchBannerData();
    }, []);

    return (
        <>
            {bannerData && airingTodayTvData && onTheAirTvData && popularTvData && topRatedTvData && (
                <div className="mb-24 lg:mb-10">
                    <Banner data={bannerData} trailerId={bannerTrailer} />

                    {/* airing today tv shows */}
                    <div className="mt-6 px-6 md:px-10 lg:px-20 overflow-y-hidden">
                        {/* headings */}
                        <div className="flex justify-between" data-aos="fade">
                            <h1 className="text-lg md:text-xl lg:text-2xl">Airing Today</h1>

                            <Link href={""} className="lg:text-lg text-cyan-400 tracking-wide">
                                Explore All
                            </Link>
                        </div>

                        {/* airing today tv shows card slider */}
                        <div className="mt-4" data-aos="fade-up">
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
                                {airingTodayTvData.map((data, index) => (
                                    <SwiperSlide key={index}>
                                        <Card data={data} type={"tv"} />
                                    </SwiperSlide>
                                ))}

                                <div className="swiper-button-next !hidden lg:!block"></div>
                                <div className="swiper-button-prev !hidden lg:!block"></div>
                            </Swiper>
                        </div>
                    </div>

                    {/* on the air tv shows */}
                    <div className="mt-10 px-6 md:px-10 lg:px-20 overflow-y-hidden">
                        {/* headings */}
                        <div className="flex justify-between" data-aos="fade">
                            <h1 className="text-lg md:text-xl lg:text-2xl">On The Air</h1>

                            <Link href={""} className="lg:text-lg text-cyan-400 tracking-wide">
                                Explore All
                            </Link>
                        </div>

                        {/* on the air tv shows card slider */}
                        <div className="mt-4" data-aos="fade-up">
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
                                {onTheAirTvData.map((data, index) => (
                                    <SwiperSlide key={index}>
                                        <Card data={data} type={"tv"} />
                                    </SwiperSlide>
                                ))}
                                <div className="swiper-button-next !hidden lg:!block"></div>
                                <div className="swiper-button-prev !hidden lg:!block"></div>
                            </Swiper>
                        </div>
                    </div>

                    {/* popular tv shows */}
                    <div className="mt-10 px-6 md:px-10 lg:px-20 overflow-y-hidden">
                        {/* headings */}
                        <div className="flex justify-between" data-aos="fade">
                            <h1 className="text-lg md:text-xl lg:text-2xl">Popular</h1>

                            <Link href={""} className="lg:text-lg text-cyan-400 tracking-wide">
                                Explore All
                            </Link>
                        </div>

                        {/* popular tv shows card slider */}
                        <div className="mt-4" data-aos="fade-up">
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
                                {popularTvData.map((data, index) => (
                                    <SwiperSlide key={index}>
                                        <Card data={data} type={"tv"} />
                                    </SwiperSlide>
                                ))}
                                <div className="swiper-button-next !hidden lg:!block"></div>
                                <div className="swiper-button-prev !hidden lg:!block"></div>
                            </Swiper>
                        </div>
                    </div>

                    {/* top rated tv shows */}
                    <div className="mt-10 px-6 md:px-10 lg:px-20 overflow-y-hidden">
                        {/* headings */}
                        <div className="flex justify-between" data-aos="fade">
                            <h1 className="text-lg md:text-xl lg:text-2xl">Top Rated</h1>

                            <Link href={""} className="lg:text-lg text-cyan-400 tracking-wide">
                                Explore All
                            </Link>
                        </div>

                        {/* top rated tv shows card slider */}
                        <div className="mt-4" data-aos="fade-up">
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
                                {topRatedTvData.map((data, index) => (
                                    <SwiperSlide key={index}>
                                        <Card data={data} type={"tv"} />
                                    </SwiperSlide>
                                ))}
                                <div className="swiper-button-next !hidden lg:!block"></div>
                                <div className="swiper-button-prev !hidden lg:!block"></div>
                            </Swiper>
                        </div>
                    </div>

                    <div className="mt-20 px-6 md:px-10 lg:px-20">
                        <Footer />
                    </div>
                </div>
            )}
        </>
    );
}
