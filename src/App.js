// App.js
import React, { useState, useEffect, useCallback } from 'react';
import TimeoutModal from './components/TimeoutModal';

const App = () => {
  const [showModal, setShowModal] = useState(false);
  const [timeoutId, setTimeoutId] = useState(null);

  const INACTIVITY_LIMIT = 5 * 1000; 

  const resetTimeout = useCallback(() => {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }

    const id = setTimeout(() => {
      setShowModal(true);
    }, INACTIVITY_LIMIT);

    setTimeoutId(id);
  }, [timeoutId]);

  const handleExtend = () => {
    setShowModal(false);
    resetTimeout();
  };

  const handleLogout = () => {
    // Handle logout logic here
    alert("Logging out...");
    setShowModal(false);
    clearTimeout(timeoutId);
  };

  useEffect(() => {
    const events = ['click', 'mousemove', 'keydown', 'scroll', 'touchstart'];

    const resetTimer = () => {
      resetTimeout();
    };

    events.forEach(event => window.addEventListener(event, resetTimer));

    // Set the initial timeout
    resetTimeout();

    return () => {
      events.forEach(event => window.removeEventListener(event, resetTimer));
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [resetTimeout, timeoutId]);

  return (
    <div className="App">
      <h1>React Timeout Modal Example</h1>
      <TimeoutModal show={showModal} onClose={handleLogout} onExtend={handleExtend} />
    </div>
  );
};

export default App;
