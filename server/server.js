/* eslint-disable no-undef */
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mysql = require("mysql");
const bcrypt = require("bcrypt");
const session = require("express-session");

const app = express();

app.use(
  cors({
    origin: "http://localhost:5173", // reemplaza con la URL de tu front-end
    credentials: true, // permite enviar cookies
  })
);

app.use(bodyParser.json());
app.use(express.json());

app.use(
  session({
    name: "mi.sid", // establece el nombre de la cookie
    secret: "tu_clave_secreta",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false },
  })
);
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "zigma",
  port: "3306",
});

connection.connect((error) => {
  if (error) throw error;
  console.log("Successfully connected to the database.");
});

app.post("/register", async (req, res) => {
  const { email, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);

  // Verificar si el correo electrónico ya existe
  const checkEmailQuery = "SELECT * FROM users WHERE email = ?";
  connection.query(checkEmailQuery, [email], async (error, results) => {
    if (error) throw error;

    if (results.length > 0) {
      // Si el correo electrónico ya existe, enviar una respuesta al cliente
      res.send({ message: "El correo electrónico ya está en uso" });
    } else {
      // Si el correo electrónico no existe, insertar el nuevo usuario
      const insertUserQuery =
        "INSERT INTO users (email, password) VALUES (?, ?)";
      connection.query(
        insertUserQuery,
        [email, hashedPassword],
        (error, results) => {
          if (error) throw error;
          res.send(results);
        }
      );
    }
  });
});

app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  // Verificar si el correo electrónico existe
  const checkEmailQuery = "SELECT * FROM users WHERE email = ?";
  connection.query(checkEmailQuery, [email], async (error, results) => {
    if (error) throw error;

    if (results.length > 0) {
      // Si el correo electrónico existe, verificar la contraseña
      const user = results[0];
      const passwordMatch = await bcrypt.compare(password, user.password);

      if (passwordMatch) {
        // Si la contraseña es correcta, iniciar la sesión
        req.session.user = { id: user.id }; // Aquí solo guardamos el id del usuario
        res.json({
          success: true,
          message: "Inicio de sesión exitoso",
          userId: req.session.user.id,
        });
      } else {
        res.send({ message: "Contraseña incorrecta" });
      }
    } else {
      res.send({ message: "Correo electrónico no encontrado" });
    }
  });
});

app.get("/dashboard", (req, res) => {
  if (req.session.user) {
    res.send({ userId: req.session.user.id }); // Aquí solo enviamos el id del usuario
  } else {
    res.status(401).send({ error: "No autorizado" });
  }
});

app.post("/logout", (req, res) => {
  if (req.session) {
    // destruye la sesión
    req.session.destroy((err) => {
      if (err) {
        return res.status(500).send("Error interno del servidor");
      }

      // borra la cookie de sesión
      res.clearCookie("mi.sid");
      return res.send({ message: "Sesión cerrada exitosamente" });
    });
  } else {
    return res.status(400).send({ error: "No se encontró la sesión" });
  }
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
