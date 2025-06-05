import React, {useState} from 'react';
import Ajout from './Ajout';

function History({ transactions, onDelete, onAdd }) {
    const [selectedIds, setSelectedIds] = useState([]);

    const total = transactions.reduce((acc, t) => acc + t.amount, 0);

    const handleCheckboxChange = (id) => {
        setSelectedIds((prev) =>
            prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
        );
    }

    const styles = {    container: {
      backgroundColor: '#D9D9D9',
      padding: '2rem',
      margin: '2rem auto',
      maxWidth: '600px',
      borderRadius: '8px',
      boxShadow: '0 0 10px rgba(0,0,0,0.1)',
    },
    row: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '1rem',
    },
    label: {
      backgroundColor: '#261B1B',
      color: '#FFFFFF',
      padding: '0.5rem 1rem',
      minWidth: '100px',
      textAlign: 'center',
      fontFamily: 'Galdeano, sans-serif',
    },
    amount: (value) => ({
      backgroundColor: value >= 0 ? '#2CDE7C' : '#E04949',
      color: '#fff',
      padding: '0.5rem 1rem',
      minWidth: '100px',
      textAlign: 'center',
      fontFamily: 'Galdeano, sans-serif',
    }),
    checkbox: {
      marginRight: '0.5rem',
    },
    date: {
      backgroundColor: '#261B1B',
      color: '#fff',
      padding: '0.5rem 1rem',
      minWidth: '100px',
      textAlign: 'center',
      fontFamily: 'Galdeano, sans-serif',
    },    totalBox: {
      backgroundColor: '#261B1B',
      color: '#FFFFFF',
      padding: '0.75rem 1.5rem',
      textAlign: 'center',
      marginTop: '2rem',
      marginLeft: 'auto',
      width: 'fit-content',
      borderRadius: '4px',
      fontFamily: 'Galdeano, sans-serif',
    },
    deleteButton: {
      marginTop: '1rem',
      padding: '0.5rem 1rem',
      backgroundColor: '#E04949',
      color: '#fff',
      border: 'none',
      borderRadius: '4px',
      cursor: 'pointer',
      fontFamily: 'Galdeano, sans-serif',
    },
  };

  const formatDate = (isoString) => {
    const date = new Date(isoString);
    return date.toLocaleDateString('fr-FR');
  };

    return (
    <div style={styles.container}>
      {transactions.map((t) => (
        <div key={t.id} style={styles.row}>
            <input
                type="checkbox"
                checked={selectedIds.includes(t.id)}
                onChange={() => handleCheckboxChange(t.id)}
                style={styles.checkbox}
            />
          <div style={styles.label}>{t.description}</div>
          <div style={styles.amount(t.amount)}>
            {t.amount >= 0 ? '+' : ''}
            {t.amount} €
          </div>
          <div style={styles.date}>{formatDate(t.date)}</div>
        </div>
      ))}
      {selectedIds.length > 0 && (
        <button style={styles.deleteButton} onClick={() => onDelete(selectedIds)}>
          Supprimer la sélection
        </button>
      )}
      <div style={styles.totalBox}>
        Solde Total : {total >= 0 ? '+' : ''}{total.toFixed(2)} €
      </div>
      <Ajout onAdd={onAdd} />
    </div>
  );
}

export default History;