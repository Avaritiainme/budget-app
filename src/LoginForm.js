import { useState } from 'react';
import { supabase } from './supabaseClient';

export default function LoginForm({ onLogin, goToRegister }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    if (!email.trim() || !password) {
      alert('Veuillez saisir votre email et votre mot de passe.');
      return;
    }
    
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) {
      alert(error.message);
    } else {
      const user = data.user;

      // Vérifie si le profil existe déjà
      const { data: existing } = await supabase
        .from('users')
        .select('id')
        .eq('id', user.id)
        .maybeSingle();

      if (!existing) {
        const { error: insertError } = await supabase
          .from('users')
          .insert([{ id: user.id, email: user.email, role: 'user' }]);

        if (insertError) {
          console.error("Erreur insertion profil après login :", insertError);
        } else {
          console.log("Profil inséré après login !");
        }
      }

      onLogin(user);
      window.location.reload();
    }
  };

  return (
    <div style={styles.background}>
      <div style={styles.header}><h1 style={styles.title}>Budget Manager</h1></div>
      <div style={styles.form}>
        <input type="email" placeholder="Mail" style={styles.input} onChange={(e) => setEmail(e.target.value)} />
        <input type="password" placeholder="Mot de passe" style={styles.input} onChange={(e) => setPassword(e.target.value)} />
        <button style={styles.button} onClick={handleLogin}>Connexion</button>
        <p style={styles.link} onClick={goToRegister}>S’inscrire</p>
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
  link: {
    color: '#06a77d',
    cursor: 'pointer',
    textDecoration: 'underline',
    marginTop: '0.5rem',
  }
};
