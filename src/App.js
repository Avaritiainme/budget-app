import React, { useState, useEffect } from 'react';
import { supabase } from './supabaseClient';
import Header from './Header';
import Menu from './Menu';
import History from './History';
import MonthFilter from './MonthFilter';
import Graph from './Graph'; 


function App() {
  const [transactions, setTransactions] = useState([]);
  const [hasLoaded, setHasLoaded] = useState(false);
  const [selectedMonth, setSelectedMonth] = useState('all');
  const [showFilter, setShowFilter] = useState(false);
  const [view, setView] = useState('history'); 

  const [filterMode, setFilterMode] = useState('month');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const filteredTransactions = transactions.filter((t) => {
  const date = new Date(t.date);
  const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
  



  if (filterMode === 'month') {
    return selectedMonth === 'all' || monthKey === selectedMonth;
  }

  if (filterMode === 'range') {
    const tDate = date.toISOString().split('T')[0]; // format YYYY-MM-DD
    return (!startDate || tDate >= startDate) && (!endDate || tDate <= endDate);
  }

  return true;
});


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
        onClickHistory={() => setView('history')}
        onClickFilter={() => setShowFilter((prev) => !prev)}
        onClickGraph={() => setView('graph')}
      />
      
      {showFilter && (
      <MonthFilter
        transactions={transactions}
        selectedMonth={selectedMonth}
        setSelectedMonth={setSelectedMonth}
        filterMode={filterMode}
        setFilterMode={setFilterMode}
        startDate={startDate}
        setStartDate={setStartDate}
        endDate={endDate}
        setEndDate={setEndDate}
      />
    )}

    {view === 'history' && (
      <History
        transactions={filteredTransactions}
        onDelete={handleDeleteSelected}
        onAdd={handleAddTransaction}
      />
    )}

    {view === 'graph' && (
      <Graph transactions={filteredTransactions} />
    )}


    </div>
  );
}

export default App;
