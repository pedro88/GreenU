import express from "express";
import { AppDataSource } from "./data-source";
import userRoutes from "./routes/user.routes";
import gardenRoutes from "./routes/garden.route";

const app = express();
app.use(express.json());

// Routes
app.use("/user", userRoutes);
app.use("/garden", gardenRoutes);

// Connexion DB + démarrage serveur
AppDataSource.initialize()
  .then(() => {
    console.log("📦 DB connected!");
    console.log(AppDataSource.options.entities);
    app.listen(3000, () => {
      console.log("🚀 Server running on http://localhost:3000");
    });
  })
  .catch((error) => console.error(error));
