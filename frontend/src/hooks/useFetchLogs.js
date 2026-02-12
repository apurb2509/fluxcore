import { useState, useEffect } from 'react';
import axios from 'axios';

export const useFetchLogs = () => {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchLogs = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/ingest/logs');
      setLogs(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Dashboard Sync Error:", error);
    }
  };

  useEffect(() => {
    fetchLogs();
    const interval = setInterval(fetchLogs, 5000); // Polling every 5 seconds
    return () => clearInterval(interval);
  }, []);

  return { logs, loading };
};