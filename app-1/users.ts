export interface User {
  id: string;
  email: string;
  name: string; 
  password: string;
}

export const users: User[] = [
  {
    id: "1",
    email: "test@test.com",
    name: "Test User",
    password: "test",
  },
  {
    id: "2",
    email: "test2@test.com",
    name: "Test User 2",
    password: "test",
  },
  {
    id: "3",
    email: "test3@test.com",
    name: "Test User 3",
    password: "test",
  },
];


const loginUser = (email: string, password: string) => {
  return users.find((user) => user.email === email && user.password === password);
};

export { loginUser };
