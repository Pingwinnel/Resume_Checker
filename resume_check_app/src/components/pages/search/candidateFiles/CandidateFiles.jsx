import React, { useState } from 'react';
import "./CandidateFiles.css";
import ModalFiles from "../ModalFiles/ModalFiles";

const CandidateFiles = ({ results }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <div className="list__candidates__container">
            {results && results.length > 0 && results.map((candidate) => {
                const [firstName, lastName] = candidate.fullName.split(" ");

                return (
                    <div key={candidate._id} className="list__modal__item">
                        <button
                            className="modal-show-button"
                            onClick={() => setIsModalOpen(true)}
                        >
                            {firstName} {lastName}
                        </button>
                        {isModalOpen=== true && (
                            <ModalFiles
                                Candidate={candidate}
                                onClose={() => setIsModalOpen(false)}
                            />
                        )}
                    </div>
                );
            })}
        </div>
    );
};

export default CandidateFiles;
