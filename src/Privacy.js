import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function Privacy() {
  const navigate = useNavigate();
  return (
    <div style={styles.background}>
      <div style={styles.header}>
        <h1 style={styles.title}>Budget Manager</h1>
      </div>
      <div style={styles.content}>
        <h2 style={styles.subtitle}>Politique de Confidentialité</h2>
        <p style={styles.text}>
        </p>
        <button style={styles.button} onClick={() => navigate(-1)}>
          Retour
        </button>
      </div>
    </div>
  );
}

const styles = {
  background: {
    backgroundImage: 'url("/background.png")',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    height: '100vh',
    width: '100vw',
    position: 'absolute',
    top: 0,
    left: 0,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingTop: '2rem'
  },
  header: {
    backgroundColor: '#FFF600',
    borderRadius: '50px',
    padding: '1rem 2rem',
    boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.15)',
    marginBottom: '2rem'
  },
  title: {
    fontFamily: 'Galdeano, sans-serif',
    fontSize: '2rem',
    color: '#000',
    margin: 0
  },
  content: {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    padding: '2rem',
    borderRadius: '20px',
    maxWidth: '600px',
    fontFamily: 'Galdeano, sans-serif'
  },
  subtitle: {
    marginTop: 0
  },
  text: {
    marginBottom: '2rem'
  },
  button: {
    padding: '0.5rem 1.5rem',
    borderRadius: '20px',
    border: 'none',
    backgroundColor: '#eeeeee',
    fontWeight: 'bold',
    cursor: 'pointer'
  }
};