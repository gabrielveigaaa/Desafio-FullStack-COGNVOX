import { useState } from "react";
import api from "../servicos/api"; 
import Logo from "../componentes/Logo";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate(); 

  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [mensagem, setMensagem] = useState("");
  const [carregando, setCarregando] = useState(false);

  const fazerLogin = async (e) => {
    e.preventDefault();
    setCarregando(true);
    setMensagem("");

    try {
      const resposta = await api.post("/login", { email, senha });

      localStorage.setItem("token", resposta.data.token);
      setMensagem("Login realizado com sucesso!");

      // redireciona depois de 1 segundo
      setTimeout(() => {
        navigate("/dashboard"); 
      }, 1000);

    } catch (erro) {
      setMensagem(
        erro.response?.data?.error || "Erro ao realizar login!"
      );
    } finally {
      setCarregando(false);
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#f2f2f2",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "400px",
          padding: "30px",
          backgroundColor: "#0015ff",
          borderRadius: "8px",
          boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
        }}
      >
        <Logo />

        <h2
          style={{
            textAlign: "center",
            marginBottom: "20px",
            color: "#ffffff",
            fontFamily: "sans-serif",
          }}
        >
          Login
        </h2>

        <form onSubmit={fazerLogin}>
          <input
            type="email"
            placeholder="Digite seu email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={{
              width: "100%",
              padding: "10px",
              marginBottom: "10px",
              borderRadius: "4px",
              border: "1px solid #ccc",
            }}
          />

          <input
            type="password"
            placeholder="Digite sua senha"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            required
            style={{
              width: "100%",
              padding: "10px",
              marginBottom: "15px",
              borderRadius: "4px",
              border: "1px solid #ccc",
            }}
          />

          <button
            type="submit"
            disabled={carregando}
            style={{
              width: "100%",
              padding: "10px",
              backgroundColor: "#007bff",
              color: "#fff",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
            }}
          >
            {carregando ? "Entrando..." : "Entrar"}
          </button>
        </form>

        {/* Mensagem */}
        {mensagem && (
          <p
            style={{
              marginTop: "15px",
              textAlign: "center",
              color: mensagem.includes("sucesso")
                ? "#00ff88"
                : "#ff4d4d",
            }}
          >
            {mensagem}
          </p>
        )}

        
        <div style={{ marginTop: "20px", textAlign: "center" }}>
          <p style={{ color: "#ffffff" }}>Não tem uma conta?</p>

          <button
            onClick={() => navigate("/cadastro")}
            style={{
              backgroundColor: "transparent",
              border: "none",
              color: "#ffffff",
              cursor: "pointer",
              textDecoration: "underline",
              fontWeight: "bold",
            }}
          >
            Criar conta
          </button>
        </div>
      </div>
    </div>
  );
}

export default Login; 