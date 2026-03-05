import { useEffect, useState } from "react";
import api from "../servicos/api";

function Dashboard() {
  const [mensagem, setMensagem] = useState("");

  useEffect(() => {
    const buscarDashboard = async () => {
      const token = localStorage.getItem("token");
      
      if (!token) {
        window.location.href = "/";
        return;
    }

      try {
        const resposta = await api.get("/dashboard", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setMensagem(resposta.data.message);
      } catch (erro) {
        setMensagem("Acesso negado.");
      }
    };

    buscarDashboard();
  }, []);

  return (
    <div style={{ textAlign: "center", marginTop: "100px" }}>
      <h1>{mensagem}</h1>
    </div>
  );
}

export default Dashboard;