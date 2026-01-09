import { Artist } from "@/lib/mockData";
import { Music, Cloud, Play, Pause, Volume2, VolumeX } from "lucide-react";
import { useState, useRef } from "react";
import { useLocation } from "wouter";
import { useCart } from "@/contexts/CartContext";
import { toast } from "sonner";

interface ArtistCardProps {
  artist: Artist;
}

const artistPreviewMap: Record<string, string> = {
  osamason: "/audio-previews/osamason-preview.mp3",
  twikipedia: "/audio-previews/twikipedia-preview.mp3",
  keyvslocket: "/audio-previews/keyvslocket-preview.mp3",
  bunii: "/audio-previews/bunii-preview.mp3",
  jaydes: "/audio-previews/jaydes-preview.mp3",
};

// Variável global para rastrear qual áudio está tocando
let currentAudio: HTMLAudioElement | null = null;
let currentArtistId: string | null = null;

export default function ArtistCard({ artist }: ArtistCardProps) {
  const [, setLocation] = useLocation();
  const { addToCart } = useCart();
  const [expanded, setExpanded] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.3);
  const [showVolumeSlider, setShowVolumeSlider] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  const previewUrl = artistPreviewMap[artist.id];

  const handlePlayPause = () => {
    if (!audioRef.current) return;

    // Se outro áudio está tocando, para ele
    if (currentAudio && currentAudio !== audioRef.current) {
      currentAudio.pause();
      // Atualiza o estado do artista anterior se necessário
      if (currentArtistId) {
        const prevArtistElements = document.querySelectorAll(
          `[data-artist-id="${currentArtistId}"]`
        );
        prevArtistElements.forEach((el) => {
          const btn = el.querySelector("button[data-play-btn]");
          if (btn) {
            btn.setAttribute("data-playing", "false");
          }
        });
      }
    }

    // Toca ou pausa o áudio atual
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
      currentAudio = null;
      currentArtistId = null;
    } else {
      audioRef.current.play();
      setIsPlaying(true);
      currentAudio = audioRef.current;
      currentArtistId = artist.id;
    }
  };

  const handleAudioEnd = () => {
    setIsPlaying(false);
    currentAudio = null;
    currentArtistId = null;
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    if (audioRef.current) {
      audioRef.current.volume = newVolume;
    }
  };

  const handleBuyClick = (album: typeof artist.albums[0]) => {
    // Adicionar álbum ao carrinho
    addToCart({
      id: album.id,
      albumTitle: album.title,
      artistName: artist.name,
      price: album.price,
      coverImage: artist.avatar,
    });
    
    toast.success(`${album.title} adicionado ao carrinho!`);
    
    // Redirecionar para o carrinho
    setTimeout(() => {
      setLocation("/cart");
    }, 500);
  };

  return (
    <div className="border border-border bg-background hover:border-accent hover:shadow-[0_0_20px_rgba(0,217,255,0.1)] transition-all duration-300 p-6 md:p-8 animate-in fade-in duration-500" data-artist-id={artist.id}>
      {/* Header do Artista */}
      <div className="mb-8 pb-8 border-b border-border space-y-4">
        <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-6">
          <div className="flex-1 flex items-center gap-3">
            {previewUrl && (
              <>
                <div className="flex items-center gap-2">
                  <button
                    onClick={handlePlayPause}
                    className="flex-shrink-0 w-10 h-10 flex items-center justify-center bg-accent text-accent-foreground hover:shadow-[0_0_15px_rgba(0,217,255,0.3)] transition-all duration-300 active:scale-95"
                    title={isPlaying ? "Pause preview" : "Play preview"}
                    data-play-btn
                    data-playing={isPlaying}
                  >
                    {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
                  </button>

                  {/* Botão de Volume */}
                  <div className="relative">
                    <button
                      onClick={() => setShowVolumeSlider(!showVolumeSlider)}
                      className="flex-shrink-0 w-10 h-10 flex items-center justify-center border border-accent text-accent hover:bg-accent hover:text-accent-foreground hover:shadow-[0_0_15px_rgba(0,217,255,0.3)] transition-all duration-300 active:scale-95"
                      title="Volume control"
                    >
                      {volume === 0 ? (
                        <VolumeX className="w-5 h-5" />
                      ) : (
                        <Volume2 className="w-5 h-5" />
                      )}
                    </button>

                    {/* Slider de Volume */}
                    {showVolumeSlider && (
                      <div className="absolute left-0 top-12 bg-background border border-accent p-3 rounded shadow-lg z-10 flex flex-col items-center gap-2">
                        <input
                          type="range"
                          min="0"
                          max="1"
                          step="0.1"
                          value={volume}
                          onChange={handleVolumeChange}
                          className="w-24 h-2 bg-secondary rounded-lg appearance-none cursor-pointer accent-accent"
                          title="Volume"
                        />
                        <span className="text-xs text-muted-foreground font-body">
                          {Math.round(volume * 100)}%
                        </span>
                      </div>
                    )}
                  </div>
                </div>

                <audio
                  ref={audioRef}
                  src={previewUrl}
                  onEnded={handleAudioEnd}
                />
              </>
            )}
            <div>
              <h2 className="font-display text-2xl md:text-3xl mb-3 leading-tight">{artist.name}</h2>
              <div className="flex items-center gap-2">
                <Music className="w-4 h-4 text-accent flex-shrink-0" />
                <span className="font-body text-sm text-muted-foreground">
                  {artist.monthlyListeners.toLocaleString()} monthly listeners
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Links de Streaming */}
        <div className="flex flex-wrap gap-3">
          {artist.spotifyUrl && (
            <a
              href={artist.spotifyUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 border border-accent text-accent hover:bg-accent hover:text-accent-foreground hover:shadow-[0_0_15px_rgba(0,217,255,0.3)] transition-all duration-300"
            >
              <Music className="w-4 h-4" />
              <span className="font-subheading text-sm">Spotify</span>
            </a>
          )}
          {artist.soundcloudUrl && (
            <a
              href={artist.soundcloudUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 border border-accent text-accent hover:bg-accent hover:text-accent-foreground hover:shadow-[0_0_15px_rgba(0,217,255,0.3)] transition-all duration-300"
            >
              <Cloud className="w-4 h-4" />
              <span className="font-subheading text-sm">SoundCloud</span>
            </a>
          )}
        </div>
      </div>

      {/* Bio */}
      <div className="mb-8 pb-8 border-b border-border">
        <p className="font-body text-foreground leading-relaxed">{artist.bio}</p>
      </div>

      {/* Álbuns */}
      <div>
        <h3 className="font-heading mb-6 text-2xl">Available Albums</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {artist.albums.map((album) => (
            <div
              key={album.id}
              className="border border-border p-4 hover:border-accent hover:bg-secondary hover:shadow-[0_0_15px_rgba(0,217,255,0.1)] transition-all duration-300 group cursor-pointer"
            >
              <div className="mb-3 space-y-1">
                <h4 className="font-subheading text-sm group-hover:text-accent transition-colors duration-300 line-clamp-2">
                  {album.title}
                </h4>
                <p className="font-caption text-xs">
                  {new Date(album.releaseDate).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })}
                </p>
              </div>
              <div className="flex items-center justify-between pt-3 border-t border-border">
                <span className="font-display text-lg text-accent">${album.price.toFixed(2)}</span>
                <button 
                  onClick={() => handleBuyClick(album)}
                  className="px-3 py-1 bg-accent text-accent-foreground font-subheading text-xs hover:shadow-[0_0_15px_rgba(0,217,255,0.3)] transition-all duration-300 active:scale-95"
                >
                  Buy
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Toggle para expandir/recolher */}
      {artist.albums.length > 3 && (
        <button
          onClick={() => setExpanded(!expanded)}
          className="mt-8 font-subheading text-sm text-accent hover:text-accent-foreground transition-colors duration-300 flex items-center gap-2"
        >
          {expanded ? "Show less" : "Show more"}
          <span className={`transition-transform duration-300 ${expanded ? "rotate-180" : ""}`}>↓</span>
        </button>
      )}
    </div>
  );
}
