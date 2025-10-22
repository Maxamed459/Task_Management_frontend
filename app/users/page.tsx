import z from "zod";
import { Metadata } from "next";

// interface User {
//   id: number;
//   name: string;
//   username: string;
//   email: string;
// }

const userSchema = z.object({
  id: z.number(),
  name: z.string(),
  username: z.string(),
  email: z.string().email(),
});

export const metadata: Metadata = {
  title: "Users Page",
  description: "A list of users fetched from an external API",
};

export default async function UsersPage() {
  const response = await fetch("https://jsonplaceholder.typicode.com/users");
  const users = await response.json();

  const result = z.array(userSchema).safeParse(users);

  if (!result.success) {
    console.error("Invalid API response:", result.error);
  } else {
    console.log("Users:", result.data);
  }

  return (
    <div className="grid grid-cols-4 gap-4 m-10">
      {users.map((user: z.infer<typeof userSchema>) => (
        <div
          className="p-4 shadow-lg rounded-md bg-white text-black"
          key={user.id}
        >
          <h2>
            <strong>Id:</strong> {user.id}
          </h2>
          <p>
            <strong>Name:</strong> {user.name}
          </p>
          <p>
            <strong>Username:</strong> {user.username}
          </p>
          <p>
            <strong>Email:</strong> {user.email}
          </p>
        </div>
      ))}
    </div>
  );
}
