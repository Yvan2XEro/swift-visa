import Image from "next/image";
import Illustration from "@/assets/images/illustration.jpg";
import HomeActionButtons from "@/components/HomeActionButtons";
import NewsList from "@/components/NewsList";

export default function Home() {
  return (
    <main>
      <section className="min-h-screen py-16">
        <div className=" px-4">
          <div className="flex flex-col lg:flex-row items-center justify-center">
            <div className="lg:w-1/2 lg:pr-8">
              <h1 className="text-4xl font-bold mb-4">
                Bienvenue sur {process.env.APP_NAME}
              </h1>
              <p className="text-lg mb-6">
                Obtenez votre visa en ligne rapidement et en toute fiabilité
                pour vos voyages internationaux.
              </p>
              <HomeActionButtons />
            </div>
            <div className="lg:w-1/2 overflow-hidden">
              <Image
                src={Illustration}
                alt="Illustration d'e-Visa"
                className="w-full rotate-45 -z-20"
              />
            </div>
          </div>
        </div>
      </section>
      <section className="container">
        <h2 className="text-3xl font-bold text-center md:text-left">
          Actualitées
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <NewsList />
        </div>
      </section>
    </main>
  );
}
