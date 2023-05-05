"use client";
import { Button, Input, Textarea } from "@nextui-org/react";
import { IoLogoFacebook, IoLogoInstagram, IoLogoTwitter } from "react-icons/io";
import React from "react";

export default function page() {
  return (
    <main>
      <h1 className="text-4xl font-bold text-center mt-3">Contact</h1>

      <section className="py-16">
        <div className=" px-4">
          <div className="flex flex-col lg:flex-row items-center justify-center">
            <div className="lg:w-1/2 lg:pr-8">
              <div>
                <p className="text-lg text-gray-600 mb-6">
                  N&apos; hésitez pas à nous contacter pour toute question ou
                  demande d&apos; assistance. Remplissez le formulaire
                  ci-dessous et nous vous répondrons dans les plus brefs délais.
                </p>
                <form
                  action="/contact"
                  method="POST"
                  className="w-full max-w-md flex flex-col gap-3"
                >
                  <Input label="Name:" className="w-full" />
                  <Input type="email" label="Email:" className="w-full" />
                  <Input label="Object:" className="w-full" />
                  <Textarea label="Message:" className="w-full"></Textarea>
                  <Button color={"error"} type="submit">
                    Envoyer
                  </Button>
                </form>
              </div>
            </div>
            <div className="lg:w-1/2 flex items-center justify-center">
              <div>
                <h2 className="text-3xl font-bold text-gray-800 mb-4">
                  Nous sommes sociables
                </h2>
                <ul className="flex gap-4 justify-center">
                  <li>
                    <a href="#" className="text-gray-600 hover:text-blue-500">
                      <IoLogoFacebook size={25} />
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-gray-600 hover:text-blue-500">
                      <IoLogoTwitter size={25} />
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-gray-600 hover:text-pink-600">
                      <IoLogoInstagram size={25} />
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
