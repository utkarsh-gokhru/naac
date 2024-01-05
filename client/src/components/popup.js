import React, { useState } from 'react';
import '../css/popup.css';
import { HashLoader } from 'react-spinners'; 

const Popup = ({ message, onOk, onClose }) => {
  const [loading, setLoading] = useState(false);

  const handleOkClick = async () => {
    setLoading(true);

    try {
      await onOk();
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="popup-overlay">
      <div className="popup">
        <p>{message}</p>
        <div className="popup-buttons">
          {loading ? (
            <div className="loading-spinner-container">
              <HashLoader size={30} color="#3498db" loading={loading} />
            </div>
          ) : (
            <>
              <button onClick={handleOkClick} disabled={loading}>
                OK
              </button>
              <button className="cancel" onClick={onClose} disabled={loading}>
                Cancel
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Popup;
