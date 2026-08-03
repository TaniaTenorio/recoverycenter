"use client";

import { FormEvent, useState } from "react";

type SubmitState = "idle" | "loading" | "success" | "error";

const initialValues = {
  name: "",
  email: "",
  phone: "",
  message: "",
  company: "",
  sourcePath: "",
};

export default function ContactForm() {
  const [values, setValues] = useState({
    ...initialValues,
    sourcePath:
      typeof window !== "undefined" ? window.location.pathname : "/contacto",
  });
  const [state, setState] = useState<SubmitState>("idle");
  const [feedback, setFeedback] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setState("loading");
    setFeedback("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      const data = (await response.json()) as { message?: string };

      if (!response.ok) {
        throw new Error(data.message || "No se pudo enviar el formulario.");
      }

      setState("success");
      setFeedback(data.message || "Mensaje enviado correctamente.");
      setValues(initialValues);
    } catch (error) {
      setState("error");
      setFeedback(
        error instanceof Error
          ? error.message
          : "Error inesperado al enviar el formulario.",
      );
    }
  }

  return (
    <form
      className="contact-form"
      aria-label="Formulario de contacto"
      onSubmit={handleSubmit}
    >
      <label>
        Nombre
        <input
          type="text"
          name="name"
          placeholder="Tu nombre"
          value={values.name}
          onChange={(event) =>
            setValues((current) => ({ ...current, name: event.target.value }))
          }
          required
          minLength={2}
          maxLength={120}
        />
      </label>
      <label>
        Correo
        <input
          type="email"
          name="email"
          placeholder="tu@email.com"
          value={values.email}
          onChange={(event) =>
            setValues((current) => ({ ...current, email: event.target.value }))
          }
          required
        />
      </label>
      <label>
        Telefono
        <input
          type="tel"
          name="phone"
          placeholder="Tu número de teléfono"
          value={values.phone}
          onChange={(event) =>
            setValues((current) => ({
              ...current,
              phone: event.target.value.replace(/\D/g, ""),
            }))
          }
          inputMode="numeric"
          autoComplete="tel"
          required
          minLength={7}
          maxLength={25}
          pattern="\d+"
          title="Usa sólo números"
        />
      </label>
      <label>
        Mensaje
        <textarea
          name="message"
          rows={5}
          placeholder="Cuéntanos tu caso"
          value={values.message}
          onChange={(event) =>
            setValues((current) => ({ ...current, message: event.target.value }))
          }
          required
          minLength={10}
          maxLength={4000}
        />
      </label>

      {/* Honeypot field for basic bot filtering. */}
      <input
        type="text"
        name="company"
        value={values.company}
        onChange={(event) =>
          setValues((current) => ({ ...current, company: event.target.value }))
        }
        autoComplete="off"
        tabIndex={-1}
        className="hidden-field"
        aria-hidden="true"
      />

      <button type="submit" className="btn btn-primary" disabled={state === "loading"}>
        {state === "loading" ? "Enviando..." : "Enviar"}
      </button>

      {feedback ? (
        <p
          className={`form-status ${state === "success" ? "status-success" : "status-error"}`}
          role="status"
          aria-live="polite"
        >
          {feedback}
        </p>
      ) : null}
    </form>
  );
}
