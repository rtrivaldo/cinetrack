"use client";

import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

import Banner from "../components/Banner/banner";

export default function Tv() {
    /* initiate AOS */
    useEffect(() => {
        AOS.init({
            duration: 1200,
            once: true,
            offset: 0,
        });
    }, []);

    return <Banner />;
}
