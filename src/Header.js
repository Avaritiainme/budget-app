import React from 'react';
import { supabase } from './supabaseClient';

function Header() {
  const handleLogout = async () => {
    await supabase.auth.signOut();
    window.location.reload();
  };

  return (
    <div style={styles.wrapper}>
      <button style={styles.logout} onClick={handleLogout}>
        Déconnexion
      </button>
      <div style={styles.container}>
        <h1 style={styles.title}>Budget Manager</h1>
      </div>
    </div>
  );
}

const styles = {
  wrapper: {
    position: 'relative',
    padding: '2rem',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logout: {
    position: 'absolute',
    top: '1rem',
    right: '1rem',
    backgroundColor: '#f54242',
    border: 'none',
    borderRadius: '20px',
    color: 'white',
    padding: '0.5rem 1rem',
    fontWeight: 'bold',
    cursor: 'pointer',
    boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.2)',
  },
  container: {
    backgroundColor: '#FFF600',
    width: '372px',
    height: '83px',
    borderRadius: '50px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.15)',
  },
  title: {
    color: '#000000',
    fontSize: '1.5rem',
    margin: 0,
    fontFamily: 'Galdeano, sans-serif',
  }
};

export default Header;
