"use client";

import { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

import Banner from "../components/Banner/banner";
import Footer from "../components/Footer/footer";
import Slider from "../components/Slider/slider";
import Card from "../components/Card/card";
import { useSearchParams } from "next/navigation";

export default function Home() {
    const [bannerData, setBannerData] = useState(null);
    const [bannerTrailer, setBannerTrailer] = useState(null);
    const [airingTodayTvData, setAiringTodayTvData] = useState(null);
    const [onTheAirTvData, setOnTheAirTvData] = useState(null);
    const [popularTvData, setPopularTvData] = useState(null);
    const [topRatedTvData, setTopRatedTvData] = useState(null);
    const [searchData, setSearchData] = useState(null);

    const searchParams = useSearchParams();
    const query = searchParams.get("query");

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
        const fetchData = async () => {
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

            /* get search */
            const reqSearch = await fetch(`${apiUrl}/search/multi?query=${query}&include_adult=false&language=en-US&page=1`, options);
            const resSearch = await reqSearch.json();

            setSearchData(resSearch.results);
        };

        fetchData();
    }, [query]);

    return (
        <>
            {query ? (
                <div className="">
                    {searchData && (
                        <div className="mt-20 md:mt-24 px-6 md:px-10 lg:px-20">
                            <h1 className="text-lg md:text-xl lg:text-2xl">Results For: {query}</h1>

                            <div className="mt-6 grid grid-cols-2 md:grid-cols-4 xl:grid-cols-6 gap-6">
                                {searchData.map((data, index) => (
                                    <div key={index} data-aos="fade-up">
                                        <Card data={data} type={data.media_type} />
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            ) : (
                <div className="">
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
                </div>
            )}
        </>
    );
}
