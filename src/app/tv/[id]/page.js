"use client";
import Banner from "@/app/components/Banner/banner";
import Footer from "@/app/components/Footer/footer";
import Slider from "@/app/components/Slider/slider";
import Aos from "aos";
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

                    {/* cast */}
                    <div className="mt-6 md:mt-10 px-6 md:px-10 lg:px-20 overflow-y-hidden">
                        <Slider data={castData} type={"cast"} title={"Cast"} url={"movie/all"} />
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
