import { createContext, useContext, useState, ReactNode, useEffect } from "react";
import { CartItem } from "./CartContext";

interface AuthContextType {
  isLoggedIn: boolean;
  login: () => void;
  logout: () => void;
  purchasedAlbums: CartItem[];
  addPurchasedAlbums: (albums: CartItem[]) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [purchasedAlbums, setPurchasedAlbums] = useState<CartItem[]>([]);

  // Carregar dados do localStorage ao iniciar
  useEffect(() => {
    const savedLogin = localStorage.getItem("imh_isLoggedIn");
    const savedAlbums = localStorage.getItem("imh_purchasedAlbums");
    
    if (savedLogin === "true") setIsLoggedIn(true);
    if (savedAlbums) {
      try {
        const albums: CartItem[] = JSON.parse(savedAlbums);
        // Limpeza automática de duplicatas por Título + Artista ao carregar
        const uniqueAlbums = albums.reduce((acc: CartItem[], current) => {
          const x = acc.find(item => item.albumTitle === current.albumTitle && item.artistName === current.artistName);
          if (!x) {
            return acc.concat([current]);
          } else {
            // Se houver duplicata, prefere o que tem ID numérico curto (o novo padrão)
            if (current.id.length < x.id.length) {
              return acc.filter(item => item !== x).concat([current]);
            }
            return acc;
          }
        }, []);
        
        setPurchasedAlbums(uniqueAlbums);
        localStorage.setItem("imh_purchasedAlbums", JSON.stringify(uniqueAlbums));
      } catch (e) {
        console.error("Erro ao carregar álbuns salvos", e);
      }
    }
  }, []);

  const login = () => {
    setIsLoggedIn(true);
    localStorage.setItem("imh_isLoggedIn", "true");
  };

  const logout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem("imh_isLoggedIn");
  };

  const addPurchasedAlbums = (newAlbums: CartItem[]) => {
    setPurchasedAlbums((prev) => {
      const updated = [...prev];
      newAlbums.forEach(album => {
        // Verifica se o álbum já existe por ID ou por combinação de Título + Artista (para evitar duplicatas de legado)
        const alreadyExists = updated.find(a => 
          a.id === album.id || 
          (a.albumTitle === album.albumTitle && a.artistName === album.artistName)
        );
        
        if (!alreadyExists) {
          updated.push(album);
        }
      });
      localStorage.setItem("imh_purchasedAlbums", JSON.stringify(updated));
      return updated;
    });
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout, purchasedAlbums, addPurchasedAlbums }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth deve ser usado dentro de AuthProvider");
  }
  return context;
}
