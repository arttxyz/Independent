import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Music2, Mail, Lock, Eye, EyeOff } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const [, setLocation] = useLocation();

  const handleSpotifyLogin = () => {
    setIsLoading(true);
    // Simulação de redirecionamento para autenticação Spotify
    // Em produção, isso redirecionaria para: https://accounts.spotify.com/authorize
    setTimeout(() => {
      login();
      toast.success("Login com Spotify realizado com sucesso!");
      setIsLoading(false);
      setLocation("/");
    }, 1500);
  };

  const handleEmailLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      login();
      toast.success("Login realizado com sucesso!");
      setIsLoading(false);
      setLocation("/");
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-background text-foreground flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo/Header */}
        <div className="text-center mb-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <Link href="/">
            <a className="inline-flex items-center gap-2 mb-4 hover:opacity-80 transition-opacity">
              <Music2 className="w-8 h-8 text-accent" />
              <span className="font-heading text-2xl">Independent Music Hub</span>
            </a>
          </Link>
          <h1 className="font-display text-3xl mb-2">Bem-vindo de volta</h1>
          <p className="font-body text-muted-foreground">
            Entre para continuar apoiando artistas independentes
          </p>
        </div>

        {/* Login Card */}
        <div className="border border-border bg-card p-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
          {/* Spotify Login Button */}
          <button
            onClick={handleSpotifyLogin}
            disabled={isLoading}
            className="w-full flex items-center justify-center gap-3 bg-[#1DB954] text-white font-subheading py-4 px-6 hover:bg-[#1ed760] transition-all duration-300 hover:shadow-[0_0_20px_rgba(29,185,84,0.3)] active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed mb-6"
          >
            <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/>
            </svg>
            Continuar com Spotify
          </button>

          {/* Divider */}
          <div className="relative mb-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-border"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-card text-muted-foreground font-body">ou continue com email</span>
            </div>
          </div>

          {/* Email Login Form */}
          <form onSubmit={handleEmailLogin} className="space-y-4">
            <div>
              <label htmlFor="email" className="block font-subheading text-sm mb-2">
                Email
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="seu@email.com"
                  required
                  className="w-full pl-11 pr-4 py-3 bg-input border border-border text-foreground font-body focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/20 transition-all"
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block font-subheading text-sm mb-2">
                Senha
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  className="w-full pl-11 pr-12 py-3 bg-input border border-border text-foreground font-body focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/20 transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  className="w-4 h-4 border-border text-accent focus:ring-accent focus:ring-offset-0"
                />
                <span className="font-body text-muted-foreground">Lembrar-me</span>
              </label>
              <a href="#" className="font-body text-accent hover:underline">
                Esqueceu a senha?
              </a>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-accent text-accent-foreground font-subheading py-3 px-6 hover:shadow-[0_0_20px_rgba(34,197,94,0.3)] transition-all duration-300 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? "Entrando..." : "Entrar"}
            </button>
          </form>

          {/* Sign Up Link */}
          <div className="mt-6 text-center">
            <p className="font-body text-muted-foreground">
              Não tem uma conta?{" "}
              <a href="#" className="text-accent font-semibold hover:underline">
                Cadastre-se
              </a>
            </p>
          </div>
        </div>

        {/* Back to Home */}
        <div className="text-center mt-6">
          <Link href="/">
            <a className="font-body text-muted-foreground hover:text-foreground transition-colors">
              ← Voltar para a página inicial
            </a>
          </Link>
        </div>
      </div>
    </div>
  );
}
