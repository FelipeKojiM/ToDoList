import { useState, useEffect } from 'react';
import Login from './pages/Login';
import { Container, Row, Col } from "react-bootstrap";
import Header from './components/Header';
import ModalCustom from './components/Modal';

function AdminArea() {
  return (
    <Container>
      <Row>
        <Col md={6} className="bg-primary text-white">
          Coluna 1
        </Col>
        <Col md={6} className="bg-secondary text-white">
          Coluna 2
        </Col>
      </Row>
    </Container>
  );
}

function UserArea() {
  return <h1>Área do Usuário 👨‍💻</h1>;
}

function App() {
  const [tipo, setTipo] = useState(localStorage.getItem('tipo') || null);
  const [showModal, setShowModal] = useState(false);
  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

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
    <div>
      <Header onLogout={handleLogout} onOpenModal={handleShowModal} />
      <ModalCustom show={showModal} onHide={handleCloseModal} />

      <div style={{ padding: 20, fontFamily: 'Arial' }}>

        {tipo === 'admin' && <AdminArea />}
        {tipo === 'usuario' && <UserArea />}
      </div>
    </div>
  );
}

export default App;
