import React from "react";
export default function page() {
  return (
    <main>
      <h1 className="text-4xl font-bold text-center mt-3">How it works?</h1>
      <section className="py-16 grid grid-cols-1 md:grid-cols-2 gap-2">
        <div className="w-full px-4 py-8">
          <h2 className="text-3xl font-bold mb-4">
            Step 1 : Make your application
          </h2>
          <p className="text-lg mb-4">
            The first step in your process of obtaining an e-Visa starts with
            the initiation of your application. To initiate your application,
            all you have to do is click on the yellow START button at the
            reception desk. You will then have to fill in through the form that
            will be displayed:
          </p>
          <ol className="text-lg mb-4">
            <li>your email addressl</li>
            <li>confirm the email address </li>
            <li>your travel document (generally the passport)</li>
            <li>the expiring date of the travel document</li>
          </ol>
          <p className="text-lg">
            Please note that all this information is required for initialization
            of your application. Once you have completed all the fields, click
            on the green SEND button and your application will be initiated. At
            the send of this first step, you will receive an email inviting you
            to confirm your request through a link. Go to your mailbox.
          </p>
        </div>
        <div className="w-full px-4 py-8">
          <h2 className="text-3xl font-bold mb-4">
            Step 2 : Fill the next form with your informations
          </h2>
          <p className="text-lg mb-4">
            The email received after step 1 contains a link . By clicking on
            this you access the form for filling in the data required to process
            your application. The form is divided into six steps.
          </p>
          <ul className="text-lg mb-4">
            <li>Personal informations form</li>
            <li>Visa kind/type form</li>
            <li>Travel information form</li>
            <li>Passport informations form</li>
          </ul>
          <p className="text-lg">
            You can click on the &quot;NEXT&quot; button to go to the next form
            or on &quot;PREVIOUS&quot; to return to the previous form for
            possible corrections. Required (mandatory) fields are marked with an
            asterisk (*).
          </p>
        </div>
        <div className="w-full px-4 py-8">
          <h2 className="text-3xl font-bold mb-4">
            Step 3: Pay your application
          </h2>
          <p>
            Once you have filled in all the details, checked them and everything
            seems correct, you can proceed to payment by clicking on the
            &quot;CONFIRM AND PAY&quot; button. Fill in the required information
            and make sure you have the necessary funds for your transaction and
            then complete your transaction. The success of this operation is
            decisive for the validation of your request. You will then be
            redirected to our home page with a message confirming the
            registration of your application.
          </p>
        </div>
        <div className="w-full px-4 py-8">
          <h2 className="text-3xl font-bold mb-4">
            Step 4: Follow up your request
          </h2>
          <p>
            Once your payment has been confirmed, you will receive an email with
            your application number. With this number, you can check the status
            of your application at any time by clicking on the &quot;FOLLOW UP
            YOUR APPLICATION&quot; button on the e-Visa platform homepage.
          </p>
        </div>
      </section>
    </main>
  );
}
