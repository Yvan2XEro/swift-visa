import Image from "next/image";
import Logo from "@/assets/images/logo.jpg";
import { Navbar, Text, Button, Link } from "@nextui-org/react";

export default function Footer() {
  return (
    <footer>
      <p className="text-center py-5">
        &copy; {process.env.APP_NAME} all rigth reserved
      </p>
    </footer>
  );
}
