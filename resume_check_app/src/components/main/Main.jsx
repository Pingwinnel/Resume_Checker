import React, {useState} from 'react';
import "./Main.css"


const Main = () => {

    const [files, setFiles] = useState("");
    const [selectedFiles, setSelectedFiles] = useState([]);
    const [candidates, setCandidates] = useState([]);

    const submitFiles = async (e) => {
        e.preventDefault();

        if (files.length === 0) {
            alert("Please select PDF files");
            return;
        }

        const formData = new FormData();


        for (let i = 0; i < files.length; i++) {
            formData.append("files", files[i]);
        }

        try {
            const response = await fetch("http://localhost:8081/api/candidates/upload", {
                method: "POST",
                body: formData,
                headers: {},
            });

            if (response.ok) {
                alert("PDF(s) uploaded successfully!");
            } else {
                const errorText = await response.text();
                alert(errorText);
            }
        } catch (error) {
            alert("Error uploading PDF(s): " + error.message);
        }
    };


    const getAllCandidates = async () => {
        try {
            const response = await fetch("http://localhost:8081/api/candidates");
            if (response.ok) {
                const data = await response.json();
                setCandidates(data);
                alert("Candidates retrieved successfully!");
            } else {
                const errorText = await response.text();
                alert("Failed to get candidates: " + errorText);

            }
        } catch (error) {
            alert("Error getting Candidates: " + error.message);
        }
    };

    const handleFileChange = (event) => {
        const files = event.target.files;

        const fileArray = Array.from(files).map((file) => {
            const fileSize = (file.size / 1024).toFixed(1); // Convert to KB
            let sizeDisplay = fileSize + 'KB';

            if (fileSize >= 1024) {
                const sizeInMB = (fileSize / 1024).toFixed(1);
                sizeDisplay = sizeInMB + 'MB';
            }

            return {name: file.name, size: sizeDisplay};
        });

        setSelectedFiles(fileArray);
        setFiles(files);
    };


    return (
        <div className="main-container">
            <form className="form" onSubmit={submitFiles}>
                <input
                    id="files"
                    type="file"
                    multiple={true}
                    accept="application/pdf"
                    required={true}
                    onChange={handleFileChange}
                />
                <label className={"form-label "} htmlFor="files">
                    <i class="fa-solid fa-arrow-up-from-bracket"></i>
                    &nbsp; Choose Files To Upload
                </label>
                <div id="num-of-files">{files.length} Files Selected</div>
                <ul id="files-list">
                    {selectedFiles.map((file, index) => (
                        <li key={index}>
                            <p>{file.name}</p>
                            <p>{file.size}</p>
                        </li>
                    ))}
                </ul>
                <button className="upload_btn" type="submit">Upload</button>
            </form>
        </div>
    );
};

export default Main;