import React, { useState, useEffect } from 'react';
import { supabase } from './supabaseClient';
import Header from './Header';
import Menu from './Menu';
import History from './History';
import MonthFilter from './MonthFilter';
import Graph from './Graph';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';
import Terms from './Terms';
import Privacy from './Privacy';
import Profile from './Profile';
import { Routes, Route, useNavigate, Navigate } from 'react-router-dom';

function App() {
  const [user, setUser] = useState(null);
  const [loadingUser, setLoadingUser] = useState(true);
  const [transactions, setTransactions] = useState([]);
  const [hasLoaded, setHasLoaded] = useState(false);
  const [selectedMonth, setSelectedMonth] = useState('all');
  const [showFilter, setShowFilter] = useState(false);
  const [filterMode, setFilterMode] = useState('month');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
    const navigate = useNavigate();


  // Récupérer l'utilisateur connecté
  useEffect(() => {
    const fetchUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
      setLoadingUser(false); 
      console.log("Utilisateur connecté :", user);
    };
    fetchUser();
  }, []);

  // Récupérer les transactions de l'utilisateur
  useEffect(() => {
    if (!user) return;

    const fetchTransactions = async () => {
      const { data, error } = await supabase
        .from('transactions')
        .select('*')
        .eq('user_id', user.id)
        .order('date', { ascending: false });

      if (error) {
        console.error('Error fetching transactions:', error);
      } else {
        setTransactions(data);
      }
      setHasLoaded(true);
    };

    fetchTransactions();
  }, [user]);

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
    if (!user || !user.id) {
      console.error("Erreur : utilisateur non défini au moment de l'ajout.");
      return;
    }

  const toInsert = { ...newTransaction, user_id: user.id };
  console.log("Transaction insérée :", toInsert); // debug facultatif

  const { data, error } = await supabase
    .from('transactions')
    .insert([toInsert])
    .select();

  if (error) {
    console.error('Erreur d’insertion Supabase :', error); // debug
  } else {
    setTransactions([data[0], ...transactions]);
  }
};

  const filteredTransactions = transactions.filter((t) => {
    const date = new Date(t.date);
    const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;

    if (filterMode === 'month') {
      return selectedMonth === 'all' || monthKey === selectedMonth;
    }

    if (filterMode === 'range') {
      const tDate = date.toISOString().split('T')[0];
      return (!startDate || tDate >= startDate) && (!endDate || tDate <= endDate);
    }

    return true;
  });  const styles = {
    background: {
      backgroundImage: 'url("/background.png")',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100vw',
      height: '100vh',
      margin: 0,
      padding: 0,
    },
  };

  if (loadingUser) return <div>Chargement de la session...</div>;

  if (!user) {
    return (
      <Routes>
        <Route
          path="/register"
          element={<RegisterForm onLogin={setUser} goToLogin={() => navigate('/login')} />}
        />
        <Route
          path="/login"
          element={<LoginForm onLogin={setUser} goToRegister={() => navigate('/register')} />}
        />
        <Route path="/cgu" element={<Terms />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route
          path="*"
          element={<LoginForm onLogin={setUser} goToRegister={() => navigate('/register')} />}
        />
      </Routes>
    );
  }

  return (
    <div style={styles.background}>
      <Header />
      <Menu
        onClickHistory={() => navigate('/')}
        onClickFilter={() => setShowFilter((prev) => !prev)}
        onClickGraph={() => navigate('/graph')}
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

      <Routes>
        <Route
          path="/graph"
          element={<Graph transactions={filteredTransactions} />}
        />
         <Route path="/profile" element={<Profile />} />
        <Route path="/cgu" element={<Terms />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route
          path="*"
          element={
            <History
              transactions={filteredTransactions}
              onDelete={handleDeleteSelected}
              onAdd={handleAddTransaction}
            />
          }
        />
      </Routes>
    </div>
  );
}

export default App;
