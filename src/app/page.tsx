import { redirect } from "next/navigation";
import "devextreme/dist/css/dx.light.css";

export default function Home() {
  redirect("/login");
}
