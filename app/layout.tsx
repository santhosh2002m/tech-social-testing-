// app/layout.tsx
"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { Provider } from "react-redux";
import { ThemeProvider } from "next-themes";
import BottomMenu from "@/components/menu/BottomMenu";
import PostPopups from "@/components/modals/PostPopups";
import NavBar from "@/components/navbar/NavBar";
import Preloader from "@/components/preloader/Preloader";
import ScrollToTop from "@/components/scrollToTop/ScrollToTop";
import { store } from "@/store/index";
import "react-modal-video/css/modal-video.css";
import "slick-carousel/slick/slick.css";
import "@/styles/globals.scss";
import "@/styles/TS_styles.scss";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isLoginPage = pathname === "/login";
  const clss = pathname !== "/index-two" ? "container" : "container-fluid";

  useEffect(() => {
    if (!isLoginPage) {
      import("bootstrap/dist/js/bootstrap.bundle.min.js").catch((err) =>
        console.error("Failed to load Bootstrap JS:", err)
      );
    }
  }, [isLoginPage]);

  return (
    <html lang="en">
      <head>
        {!isLoginPage && (
          <>
            <meta
              name="description"
              content="Circlehub React Nextjs Template"
            />
            <title>TechSocial</title>
          </>
        )}
      </head>
      <body className={isLoginPage ? "login-page bg-color" : "app-page"}>
        <Provider store={store}>
          <ThemeProvider attribute="class" enableSystem={false}>
            {!isLoginPage && (
              <>
                <Preloader />
                <ScrollToTop />
                <NavBar clss={clss} />
                <BottomMenu />
                <PostPopups />
              </>
            )}
            {children}
          </ThemeProvider>
        </Provider>
      </body>
    </html>
  );
}
