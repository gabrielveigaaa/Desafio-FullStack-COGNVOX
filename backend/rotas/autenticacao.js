const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const db = require("../db");

const router = express.Router();

/* =========================
   CADASTRO
========================= */
router.post("/register", async (req, res) => {
  const { nome, email, senha } = req.body;

  if (!nome || !email || !senha) {
    return res.status(400).json({ error: "Preencha todos os campos!" });
  }

  try {
    const hash = await bcrypt.hash(senha, 10);

    db.query(
      "INSERT INTO usuarios (nome, email, senha_hash) VALUES (?, ?, ?)",
      [nome, email, hash],
      (err) => {
        if (err) {
          return res.status(400).json({ error: "Email já cadastrado..." });
        }

        return res
          .status(201)
          .json({ message: "Usuário cadastrado com sucesso!" });
      },
    );
  } catch (error) {
    return res.status(500).json({ error: "Erro no servidor!" });
  }
});

/* =========================
   LOGIN
========================= */
router.post("/login", (req, res) => {
  const { email, senha } = req.body;

  if (!email || !senha) {
    return res.status(400).json({ error: "Preencha todos os campos!" });
  }

  db.query(
    "SELECT * FROM usuarios WHERE email = ?",
    [email],
    async (err, results) => {
      if (err) {
        return res.status(500).json({ error: "Erro no servidor!" });
      }

      if (results.length === 0) {
        return res.status(400).json({ error: "Email incorreto..." });
      }

      const usuario = results[0];

      const senhaValida = await bcrypt.compare(senha, usuario.senha_hash);

      if (!senhaValida) {
        return res.status(400).json({ error: "Senha incorreta..." });
      }

      const token = jwt.sign(
        { id: usuario.id_usuario, email: usuario.email },
        process.env.JWT_SECRET,
        { expiresIn: "1h" },
      );

      return res.json({
        message: "Login realizado com sucesso!",
        token,
      });
    },
  );
});

module.exports = router;
