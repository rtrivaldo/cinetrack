"use client";
import { usePathname, useSearchParams, useRouter } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";

import Link from "next/link";

function Navbar() {
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const { replace } = useRouter();

    const handleSearch = useDebouncedCallback((term) => {
        const params = new URLSearchParams(searchParams);

        term ? params.set("query", term) : params.delete("query");

        replace(`${pathname}?${params.toString()}`);
    }, 300);

    return (
        <>
            <div className="p-4 md:p-6 lg:hidden fixed top-0 z-50 w-screen bg-background" data-aos="fade">
                <input
                    type="text"
                    name="search"
                    id="search"
                    placeholder="Search for movies, tv shows or people"
                    className="w-full px-4 py-2 rounded text-black outline-none"
                    onChange={(e) => {
                        handleSearch(e.target.value);
                    }}
                    defaultValue={searchParams.get("query")?.toString()}
                />
            </div>

            <div className="fixed bottom-0 lg:top-0 w-full h-max flex items-center justify-between px-0 lg:px-20 py-4 lg:py-6 mx-auto bg-background z-50" data-aos="fade">
                {/* logo */}
                <div className="hidden lg:block">
                    <Link href={"/"} className="text-2xl">
                        CineTrack
                    </Link>
                </div>

                <div className="flex items-center gap-16">
                    {/* navlinks */}
                    <div className="flex w-screen lg:w-auto justify-around lg:justify-end items-center gap-10">
                        <Link href={"/"} className="text-2xl md:text-3xl lg:text-lg tracking-wide">
                            <span className={`hidden lg:block ${pathname === "/" ? "text-cyan-400 font-bold" : ""}`}>Home</span>

                            {/* home icon */}
                            <span className={`block lg:hidden ${pathname === "/" ? "text-cyan-400" : ""}`}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24">
                                    <path fill="currentColor" d="M21 20a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V9.49a1 1 0 0 1 .386-.79l8-6.223a1 1 0 0 1 1.228 0l8 6.223a1 1 0 0 1 .386.79zm-10-7v6h2v-6z" />
                                </svg>
                            </span>
                        </Link>

                        <Link href={"/movie"} className="text-2xl md:text-3xl lg:text-lg tracking-wide">
                            <span className={`hidden lg:block ${pathname === "/movie" ? "text-cyan-400 font-bold" : ""}`}>Movies</span>

                            {/* movie icon */}
                            <span className={`block lg:hidden ${pathname === "/movie" ? "text-cyan-400" : ""}`}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 16 16">
                                    <path
                                        fill="currentColor"
                                        d="M13.218 4.246L7.087 6.238a.5.5 0 0 1-.24.079L4.741 7H13.5a.5.5 0 0 1 .5.5v5a2.5 2.5 0 0 1-2.5 2.5h-7A2.5 2.5 0 0 1 2 12.5v-5c0-.106.033-.205.09-.287l-.195-.602A2.5 2.5 0 0 1 3.5 3.461l6.657-2.163a2.5 2.5 0 0 1 3.15 1.605l.232.713a.5.5 0 0 1-.321.63m-3.744.165l1.285-2.226a1.5 1.5 0 0 0-.293.064l-1.245.404l-1.308 2.265zm2.295-1.979l-.02.037l-.854 1.48l1.538-.5l-.077-.237a1.5 1.5 0 0 0-.587-.78m-3.97.683l-1.56.507L4.93 5.887l1.56-.507zM2.923 6.54l.587-.19l1.307-2.266l-1.008.328a1.5 1.5 0 0 0-.963 1.89z"
                                    />
                                </svg>
                            </span>
                        </Link>

                        <Link href={"/tv"} className="text-2xl md:text-3xl lg:text-lg tracking-wide">
                            <span className={`hidden lg:block ${pathname === "/tv" ? "text-cyan-400 font-bold" : ""}`}>TV Shows</span>

                            {/* tv show icon */}
                            <span className={`block lg:hidden ${pathname === "/tv" ? "text-cyan-400" : ""}`}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24">
                                    <g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2.2">
                                        <rect width="20" height="15" x="2" y="7" rx="2" ry="2" />
                                        <path d="m17 2l-5 5l-5-5" />
                                    </g>
                                </svg>
                            </span>
                        </Link>
                    </div>

                    <div className="hidden lg:block">
                        <input
                            type="text"
                            name="search"
                            id="search"
                            placeholder="Search for movies, tv shows or people"
                            className="w-[20rem] px-4 py-2 rounded text-black"
                            onChange={(e) => {
                                handleSearch(e.target.value);
                            }}
                            defaultValue={searchParams.get("query")?.toString()}
                        />
                    </div>
                </div>
            </div>
        </>
    );
}

export default Navbar;
