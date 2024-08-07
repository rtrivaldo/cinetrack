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
    const [nowPlayingMovieData, setNowPlayingMovieData] = useState(null);
    const [popularMovieData, setPopularMovieData] = useState(null);
    const [topRatedMovieData, setTopRatedMovieData] = useState(null);
    const [upComingMovieData, setUpComingMovieData] = useState(null);

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
            const reqBannerData = await fetch(`${apiUrl}/trending/movie/day?language=en-US`, options);
            const resBannerData = await reqBannerData.json();

            const resType = resBannerData.results[0].media_type;
            const resId = resBannerData.results[0].id;

            setBannerData(resBannerData.results[0]);

            /* get trailer youtube id */
            const reqTrailer = await fetch(`${apiUrl}/${resType}/${resId}/videos?language=en-US`, options);
            const resTrailer = await reqTrailer.json();

            setBannerTrailer(resTrailer.results[resTrailer.results.length - 1].key);

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
        };

        fetchBannerData();
    }, []);

    return (
        <>
            {bannerData && nowPlayingMovieData && popularMovieData && topRatedMovieData && upComingMovieData && (
                <div className="mb-24 lg:mb-10">
                    <Banner data={bannerData} trailerId={bannerTrailer} />

                    {/* now playing movies */}
                    <Slider data={nowPlayingMovieData} type={"movie"} title={"Now Playing"} />

                    {/* popular movies */}
                    <Slider data={popularMovieData} type={"movie"} title={"Popular"} />

                    {/* top rated movies */}
                    <Slider data={topRatedMovieData} type={"movie"} title={"Top Rated"} />

                    {/* up coming movies */}
                    <Slider data={upComingMovieData} type={"movie"} title={"Up Coming"} />

                    <div className="mt-20 px-6 md:px-10 lg:px-20">
                        <Footer />
                    </div>
                </div>
            )}
        </>
    );
}
