import { useState } from "react";
import { FaSearch } from "react-icons/fa";
import "./SearchBar.css";

export const SearchBar = ({ setSearchQuery }) => {
    const [input, setInput] = useState(""); // state to manage input value

    const handleSearchClick = () => {
        setSearchQuery(input);  // Pass input to the parent component
        setInput("");  // Clear input field by updating state
    };

    return (
        <div className="input-wrapper">
            <div className={"search-bar__wrap"}>
                <div className={"search__bar"}>
                    <input
                        id={"search-input"}
                        className={"searchTerm"}
                        placeholder="Type a role to search"
                        value={input}  // Bind the input value to React state
                        onChange={(e) => setInput(e.target.value)}  // Update state on change
                    />
                    <button
                        type="submit"
                        className="searchButton"
                        onClick={handleSearchClick}  // Handle click event
                    >
                        <i className="fa fa-search"></i>
                    </button>
                </div>
            </div>
        </div>
    );
};
