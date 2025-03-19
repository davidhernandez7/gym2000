"use client";

import { Button } from "app/components/ui/button";
import { useState } from "react";

export default function Home() {
  const [data, setData] = useState({ saludo: "" });

  const saludoBack = () => {
    fetch("/api/saludar")
      .then((res) => res.json())
      .then((data) => {
        setData(data);
      });
  };

  return (
    <>
      <Button>Hola racita</Button>
    </>
  );
}