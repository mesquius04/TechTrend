'use client';
import { useState } from 'react';

export default function AddRandomData({ onSuccess }) {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const addData = async () => {
    setLoading(true);
    setMessage('');
    try {
      const res = await fetch('/api/trending', { method: 'POST' });
      const data = await res.json();
      setMessage(data.message || 'data pushed');
      if (onSuccess) onSuccess();
    } catch (err) {
      setMessage('error pushing data');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div id = "add_container">
      <h2>Add Random Data</h2>
      <button id ="add_button" onClick={addData} disabled={loading}>
        {loading ? '...' : '+'}
      </button>
      {message && <p>{message}</p>}
    </div>
  );
}
