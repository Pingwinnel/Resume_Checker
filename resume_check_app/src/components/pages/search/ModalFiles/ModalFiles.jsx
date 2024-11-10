import React, {useEffect, useState} from 'react';
import "./ModalFiles.css"
const ModalFiles = ({ModalInfoIsOpen, Candidate,onClose,children}) => {

    return (
        <>
            {ModalInfoIsOpen && (
        <div className="modal">
            <div className="modal-wrapper">
                <div className="modal-content">
                    <button className="modal-close-btn" onClick={()=>onClose()}>
                        <i className="fa-regular fa-circle-xmark"></i>
                    </button>
                    {children}
                </div>
            </div>
        </div>
            )}
        </>
    );
};

export default ModalFiles;