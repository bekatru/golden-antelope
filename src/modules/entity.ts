import { v4 as uuidv4 } from "uuid";
import { IEntity } from "../services/zustand";

export class Entity implements IEntity {
  id: string;

  constructor() {
    this.id = uuidv4();
  }
}
