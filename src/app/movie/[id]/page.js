"use client";
import Banner from "@/app/components/Banner/banner";
import Footer from "@/app/components/Footer/footer";
import Slider from "@/app/components/Slider/slider";
import Aos from "aos";
import Image from "next/image";
import { parseISO, format } from "date-fns";
import { useParams, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import Card from "@/app/components/Card/card";

function MovieDetail() {
    const { id } = useParams();

    const [bannerData, setBannerData] = useState(null);
    const [bannerTrailer, setBannerTrailer] = useState(null);
    const [castData, setCastData] = useState(null);
    const [searchData, setSearchData] = useState(null);

    const searchParams = useSearchParams();
    const query = searchParams.get("query");

    /* initiate AOS */
    useEffect(() => {
        Aos.init({
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
            /* get banner data */
            const reqBannerData = await fetch(`${apiUrl}/movie/${id}?language=en-US`, options);
            const resBannerData = await reqBannerData.json();

            setBannerData(resBannerData);

            /* get trailer youtube id */
            const reqTrailer = await fetch(`${apiUrl}/movie/${id}/videos?language=en-US`, options);
            const resTrailer = await reqTrailer.json();

            const trailerId = resTrailer.results.length > 0 ? resTrailer.results[resTrailer.results.length - 1].key : "";

            setBannerTrailer(trailerId);

            /* get cast */
            const reqCastData = await fetch(`${apiUrl}/movie/${id}/credits?language=en-US`, options);
            const resCastData = await reqCastData.json();

            setCastData(resCastData.cast);

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
                    {bannerData && castData && (
                        <div className="mb-24 lg:mb-10">
                            <Banner data={bannerData} trailerId={bannerTrailer} type={"movie"} />

                            {/* overview */}
                            <div className="mt-6 md:mt-10 px-6 md:px-10 lg:px-20 overflow-y-hidden" data-aos="fade-up">
                                <h1 className="text-xl lg:text-2xl text-center text-cyan-400 font-medium tracking-wide">Overview</h1>

                                <div className="mt-10 flex gap-16">
                                    <Image src={bannerData.poster_path ? `https://image.tmdb.org/t/p/w370_and_h556_bestv2${bannerData.poster_path}` : "/img/default-poster.png"} alt={""} width={350} height={340} unoptimized className="w-[250px] xl:w-[350px] h-max hidden md:block"></Image>

                                    <div className="">
                                        {/* storyline */}
                                        <div className="">
                                            <h1 className="text-lg md:text-xl lg:text-2xl">Storyline</h1>
                                            <p className="mt-2 xl:w-2/3">{bannerData.overview}</p>
                                        </div>

                                        {/* details */}
                                        <table className="mt-10">
                                            <tbody>
                                                <tr>
                                                    <td className="align-top">Released</td>
                                                    <td className="pl-20">{format(parseISO(bannerData.release_date), "dd MMMM y")}</td>
                                                </tr>
                                                <tr>
                                                    <td className="align-top">Runtime</td>
                                                    <td className="pl-20">{bannerData.runtime} minutes</td>
                                                </tr>
                                                <tr>
                                                    <td className="align-top">Budget</td>
                                                    <td className="pl-20">${bannerData.budget.toLocaleString()}</td>
                                                </tr>
                                                <tr>
                                                    <td className="align-top">Revenue</td>
                                                    <td className="pl-20">${bannerData.revenue.toLocaleString()}</td>
                                                </tr>
                                                <tr>
                                                    <td className="align-top">Genre</td>
                                                    <td className="pl-20">
                                                        <div className="flex flex-wrap gap-2">
                                                            {bannerData.genres.map((data, index) => {
                                                                return (
                                                                    <p key={index} className="leading-none">
                                                                        {data.name}
                                                                        {bannerData.genres.length - 1 === index ? "" : ","}
                                                                    </p>
                                                                );
                                                            })}
                                                        </div>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td className="align-top">Status</td>
                                                    <td className="pl-20">{bannerData.status}</td>
                                                </tr>
                                                <tr>
                                                    <td className="align-top">Languange</td>
                                                    <td className="pl-20">
                                                        <div className="flex flex-wrap gap-2">
                                                            {bannerData.spoken_languages.map((data, index) => {
                                                                return (
                                                                    <p key={index} className="leading-none">
                                                                        {data.name}
                                                                        {bannerData.spoken_languages.length - 1 === index ? "" : ","}
                                                                    </p>
                                                                );
                                                            })}
                                                        </div>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td className="align-top">Production</td>
                                                    <td className="pl-20">
                                                        <div className="flex flex-wrap gap-2">
                                                            {bannerData.production_companies.map((data, index) => {
                                                                return (
                                                                    <p key={index} className="leading-none">
                                                                        {data.name}
                                                                        {bannerData.production_companies.length - 1 === index ? "" : ","}
                                                                    </p>
                                                                );
                                                            })}
                                                        </div>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>

                            {/* cast */}
                            <div className="mt-10 md:mt-10 px-6 md:px-10 lg:px-20 overflow-y-hidden">
                                <Slider data={castData} type={"cast"} title={"Cast"} url={"movie/all"} hideLink={true} />
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

export default MovieDetail;
