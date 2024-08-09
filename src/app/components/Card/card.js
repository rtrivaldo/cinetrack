import limitStringToNCharacters from "@/app/utilities/limitStringToNCharacters/limitStringToNCharacters";
import Image from "next/image";
import Link from "next/link";

function Card({ data, type }) {
    const posterPath = data.poster_path ? `https://image.tmdb.org/t/p/original${data.poster_path}` : "/img/default-poster.png";
    const title = type === "movie" ? data.title : data.name;
    const shortTitle = type === "movie" ? limitStringToNCharacters(data.title, 14) : limitStringToNCharacters(data.name, 14);

    const rateValue = data.vote_average ? data.vote_average.toFixed(1) : 0;
    const rating = type === "cast" ? "" : rateValue;

    const character = type === "cast" ? data.character : "";
    const profilePath = data.profile_path ? `https://image.tmdb.org/t/p/original${data.profile_path}` : "/img/default-poster.png";

    return (
        <>
            {type === "cast" ? (
                <div href={`./${type}/${data.id}`}>
                    <div className="rounded-lg overflow-hidden">
                        <Image src={profilePath} alt="" width={220} height={340} unoptimized className="w-full h-auto lg:hover:scale-105 transition-all duration-500 ease-out"></Image>
                    </div>

                    <div className="mt-4 hidden md:block">
                        <h1 className="tracking-wide">{title}</h1>

                        {/* character */}
                        <p className={`${type === "cast" ? "" : "hidden"} text-gray-500`}>{character}</p>
                    </div>
                </div>
            ) : (
                <Link href={`./${type}/${data.id}`}>
                    <div className="rounded-lg overflow-hidden">
                        <Image src={posterPath} alt="" width={220} height={340} unoptimized className="w-full h-auto lg:hover:scale-105 transition-all duration-500 ease-out"></Image>
                    </div>

                    <div className="mt-4">
                        <h1 className="tracking-wide hidden md:block">{title}</h1>
                        <h1 className="tracking-wide md:hidden">{shortTitle}</h1>

                        {/* ratings */}
                        <div className={`mt-1 hidden md:flex items-center gap-2`}>
                            {/* star icon */}
                            <span className="lg:text-lg text-cyan-400">
                                <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24">
                                    <path fill="currentColor" d="m12 18.26l-7.053 3.948l1.575-7.928L.588 8.792l8.027-.952L12 .5l3.385 7.34l8.027.952l-5.934 5.488l1.575 7.928z" />
                                </svg>
                            </span>
                            {/* ratings */}
                            <span className="font-medium text-sm">{rating}</span>
                        </div>
                    </div>
                </Link>
            )}
        </>
    );
}

export default Card;
