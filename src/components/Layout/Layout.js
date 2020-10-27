import React from "react";
import Link from "next/link";

const Layout = ({ children }) => {
  return (
    <div
      className="grid min-h-screen"
      style={{ gridTemplateRows: "auto 1fr auto" }}
    >
      <header>
        <nav className="bg-red-600 shadow-xl">
          <ul className="container py-3 mx-auto">
            <li>
              <Link href="/">
                <a className="text-2xl font-bold tracking-wider text-white uppercase">
                  Pokedex
                </a>
              </Link>
            </li>
          </ul>
        </nav>
      </header>
      <main className="bg-indigo-100">{children}</main>
      <footer className="bg-indigo-100">
        <div className="container p-4 mx-auto text-center text-indigo-900">
          &copy; {new Date().getFullYear()} made by{" "}
          <a className="pb-1 font-bold " href="https://github.com/phiilu">
            @phiilu
          </a>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
