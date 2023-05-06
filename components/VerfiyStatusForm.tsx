import { Modal, Loading, Input } from "@nextui-org/react";

export function VerfiyStatusForm() {
  const notFound = false;
  function handleCheck(e: any) {
    e.preventDefault();
  }
  return (
    <form onSubmit={handleCheck}>
      <Modal.Header>
        <h2 className="text-xl">VÉRIFIER LE STATUT DE VOTRE DEMANDE</h2>
      </Modal.Header>
      <Modal.Body>
        {notFound && (
          <p className="text-red-600">
            Nous n&apos;avons trouvé aucune demande correspondant à ce numéro!
          </p>
        )}
        <Input label="Numéro de demande:" required />
      </Modal.Body>
      <Modal.Footer>
        <div className="flex gap-3">
          {<Loading color="error" />}
          <button
            type="submit"
            className="border-red-500 disabled:border-red-300 border transition-all hover:-translate-y-[1.1px] disabled:hover:translate-y-0 disabled:hover:scale-100 hover:scale-105 text-red-500 disabled:text-red-300 font-semibold py-3 px-6 rounded-full inline-block"
          >
            Verify
          </button>
        </div>
      </Modal.Footer>
    </form>
  );
}
