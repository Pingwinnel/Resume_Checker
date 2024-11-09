import React, {useState} from 'react';
import "./Main.css"
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const Main = () => {

    const [files, setFiles] = useState("");
    const [selectedFiles, setSelectedFiles] = useState([]);
    const [candidates, setCandidates] = useState([]);
    const [successCount, setSuccessCount] = useState(0);
    const [failureCount, setFailureCount] = useState(0);
    const [failedFiles, setFailedFiles] = useState([]);
    const [loading, setLoading] = useState(false);

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

        setLoading(true);

        try {
            const response = await fetch("http://localhost:8081/api/candidates/upload", {
                method: "POST",
                body: formData,
                headers: {},
            });

            if (response.ok) {
                const data = await response.json();

                setSuccessCount(data.successCount || 0);
                setFailureCount(data.failureCount || 0);
                setFailedFiles(data.failedFiles || []);

                if (data.successCount === files.length) {
                    toast.success("All PDFs uploaded successfully", {
                        position: "top-center",
                        autoClose: 3000
                    });
                } else {
                    toast.success(`${data.successCount} PDFs uploaded successfully`, {
                        position: "top-center",
                        autoClose: 3000
                    });

                    if (data.failedFiles.length > 0) {
                        const failedFilesList = data.failedFiles.map((file, index) => (
                            <div key={file}>{index + 1}.{file}</div>
                        ));
                        toast.error(<div>Failed to upload {failureCount} files:<br/>{failedFilesList}</div>, {
                            position: "top-right",
                            autoClose: false,
                        });
                    }
                }
            } else {
                const errorText = await response.text();
                toast.error(errorText, {
                    position: "top-center",
                    autoClose: false
                });
            }
        } catch (error) {
            toast.error("Error uploading PDF(s): " + error.message, {
                position: "top-center",
                autoClose: false
            });
        } finally {
            setLoading(false);
        }
        setSelectedFiles([]);
        setFiles("");

        document.getElementById("files").value = null;

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
            <ToastContainer/>

                <form className="form" onSubmit={submitFiles}>
                    <input
                        id="files"
                        type="file"
                        multiple={true}
                        accept="application/pdf"
                        required={true}
                        onChange={handleFileChange}
                    />
                    <label className="form-label" htmlFor="files">
                        <i className="fa-solid fa-arrow-up-from-bracket"></i>
                        &nbsp; Choose Files To Upload
                    </label>
                    <div id="num-of-files">{selectedFiles.length} Files Selected</div>
                    {loading ?
                        <div className='modal-container'>
                            <div className='modal'>
                                <div className="loader"></div>
                                Loading
                            </div>
                        </div>
                        : <ul id="files-list">
                            {selectedFiles.map((file, index) => (
                                <li key={index}>
                                    <p>{file.name}</p>
                                    <p>{file.size}</p>
                                </li>
                            ))}
                        </ul>}

                    <button className="upload_btn" type="submit">Upload</button>
                </form>
        </div>
    );
};


export default Main;