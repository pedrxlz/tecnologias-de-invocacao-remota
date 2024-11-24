export interface User {
  id: string;
  name: string;
  age: number;
}

export const users: User[] = [
  {
    id: "1",
    name: "Alice",
    age: 23,
  },
  {
    id: "2",
    name: "Bob",
    age: 25,
  },
  {
    id: "3",
    name: "Charlie",
    age: 30,
  },
];
