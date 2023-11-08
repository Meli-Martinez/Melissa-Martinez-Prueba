import React from "react";
import { useState } from "react";
import * as z from "zod";
import { Link } from "react-router-dom";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Input } from "../../components/input/input.tsx";

import styles from "./user-create.module.scss";

const schema = z.object({
  name: z.string().min(1, { message: "Ingrese su nombre" }),
  email: z
    .string()
    .email({ message: "Email incorrecto" })
    .min(1, { message: "Ingrese un email" }),
  cellphone: z
    .number()
    .int()
    .min(100000000, { message: "El número debe ser de 9 dígitos" })
    .max(999999999, { message: "El número debe ser de máximo 9 dígitos" }),
});

type FormData = z.infer<typeof schema>;

const UserCreate = () => {
  const [error, setError] = useState<string | null>(null);
  const [ data, setData ] = useState({nombre: "", email: "", celular: 0});

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    try {
      const response = await fetch(`https://654acfad5b38a59f28ee3f86.mockapi.io/api/users`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
  
      if (response.ok) {
        const responseData = await response.json();
        console.log(responseData);
        setData(responseData);
      } else {
        const errorData = await response.json();
        setError(errorData.message || "Unknown error");
      }
    } catch (err) {
      console.error(err);
      setError("Network error");
    }
  };

  return (
    <div className={styles.container}>
      <h2>Formulario Usuario</h2>
      <form
        action=""
        onSubmit={handleSubmit(onSubmit)}
      >
          <Input
            id="name"
            type="text"
            placeholder="Nombre"
            {...register("name")}
            error={errors.name?.message}
          />

          <Input
            id="cellphone"
            type="number"
            placeholder="Cellphone"
            {...register('cellphone', {
              setValueAs: (value) => Number(value),
            })}
            error={errors.cellphone?.message}
          />

          <Input
            id="email"
            type="email"
            placeholder="Email"
            {...register("email")}
            error={errors.email?.message}
          />
        <button type="submit">Crear</button>
      </form>
      {error && <p>{error}</p>}

      <div className={styles.dataContainer}>
        <h3>Usuario</h3>
        <p>Nombre</p>
        <p>{data.nombre}</p>
        <p>Email</p>
        <p>{data.email}</p>
        <p>Celular</p>
        <p>{data.celular}</p>
      </div>
      <Link to="/">Volver</Link>
    </div>
  );
};


export { UserCreate };