import { redirect } from "next/navigation"

export default function Dashboard() {
  redirect(/student)
  return (
    <div>
      <h1>Dashboard Page</h1>
    </div>
  );
}
