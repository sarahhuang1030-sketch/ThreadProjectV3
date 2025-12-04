"use client";

import "bootstrap/dist/css/bootstrap.min.css";
import "./globals.css";
//import "./sarahstyle.css";
//import "./nikitha.css";
import { useEffect } from "react";
import { Abril_Fatface } from "next/font/google";
import Link from "next/link";
//import Script from "next/script";
import "../app/styles/sarahstyle.css";
import { UserProvider } from "./context/usercontext";
import { useUser } from "./context/usercontext";
import { useLanguage, LanguageProvider } from "./context/languagecontext";
import LanguageSwitcher from "./components/languageswitcher";

const abrilFatface = Abril_Fatface({
  weight: ["400"],
  subsets: ["latin"],
  variable: "--font-abril-fatface", // Optional: for CSS variable usage
});

export function Heading() {
  const { user, setUser, loading } = useUser();
  const {t} = useLanguage();

  if (loading) {
    return <div>{t(`header.loading`)}...</div>;
  }

  return (
    <header className={`bg-body-tertiary py-4  ${abrilFatface.className}`}>
      <div className="container ">
        <div className="row ">
          {/* Logo and tagline */}
          <div className="col-md-4  pt-3">
            <Link href="/" className="text-decoration-none">
              <h4 className="text-uppercase text-secondary text-decoration-none">
                {t(`header.world_travel`)}
              </h4>
            </Link>
          </div>

          {/* Quick links */}
          <div className="col-md-4  pt-3 ">
            <ul className="list-unstyled flex flex-row ">
              <li>
                <Link
                  href="/vacation-package"
                  className="text-secondary pr-6 text-decoration-none"
                >
                  {t(`header.vacation_package`)}
                </Link>
              </li>
             
              <li>
                <Link
                  href="/contact"
                  className="text-secondary pr-6 text-decoration-none"
                >
                   {t(`header.contact`)}
                </Link>
              </li>
            </ul>
          </div>
          {/* Greeting */}
          <div className="col-md-4 pt-3 text-end">
            {user ? (
              <>
                <span className="text-secondary small me-3">
                   {t(`header.welcome`)}, {user.CustLastName}!
                </span>
                <button
                  className="btn btn-sm btn-outline-secondary"
                  onClick={() => {
                    localStorage.removeItem("CustomerID");
                    // window.location.reload();  refresh to update UI
                    setUser(null); // instantly update UI
                  }}
                >
                   {t(`header.logout`)}
                </button>
              </>
            ) : (
              <Link href="/login" className="btn btn-sm btn-outline-primary">
                 {t(`header.login`)}
              </Link>
            )}
          </div>

          {/* languae picker */}
          <LanguageSwitcher />
        </div>
      </div>
    </header>
  );
}

export function Footer() {
  const {t} = useLanguage();
  return (
    <footer className={`bg-body-tertiary py-4 mt-5 ${abrilFatface.className}`}>
      <div className="container">
        <div className="row">
          {/* Logo and tagline */}
          <div className="col-md-4 mb-3">
            <h4 className="text-uppercase text-secondary">{t(`header.world_travel`)}</h4>
            <p className="small text-secondary">{t(`footer.explore._dream._discover.`)}</p>
          </div>

          {/* Quick links */}
          <div className="col-md-4 mb-3 text-secondary">
            <h5>{t(`footer.quick_links`)}</h5>
            <ul className="list-unstyled">
              <li>
                <Link
                  href="/vacation-package"
                  className="text-secondary text-decoration-none"
                >
                  {t(`header.vacation_package`)}
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-secondary pr-6 text-decoration-none"
                >
                  {t(`header.contact`)}
                </Link>
              </li>

              <li>
                <Link
                  href="/customer"
                  className="text-secondary text-decoration-none"
                >
                  {t(`footer.register`)}
                </Link>
              </li>
            </ul>
          </div>

          {/* Social or contact */}
          <div className="col-md-4 mb-3">
            <h5 className="text-secondary">{t(`footer.connect`)}</h5>
            <p className="small text-secondary">{t(`footer.email`)}: info@worldtravel.com</p>
            <p className="small text-secondary">{t(`footer.phone`)}: +1 (800) 555-TRVL</p>
          </div>
        </div>

        <hr className="border-dark" />
        <div className="text-center small text-secondary">
          &copy; {new Date().getFullYear()} {t(`header.world_travel`)}. {t(`footer.all_rights_reserved`)}.
        </div>
      </div>
    </footer>
  );
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <LanguageProvider>
          <UserProvider>
            <Heading />
            <main>{children}</main>
            <Footer />
          </UserProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
