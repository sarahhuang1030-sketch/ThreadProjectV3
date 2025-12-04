"use Client";
import { useEffect } from "react";
import Link from "next/link";
import { useUser } from "./context/usercontext";

export default function Heading() {
  const { user, setUser } = useUser();
  useEffect(() => {
    // Always read from localStorage on mount
    const storedName = localStorage.getItem("CustFirstName");
    if (storedName && !user) {
      setUser(storedName);
    }
  }, []);

  return (
    <header className={`bg-body-tertiary py-4  ${abrilFatface.className}`}>
      <div className="container ">
        <div className="row ">
          {/* Logo and tagline */}
          <div className="col-md-4  pt-3">
            <Link href="/" className="text-decoration-none">
              <h4 className="text-uppercase text-secondary text-decoration-none">
                World Travel
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
                  Vacation Package
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="text-secondary pr-6 text-decoration-none"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-secondary pr-6 text-decoration-none"
                >
                  Contact
                </Link>
              </li>
            
            </ul>
          </div>
          {/* Greeting */}
          <div className="col-md-4 pt-3 text-end">
            {user ? (
              <>
                <span className="text-secondary small me-3">
                  Welcome, {user}!
                </span>
                <button
                  className="btn btn-sm btn-outline-secondary"
                  onClick={() => {
                    localStorage.removeItem("CustFirstName");
                    // window.location.reload();  refresh to update UI
                    setUser(""); // instantly update UI
                  }}
                >
                  Logout
                </button>
              </>
            ) : (
              <Link href="/login" className="btn btn-sm btn-outline-primary">
                Login
              </Link>
            )}
          </div>

          {/* Social or contact */}
        </div>
      </div>
    </header>
  );
}
