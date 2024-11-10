import React, { useState } from 'react';
import "./CandidateFiles.css";
import ModalFiles from "../ModalFiles/ModalFiles";

const CandidateFiles = ({ results }) => {
    const [openCandidateId, setOpenCandidateId] = useState(null);

    const dubug=(candidate)=>{
        console.log(openCandidateId);
        setOpenCandidateId(null)
        console.log(candidate)
    }

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
                            {firstName},{lastName}
                        </button>

                        {openCandidateId === candidate._id && (
                            <ModalFiles
                                Candidate={candidate}
                                onClose={() => {dubug(candidate._id)}}
                            />
                        )}
                    </div>
                );
            })}
        </div>
    );
};

export default CandidateFiles;
