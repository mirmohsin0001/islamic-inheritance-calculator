import React from "react";

const Footer = () => {
    return (
        <>
            <footer className="py-3 bg-gray-800 text-gray-200 fixed bottom-0 w-full text-center font-mono">
                Developed by <a href="https://mirmohsin.fun/" className="text-indigo-500 hover:underline">Mir Mohsin</a> &copy;{" "}
                {new Date().getFullYear()}
            </footer>
        </>
    );
};

export default Footer;