import React from 'react';
import { Link } from 'react-router-dom';
import EcoMissionGame from '../components/EcoMissionGame';
import CategorizeProduct from '../components/CategorizeProduct';

function HomePage() {
  return (
    <div style={{ textAlign: 'center', padding: '1rem' }}>
      <EcoMissionGame />
      <CategorizeProduct />

      {/* Interactive Button */}
      <div style={{ marginTop: '2rem' }}>
        <Link to="/drag-and-learn">
          <button
            style={{
              padding: '10px 20px',
              fontSize: '16px',
              backgroundColor: '#4CAF50',
              color: '#fff',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer',
              transition: 'background-color 0.3s ease',
            }}
            onMouseOver={(e) => (e.target.style.backgroundColor = '#45a049')}
            onMouseOut={(e) => (e.target.style.backgroundColor = '#4CAF50')}
          >
            Go to Drag-and-Learn
          </button>
        </Link>
      </div>

      <div style={{ marginTop: '2rem' }}>
        <Link to="/identify-plant">
          <button
            style={{
              padding: '10px 20px',
              fontSize: '16px',
              backgroundColor: '#4CAF50',
              color: '#fff',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer',
              transition: 'background-color 0.3s ease',
            }}
            onMouseOver={(e) => (e.target.style.backgroundColor = '#45a049')}
            onMouseOut={(e) => (e.target.style.backgroundColor = '#4CAF50')}
          >
            Identify Plant
          </button>
        </Link>
      </div>
    </div>
  );
}

export default HomePage;
