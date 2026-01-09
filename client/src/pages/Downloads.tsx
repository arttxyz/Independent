import { useState } from "react";
import { Link } from "wouter";
import { Music2, Download, ArrowLeft, Package } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import AlbumTracksModal from "@/components/AlbumTracksModal";
import { albumTracks } from "@/lib/albumTracks";

export default function Downloads() {
  const { purchasedAlbums } = useAuth();
  const [selectedAlbum, setSelectedAlbum] = useState<{
    id: string;
    title: string;
    artist: string;
  } | null>(null);

  const handleOpenTracksModal = (albumId: string, albumTitle: string, artistName: string) => {
    setSelectedAlbum({
      id: albumId,
      title: albumTitle,
      artist: artistName,
    });
  };

  const handleCloseModal = () => {
    setSelectedAlbum(null);
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="container py-4 flex items-center justify-between">
          <Link href="/">
            <a className="flex items-center gap-2 hover:opacity-80 transition-opacity">
              <Music2 className="w-6 h-6 text-accent" />
              <span className="font-heading text-xl">Independent Music Hub</span>
            </a>
          </Link>
        </div>
      </header>

      <div className="container py-8">
        <Link href="/">
          <a className="inline-flex items-center gap-2 font-body text-muted-foreground hover:text-foreground transition-colors mb-6">
            <ArrowLeft className="w-4 h-4" />
            Voltar
          </a>
        </Link>

        <div className="mb-8">
          <h1 className="font-display text-4xl mb-2">Meus Downloads</h1>
          <p className="font-body text-muted-foreground">
            Acesse todos os álbuns que você já adquiriu
          </p>
        </div>

        {purchasedAlbums.length === 0 ? (
          // Empty State
          <div className="border border-border bg-card p-12 text-center max-w-2xl mx-auto">
            <Package className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
            <h2 className="font-heading text-2xl mb-2">Nenhum álbum adquirido ainda</h2>
            <p className="font-body text-muted-foreground mb-6">
              Você ainda não realizou nenhuma compra. Explore nossos artistas e adquira seus álbuns favoritos!
            </p>
            <Link href="/">
              <a className="inline-block bg-accent text-accent-foreground font-subheading py-3 px-8 hover:shadow-[0_0_20px_rgba(34,197,94,0.3)] transition-all">
                Explorar Artistas
              </a>
            </Link>
          </div>
        ) : (
          // Albums Grid
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {purchasedAlbums.map((album) => (
              <div
                key={album.id}
                className="border border-border bg-card p-6 hover:border-accent hover:shadow-[0_0_20px_rgba(0,217,255,0.1)] transition-all duration-300 animate-in fade-in"
              >
                {/* Album Cover */}
                {album.coverImage && (
                  <div className="mb-4 aspect-square bg-secondary flex items-center justify-center overflow-hidden">
                    <img
                      src={album.coverImage}
                      alt={album.albumTitle}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                )}

                {/* Album Info */}
                <div className="mb-4">
                  <h3 className="font-subheading text-lg mb-1 line-clamp-2">
                    {album.albumTitle}
                  </h3>
                  <p className="font-body text-sm text-muted-foreground mb-2">
                    {album.artistName}
                  </p>
                  <p className="font-heading text-accent">
                    R$ {album.price.toFixed(2)}
                  </p>
                </div>

                {/* Download Button */}
                <button
                  onClick={() => handleOpenTracksModal(album.id, album.albumTitle, album.artistName)}
                  className="w-full flex items-center justify-center gap-2 bg-accent text-accent-foreground font-subheading py-3 px-4 hover:shadow-[0_0_20px_rgba(34,197,94,0.3)] transition-all duration-300 active:scale-95"
                >
                  <Download className="w-5 h-5" />
                  Baixar Álbum
                </button>

                {/* Additional Info */}
                <div className="mt-4 pt-4 border-t border-border">
                  <p className="font-caption text-xs text-muted-foreground">
                    ID do Pedido: <span className="font-mono">{album.id}</span>
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Info Section */}
        {purchasedAlbums.length > 0 && (
          <div className="mt-12 border border-border bg-card p-6">
            <h3 className="font-heading text-lg mb-4">ℹ️ Informações sobre Downloads</h3>
            <ul className="space-y-2 font-body text-muted-foreground">
              <li>• Você pode baixar seus álbuns quantas vezes quiser</li>
              <li>• Os arquivos estão em formato ZIP com alta qualidade</li>
              <li>• Cada álbum contém todas as faixas em formato MP3 320kbps</li>
              <li>• Os downloads não expiram - você terá acesso permanente</li>
              <li>• Suportamos todos os navegadores modernos</li>
            </ul>
          </div>
        )}
      </div>

      {/* Album Tracks Modal */}
      {selectedAlbum && (
        <AlbumTracksModal
          isOpen={!!selectedAlbum}
          onClose={handleCloseModal}
          albumTitle={selectedAlbum.title}
          artistName={selectedAlbum.artist}
          tracks={albumTracks[selectedAlbum.id] || []}
        />
      )}
    </div>
  );
}
