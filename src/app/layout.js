import { Roboto } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar/navbar";

const roboto = Roboto({
    weight: ["100", "300", "400", "500", "700", "900"],
    subsets: ["latin"],
});

export const metadata = {
    title: "CineTrack",
    description: "Website to view movies' trailer and detail.",
};

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <body className={roboto.className}>
                <Navbar />
                <div className="mt-16 lg:mt-20">{children}</div>
            </body>
        </html>
    );
}
