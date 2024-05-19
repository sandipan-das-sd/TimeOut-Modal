// TimeoutModal.js
import React from 'react';

const TimeoutModal = ({ show, onClose, onExtend }) => {
  if (!show) return null;

  return (
    <div className="modal">
      <div className="modal-content">
        <h2>Session Timeout Warning</h2>
        <p>Your session is about to expire due to inactivity.</p>
        <button onClick={onExtend}>Extend Session</button>
        <button onClick={onClose}>Logout</button>
      </div>
    </div>
  );
};

export default TimeoutModal;
