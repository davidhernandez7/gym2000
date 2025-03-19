import { Alumno } from "app/entities/Alumnos";
import { Categoria } from "app/entities/Categoria";
import { Cliente } from "app/entities/Cliente";
import { Producto } from "app/entities/Producto";
import { Venta } from "app/entities/Venta";
import "reflect-metadata";
import { DataSource } from "typeorm";

export const AppDataSource = new DataSource({
  type: "mysql",
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT) || 3306,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  synchronize: true,
  logging: false,
  entities: [Alumno, Categoria, Cliente, Producto, Venta], // Asegúrate de importar correctamente
});