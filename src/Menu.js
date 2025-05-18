import React from "react";

function Menu({ onClickHistory, onClickFilter, onClickGraph}) {
    return (
        <div style={styles.container}>
            <button style={styles.button} onClick={onClickHistory}>History</button>
            <button style={styles.button} onClick={onClickFilter}>Filtrer</button>
            <button style={styles.button} onClick={onClickGraph}>Graphics</button>
        </div>
    );
}

const styles = {
    container: {
        display: 'flex',
        justifyContent: 'center',
        gap: '1rem',
        marginBottom: '2rem',
    },
    button: {
        backgroundColor: '#3E5BFF',
        border: 'none',
        color: '#ffffff',
        fontSize: '1rem',
        cursor: 'pointer',
        padding: '0.75rem 1.5rem',
        borderRadius: '20px',
        fontFamily: 'Galdeano, sans-serif',
        boxShadow: '0px 2px 5px rgba(0, 0, 0, 0.2)',
        transition: 'background-color 0.2s ease',
    },
};

export default Menu;