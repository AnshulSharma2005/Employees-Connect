import "reflect-metadata";
import { DataSource } from "typeorm";
import { User } from "../models/User";
import { Message } from "../models/Message";

export const AppDataSource = new DataSource({
  type: "sqlite",
  database: "database.sqlite",
  synchronize: true,
  logging: false,
  entities: [User, Message],
});
