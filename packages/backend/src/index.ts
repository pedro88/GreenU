import express from "express";
import { AppDataSource } from "./data-source";
// import usersRoutes from "./routes/users.routes";

const app = express();
app.use(express.json());

// Routes
// app.use("/users", usersRoutes);

// Connexion DB + démarrage serveur
AppDataSource.initialize()
  .then(() => {
    console.log("📦 DB connected!");
    app.listen(3000, () => {
      console.log("🚀 Server running on http://localhost:3000");
    });
  })
  .catch((error) => console.error(error));
