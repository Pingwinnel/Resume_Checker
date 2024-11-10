import React, { useEffect, useState } from 'react';
import "./CandidateFiles.css";
import ModalFiles from "../ModalFiles/ModalFiles";


const CandidateFiles = ({results}) => {
    const [openCandidateId, setOpenCandidateId] = useState(null);




    return (
        <div className="list__candidates__container">
            {results && results.length > 0 && results.map((candidate) => (
                <div key={candidate.id} className="list__modal__item">
                    <button
                        className="modal-show-button"
                        onClick={() => setOpenCandidateId(candidate.id)}
                    >
                        {candidate.fullName}
                    </button>
                    {openCandidateId === candidate.id && (
                        <ModalFiles
                            ModalInfoIsOpen={true}
                            Candidate={candidate}
                            onClose={() => setOpenCandidateId(null)}
                        >
                            <ul className="list__candidates">
                                <li className="list__candidates__item">
                                    {Object.entries(candidate).map(([key, value]) => (
                                        key === "resumeFullText" || key === "label" ? null : (
                                            <p key={key}>
                                                <strong>{key}:</strong> {JSON.stringify(value)}
                                            </p>
                                        )
                                    ))}
                                </li>
                            </ul>
                        </ModalFiles>
                    )}
                </div>
            ))}
        </div>
    );
};

export default CandidateFiles;
