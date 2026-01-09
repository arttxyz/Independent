import { Music, LogOut } from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";
import { Link } from "wouter";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";

interface HeaderProps {
  onLoginClick?: () => void;
}

export default function Header({ onLoginClick }: HeaderProps) {
  const { isLoggedIn, logout } = useAuth();

  const handleSupportClick = () => {
    if (isLoggedIn) {
      toast.success("Email de confirmação enviado ao email cadastrado. Em breve iremos te ajudar!");
    } else {
      onLoginClick?.();
    }
  };

  return (
    <header className="border-b border-border bg-background">
      <div className="container flex items-center justify-between py-6">
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 bg-accent flex items-center justify-center group-hover:shadow-[0_0_20px_rgba(34,197,94,0.4)] transition-all duration-300">
            <Music className="w-6 h-6 text-accent-foreground" />
          </div>
          <div className="flex flex-col">
            <span className="font-display text-xl leading-none">IMH</span>
            <span className="font-caption text-xs">Independent Music</span>
          </div>
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          <Link href="/" className="font-subheading text-sm hover:text-accent transition-colors duration-200">
            Home
          </Link>
          <a href="#artists" className="font-subheading text-sm hover:text-accent transition-colors duration-200">
            Artists
          </a>
          <a href="#about" className="font-subheading text-sm hover:text-accent transition-colors duration-200">
            About
          </a>
        </nav>

        <div className="flex items-center gap-4">
          {!isLoggedIn ? (
            <Link href="/login" className="px-6 py-2 border border-accent text-accent font-subheading text-sm hover:bg-accent hover:text-accent-foreground transition-all duration-300">
              Login
            </Link>
          ) : (
            <button
              onClick={logout}
              className="px-6 py-2 border border-destructive text-destructive font-subheading text-sm hover:bg-destructive hover:text-destructive-foreground transition-all duration-300 flex items-center gap-2"
            >
              <LogOut className="w-4 h-4" />
              Logout
            </button>
          )}
          <button
            onClick={handleSupportClick}
            className="px-6 py-2 bg-accent text-accent-foreground font-subheading text-sm hover:shadow-[0_0_20px_rgba(34,197,94,0.4)] transition-all duration-300"
          >
            Support
          </button>
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
