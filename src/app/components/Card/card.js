import Image from "next/image";

function Card({ data }) {
    const posterPath = data.poster_path;
    const title = data.media_type === "tv" ? data.name : data.title;
    const rating = data.vote_average;

    return (
        <div className="">
            <div className="rounded-lg overflow-hidden">
                <Image src={`https://image.tmdb.org/t/p/w370_and_h556_bestv2${posterPath}`} alt="" width={220} height={340} className="w-full h-auto"></Image>
            </div>

            <div className="mt-4 hidden md:block">
                <h1 className="tracking-wide">{title}</h1>

                <div className="mt-1 flex items-center gap-2">
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
        </div>
    );
}

export default Card;
