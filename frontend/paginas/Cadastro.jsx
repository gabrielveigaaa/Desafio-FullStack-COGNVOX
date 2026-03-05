import { useState } from "react";
import api from "../servicos/api"; 
import Logo from "../componentes/Logo";
import { useNavigate } from "react-router-dom";

function Cadastro() {
  const navigate = useNavigate();

  const [formulario, setFormulario] = useState({
    nome: "",
    email: "",
    senha: "",
  });

  const [mensagem, setMensagem] = useState("");
  const [carregando, setCarregando] = useState(false);

  const alterarCampo = (e) => {
    setFormulario({
      ...formulario,
      [e.target.name]: e.target.value,
    });
  };

  const fazerCadastro = async (e) => {
    e.preventDefault();
    setCarregando(true);
    setMensagem("");

    try {
      await api.post("/register", formulario);
      setMensagem("Usuário cadastrado com sucesso!");

      // redireciona para dashboard após 1s
      setTimeout(() => {
        navigate("/");
      }, 1000);

    } catch (erro) {
      setMensagem(erro.response?.data?.error || "Erro ao cadastrar!");
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
          Cadastre-se
        </h2>

        <form onSubmit={fazerCadastro}>
          <input
            name="nome"
            placeholder="Digite seu nome"
            value={formulario.nome}
            onChange={alterarCampo}
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
            name="email"
            type="email"
            placeholder="Digite seu email"
            value={formulario.email}
            onChange={alterarCampo}
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
            name="senha"
            type="password"
            placeholder="Digite sua senha"
            value={formulario.senha}
            onChange={alterarCampo}
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
            {carregando ? "Cadastrando..." : "Cadastrar"}
          </button>
        </form>

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
          <p style={{ color: "#ffffff" }}>Já tem uma conta?</p>

          <button
            onClick={() => navigate("/")}
            style={{
              backgroundColor: "transparent",
              border: "none",
              color: "#ffffff",
              cursor: "pointer",
              textDecoration: "underline",
              fontWeight: "bold",
            }}
          >
            Voltar para Login
          </button>
        </div>
      </div>
    </div>
  );
}

export default Cadastro;