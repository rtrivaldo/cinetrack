"use client";
import Banner from "@/app/components/Banner/banner";
import Footer from "@/app/components/Footer/footer";
import Slider from "@/app/components/Slider/slider";
import Aos from "aos";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

function TvDetail() {
    const { id } = useParams();

    const [bannerData, setBannerData] = useState(null);
    const [bannerTrailer, setBannerTrailer] = useState(null);
    const [castData, setCastData] = useState(null);

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
        const fetchBannerData = async () => {
            /* get banner data */
            const reqBannerData = await fetch(`${apiUrl}/tv/${id}?language=en-US`, options);
            const resBannerData = await reqBannerData.json();

            setBannerData(resBannerData);

            /* get trailer youtube id */
            const reqTrailer = await fetch(`${apiUrl}/tv/${id}/videos?language=en-US`, options);
            const resTrailer = await reqTrailer.json();

            const trailerId = resTrailer.results.length > 0 ? resTrailer.results[resTrailer.results.length - 1].key : "";

            setBannerTrailer(trailerId);

            /* get cast */
            const reqCastData = await fetch(`${apiUrl}/tv/${id}/credits?language=en-US`, options);
            const resCastData = await reqCastData.json();

            setCastData(resCastData.cast);
        };

        fetchBannerData();
    }, []);

    return (
        <>
            {bannerData && castData && (
                <div className="mb-24 lg:mb-10">
                    <Banner data={bannerData} trailerId={bannerTrailer} type={"tv"} />

                    {/* overview */}
                    <div className="mt-6 md:mt-10 px-6 md:px-10 lg:px-20 overflow-y-hidden" data-aos="fade-up">
                        <h1 className="text-xl lg:text-2xl text-center text-cyan-400 font-medium tracking-wide">Overview</h1>

                        <div className="mt-10 flex gap-16">
                            <Image src={bannerData.poster_path ? `https://image.tmdb.org/t/p/w370_and_h556_bestv2${bannerData.poster_path}` : "/img/default-poster.png"} alt={""} width={350} height={340} className="w-[250px] xl:w-[350px] h-max hidden md:block"></Image>

                            <div className="">
                                {/* details */}
                                <table>
                                    <tbody>
                                        <tr>
                                            <td className="align-top">First Aired</td>
                                            <td className="pl-20">{bannerData.first_air_date}</td>
                                        </tr>
                                        <tr>
                                            <td className="align-top">Last Aired</td>
                                            <td className="pl-20">{bannerData.last_air_date}</td>
                                        </tr>
                                        <tr>
                                            <td className="align-top">Creator</td>
                                            <td className="pl-20">
                                                <div className="flex flex-wrap gap-2">
                                                    {bannerData.created_by.map((data, index) => {
                                                        return (
                                                            <p key={index} className="leading-none">
                                                                {data.name}
                                                                {bannerData.created_by.length - 1 === index ? "" : ","}
                                                            </p>
                                                        );
                                                    })}
                                                </div>
                                            </td>
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
                                            <td className="align-top">Seasons</td>
                                            <td className="pl-20">{bannerData.number_of_seasons}</td>
                                        </tr>
                                        <tr>
                                            <td className="align-top">Episodes</td>
                                            <td className="pl-20">{bannerData.number_of_episodes}</td>
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
                                            <td className="align-top">Network</td>
                                            <td className="pl-20">
                                                <div className="flex flex-wrap gap-2">
                                                    {bannerData.networks.map((data, index) => {
                                                        return (
                                                            <p key={index} className="leading-none">
                                                                {data.name}
                                                                {bannerData.networks.length - 1 === index ? "" : ","}
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
                    <div className="mt-6 md:mt-10 px-6 md:px-10 lg:px-20 overflow-y-hidden">
                        <Slider data={castData} type={"cast"} title={"Cast"} url={"movie/all"} hideLink={true} />
                    </div>

                    <div className="mt-20 px-6 md:px-10 lg:px-20">
                        <Footer />
                    </div>
                </div>
            )}
        </>
    );
}

export default TvDetail;
