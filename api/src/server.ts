import express, { Express } from "express";
import cors from "cors";
import { MongoConnection } from "./database/config";
import { interceptor } from "./middlewares/interceptor";
import { routes } from "./routes/rutas";

class Server {
  private app: Express;
  private port: string;

  constructor() {
    this.app = express();
    this.port = `${process.env.PORT}`;

    this.iniciar()
      .then(() => {
        this.start();
      })
      .catch((err) => {
        console.log("Error", err);
      });
  }

  async iniciar() {
    await MongoConnection();
    await this.middlewares();
    await this.routes();
  }

  async middlewares() {
    this.app.use(cors());
    this.app.use(express.json());
    this.app.use(express.static("public"));
    this.app.use("*", interceptor);
  }

  async routes() {
    routes.forEach((e) => {
      this.app.use(e.path, require(e.package));
    });
    this.app.use("*", (req, res) =>
      res
        .status(404)
        .json({ codigo: 1, mensaje: "404 | Servicio no encontrado." })
    );
  }

  start() {
    this.app.listen(this.port, () => {
      console.log(`Servidor se ha iniciado en el puerto ${this.port}`);
    });
  }
}

export { Server };
