import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/navbar/Navbar";
import Footer from "@/components/footer/Footer";
import { ThemeProvider, ThemeContext } from "@/context/ThemeContext";
import AuthProvider from "@/components/AuthProvider/AuthProvider";
import { ConfigProvider } from 'antd';
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Magnolia的个人博客",
  description: "Magnolia's blog",
};


const theme = {
    /* 这里是你的全局 token */
    token: {
      colorText: '#389e0d',
      colorBorder: '389e0d',
      colorPrimary: '389e0d'
    }
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
        <body className={inter.className}>
          <ThemeProvider>
            <ConfigProvider theme= {theme}>
              <AuthProvider>
                  <Navbar/>
                    <div style={{
                      minHeight: 'calc(100vh - 150px)'
                    }}>
                      {children}
                    </div>
                  <Footer/>
              </AuthProvider>
            </ConfigProvider>
         </ThemeProvider>
        </body>
    </html>
  );
}
