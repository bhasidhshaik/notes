import "./globals.css";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "@/lib/queryClient";
import { AuthProvider } from "@/context/AuthContext";
import { Toaster } from "react-hot-toast";
import Providers from "@/components/Provider";
import { Poppins } from "next/font/google";
const poppins = Poppins({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
});
export const metadata = { title: "Notes App", description: "Internship Task" };


export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={poppins.className}>
        <Providers>
          <AuthProvider>
            {children}
            <Toaster position="top-center" />
          </AuthProvider>
        </Providers>
      </body>
    </html>
  );
}
