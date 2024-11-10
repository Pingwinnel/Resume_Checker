import React, { useState } from 'react';
import "./CandidateFiles.css";
import ModalFiles from "../ModalFiles/ModalFiles";

const CandidateFiles = ({ results }) => {
    const [openCandidateId, setOpenCandidateId] = useState(null);

    const renderCandidate = (candidate) => {
        const [firstName, lastName] = candidate.fullName.split(" ");
        return (
            <div key={candidate.id} className="list__modal__item">
                <button
                    className="modal-show-button"
                    onClick={() => setOpenCandidateId(candidate.id)}
                >
                    {firstName}, {lastName}
                </button>

                {openCandidateId === candidate.id && (
                    <ModalFiles
                        Candidate={candidate}
                        onClose={() => setOpenCandidateId(null)}
                    />
                )}
            </div>
        );
    };

    return (
        <div className="list__candidates__container">
            {results && results.length > 0 && results.map(renderCandidate)}
        </div>
    );
};

export default CandidateFiles;
