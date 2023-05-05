import { idByToken } from "@/lib/functions/tokens";
import { redirect } from "next/navigation";

export default async function page({ params }: any) {
  const id = await idByToken(params.token);
  if (!!id) redirect(`/demands/${id}/${params.token}`);

  return (
    <main>
      <p className="text-red-700 p-1 bg-red-200 text-center">Invalid link!</p>
    </main>
  );
}
