import React from "react";
import Header from "./Header";
import Footer from "./Footer";

const Layout = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col bg-slate-900">
      <Header />
      <main className="flex-1 px-4 pt-24">{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
