import { useState } from 'react';
import { supabase } from './supabaseClient';

export default function RegisterForm({ goToLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [accepted, setAccepted] = useState(false);

  const handleRegister = async () => {
    if (!email.trim() || !password || !confirm) {
      alert('Veuillez remplir tous les champs.');
      return;
    }

    if (password !== confirm) {
      alert("Les mots de passe ne correspondent pas.");
      return;
    }

    if (!accepted) {
      alert("Vous devez accepter les CGU et la politique de confidentialité.");
      return;
    }

    const { data, error } = await supabase.auth.signUp({ email, password });

    if (error) {
      alert(error.message);
    } else {
      alert("Inscription réussie. Connecte-toi maintenant.");
      goToLogin();
    }
  };

  return (
    <div style={styles.background}>
      <div style={styles.header}><h1 style={styles.title}>Budget Manager</h1></div>
      <div style={styles.form}>
        <input type="email" placeholder="Mail" style={styles.input} onChange={(e) => setEmail(e.target.value)} />
        <input type="password" placeholder="Mot de passe" style={styles.input} onChange={(e) => setPassword(e.target.value)} />
        <input type="password" placeholder="Confirmer le mot de passe" style={styles.input} onChange={(e) => setConfirm(e.target.value)} />
        <label style={styles.checkboxLabel}>
          <input type="checkbox" checked={accepted} onChange={(e) => setAccepted(e.target.checked)} style={styles.checkbox} />
          J'ai lu et j'accepte les
          <a href="/cgu" style={styles.policyLink}> CGU</a> et la
          <a href="/privacy" style={styles.policyLink}> Politique de Confidentialité</a>
        </label>
        <button style={styles.button} onClick={handleRegister}>S’inscrire</button>
        <p style={styles.link} onClick={goToLogin}>Connexion</p>
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
    color: '#fff',
    cursor: 'pointer',
    textDecoration: 'none',
    marginTop: '0.5rem',
    backgroundColor: 'rgba(0,0,0,0.6)',
    padding: '0.25rem 0.75rem',
    borderRadius: '12px',
    fontWeight: 'bold',
    textShadow: '1px 1px 2px rgba(0,0,0,0.7)',
    },
  checkboxLabel: {
    fontFamily: 'Galdeano, sans-serif',
    fontSize: '0.9rem',
    color: '#000',
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
  },
  checkbox: {
    marginRight: '0.25rem',
  },
  policyLink: {
    color: '#fff',
    textDecoration: 'none',
    marginLeft: '0.25rem',
    marginRight: '0.25rem',
     backgroundColor: 'rgba(0,0,0,0.6)',
    padding: '0.1rem 0.4rem',
    borderRadius: '8px',
    textShadow: '1px 1px 2px rgba(0,0,0,0.7)',
  }
};
