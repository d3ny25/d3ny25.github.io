import { useState, useRef } from "react";

export default function ContactForm() {
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState("");

  const nameRef = useRef(null);
  const emailRef = useRef(null);
  const messageRef = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("");

    const nombre = nameRef.current.value.trim();
    const correo = emailRef.current.value.trim();
    const mensaje = messageRef.current.value.trim();

    if (!nombre || !correo || !mensaje) {
      setStatus("❌ Todos los campos son obligatorios.");
      return;
    }

    setLoading(true);

    const formData = new FormData();
    formData.append("nombre", nombre);
    formData.append("correo", correo);
    formData.append("mensaje", mensaje);

    try {
      const response = await fetch(
        "https://script.google.com/macros/s/AKfycbwNafce_fmCWE28jG7cwkzBeUDyDvrhKYacpruz_sCH7eY065LJhabmvlXcZJfwhSPV/exec",
        {
          method: "POST",
          body: formData,
        }
      );

      const result = await response.json();

      if (!result.success) throw new Error();

      setStatus("✅ Formulario enviado con éxito.");
      nameRef.current.value = "";
      emailRef.current.value = "";
      messageRef.current.value = "";
    } catch (error) {
      setStatus("❌ Hubo un error al enviar. Intenta de nuevo.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-gray-800 border border-gray-700 shadow-xl rounded-2xl p-8 max-w-xl mx-auto text-gray-100 transition-all duration-300 hover:shadow-indigo-500/10"
    >
      <h2 className="text-3xl font-bold text-indigo-400 mb-6 text-center">
        Contáctame 📬
      </h2>

      {/* Nombre */}
      <div className="mb-4">
        <label className="block text-gray-300 font-semibold mb-2">
          Nombre
        </label>
        <input
          ref={nameRef}
          type="text"
          placeholder="Tu nombre completo"
          className="w-full px-4 py-2 bg-gray-900 border border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none placeholder-gray-400 text-gray-100"
        />
      </div>

      {/* Email */}
      <div className="mb-4">
        <label className="block text-gray-300 font-semibold mb-2">
          Gmail
        </label>
        <input
          ref={emailRef}
          type="email"
          placeholder="tuemail@gmail.com"
          className="w-full px-4 py-2 bg-gray-900 border border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none placeholder-gray-400 text-gray-100"
        />
      </div>

      {/* Mensaje */}
      <div className="mb-6">
        <label className="block text-gray-300 font-semibold mb-2">
          Asunto o Mensaje
        </label>
        <textarea
          ref={messageRef}
          rows="4"
          placeholder="Escribe tu mensaje aquí..."
          className="w-full px-4 py-2 bg-gray-900 border border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none placeholder-gray-400 text-gray-100"
        />
      </div>

      {/* Botón */}
      <div className="text-center">
        <button
          type="submit"
          disabled={loading}
          className="bg-linear-to-r from-indigo-600 to-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:scale-105 hover:shadow-lg hover:shadow-indigo-500/30 transition-all duration-300 disabled:opacity-50 disabled:hover:scale-100"
        >
          {loading ? "Enviando..." : "Enviar mensaje"}
        </button>
      </div>

      {/* Mensaje de estado */}
      {status && (
        <p className="text-center mt-4 text-indigo-400">
          {status}
        </p>
      )}
    </form>
  );
}
