import React, { useEffect } from 'react';
import "./ModalFiles.css";
import {toast} from "react-toastify";

const ModalFiles = ({ Candidate, onClose }) => {
    const handleCopy = () => {
        const modalContent = document.getElementById("modal-content");
        const range = document.createRange();
        range.selectNodeContents(modalContent);
        const selection = window.getSelection();
        selection.removeAllRanges();
        selection.addRange(range);


        try {
            document.execCommand('copy');
            toast.success('Copied!',{
                position: 'top-center',
                autoClose: 3000
            });
        } catch (err) {
            console.error("Unable to copy:", err);
        }
    };

    useEffect(() => {

        const handleOutsideClick = (event) => {
            if (event.target.classList.contains("modal__container")) {
                onClose(); // Close the modal
            }
        };

        window.addEventListener("click", handleOutsideClick);

        return () => {
            window.removeEventListener("click", handleOutsideClick);
        };
    }, [onClose]);

    return (
        <div className="modal__container">
            <div className="modal-wrapper">
                <div id="modal-content" className="modal-content">
                    <div className="container">
                        <button className="modal-close-btn" onClick={onClose}>
                            <i className="fa-regular fa-circle-xmark"></i>
                        </button>
                        <button className="modal-copy-btn" onClick={handleCopy}>
                            <i className="fa-solid fa-copy"></i>
                        </button>
                        <div className="header">
                            <div className="full-name">
                                <span className="first-name">{Candidate.fullName.split(" ")[0]}</span>
                                <span className="last-name">{Candidate.fullName.split(" ")[1]}</span>
                            </div>
                            <div className="contact-info">
                                {Candidate.contactInfo}
                            </div>
                            <div className="about">
                                <span className="position">{Candidate.position}</span>
                            </div>
                        </div>
                        <div className="details">
                            <div className="section">
                                <div className="section__title">Experience</div>
                                <div className="section__list">
                                    {Candidate.workExperience.map((experience, index) => (
                                        <div key={index} className="section__list-item">
                                            {experience}
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className="section">
                                <div className="section__title">Education</div>
                                <div className="section__list">
                                    {Candidate.education.map((edu, index) => (
                                        <div key={index} className="section__list-item">
                                            {edu}
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className="section">
                                <div className="section__title">Skills</div>
                                <div className="skills">
                                    {Candidate.skills
                                        .filter(skill => !/[а-яА-ЯёЁ]/.test(skill))
                                        .map((skill, index) => (
                                            <div key={index} className="skills__item">
                                                {skill}
                                            </div>
                                        ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ModalFiles;
