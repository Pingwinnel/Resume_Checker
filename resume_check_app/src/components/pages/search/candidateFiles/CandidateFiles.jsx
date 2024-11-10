import React, { useState } from 'react';
import "./CandidateFiles.css";
import ModalFiles from "../ModalFiles/ModalFiles";

const CandidateFiles = ({ results }) => {
    const [openCandidateId, setOpenCandidateId] = useState(null);

    return (
        <div className="list__candidates__container">
            {results && results.length > 0 && results.map((candidate) => {
                const [firstName, lastName] = candidate.fullName.split(" ");

                return (
                    <div key={candidate._id} className="list__modal__item">
                        <button
                            className="modal-show-button"
                            onClick={() => setOpenCandidateId(candidate._id)}
                        >
                            {firstName} {lastName}
                        </button>
                        {openCandidateId === candidate._id && (
                            <ModalFiles
                                ModalInfoIsOpen={true}
                                Candidate={candidate}
                                onClose={() => setOpenCandidateId(null)}
                            >
                                <div className="container">
                                    <div className="header">
                                        <div className="full-name">
                                            <span className="first-name">{firstName}</span>
                                            <span className="last-name">{lastName}</span>
                                        </div>
                                        <div className="contact-info">
                                            {candidate.contactInfo}
                                        </div>
                                        <div className="about">
                                            <span className="position">{candidate.position}</span>
                                        </div>
                                    </div>
                                    <div className="details">
                                        <div className="section">
                                            <div className="section__title">Experience</div>
                                            <div className="section__list">
                                                {candidate.workExperience.map((experience, index) => (
                                                    <div key={index} className="section__list-item">
                                                        {experience}
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                        <div className="section">
                                            <div className="section__title">Education</div>
                                            <div className="section__list">
                                                {candidate.education.map((edu, index) => (
                                                    <div key={index} className="section__list-item">
                                                        {edu}
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                        <div className="section">
                                            <div className="section__title">Skills</div>
                                            <div className="skills">
                                                {candidate.skills
                                                    .filter(skill => !/[а-яА-ЯёЁ]/.test(skill)) // исключаем навыки с кириллическими символами
                                                    .map((skill, index) => (
                                                        <div key={index} className="skills__item">
                                                            {skill}
                                                        </div>
                                                    ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </ModalFiles>
                        )}
                    </div>
                );
            })}
        </div>
    );
};

export default CandidateFiles;
