"use client";

import { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

import Banner from "../components/Banner/banner";
import Footer from "../components/Footer/footer";
import Slider from "../components/Slider/slider";

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

            const trailerId = resTrailer.results.length > 0 ? resTrailer.results[resTrailer.results.length - 1].key : "";

            setBannerTrailer(trailerId);

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
                    <Banner data={bannerData} trailerId={bannerTrailer} type={bannerData.media_type} />

                    {/* airing today tv shows */}
                    <div className="mt-6 md:mt-10 px-6 md:px-10 lg:px-20 overflow-y-hidden">
                        <Slider data={airingTodayTvData} type={"tv"} title={"Airing Today"} url={"tv/all"} />
                    </div>

                    {/* on the air tv shows */}
                    <div className="mt-10 px-6 md:px-10 lg:px-20 overflow-y-hidden">
                        <Slider data={onTheAirTvData} type={"tv"} title={"On The Air"} url={"tv/all"} />
                    </div>

                    {/* popular tv shows */}
                    <div className="mt-10 px-6 md:px-10 lg:px-20 overflow-y-hidden">
                        <Slider data={popularTvData} type={"tv"} title={"Popular"} url={"tv/all"} />
                    </div>

                    {/* top rated tv shows */}
                    <div className="mt-10 px-6 md:px-10 lg:px-20 overflow-y-hidden">
                        <Slider data={topRatedTvData} type={"tv"} title={"Top Rated"} url={"tv/all"} />
                    </div>

                    <div className="mt-20 px-6 md:px-10 lg:px-20">
                        <Footer />
                    </div>
                </div>
            )}
        </>
    );
}
