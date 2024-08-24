import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { NotificationProvider } from "@/contexts/NotificationContext";
import { UserProvider } from "@/contexts/UserContext";


export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

interface Props {
  children: React.ReactNode;
}

export default function RootLayout({ children }: Props) {

  
  return (

    <html lang="en">
      <body className={`flex w-screen h-screen bg-background-1 relative selection:text-primary selection:bg-primary-opacity`}>

        <NotificationProvider>
          <UserProvider>
            
            {children}

          </UserProvider>
        </NotificationProvider>

        <div id="portal"></div>
        
      </body>
    </html>
    
  );

}
