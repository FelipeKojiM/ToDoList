import { useState } from 'react';
import { Container, Row, Col } from "react-bootstrap";
import Form from 'react-bootstrap/Form';

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

      const data = await res.json();

      if (!res.ok) {
        setErro(data.erro || 'Erro no login');
        return;
      }

      // Salva no localStorage
      localStorage.setItem('token', data.token);
      localStorage.setItem('tipo', data.tipo);

      // Passa tipo para o App
      onLogin(data.usuario.adm_usuarios);

    } catch (error) {
      setErro('Erro ao conectar com o servidor');
      console.error(error);
    }
  };

  return (
    <Container>
      <Row>
        <div style={{ width:'400px', margin: '50px auto', fontFamily: 'Arial' }}>
          <Col md={12}><h2>Login</h2></Col>
          <Col md={12}>
            <form onSubmit={handleSubmit}>
              <div style={{ marginBottom: 12 }}>
                <label>Email:</label><br />
                <Form.Control value={email} onChange={e => setEmail(e.target.value)} required style={{ width: '100%', padding: 8 }} />
              </div>
              <div style={{ marginBottom: 12 }}>
                <label>Senha:</label><br />
                <Form.Control type="password" value={senha} onChange={e => setSenha(e.target.value)} required style={{ width: '100%', padding: 8 }} />
              </div>
              {erro && <p style={{ color: 'red' }}>{erro}</p>}
              <Row>
                <Col className="text-end" md={12}>
                  <button type="submit" className='bg-dark text-white' style={{ padding: '10px 20px' }}>Entrar</button>
                </Col>
              </Row>
            </form>
          </Col>
        </div>
      </Row>
    </Container>
  );
}
