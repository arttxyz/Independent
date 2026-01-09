import React, { useState, useRef, useEffect } from "react";
import { X, Download, Play, Pause, Music, Volume2, VolumeX, Volume1 } from "lucide-react";
import { Track } from "@/lib/albumTracks";
import AudioVisualizer from "./AudioVisualizer"; // Mantenha apenas UMA linha desta

interface AlbumTracksModalProps {
  isOpen: boolean;
  onClose: () => void;
  albumTitle: string;
  artistName: string;
  tracks: Track[];
}


export default function AlbumTracksModal({
  isOpen,
  onClose,
  albumTitle,
  artistName,
  tracks,
}: AlbumTracksModalProps) {
  const [playingTrackId, setPlayingTrackId] = useState<string | null>(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [volume, setVolume] = useState(0.7); // Volume padrão 70%
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const PREVIEW_LIMIT = 10; // 10 segundos de preview

  useEffect(() => {
    if (!isOpen) {
      stopAudio();
    }
    return () => stopAudio();
  }, [isOpen]);

  // Atualizar volume do áudio atual quando o slider mudar
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  const stopAudio = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current = null;
    }
    setPlayingTrackId(null);
    setCurrentTime(0);
  };

  const togglePlay = (track: Track) => {
    if (playingTrackId === track.id) {
      stopAudio();
    } else {
      stopAudio();
      console.log(`Tentando reproduzir: ${track.title} de ${track.fileUrl}`);
      
      const audio = new Audio();
      // Adicionar timestamp para evitar cache do navegador que pode causar erros
      audio.src = `${track.fileUrl}?t=${Date.now()}`;
      audio.volume = volume;
      
      audio.addEventListener("canplaythrough", () => {
        console.log("Áudio carregado e pronto para tocar.");
        audio.play().catch(err => {
          console.error("Erro ao dar play no áudio:", err);
          alert("Erro ao reproduzir áudio. Verifique se o arquivo existe na pasta correta.");
        });
      });

      audio.addEventListener("error", (e) => {
        const target = e.target as HTMLAudioElement;
        console.error("Erro detalhado no áudio:", {
          error: target.error,
          src: target.src,
          code: target.error?.code
        });
        alert(`Não foi possível carregar o áudio: ${track.title}\nVerifique se o arquivo existe em: public${track.fileUrl}`);
        stopAudio();
      });

      audio.addEventListener("timeupdate", () => {
        setCurrentTime(audio.currentTime);
        if (audio.currentTime >= PREVIEW_LIMIT) {
          console.log("Limite de 10 segundos atingido.");
          stopAudio();
        }
      });

      audio.addEventListener("ended", () => stopAudio());
      
      audioRef.current = audio;
      setPlayingTrackId(track.id);
    }
  };

  const getVolumeIcon = () => {
    if (volume === 0) return <VolumeX className="w-5 h-5" />;
    if (volume < 0.5) return <Volume1 className="w-5 h-5" />;
    return <Volume2 className="w-5 h-5" />;
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-300">
      <div 
        className="bg-card border border-border w-full max-w-2xl max-h-[80vh] flex flex-col shadow-[0_0_50px_rgba(0,0,0,0.5)] animate-in zoom-in-95 duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-6 border-b border-border flex justify-between items-start">
          <div>
            <h2 className="font-heading text-2xl text-foreground mb-1">{albumTitle}</h2>
            <p className="font-body text-muted-foreground">{artistName}</p>
            <p className="font-caption text-xs text-accent mt-2 flex items-center gap-1">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-accent"></span>
              </span>
              Preview de 10 segundos disponível
            </p>
          </div>
          <div className="flex items-center gap-4">
            {/* Universal Volume Control */}
            <div className="flex items-center gap-3 bg-secondary/50 px-3 py-2 rounded-full border border-border">
              <button 
                onClick={() => setVolume(volume === 0 ? 0.7 : 0)}
                className="text-accent hover:text-accent/80 transition-colors"
              >
                {getVolumeIcon()}
              </button>
              <input
                type="range"
                min="0"
                max="1"
                step="0.01"
                value={volume}
                onChange={(e) => setVolume(parseFloat(e.target.value))}
                className="w-20 h-1.5 bg-border rounded-lg appearance-none cursor-pointer accent-accent"
              />
              <span className="font-mono text-[10px] text-muted-foreground w-8">
                {Math.round(volume * 100)}%
              </span>
            </div>

            <button 
              onClick={onClose}
              className="text-muted-foreground hover:text-foreground transition-colors p-1"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Tracks List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-2 custom-scrollbar">
          {tracks.length === 0 ? (
            <div className="py-12 text-center text-muted-foreground">
              <Music className="w-12 h-12 mx-auto mb-4 opacity-20" />
              <p>Nenhuma música encontrada para este álbum.</p>
            </div>
          ) : (
            tracks.map((track, index) => (
              <div 
                key={track.id}
                className={`group flex items-center gap-4 p-3 rounded-lg transition-all duration-200 ${
                  playingTrackId === track.id 
                    ? "bg-accent/10 border border-accent/30" 
                    : "hover:bg-secondary border border-transparent"
                }`}
              >
                {/* Play/Pause Button */}
                <button
                  onClick={() => togglePlay(track)}
                  className={`w-10 h-10 flex items-center justify-center rounded-full transition-all ${
                    playingTrackId === track.id
                      ? "bg-accent text-accent-foreground"
                      : "bg-secondary text-foreground group-hover:bg-accent group-hover:text-accent-foreground"
                  }`}
                >
                  {playingTrackId === track.id ? (
                    <Pause className="w-5 h-5" />
                  ) : (
                    <Play className="w-5 h-5 ml-1" />
                  )}
                </button>

                {/* Track Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs text-muted-foreground">
                      {(index + 1).toString().padStart(2, '0')}
                    </span>
                    <h4 className="font-subheading text-sm truncate">{track.title}</h4>
                  </div>
                  <div className="flex items-center gap-4 mt-1">
                    <span className="font-body text-xs text-muted-foreground">{track.duration}</span>
                    {playingTrackId === track.id && (
                      <div className="flex items-center gap-2">
                        <AudioVisualizer isPlaying={true} />
                        <span className="font-mono text-[10px] text-accent">
                          {currentTime.toFixed(1)}s / {PREVIEW_LIMIT}s
                        </span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Download Individual */}
                <button 
                  className="p-2 text-muted-foreground hover:text-accent transition-colors"
                  title="Baixar esta música"
                  onClick={() => alert(`Iniciando download de: ${track.title}`)}
                >
                  <Download className="w-5 h-5" />
                </button>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-border bg-secondary/50">
          <button 
            className="w-full bg-accent text-accent-foreground font-subheading py-4 flex items-center justify-center gap-2 hover:shadow-[0_0_30px_rgba(34,197,94,0.4)] transition-all active:scale-[0.98]"
            onClick={() => alert("Iniciando download do álbum completo...")}
          >
            <Download className="w-5 h-5" />
            Baixar Álbum Completo
          </button>
          <p className="text-center text-[10px] text-muted-foreground mt-3 uppercase tracking-widest">
            Formato MP3 320kbps • Alta Qualidade
          </p>
        </div>
      </div>
    </div>
  );
}
