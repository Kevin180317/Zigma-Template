/* eslint-disable no-undef */
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mysql = require("mysql");
const bcrypt = require("bcrypt");
const session = require("express-session");
const multer = require("multer");
const storage = multer.memoryStorage();

const upload = multer({ storage: storage }).fields([
  { name: "imagen", maxCount: 1 },
  { name: "imagen2", maxCount: 1 },
  { name: "imagen3", maxCount: 1 },
  { name: "imagen4", maxCount: 1 },
  { name: "imagen5", maxCount: 1 },
  { name: "imagen6", maxCount: 1 },
]);
const app = express();

app.use(
  cors({
    origin: "http://localhost:5173", // reemplaza con la URL de tu front-end
    credentials: true, // permite enviar cookies
  })
);

app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
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

app.post("/upload", upload, (req, res) => {
  // Convertir el archivo a un Buffer para almacenarlo en MySQL.
  const nombre = req.body.nombre;
  const imagen = Buffer.from(req.files.imagen[0].buffer);
  const opcion = req.body.opcion;
  const ubicacion = req.body.ubicacion;
  const profesional = req.body.profesional;
  const descripcion = req.body.descripcion;
  const objetivos = req.body.objetivos;
  const enumere = req.body.enumere;
  const imagen2 = Buffer.from(req.files.imagen2[0].buffer);
  const imagen3 = Buffer.from(req.files.imagen3[0].buffer);
  const opcion2 = req.body.opcion2;
  const userId = req.body.userId;
  const Planteamientodelproblema = req.body.Planteamientodelproblema;
  const objetivosanalizar = req.body.objetivosanalizar;
  const enumereanalizar = req.body.enumereanalizar;
  const fuentesvariacion = req.body.fuentesvariacion;
  const entradasvitales = req.body.entradasvitales;
  const causaproblema = req.body.causaproblema;
  const imagen4 = Buffer.from(req.files.imagen4[0].buffer);
  const opcion3 = req.body.opcion3;
  const imagen5 = Buffer.from(req.files.imagen5[0].buffer);
  const opcion4 = req.body.opcion4;
  const posiblesSoluciones = req.body.posiblesSoluciones;
  const imagen6 = Buffer.from(req.files.imagen6[0].buffer);
  const opcion5 = req.body.opcion5;
  const sistemaSeguimiento = req.body.sistemaSeguimiento;
  const planTransferencia = req.body.planTransferencia;
  const recomendaciones = req.body.recomendaciones;
  const definircompletado = req.body.definircompletado;
  const medidacompletado = req.body.medidacompletado;
  const analizarcompletado = req.body.analizarcompletado;
  const mejorarcompletado = req.body.mejorarcompletado;
  const controlarcompletado = req.body.controlarcompletado;
  connection.query(
    "INSERT INTO mi_tabla (nombre, imagen, opcion, ubicacion, profesional, descripcion, objetivos, enumere, imagen2, imagen3, opcion2, userId, PlanteamientoProblema, objetivosanalizar, enumereanalizar, fuentesvariacion, entradasvitales, causaproblema, imagen4, opcion3, imagen5, opcion4, posiblesSoluciones, sistemaSeguimiento,  planTransferencia, imagen6, opcion5, recomendaciones, definircompletado, medidacompletado, analizarcompletado, mejorarcompletado, controlarcompletado) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ? )",
    [
      nombre,
      imagen,
      opcion,
      ubicacion,
      profesional,
      descripcion,
      objetivos,
      enumere,
      imagen2,
      imagen3,
      opcion2,
      userId,
      Planteamientodelproblema,
      objetivosanalizar,
      enumereanalizar,
      fuentesvariacion,
      entradasvitales,
      causaproblema,
      imagen4,
      opcion3,
      imagen5,
      opcion4,
      posiblesSoluciones,
      sistemaSeguimiento,
      planTransferencia,
      imagen6,
      opcion5,
      recomendaciones,
      definircompletado,
      medidacompletado,
      analizarcompletado,
      mejorarcompletado,
      controlarcompletado,
    ],
    (error, results) => {
      if (error) {
        console.error("Error al guardar los datos en MySQL:", error);
        res
          .status(500)
          .json({ message: "Error al guardar los datos en MySQL." });
        return;
      }

      console.log("Datos guardados en MySQL con el ID:", results.insertId);
      res.json({ message: "Datos subidos y guardados en MySQL con éxito." });
    }
  );
});

app.get("/proyecto/:userId", (req, res) => {
  const userId = req.params.userId;

  connection.query(
    "SELECT * FROM mi_tabla WHERE userId = ? ORDER BY id DESC LIMIT 1",
    [userId],
    (error, results) => {
      if (error) {
        console.error("Error al obtener el proyecto:", error);
        res.status(500).json({ message: "Error al obtener el proyecto." });
        return;
      }

      if (results.length > 0) {
        // Convierte la imagen a una cadena Base64.
        const proyecto = results[0];
        proyecto.imagen = Buffer.from(proyecto.imagen).toString("base64");
        proyecto.imagen2 = Buffer.from(proyecto.imagen2).toString("base64");
        proyecto.imagen3 = Buffer.from(proyecto.imagen3).toString("base64");
        proyecto.imagen4 = Buffer.from(proyecto.imagen4).toString("base64");
        proyecto.imagen5 = Buffer.from(proyecto.imagen5).toString("base64");
        proyecto.imagen6 = Buffer.from(proyecto.imagen6).toString("base64");
        // Devuelve el proyecto.
        res.json(proyecto);
      } else {
        res.status(404).json({ message: "Proyecto no encontrado." });
      }
    }
  );
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
