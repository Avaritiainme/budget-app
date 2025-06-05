import React, {useState} from 'react';

function Ajout({ onAdd }) {
    const [description, setDescription] = useState('');
    const [amount, setAmount] = useState('');
    const [date, setDate] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!description || !amount ) return;

        const newTransaction ={
            description,
            amount: parseFloat(amount),
            date: date ? new Date(date).toISOString() : new Date().toISOString(),
        }
        onAdd(newTransaction);
        setDescription('');
        setAmount('');
        setDate('');
    };

    const styles = {    form: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      gap: '1rem',
      backgroundColor: '#D9D9D9',
      padding: '1rem',
      marginTop: '2rem',
    },
    input: {
      backgroundColor: '#261B1B',
      color: '#fff',
      border: 'none',
      padding: '0.5rem 1rem',
      fontFamily: 'Galdeano, sans-serif',
    },
    date: {
      backgroundColor: '#261B1B',
      color: '#fff',
      border: 'none',
      padding: '0.5rem 1rem',
      fontFamily: 'Galdeano, sans-serif',
    },
    button: {
      backgroundColor: '#E04949',
      color: '#fff',
      border: 'none',
      padding: '0.5rem 1rem',
      cursor: 'pointer',
      fontFamily: 'Galdeano, sans-serif',
    },
  };
  return (
    <form onSubmit={handleSubmit} style={styles.form}>
      <input
        type="text"
        placeholder="Libellé"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        style={styles.input}
      />
      <input
        type="number"
        placeholder="Montant"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        style={styles.input}
      />
      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        style={styles.date}
      />
      <button type="submit" style={styles.button}>Ajouter</button>
    </form>
  )

}
export default Ajout;