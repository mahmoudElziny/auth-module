import { getServerSession } from "next-auth";
import { options } from "./api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";

export default async function Home() {
  const session = await getServerSession(options);
  if(!session) redirect("/signin");
  return (
    <div className="container">Home</div>
  );
}
