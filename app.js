const express = require("express");
const errorHandler = require("./middleware/errorHandler");
const { auth } = require("express-oauth2-jwt-bearer");

// Configuracion Middleware con el Servidor de Autorización
const autenticacion = auth({
  audience: "http://localhost:3000/api/productos",
  issuerBaseURL: "https://dev-utn-frc-iaew.auth0.com/",
  tokenSigningAlg: "RS256",
});

const app = express();
const routerLibros = require("./routes/libros");

app.use(express.json());

app.use("/libros", autenticacion,  routerLibros);
app.use(errorHandler);

// Iniciar el servidor
app.listen(3000, () => {
  console.log("Servidor iniciado en el puerto 3000");
});
