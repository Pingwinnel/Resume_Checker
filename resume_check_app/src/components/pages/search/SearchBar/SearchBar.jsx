import { useState } from "react";
import { FaSearch } from "react-icons/fa";
import "./SearchBar.css";

export const SearchBar = ({ setSearchQuery }) => {
    const [input, setInput] = useState("");

    const handleSearchClick = () => {
        setSearchQuery(input);
        setInput("");
    };

    return (
        <div className="input-wrapper">
            <div className={"search-bar__wrap"}>
                <div className={"search__bar"}>
                    <input
                        id={"search-input"}
                        className={"searchTerm"}
                        placeholder="Type a role to search"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                    />
                    <button
                        type="submit"
                        className="searchButton"
                        onClick={handleSearchClick}
                    >
                        <i className="fa fa-search"></i>
                    </button>
                </div>
            </div>
        </div>
    );
};
