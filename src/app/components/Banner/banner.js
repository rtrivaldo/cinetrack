"use client";

function Banner() {
    /* open up trailer when watch trailer clicked */
    const handleClick = () => window.open("https://www.youtube.com/");

    return (
        <div className="relative flex flex-col lg:flex-row justify-end lg:justify-start lg:items-center h-[calc(60vh-5em)] lg:h-[60vh] p-6 md:p-10 lg:pl-20 bg-[url('https://image.tmdb.org/t/p/original/Avtx5jsdPuDa091jvx2Lye3ygke.jpg')] bg-center lg:bg-right lg:bg-contain bg-cover bg-no-repeat">
            <div className="z-20" data-aos="fade-up">
                {/* title */}
                <h1 className="text-3xl lg:text-5xl">Longlegs</h1>

                {/* stats */}
                <div className="mt-4 flex flex-col md:flex-row gap-3 md:items-center">
                    <div className="flex gap-3 items-center">
                        {/* star icon */}
                        <span className="text-lg lg:text-xl text-cyan-400">
                            <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24">
                                <path fill="currentColor" d="m12 18.26l-7.053 3.948l1.575-7.928L.588 8.792l8.027-.952L12 .5l3.385 7.34l8.027.952l-5.934 5.488l1.575 7.928z" />
                            </svg>
                        </span>
                        {/* ratings */}
                        <span className="font-medium lg:text-lg">7.5</span>

                        {/* total revies */}
                        <span className="lg:text-lg text-gray-400">190 Reviews</span>
                    </div>

                    <div className="flex gap-3 items-center">
                        {/* published year */}
                        <p className="lg:text-lg text-gray-400">2024</p>

                        {/* runtime */}
                        <p className="lg:text-lg text-gray-400">90 minutes</p>

                        {/* type */}
                        <p className="lg:text-lg text-gray-400">Movies</p>
                    </div>
                </div>

                {/* overview */}
                <div className="hidden md:block mt-6 lg:w-1/2">
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempore obcaecati voluptates temporibus accusamus inventore odit ducimus suscipit libero ratione doloribus?</p>
                </div>

                {/* larger screen watch trailer button */}
                <div className="hidden lg:block mt-10">
                    <button className="flex gap-4 items-center px-6 py-4 bg-background text-cyan-400" onClick={handleClick}>
                        {/* play icon */}
                        <span className="text-2xl">
                            <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24">
                                <path fill="currentColor" d="M6 20.196V3.804a1 1 0 0 1 1.53-.848l13.113 8.196a1 1 0 0 1 0 1.696L7.53 21.044A1 1 0 0 1 6 20.196" />
                            </svg>
                        </span>

                        <span className="text-lg font-medium">Watch Trailer</span>
                    </button>
                </div>

                {/* smaller screen watch trailer button */}
                <div className="flex lg:hidden absolute inset-0 -top-10 justify-center items-center w-full h-full">
                    <button className="p-4 bg-background text-cyan-400 rounded-full" onClick={handleClick}>
                        {/* play icon */}
                        <span className="text-2xl">
                            <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24">
                                <path fill="currentColor" d="M6 20.196V3.804a1 1 0 0 1 1.53-.848l13.113 8.196a1 1 0 0 1 0 1.696L7.53 21.044A1 1 0 0 1 6 20.196" />
                            </svg>
                        </span>
                    </button>
                </div>
            </div>

            {/* gradient overlay */}
            <div className="absolute inset-0 left-0 top-0 right-0 bottom-0 bg-gradient-to-t lg:bg-gradient-to-r from-black lg:from-30% from-40% to-transparent to-70% z-10 "></div>
        </div>
    );
}

export default Banner;
