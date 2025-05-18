import React, { useState, useEffect } from 'react';
import { supabase } from './supabaseClient';
import Header from './Header';
import Menu from './Menu';
import History from './History';

function App() {
  const [transactions, setTransactions] = useState([]);
  const [hasLoaded, setHasLoaded] = useState(false);

  useEffect(() => {
    const fetchTransactions = async () => {
      const { data, error } = await supabase
        .from('transactions')
        .select('*')
        .order('date', { ascending: false });

      if (error) {
        console.error('Error fetching transactions:', error);
      } else {
        setTransactions(data);
      }
      setHasLoaded(true);
    };

    fetchTransactions();
  }, []);

  const handleDeleteSelected = async (idsToDelete) => {
    if (idsToDelete.length === 0) return;

    const { error } = await supabase
      .from('transactions')
      .delete()
      .in('id', idsToDelete);

    if (error) {
      console.error('Erreur Supabase lors de la suppression :', error);
    } else {
      setTransactions(transactions.filter((t) => !idsToDelete.includes(t.id)));
    }
  };

  const handleAddTransaction = async (newTransaction) => {
    const { data, error } = await supabase
      .from('transactions')
      .insert([newTransaction])
      .select();

    if (error) {
      console.error('Error adding transaction:', error);
    } else {
      setTransactions([data[0], ...transactions]);
    }
  };

  const styles = {
    background: {
      backgroundImage: 'url("/background.png")',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      minHeight: '100vh',
    },
  };

  return (
    <div style={styles.background}>
      <Header />
      <Menu
        onClickHistory={() => console.log('History clicked')}
        onClickFilter={() => console.log('Filter clicked')}
        onClickGraph={() => console.log('Graph clicked')}
      />
      <History
        transactions={transactions}
        onDelete={handleDeleteSelected}
        onAdd={handleAddTransaction}
      />
    </div>
  );
}

export default App;
