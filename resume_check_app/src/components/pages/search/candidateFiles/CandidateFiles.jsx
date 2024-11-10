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
                            <ModalFiles
                                Candidate={candidate}
                                onClose={() => setOpenCandidateId(null)}
                            />
                    </div>
                );
            })}
        </div>
    );
};

export default CandidateFiles;
