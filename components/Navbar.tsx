import Image from "next/image";
import Logo from "@/assets/images/logo.png";
import { Navbar as NextNavbar, Text } from "@nextui-org/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useMemo } from "react";

export default function Navbar() {
  const pathName = usePathname();
  const part = useMemo(() => {
    return pathName.split("/")[1];
  }, [pathName]);
  return (
    <NextNavbar shouldHideOnScroll variant="floating">
      <NextNavbar.Toggle showIn="xs" />
      <NextNavbar.Brand
        css={{
          "@xs": {
            w: "12%",
          },
        }}
      >
        <Link href="/" className="flex items-center">
          <Image src={Logo} alt="Logo" height={50} width={70} />
        </Link>
      </NextNavbar.Brand>
      <NextNavbar.Content hideIn="xs">
        <NextNavbar.Link
          isActive={part === "howitworks"}
          activeColor="error"
          href="/howitworks"
          as={Link}
        >
          Comment ca marche
        </NextNavbar.Link>
        <NextNavbar.Link
          activeColor="error"
          as={Link}
          isActive={part === "faqs"}
          href="/faqs"
        >
          FAQs
        </NextNavbar.Link>
        <NextNavbar.Link
          isActive={part === "contact"}
          activeColor="error"
          as={Link}
          href="/contact"
        >
          Contact
        </NextNavbar.Link>
      </NextNavbar.Content>
    </NextNavbar>
  );
}
