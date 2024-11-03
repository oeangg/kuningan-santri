import React from "react";

export default function Layout({ children }) {
  return (
    <section className="w-full h-screen flex justify-center items-center bg-twBlue">
      {children}
    </section>
  );
}
