import { useState, useEffect } from 'react';
import Login from './Login';

function AdminArea() {
  return <h1>Área do Admin 🚀</h1>;
}

function UserArea() {
  return <h1>Área do Usuário 👨‍💻</h1>;
}

function App() {
  const [tipo, setTipo] = useState(localStorage.getItem('tipo') || null);

  const handleLogin = (tipoUsuario) => {
    setTipo(tipoUsuario);
  };

  const handleLogout = () => {
    localStorage.clear();
    setTipo(null);
  };

  useEffect(() => {
    // Aqui você poderia validar token, etc.
  }, [tipo]);

  if (!tipo) {
    return <Login onLogin={handleLogin} />;
  }

  return (
    <div style={{ padding: 20, fontFamily: 'Arial' }}>
      <button onClick={handleLogout} style={{ marginBottom: 20 }}>Sair</button>

      {tipo === 'admin' && <AdminArea />}
      {tipo === 'usuario' && <UserArea />}
    </div>
  );
}

export default App;
