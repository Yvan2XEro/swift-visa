import React from "react";
import { IoMdCard, IoMdPerson } from "react-icons/io";

export default function page() {
  return (
    <main>
      <h1 className="text-4xl font-bold text-center mt-3">How it works?</h1>
      <section className="py-16 grid grid-cols-1 md:grid-cols-2 gap-2">
        <div className="w-full px-4 py-8">
          <h2 className="text-3xl font-bold mb-4">
            Étape 1: Faites votre demande
          </h2>
          <p className="text-lg mb-4">
            La première étape de votre processus d’obtention d’un e-Visa pour le
            Bénin commence par l’initiation de votre demande. Pour initier votre
            demande, il vous suffira de cliquer sur le bouton jaune DEMANDER UN
            E-VISA à l’accueil. Vous aurez donc à renseigner à travers le
            formulaire qui s’affichera :
          </p>
          <ol className="text-lg mb-4">
            <li>votre adresse email</li>
            <li>à le ressaisir pour confirmation</li>
            <li>
              votre numéro de document de voyage (généralement le passeport)
            </li>
            <li>et la date d’expiration de ce dernier</li>
          </ol>
          <p className="text-lg">
            Il faut noter que toutes ces informations sont requises pour
            l’initialisation de votre demande. Une fois tous les champs
            renseignés, cliquez sur le bouton vert ENVOYER et votre demande sera
            initiée. Vous recevrez à l’issue de cette première étape, un email
            vous invitant à confirmer votre demande à travers un lien.
            Rendez-vous donc dans votre boite mail.
          </p>
        </div>
        <div className="w-full px-4 py-8">
          <h2 className="text-3xl font-bold mb-4">
            Étape 2: Renseignez vos données
          </h2>
          <p className="text-lg mb-4">
            Le mail reçu à l’issue de l’étape 1 contient un lien accessible via
            le bouton « POURSUIVRE MA DEMANDE ». En cliquant sur ce bouton vous
            accédez au formulaire de renseignement des données nécessaires pour
            le traitement de votre demande. Le formulaire est divisé en quatre
            (04) étapes :
          </p>
          <ul className="text-lg mb-4">
            <li>formulaire des données personnelles</li>
            <li>formulaire des données du e-Visa</li>
            <li>formulaire des données du voyage</li>
            <li>formulaire des données du passeport</li>
          </ul>
          <p className="text-lg">
            Vous pouvez cliquer sur le bouton « SUIVANT » pour passer au
            formulaire suivant ou sur « PRÉCÉDENT » pour revenir au formulaire
            précédent pour d’éventuelles corrections. Les champs requis
            (obligatoires) sont marqués d’un astérisque (*).
          </p>
        </div>
        <div className="w-full px-4 py-8">
          <h2 className="text-3xl font-bold mb-4">
            Étape 3: Payez votre demande
          </h2>
          <p>
            Une fois toutes les données renseignées, que vous les avez vérifiées
            et que tout vous semble correct, vous pourrez passer au paiement en
            cliquant sur le bouton « CONFIRMER ET PAYER ». Renseignez les
            informations requises et rassurez-vous d’avoir les fonds nécessaires
            pour votre opération puis valider votre transaction. La réussite de
            cette opération est déterminante pour la validation de votre
            demande. Vous serez ensuite redirigé vers l’accueil de notre page
            avec un message de confirmation de l’enregistrement de votre
            demande.
          </p>
        </div>
        <div className="w-full px-4 py-8">
          <h2 className="text-3xl font-bold mb-4">
            Étape 4: Suivez votre demande
          </h2>
          <p>
            Une fois votre paiement confirmé, vous recevrez un mail vous
            précisant le numéro de votre demande. Avec ce numéro, vous pouvez
            vérifier le statut de votre demande à tout moment en cliquant sur le
            bouton « SUIVRE VOTRE DEMANDE » situé sur la page d’accueil de la
            plateforme e-Visa
          </p>
        </div>
      </section>
    </main>
  );
}
