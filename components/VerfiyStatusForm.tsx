import { Modal, Loading, Input, Badge } from "@nextui-org/react";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { Demand } from "@/types";
import { useState } from "react";
import Link from "next/link";

const verifyShema = yup.object().shape({
  id: yup.string().min(10).required(),
});
export function VerfiyStatusForm() {
  const [data, setData] = useState<Demand>();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  async function handleCheck({ id }: any) {
    setLoading(true);
    setError("");
    setData(undefined);
    try {
      const response = await fetch("/api/demands/" + id);

      if (response.ok) {
        const json = (await response.json()) as Demand;
        return setData(json);
      }
      setError("Not found");
    } catch (error: any) {
      setError(error.message || "Something went wrong, please try later!");
    } finally {
      setLoading(false);
    }
  }
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<{ id: string }>({
    resolver: yupResolver(verifyShema),
    mode: "onChange",
  });
  return (
    <form onSubmit={handleSubmit(handleCheck)}>
      <Modal.Header>
        <h2 className="text-xl">VÉRIFIER LE STATUT DE VOTRE DEMANDE</h2>
      </Modal.Header>
      <Modal.Body>
        {error.length > 2 && <p className="text-red-600">{error}</p>}
        <Input {...register("id")} label="Numéro de demande:" required />
        {!!errors.id && (
          <small className="text-red-600">{errors.id.message}</small>
        )}
        {!!data && (
          <>
            <p className="text-2xl">STATUS:</p>
            <Badge color={"success"}>rtzuigh</Badge>
            <Link
              href={`/demands/${data.id}/payment`}
              className="text-blue-500"
            >
              More informations
            </Link>
          </>
        )}
      </Modal.Body>
      <Modal.Footer>
        <div className="flex gap-3">
          {loading && <Loading color="error" />}
          <button
            type="submit"
            disabled={loading}
            className="border-red-500 disabled:border-red-300 border transition-all hover:-translate-y-[1.1px] disabled:hover:translate-y-0 disabled:hover:scale-100 hover:scale-105 text-red-500 disabled:text-red-300 font-semibold py-3 px-6 rounded-full inline-block"
          >
            Verify
          </button>
        </div>
      </Modal.Footer>
    </form>
  );
}
