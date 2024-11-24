import { Request, Response } from "express";
import { users, User } from "../models/user";

export const getAllUsers = (req: Request, res: Response) => {
  res.json(users);
};

export const createUser = (req: Request, res: Response) => {
  const { id, name, age } = req.body;

  if (!id || !name || !age) {
    res.status(400).json({ message: "Campos obrigatórios: id, name, age" });
    return;
  }

  const newUser: User = { id, name, age };
  users.push(newUser);
  res.status(201).json(newUser);
};

export const deleteUser = (req: Request, res: Response) => {
  const { id } = req.params;
  const index = users.findIndex((user) => user.id === id);

  if (index === -1) {
    res.status(404).json({ message: "Usuário não encontrado" });
    return;
  }

  users.splice(index, 1);
  res.status(204).send();
};
