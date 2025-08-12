import { useState } from 'react';

export default function Login({ onLogin }) {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [erro, setErro] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErro('');

    try {
      const res = await fetch('http://localhost:5000/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, senha }),
      });

      if (!res.ok) {
        const data = await res.json();
        setErro(data.erro || 'Erro no login');
        return;
      }

      const data = await res.json();
      localStorage.setItem('token', data.token);
      localStorage.setItem('tipo', data.tipo);
      onLogin(data.tipo);

    } catch (error) {
      setErro('Erro ao conectar com o servidor');
      console.error(error);
    }
  };

  return (
    <div style={{ maxWidth: 400, margin: '50px auto', fontFamily: 'Arial' }}>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: 12 }}>
          <label>Email:</label><br />
          <input 
            type="email" 
            value={email} 
            onChange={e => setEmail(e.target.value)} 
            required 
            style={{ width: '100%', padding: 8 }} 
          />
        </div>
        <div style={{ marginBottom: 12 }}>
          <label>Senha:</label><br />
          <input 
            type="password" 
            value={senha} 
            onChange={e => setSenha(e.target.value)} 
            required 
            style={{ width: '100%', padding: 8 }} 
          />
        </div>
        {erro && <p style={{ color: 'red' }}>{erro}</p>}
        <button type="submit" style={{ padding: '10px 20px' }}>Entrar</button>
      </form>
    </div>
  );
}
