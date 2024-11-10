import React, { useState } from 'react';
import "./Search.css";
import { SearchBar } from "./SearchBar/SearchBar";
import CandidateFiles from "./candidateFiles/CandidateFiles";
import { toast, ToastContainer } from "react-toastify";

const Search = () => {
    const [results, setResults] = useState([]);


    const fetchData = async (searchQuery) => {
        if (!searchQuery) return;

        try {
            const response = await fetch(`http://localhost:8081/api/candidates/best-candidates?vacancyDescription=${searchQuery}&k=3`);

            if (response.ok) {
                const data = await response.json();
                setResults(data);
                toast.success("All candidates retrieved successfully", {
                    position: "top-center",
                    autoClose: 3000
                });
            } else {
                const errorText = await response.text();
                toast.error(`Error: ${errorText}`, {
                    position: "top-center",
                    autoClose: false
                });
            }
        } catch (error) {
            toast.error("Error fetching candidates: " + error.message, {
                position: "top-center",
                autoClose: false
            });
        }
    };

    return (
        <div className="search-container">
            <ToastContainer />
            <div className="search-bar-container">
                <SearchBar setSearchQuery={fetchData} />
            </div>

            <CandidateFiles results={results} />
        </div>
    );
};

export default Search;
