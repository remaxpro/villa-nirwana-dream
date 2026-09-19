import { useState } from "react";
import { Link, createFileRoute, useNavigate } from "@tanstack/react-router";
import { ArrowLeft, Loader2, LogIn } from "lucide-react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import logoAsset from "@/assets/vila-nirwana-logo.png.asset.json";

export const Route = createFileRoute("/masuk")({
  head: () => ({
    meta: [
      { title: "Masuk Pengelola — Vila Nirwana Bandungan" },
      { name: "description", content: "Halaman masuk pengelola Vila Nirwana Bandungan untuk melihat daftar reservasi yang masuk." },
      { name: "robots", content: "noindex" },
      { property: "og:title", content: "Masuk Pengelola — Vila Nirwana Bandungan" },
      { property: "og:description", content: "Akses khusus pengelola vila." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: MasukPage,
});

const inputClass =
  "w-full rounded-md border border-border bg-card px-4 py-3 text-sm text-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20";

function MasukPage() {
  const navigate = useNavigate();
  const [mode, setMode] = useState<"masuk" | "daftar">("masuk");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [pesan, setPesan] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setPesan("");
    setLoading(true);

    if (mode === "masuk") {
      const { error: authError } = await supabase.auth.signInWithPassword({ email, password });
      setLoading(false);
      if (authError) return setError("Email atau kata sandi belum sesuai.");
      navigate({ to: "/dashboard" });
      return;
    }

    const { error: authError } = await supabase.auth.signUp({
      email,
      password,
      options: { emailRedirectTo: `${window.location.origin}/dashboard` },
    });
    setLoading(false);
    if (authError) return setError(authError.message);
    setPesan("Akun dibuat. Cek email Anda untuk tautan konfirmasi, lalu masuk kembali.");
    setMode("masuk");
  };

  return (
    <main className="flex min-h-svh flex-col items-center justify-center bg-surface px-5 py-14">
      <Link to="/" className="mb-8 flex items-center gap-2.5">
        <img src={logoAsset.url} alt="Logo Vila Nirwana Bandungan" className="size-10 rounded-full" />
        <span className="font-display text-xl text-foreground">Vila Nirwana Bandungan</span>
      </Link>

      <div className="w-full max-w-md rounded-lg border border-border bg-card p-7 shadow-soft sm:p-9">
        <h1 className="text-3xl">{mode === "masuk" ? "Masuk pengelola" : "Buat akun pengelola"}</h1>
        <p className="mt-2 text-sm leading-6 text-muted-foreground">
          Halaman ini hanya untuk pengelola vila, agar bisa melihat seluruh reservasi yang masuk.
        </p>

        <form onSubmit={handleSubmit} className="mt-7 flex flex-col gap-5">
          <div>
            <label htmlFor="email" className="mb-2 block text-sm font-semibold">Email</label>
            <input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} className={inputClass} required />
          </div>
          <div>
            <label htmlFor="password" className="mb-2 block text-sm font-semibold">Kata sandi</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              minLength={6}
              className={inputClass}
              required
            />
          </div>

          {error && (
            <p role="alert" className="rounded-md border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm text-destructive">{error}</p>
          )}
          {pesan && <p className="rounded-md border border-primary/25 bg-secondary px-4 py-3 text-sm">{pesan}</p>}

          <Button type="submit" variant="gold" size="lg" disabled={loading}>
            {loading ? <Loader2 className="size-5 animate-spin" /> : <LogIn className="size-5" />}
            {mode === "masuk" ? "Masuk" : "Daftar"}
          </Button>
        </form>

        <button
          type="button"
          onClick={() => { setMode(mode === "masuk" ? "daftar" : "masuk"); setError(""); setPesan(""); }}
          className="mt-5 w-full text-center text-sm text-primary underline-offset-4 hover:underline"
        >
          {mode === "masuk" ? "Belum punya akun pengelola? Daftar" : "Sudah punya akun? Masuk"}
        </button>
      </div>

      <Button asChild variant="ghost" className="mt-6"><Link to="/"><ArrowLeft className="size-4" /> Kembali ke beranda</Link></Button>
    </main>
  );
}
