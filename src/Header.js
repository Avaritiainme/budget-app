import React from 'react';

function Header({}) {
  return(
    <div style={styles.container}>
      <h1 style={styles.title}>Budget Manager</h1>
    </div>
  );
}

const styles = {
  container: {
    backgroundColor: '#FFF600',
    width: '372px',
    height: '83px',
    borderRadius: '50px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    margin: '2rem auto',
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