import React, {useState} from 'react';

const Main = () => {
    const [file, setFile] = useState(null);

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleUpload = async () => {
        const formData = new FormData();
        formData.append('file', file);

        try {
            const response = await fetch('http://localhost:8081/api/candidates/upload', {
                method: 'POST',
                body: formData,
            });

            if (response.ok) {
                alert('File uploaded successfully');
            } else {
                alert('Failed to upload file');
            }
        } catch (error) {
            alert('Error uploading file');
        }
    };
    return (
        <div>
            <input className={"input"} type={"file"} onChange={handleFileChange}/>
            <button onClick={handleUpload}>Upload</button>
        </div>
    );
};

export default Main;