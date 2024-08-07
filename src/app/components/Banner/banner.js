"use client";

import { parseISO, format } from "date-fns";
import Link from "next/link";

function Banner({ data, trailerId, type }) {
    function capitalizeFirstLetter(string) {
        if (!string) return string;
        return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
    }

    const title = type === "tv" ? data.name : data.title;
    const rating = data.vote_average.toFixed(1);
    const reviews = data.vote_count.toLocaleString();
    const mediaType = capitalizeFirstLetter(type);
    const publishedYear = type === "tv" ? format(parseISO(data.first_air_date), "y") : format(parseISO(data.release_date), "y");

    const backdropPath = `https://image.tmdb.org/t/p/original${data.backdrop_path}`;

    return (
        <div className="relative flex flex-col lg:flex-row justify-end lg:justify-start lg:items-center h-[40vh] md:h-[60vh] lg:h-[60vh] p-6 md:p-10 lg:px-20 bg-center lg:bg-right lg:bg-[length:1200px] bg-cover bg-no-repeat overflow-y-hidden" style={{ backgroundImage: `url(${backdropPath})` }}>
            <div className="z-20" data-aos="fade-up">
                {/* title */}
                <h1 className="text-3xl lg:text-5xl">{title}</h1>

                {/* stats */}
                <div className="mt-4 flex flex-col md:flex-row gap-3 md:items-center">
                    <div className="flex gap-3 items-center">
                        {/* star icon */}
                        <span className="text-lg lg:text-xl text-cyan-400">
                            <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24">
                                <path fill="currentColor" d="m12 18.26l-7.053 3.948l1.575-7.928L.588 8.792l8.027-.952L12 .5l3.385 7.34l8.027.952l-5.934 5.488l1.575 7.928z" />
                            </svg>
                        </span>
                        {/* rating */}
                        <span className="font-medium lg:text-lg">{rating}</span>

                        {/* total reviews */}
                        <span className="lg:text-lg text-gray-400">{reviews} Reviews</span>
                    </div>

                    <div className="flex gap-3 items-center">
                        {/* type */}
                        <p className="lg:text-lg text-gray-400">{mediaType}</p>

                        {/* published year */}
                        <p className="lg:text-lg text-gray-400">{publishedYear}</p>
                    </div>
                </div>

                {/* overview */}
                <div className="hidden md:block mt-6 lg:w-2/3 xl:w-1/2">
                    <p>{data.overview}</p>
                </div>

                {/* larger screen watch trailer button */}
                <div className={`hidden ${trailerId ? "lg:block" : ""} mt-10`}>
                    <Link href={`https://www.youtube.com/watch?v=${trailerId}`} target="_blank" className="flex gap-4 items-center px-6 py-4 bg-background text-cyan-400 w-max">
                        {/* play icon */}
                        <span className="text-2xl">
                            <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24">
                                <path fill="currentColor" d="M6 20.196V3.804a1 1 0 0 1 1.53-.848l13.113 8.196a1 1 0 0 1 0 1.696L7.53 21.044A1 1 0 0 1 6 20.196" />
                            </svg>
                        </span>

                        <span className="text-lg font-medium">Watch Trailer</span>
                    </Link>
                </div>

                {/* smaller screen watch trailer button */}
                <div className={`${trailerId ? "flex" : "hidden"} lg:hidden absolute inset-0 -top-32 justify-center items-center w-full h-full`}>
                    <Link href={`https://www.youtube.com/watch?v=${trailerId}`} target="_blank" className="p-4 bg-background text-cyan-400 rounded-full">
                        {/* play icon */}
                        <span className="text-2xl">
                            <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24">
                                <path fill="currentColor" d="M6 20.196V3.804a1 1 0 0 1 1.53-.848l13.113 8.196a1 1 0 0 1 0 1.696L7.53 21.044A1 1 0 0 1 6 20.196" />
                            </svg>
                        </span>
                    </Link>
                </div>
            </div>

            {/* gradient overlay */}
            <div className="absolute inset-0 left-0 top-0 right-0 bottom-0 bg-gradient-to-t lg:bg-gradient-to-r from-black from-30% lg:from-40% to-transparent to-70% z-10 "></div>
        </div>
    );
}

export default Banner;
