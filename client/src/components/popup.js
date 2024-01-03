import React from 'react';
import '../css/popup.css'

const Popup = ({ message, onOk, onClose }) => {
    return (
        <div className="popup-overlay">
            <div className="popup">
                <p>{message}</p>
                <div className="popup-buttons">
                    <button onClick={onOk}>OK</button>
                    <button className="cancel" onClick={onClose}>Cancel</button>
                </div>
            </div>
        </div>
    );
};

export default Popup;
