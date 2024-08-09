"use client";

import { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

import Banner from "../components/Banner/banner";
import Footer from "../components/Footer/footer";
import Slider from "../components/Slider/slider";
import { useSearchParams } from "next/navigation";
import Card from "../components/Card/card";

export default function Home() {
    const [bannerData, setBannerData] = useState(null);
    const [bannerTrailer, setBannerTrailer] = useState(null);
    const [nowPlayingMovieData, setNowPlayingMovieData] = useState(null);
    const [popularMovieData, setPopularMovieData] = useState(null);
    const [topRatedMovieData, setTopRatedMovieData] = useState(null);
    const [upComingMovieData, setUpComingMovieData] = useState(null);
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
            const reqBannerData = await fetch(`${apiUrl}/trending/movie/day?language=en-US`, options);
            const resBannerData = await reqBannerData.json();

            const resType = resBannerData.results[0].media_type;
            const resId = resBannerData.results[0].id;

            setBannerData(resBannerData.results[0]);

            /* get trailer youtube id */
            const reqTrailer = await fetch(`${apiUrl}/${resType}/${resId}/videos?language=en-US`, options);
            const resTrailer = await reqTrailer.json();

            const trailerId = resTrailer.results.length > 0 ? resTrailer.results[resTrailer.results.length - 1].key : "";

            setBannerTrailer(trailerId);

            /* get now playing movie */
            const reqNowPlayingMovieData = await fetch(`${apiUrl}/movie/now_playing?language=en-US&page=1`, options);
            const resNowPlayingMovieData = await reqNowPlayingMovieData.json();

            setNowPlayingMovieData(resNowPlayingMovieData.results);

            /* get popular movie */
            const reqPopularMovieData = await fetch(`${apiUrl}/movie/popular?language=en-US&page=1`, options);
            const resPopularMovieData = await reqPopularMovieData.json();

            setPopularMovieData(resPopularMovieData.results);

            /* top rated air movie */
            const reqTopRatedMovieData = await fetch(`${apiUrl}/movie/top_rated?language=en-US&page=1`, options);
            const resTopRatedMovieData = await reqTopRatedMovieData.json();

            setTopRatedMovieData(resTopRatedMovieData.results);

            /* get upcoming movie */
            const reqUpComingMovieData = await fetch(`${apiUrl}/movie/upcoming?language=en-US&page=1`, options);
            const resUpComingMovieData = await reqUpComingMovieData.json();

            setUpComingMovieData(resUpComingMovieData.results);

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
                    {bannerData && nowPlayingMovieData && popularMovieData && topRatedMovieData && upComingMovieData && (
                        <div className="mb-24 lg:mb-10">
                            <Banner data={bannerData} trailerId={bannerTrailer} type={bannerData.media_type} />

                            {/* now playing movies */}
                            <div className="mt-6 md:mt-10 px-6 md:px-10 lg:px-20 overflow-y-hidden">
                                <Slider data={nowPlayingMovieData} type={"movie"} title={"Now Playing"} url={"movie/all"} />
                            </div>

                            {/* popular movies */}
                            <div className="mt-10 md:mt-6 px-6 md:px-10 lg:px-20 overflow-y-hidden">
                                <Slider data={popularMovieData} type={"movie"} title={"Popular"} url={"movie/all"} />
                            </div>

                            {/* top rated movies */}
                            <div className="mt-10 md:mt-6 px-6 md:px-10 lg:px-20 overflow-y-hidden">
                                <Slider data={topRatedMovieData} type={"movie"} title={"Top Rated"} url={"movie/all"} />
                            </div>

                            {/* up coming movies */}
                            <div className="mt-10 md:mt-6 px-6 md:px-10 lg:px-20 overflow-y-hidden">
                                <Slider data={upComingMovieData} type={"movie"} title={"Up Coming"} url={"movie/all"} />
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
