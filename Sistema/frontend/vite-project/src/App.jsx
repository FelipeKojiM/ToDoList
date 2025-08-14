import { useState, useEffect } from 'react';
import Login from './pages/Login';
import { Container, Row, Col } from "react-bootstrap";
import Header from './components/Header';
import ModalCustom from './components/Modal';

function AdminArea() {
  return (
    <Container>
      <Row>
        <Col md={6} className="bg-primary text-white">Coluna 1</Col>
        <Col md={6} className="bg-secondary text-white">Coluna 2</Col>
      </Row>
    </Container>
  );
}

function UserArea() {
  return <h1>Área do Usuário 👨‍💻</h1>;
}

function App() {
  const [tipo, setTipo] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    // Checa se já existe login salvo
    const token = localStorage.getItem('token');
    const tipoSalvo = localStorage.getItem('tipo');

    if (token && tipoSalvo !== null) {
      setTipo(Number(tipoSalvo)); // converte pra número
    }
  }, []);

  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  const handleLogin = (tipoUsuario) => {
    setTipo(tipoUsuario);
    localStorage.setItem('tipo', tipoUsuario);
  };

  const handleLogout = () => {
    localStorage.clear();
    setTipo(null);
  };

  // Verifica se não está logado
  if (tipo === null) return <Login onLogin={handleLogin} />;

  return (
    <div>
      <Header onLogout={handleLogout} onAdmin={tipo} onOpenModal={handleShowModal} />
      <ModalCustom show={showModal} onHide={handleCloseModal} />
      <div style={{ padding: 20, fontFamily: 'Arial' }}>
        {tipo === 1 ? <AdminArea /> : <UserArea />}
      </div>
    </div>
  );
}

export default App;
