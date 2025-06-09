import React, { useState, useEffect } from 'react';
import { supabase } from './supabaseClient';
import { useNavigate } from 'react-router-dom';

export default function Profile() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        setEmail(user.email || '');
      }
    };
    fetchUser();
  }, []);

  const handleUpdate = async () => {
    const updates = {};
    if (email) updates.email = email;
    if (password) updates.password = password;
    if (Object.keys(updates).length === 0) {
      alert('Aucune modification \u00e0 enregistrer.');
      return;
    }
    const { error } = await supabase.auth.updateUser(updates);
    if (error) {
      alert(error.message);
    } else {
      alert('Informations mises \u00e0 jour');
      setPassword('');
    }
  };

  const handleDelete = async () => {
    if (!window.confirm('Supprimer d\u00e9finitivement votre compte ?')) return;
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;
    await supabase.from('transactions').delete().eq('user_id', user.id);
    await supabase.from('users').delete().eq('id', user.id);
    const { error } = await supabase.auth.admin.deleteUser(user.id);
    if (error) {
      alert(error.message);
    } else {
      await supabase.auth.signOut();
      navigate('/login');
      window.location.reload();
    }
  };
  return (
    <div style={styles.background}>
      <button style={styles.backButton} onClick={() => navigate('/')}>
        Retour
      </button>
      <div style={styles.header}>
        <h1 style={styles.title}>Budget Manager</h1>
      </div>
      <div style={styles.form}>
        <input
          type="email"
          placeholder="Mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={styles.input}
        />
        <input
          type="password"
          placeholder="Nouveau mot de passe"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={styles.input}
        />
        <button style={styles.button} onClick={handleUpdate}>Enregistrer</button>
        <button style={styles.deleteButton} onClick={handleDelete}>
          Supprimer mon compte
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
    justifyContent: 'center',
    margin: 0,
    padding: 0,
  },
  backButton: {
    position: 'absolute',
    top: '1rem',
    right: '1rem',
    backgroundColor: '#3E5BFF',
    border: 'none',
    borderRadius: '20px',
    color: 'white',
    padding: '0.5rem 1rem',
    fontWeight: 'bold',
    cursor: 'pointer',
    boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.2)',
    fontFamily: 'Galdeano, sans-serif',
  },
  header: {
    backgroundColor: '#FFF600',
    borderRadius: '50px',
    padding: '1rem 2rem',
    boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.15)',
    marginBottom: '2rem',
  },
  title: {
    fontFamily: 'Galdeano, sans-serif',
    fontSize: '2rem',
    color: '#000',
    margin: 0,
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '1rem',
  },
  input: {
    padding: '0.75rem 1rem',
    width: '250px',
    borderRadius: '20px',
    border: 'none',
    fontSize: '1rem',
  },
  button: {
    padding: '0.5rem 1.5rem',
    borderRadius: '20px',
    border: 'none',
    backgroundColor: '#eeeeee',
    fontWeight: 'bold',
    cursor: 'pointer',
  },
  deleteButton: {
    padding: '0.5rem 1.5rem',
    borderRadius: '20px',
    border: 'none',
    backgroundColor: '#E04949',
    color: '#fff',
    fontWeight: 'bold',
    cursor: 'pointer',
  },
};