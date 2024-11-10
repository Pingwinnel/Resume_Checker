import { useState } from "react";
import { FaSearch } from "react-icons/fa";
import "./SearchBar.css";

export const SearchBar = ({ setSearchQuery }) => {
    const [input, setInput] = useState("");

    const handleSearchClick = () => {
        setSearchQuery(input);
    };

    return (
        <div className="input-wrapper">
            <FaSearch id="search-icon" onClick={handleSearchClick} />
            <input
                placeholder="Type to search..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
            />
        </div>
    );
};
