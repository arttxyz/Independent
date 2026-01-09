import { useState } from "react";
import Header from "@/components/Header";
import LoginModal from "@/components/LoginModal";
import ArtistCard from "@/components/ArtistCard";
import { artists } from "@/lib/mockData";
import { Shield, Users, TrendingUp } from "lucide-react";

export default function Home() {
  const [isLoginOpen, setIsLoginOpen] = useState(false);

  const handleScrollToArtists = () => {
    const artistsSection = document.getElementById('artists');
    if (artistsSection) {
      artistsSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header onLoginClick={() => setIsLoginOpen(true)} />
      <LoginModal isOpen={isLoginOpen} onClose={() => setIsLoginOpen(false)} />

      {/* Hero Section */}
      <section className="border-b border-border">
        <div className="container py-16 md:py-32">
          <div className="max-w-3xl animate-in fade-in slide-in-from-bottom-4 duration-700">
            <h1 className="font-display text-4xl md:text-6xl lg:text-7xl mb-6 leading-tight">
              Support Independent
              <span className="neon-accent block">Artists</span>
            </h1>
            <p className="font-body text-base md:text-lg text-muted-foreground mb-8 max-w-2xl leading-relaxed">
              Compre álbuns digitais diretamente de músicos independentes. Sem intermediários, sem vazamentos, sem restrições. Cada compra vai diretamente para o artista.
            </p>
            <button
              onClick={handleScrollToArtists}
              className="px-8 py-4 bg-accent text-accent-foreground font-subheading text-lg hover:shadow-[0_0_30px_rgba(0,217,255,0.5)] transition-all duration-300 active:scale-95"
            >
              Explore Artists
            </button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="border-b border-border">
        <div className="container py-16 md:py-24">
          <h2 className="font-heading text-3xl mb-12">Por que escolher a IMH</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            <div className="border border-border p-6 md:p-8 hover:border-accent hover:shadow-[0_0_15px_rgba(0,217,255,0.1)] transition-all duration-300 animate-in fade-in duration-500">
              <Shield className="w-8 h-8 text-accent mb-4" />
              <h3 className="font-subheading mb-3">Secure Distribution</h3>
              <p className="font-body text-muted-foreground">
                Proteção avançada contra vazamentos e distribuição não autorizada. Sua música permanece protegida.
              </p>
            </div>
            <div className="border border-border p-6 md:p-8 hover:border-accent hover:shadow-[0_0_15px_rgba(0,217,255,0.1)] transition-all duration-300 animate-in fade-in duration-500 delay-100">
              <Users className="w-8 h-8 text-accent mb-4" />
              <h3 className="font-subheading mb-3">Direct Support</h3>
              <p className="font-body text-muted-foreground">
                100% da sua compra vai diretamente para o artista. Sem cortes de rótulos, sem taxas de plataforma.
              </p>
            </div>
            <div className="border border-border p-6 md:p-8 hover:border-accent hover:shadow-[0_0_15px_rgba(0,217,255,0.1)] transition-all duration-300 animate-in fade-in duration-500 delay-200">
              <TrendingUp className="w-8 h-8 text-accent mb-4" />
              <h3 className="font-subheading mb-3">Artist Growth</h3>
              <p className="font-body text-muted-foreground">
                Ajude os artistas a crescer de forma independente, sem afiliação corporativa ou contratos restritivos.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Artists Section */}
      <section id="artists" className="border-b border-border">
        <div className="container py-16 md:py-24">
          <h2 className="font-heading text-3xl md:text-4xl mb-12">Featured Artists</h2>
          <div className="space-y-12">
            {artists.map((artist) => (
              <ArtistCard key={artist.id} artist={artist} />
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="border-b border-border">
        <div className="container py-16 md:py-24">
          <h2 className="font-heading text-3xl md:text-4xl mb-8">Sobre o Independent Music Hub</h2>
          <div className="max-w-3xl space-y-6">
            <p className="font-body text-muted-foreground leading-relaxed">
              Independent Music Hub (IMH) é uma plataforma dedicada a apoiar artistas que optam por permanecer independentes. Acreditamos que os músicos merecem ser donos do seu trabalho, controlar a sua distribuição e receber uma compensação justa diretamente dos seus fãs.
            </p>
            <p className="font-body text-muted-foreground leading-relaxed">
              Numa era em que as fugas digitais ameaçam a subsistência dos artistas, a IMH fornece canais de distribuição seguros que protegem o trabalho criativo, ao mesmo tempo que mantêm ligações diretas entre artistas e fãs. Nossa plataforma elimina intermediários desnecessários, garantindo que cada dólar gasto vá diretamente para o criador.
            </p>
            <p className="font-body text-muted-foreground leading-relaxed">
              Ao comprar álbuns digitais no IMH, você não está apenas comprando música – você está investindo na liberdade artística, na independência criativa e no futuro da música feita nos próprios termos dos artistas.
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border bg-secondary">
        <div className="container py-12">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="font-caption text-xs">© 2025 Independent Music Hub. All rights reserved.</p>
            <p className="font-caption text-xs">Supporting independent artists worldwide</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
