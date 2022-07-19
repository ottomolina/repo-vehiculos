const root = "/api-mant-car/rest";

export interface Ruta {
  path: string;
  package: string;
  protected: boolean;
  subpath: Array<string>;
}

export const routes: Array<Ruta> = [
  {
    protected: false,
    path: `${root}/monitor`,
    package: "./routes/monitor.route",
    subpath: [],
  },
  {
    protected: false,
    path: `${root}/auth`,
    package: "./routes/auth.route",
    subpath: ["/login", "/logout"],
  },
  {
    protected: true,
    path: `${root}/usuario`,
    package: "./routes/usuario.route",
    subpath: [
      "",
      "/actualiza-contrasenia",
      "/reset-contrasenia",
      "/activar",
      "/desactivar",
    ],
  },
  {
    protected: true,
    path: `${root}/color`,
    package: "./routes/color.route",
    subpath: [],
  },
  {
    protected: true,
    path: `${root}/marcas`,
    package: "./routes/marca.route",
    subpath: [],
  },
  {
      protected: true,
      path: `${root}/vehiculos`,
      package: './routes/vehiculo.route',
      subpath: []
  },
  // {
  //     protected: true,
  //     path: `${root}/partidos`,
  //     package: './routes/partido.route',
  //     subpath: []
  // },
  // {
  //     protected: true,
  //     path: `${root}/apuesta`,
  //     package: './routes/apuesta.route',
  //     subpath: []
  // },
];
