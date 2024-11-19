import React, { useState } from 'react';
import { motion } from 'framer-motion';

const API_URL = process.env.NODE_ENV === 'production' 
  ? 'https://api.folioar.com'
  : 'http://localhost:5000';

export function TestApiPage() {
  const [results, setResults] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleApiCall = async (endpoint: string, method: string = 'GET') => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`${API_URL}/api${endpoint}`, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setResults(JSON.stringify(data, null, 2));
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError(String(err));
      }
      setResults('');
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      className="space-y-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <h1 className="text-3xl font-bold mb-6">API Tests</h1>
      
      <div className="glass-card rounded-2xl p-6 space-y-4">
        <div className="flex flex-wrap gap-4">
          <button 
            onClick={() => handleApiCall('/test')} 
            className="btn-primary"
            disabled={loading}
          >
            {loading ? 'Testing...' : 'Test API'}
          </button>
          <button 
            onClick={() => handleApiCall('/mongodb/test', 'POST')} 
            className="btn-primary"
            disabled={loading}
          >
            {loading ? 'Writing...' : 'Test MongoDB Write'}
          </button>
          <button 
            onClick={() => handleApiCall('/mongodb/read')} 
            className="btn-primary"
            disabled={loading}
          >
            {loading ? 'Reading...' : 'Test MongoDB Read'}
          </button>
        </div>

        {error && (
          <div className="glass-card p-4 rounded-xl bg-red-500/10 border border-red-500/20">
            <p className="text-red-400">{error}</p>
          </div>
        )}

        {results && (
          <div className="glass-card p-4 rounded-xl">
            <pre className="text-sm overflow-auto whitespace-pre-wrap">
              {results}
            </pre>
          </div>
        )}
      </div>
    </motion.div>
  );
}
