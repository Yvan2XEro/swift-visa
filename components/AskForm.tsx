import { Modal, Loading, Input } from "@nextui-org/react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { IoMdCheckboxOutline } from "react-icons/io";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Demand } from "@/types";

const askShema = yup.object().shape({
  email: yup.string().email().required(),
  emailVerif: yup.string().oneOf([yup.ref("email")], "Emails must be one!"),
  numDocument: yup
    .string()
    .required()
    .min(6)
    .matches(/^[a-zA-Z0-9]+$/, "Only alphanumeric characters are allowed"),
  passportExpireDate: yup.string().required(),
});

export function AskForm() {
  const [error, seterror] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<Partial<Demand & { emailVerif: string }>>({
    resolver: yupResolver(askShema),
    mode: "onChange",
  });
  if (success)
    return (
      <>
        <Modal.Header>
          <h2 className="text-xl">SUCCESS</h2>
        </Modal.Header>
        <Modal.Body>
          <div className="text-center text-green-500">
            <IoMdCheckboxOutline className="mx-auto" size={30} />
            <p>Please check your email to continue.</p>
          </div>
        </Modal.Body>
      </>
    );
  async function submit(data: Partial<Demand>) {
    const { email, numDocument, passportExpireDate } = data;
    setLoading(true);
    seterror("");
    try {
      const verifResponse = await fetch("/api/demands/check-email-exists", {
        method: "POST",
        body: JSON.stringify({ email }),
      });

      if (verifResponse.status === 200) {
        return seterror(
          "Email already in use! You can check your demand status using your demand ID"
        );
      }
      const response = await fetch("/api/demands", {
        method: "POST",
        body: JSON.stringify({ email, numDocument, passportExpireDate }),
      });
      if (response.ok) {
        console.log(await response.json());
        return setSuccess(true);
      }
      seterror("Somthing wrong! Please try later");
    } catch (error) {
      seterror("Somthing wrong! Please try later");
    } finally {
      setLoading(false);
    }
  }
  return (
    <form onSubmit={handleSubmit(submit)}>
      <Modal.Header>
        <h2 className="text-xl">APPLY FOR AN E-VISA</h2>
      </Modal.Header>
      <Modal.Body>
        {error.length > 0 && (
          <small className="text-red-600 text-sm">{error}</small>
        )}
        <Input
          label="Email:"
          {...register("email")}
          type="email"
          placeholder="Your email address"
        />
        {!!errors.email && (
          <small className="text-red-600">{errors.email.message}</small>
        )}
        <Input
          label="Confirm:"
          {...register("emailVerif")}
          placeholder="Confirm your email address"
        />
        {!!errors.emailVerif && (
          <small className="text-red-600">{errors.emailVerif.message}</small>
        )}
        <Input
          label="Passport ID:"
          {...register("numDocument", {
            pattern: {
              value: /^[a-z0-9]+$/i,
              message: "Invalid passport number!",
            },
          })}
          placeholder="Your passport ID"
          required
        />
        {!!errors.numDocument && (
          <small className="text-red-600">{errors.numDocument.message}</small>
        )}
        <Input
          label="Passport expiration date:"
          {...register("passportExpireDate")}
          type="date"
          placeholder="Your passport ID"
          required
        />
        {!!errors.passportExpireDate && (
          <small className="text-red-600">
            {errors.passportExpireDate.message}
          </small>
        )}
      </Modal.Body>
      <Modal.Footer>
        <div className="flex gap-3">
          {loading && <Loading color="error" />}
          <button
            type="submit"
            disabled={!isValid || loading}
            className="border-red-500 disabled:border-red-300 border transition-all hover:-translate-y-[1.1px] disabled:hover:translate-y-0 disabled:hover:scale-100 hover:scale-105 text-red-500 disabled:text-red-300 font-semibold py-3 px-6 rounded-full inline-block"
          >
            Send
          </button>
        </div>
      </Modal.Footer>
    </form>
  );
}
