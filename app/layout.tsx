import "./globals.css";
import Providers from "@/components/Providers";

export const metadata = {
  title: "SWIFT VISA Cameroun",
  description: "Platform to quickly obtain your VISA for Cameroon",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
