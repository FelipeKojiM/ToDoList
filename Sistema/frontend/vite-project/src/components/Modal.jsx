import { Modal, Form, Row, Col } from "react-bootstrap";
import { useState } from 'react';
import Swal from 'sweetalert2'

export default function ModalCustom({ show, onHide }) {

  const [login_usuarios, setLogin] = useState('');
  const [senha_usuarios, setSenha] = useState('');
  const [nome_usuarios, setNome] = useState('');
  const [admUsuarios, setAdmin] = useState(false);
  const [erro, setErro] = useState('');
  const handleChange = (e) => {
    setAdmin(e.target.checked); // true se marcado, false se desmarcado
  };

    const handleSubmitCadastro = async (e) => {
    e.preventDefault();
    setErro('');

    try {
      const res = await fetch('http://localhost:5000/usuarios/cadastroUsuario', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ adm_usuarios: admUsuarios ? 1 : 0, nome_usuarios, senha_usuarios, login_usuarios }),
      });

      const data = await res.json();

      if (res.ok) {
        onHide();
        setAdmin(false);
        setLogin('');
        setSenha('');
        setNome('');
        Swal.fire({
          title: 'Success!',
          text: 'Cadastro realizado com sucesso!',
          icon: 'success',
          confirmButtonText: 'Fechar'
        });
      }else if(!res.ok){
        setErro(data.error);
        return;
      }
    } catch (error) {
      setErro('Erro ao conectar com o servidor');
      console.error(error);
    }
  };

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Cadastro de Usuários</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form onSubmit={handleSubmitCadastro}>
          <Row>
            <Col md={6}>
              <div style={{ marginBottom: 12 }}>
                <label>Login:</label><br />
                <Form.Control value={login_usuarios} onChange={e => setLogin(e.target.value)} required style={{ width: '100%', padding: 8 }} />
              </div>
            </Col>
            <Col md={6}>
                <label>Nome usuário:</label><br />
                <Form.Control value={nome_usuarios} onChange={e => setNome(e.target.value)} required style={{ width: '100%', padding: 8 }} />
            </Col>
          </Row>
          <div style={{ marginBottom: 12 }}>
            <label>Senha:</label><br />
            <Form.Control type="password" value={senha_usuarios} onChange={e => setSenha(e.target.value)} required style={{ width: '100%', padding: 8 }} />
          </div>
          <div style={{ marginBottom: 12 }}>
            <label>Admin:</label><br />
            <input type="checkbox" checked={admUsuarios} onChange={handleChange} value={admUsuarios} />
          </div>
          {erro && <p style={{ color: 'red' }}>{erro}</p>}
          <Row>
            <Col className="text-end" md={12}>
              <button type="submit" className='bg-success text-white' style={{ padding: '10px 20px', margin: '0 5px 0 0' }}>Salvar</button>
            </Col>
          </Row>
        </form>
      </Modal.Body>
      <Modal.Footer>
      </Modal.Footer>
    </Modal>
  );
}
