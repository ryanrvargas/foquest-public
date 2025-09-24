import React from "react";
import "./globals.css";
import { UserProvider } from "@/contexts/UserContext";

export const metadata = {
  title: "FoQuest",
  description: "FoQuest start page",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <UserProvider>
          {children}
        </UserProvider>
      </body>
    </html>
  );
}