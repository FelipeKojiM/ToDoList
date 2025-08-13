import { Modal, Button } from "react-bootstrap";

export default function ModalCustom({ show, onHide }) {
  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Cadastro</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        Aqui vai o conteúdo do seu cadastro
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>Fechar</Button>
      </Modal.Footer>
    </Modal>
  );
}
