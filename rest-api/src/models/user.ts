import { readFileSync } from "fs";
import { join } from "path";

export interface User {
  id: string;
  name: string;
  age: number;
}

const dataPath = join(__dirname, "../../data.json");
const rawData = readFileSync(dataPath, "utf-8");

const data = JSON.parse(rawData);

export const users: User[] = data.users.map(
  (user: { id: number; name: string; age: number }) => ({
    id: user.id.toString(),
    name: user.name,
    age: user.age,
  })
);
