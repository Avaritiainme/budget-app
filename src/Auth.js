import { useState } from 'react'
import { supabase } from './supabaseClient'

export default function Auth() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSignUp = async () => {
    const { user, error } = await supabase.auth.signUp({ email, password })
    if (error) alert(error.message)
  }

  const handleSignIn = async () => {
    const { user, error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) alert(error.message)
  }

  return (
    <div>
      <input placeholder="email" onChange={e => setEmail(e.target.value)} />
      <input placeholder="password" type="password" onChange={e => setPassword(e.target.value)} />
      <button onClick={handleSignUp}>S'inscrire</button>
      <button onClick={handleSignIn}>Se connecter</button>
    </div>
  )
}
