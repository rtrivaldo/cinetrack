"use client";
import { useEffect, useState, useRef, useCallback } from "react";
import Card from "@/app/components/Card/card";

function MovieAll() {
    const [allData, setAllData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(null);
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
        <div className="mt-6 px-6 md:px-10 lg:px-20">
            <h1 className="text-lg md:text-xl lg:hidden">All Movie</h1>

            <div className="mt-6 grid grid-cols-2 md:grid-cols-4 xl:grid-cols-6 gap-6">
                {allData.map((data, index) => (
                    <div key={index} ref={index === allData.length - 1 ? lastElementRef : null}>
                        <Card data={data} type={"movie"} />
                    </div>
                ))}
            </div>
        </div>
    );
}

export default MovieAll;
