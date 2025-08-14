import { DropdownButton, Dropdown } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export default function Header({ onLogout, onOpenModal, onAdmin }) {
  const navigate = useNavigate();

  return (
    <header style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      height: '60px',
      backgroundColor: '#282c34',
      color: 'white',
      padding: '15px 30px',
      fontWeight: 'bold',
      zIndex: 1000,
      display: 'flex',
      alignItems: 'center',
      boxShadow: '0 2px 5px rgba(0,0,0,0.3)'
    }}>
      <DropdownButton
        style={{ marginLeft: 'auto' }}
        title="Menu"
        id="dropdown-menu-align-end"
        variant="dark"
        menuVariant="dark"
      >
        <Dropdown.Item onClick={() => navigate("/")}>Home</Dropdown.Item>
        <Dropdown.Item onClick={() => navigate("/profile")}>Profile</Dropdown.Item>
        {onAdmin == 1 && (<Dropdown.Item onClick={onOpenModal}>Cadastro</Dropdown.Item>)}
        <Dropdown.Divider />
        <Dropdown.Item onClick={onLogout}>Logout</Dropdown.Item>
      </DropdownButton>
    </header>
  );
}
