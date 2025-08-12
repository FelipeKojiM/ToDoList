export default function Header() {
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
      Meu Projeto ToDoList
    </header>
  );
}
