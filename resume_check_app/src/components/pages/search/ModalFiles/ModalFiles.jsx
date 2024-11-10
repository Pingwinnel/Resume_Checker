import React, {useEffect} from 'react';
import "./ModalFiles.css";

const ModalFiles = ({ Candidate, onClose }) => {
        useEffect(() => {
            const handleEsc = (event) => {
                if (event.key === 'Escape') {
                    onClose();
                }
            };
            window.addEventListener('keydown', handleEsc);
            return () => {
                window.removeEventListener('keydown', handleEsc);
            };
        }, [onClose]);

    return (
                <div className="modal__container">
                    <div className="modal-wrapper">
                        <div className="modal-content">
                            <button className="modal-close-btn" onClick={onClose}>
                                <i className="fa-regular fa-circle-xmark"></i>
                            </button>
                            <div className="container">
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
