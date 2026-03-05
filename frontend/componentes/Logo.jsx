import logo from "../assets/logo.png";

function Logo() {
  return (
    <div style={{ textAlign: "center", marginBottom: "20px" }}>
      <img 
        src={logo} 
        alt="Logo do sistema" 
        style={{ width: "180px" }}
      />
    </div>
  );
}

export default Logo;