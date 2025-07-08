import React, { useState } from "react";

type Props = {
  onLogin: (email: string) => void;
  error?: string;
  loading?: boolean;
};

export default function AuthForm({ onLogin, error, loading }: Props) {
  const [email, setEmail] = useState("jane@example.com");
  return (
    <form
      className="w-full max-w-xs mx-auto my-20 flex flex-col bg-white rounded shadow px-7 py-9"
      onSubmit={e => {
        e.preventDefault();
        onLogin(email);
      }}
    >
      <h2 className="font-bold text-lg text-primary mb-6 text-center">Sign in to Notenest</h2>
      <input
        className="border border-gray-200 rounded px-3 py-2 mb-4 focus:outline-primary"
        type="email"
        value={email}
        placeholder="Enter your email"
        autoFocus
        onChange={e => setEmail(e.target.value)}
        required
      />
      <button
        disabled={loading}
        type="submit"
        className="bg-primary text-white py-2 rounded font-semibold"
      >
        {loading ? "Signing in..." : "Sign in"}
      </button>
      {error && <p className="text-red-400 mt-4">{error}</p>}
    </form>
  );
}
