"use client";
import { useEffect, useState, useRef, useCallback } from "react";
import Aos from "aos";
import "aos/dist/aos.css";

import Card from "@/app/components/Card/card";
import { useSearchParams } from "next/navigation";

function MovieAll() {
    useEffect(() => {
        Aos.init({
            duration: 1200,
            once: true,
            offset: 0,
        });
    });

    const [allData, setAllData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(null);
    const [searchData, setSearchData] = useState(null);

    const searchParams = useSearchParams();
    const query = searchParams.get("query");

    const observer = useRef();

    const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
    const secretKey = process.env.NEXT_PUBLIC_SECRET_KEY;

    const options = {
        method: "GET",
        headers: {
            accept: "application/json",
            Authorization: `Bearer ${secretKey}`,
        },
    };

    const fetchPageData = async (page) => {
        const req = await fetch(`${apiUrl}/movie/now_playing?language=en-US&page=${page}`, options);
        const res = await req.json();
        setTotalPages(res.total_pages);
        setAllData((prevData) => [...prevData, ...res.results]);
    };

    useEffect(() => {
        fetchPageData(currentPage);
    }, []);

    useEffect(() => {
        if (currentPage > 1) {
            fetchPageData(currentPage);
        }
    }, [currentPage]);

    useEffect(() => {
        const fetchData = async () => {
            /* get search */
            const reqSearch = await fetch(`${apiUrl}/search/multi?query=${query}&include_adult=false&language=en-US&page=1`, options);
            const resSearch = await reqSearch.json();

            setSearchData(resSearch.results);
        };

        fetchData();
    }, [query]);

    const lastElementRef = useCallback(
        (node) => {
            if (observer.current) observer.current.disconnect();
            observer.current = new IntersectionObserver((entries) => {
                if (entries[0].isIntersecting && currentPage < totalPages) {
                    setCurrentPage((prevPage) => prevPage + 1);
                }
            });
            if (node) observer.current.observe(node);
        },
        [currentPage, totalPages]
    );

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
                <div className="mt-20 md:mt-24 px-6 md:px-10 lg:px-20" data-aos="fade-in">
                    <h1 className="text-lg md:text-xl lg:hidden">All Movie</h1>

                    <div className="mt-6 grid grid-cols-2 md:grid-cols-4 xl:grid-cols-6 gap-6">
                        {allData.map((data, index) => (
                            <div key={index} ref={index === allData.length - 1 ? lastElementRef : null} data-aos="fade-up">
                                <Card data={data} type={"movie"} />
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </>
    );
}

export default MovieAll;
