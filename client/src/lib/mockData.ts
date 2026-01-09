export interface Album {
  id: string;
  title: string;
  price: number;
  releaseDate: string;
}

export interface Artist {
  id: string;
  name: string;
  monthlyListeners: number;
  spotifyUrl?: string;
  soundcloudUrl?: string;
  bio: string;
  albums: Album[];
  avatar?: string;
}

export const artists: Artist[] = [
  {
    id: "osamason",
    name: "OsamaSon",
    monthlyListeners: 1659797,
    spotifyUrl: "https://open.spotify.com/intl-pt/artist/0uj6QiPsPfK8ywLC7uwBE1",
    soundcloudUrl: "https://soundcloud.com/osamason",
    bio: "OsamaSon é um jovem rapper de 21 anos que conquistou a cena underground com seus beats inovadores e letras autênticas. Enfrentou vazamentos de álbuns no início de sua carreira, o que o motivou a buscar plataformas seguras para distribuir sua música. Apoiar artistas como OsamaSon através de compras diretas garante que 100% da receita vá diretamente para o criador, sem intermediários. Isso permite que ele continue produzindo música de qualidade sem depender de grandes gravadoras.",
    albums: [
      { id: "1", title: "Flex Musix", price: 9.99, releaseDate: "2023-12-8" },
      { id: "2", title: "psykotic", price: 12.99, releaseDate: "2025-10-10" },
      { id: "3", title: "Osama Season", price: 11.99, releaseDate: "2023-07-21" },
    ],
  },
  {
    id: "twikipedia",
    name: "Twikipedia",
    monthlyListeners: 64916,
    spotifyUrl: "https://open.spotify.com/intl-pt/artist/2V8aJ7qCArKAmHAX7u81Sj",
    soundcloudUrl: "https://soundcloud.com/twikipedia",
    bio: "Twikipedia (também conhecido como Delta) é um artista experimental de 20 anos de Niterói, Rio de Janeiro. Sua música combina elementos de eletrônico, hip-hop e experimentação sonora. Enfrentou vazamentos que prejudicaram seus lançamentos, levando-o a valorizar plataformas seguras. Quando você compra um álbum digital de Twikipedia aqui, você está investindo diretamente na criatividade independente. Artistas como ele precisam de apoio direto dos fãs para continuar inovando e criando sem pressões comerciais.",
    albums: [
      { id: "4", title: "chronic", price: 8.99, releaseDate: "2022-12-9" },
      { id: "5", title: "for the rest of your life", price: 10.99, releaseDate: "2024-05-10" },
      { id: "6", title: "still-life", price: 9.99, releaseDate: "2024-1-1" },
    ],
  },
  {
    id: "keyvslocket",
    name: "Key vs. Locket",
    monthlyListeners: 19128,
    spotifyUrl: "https://open.spotify.com/intl-pt/artist/65e0nXD12XNTrtQsej3aQo",
    soundcloudUrl: "https://soundcloud.com/keyvslocket",
    bio: "Key vs. Locket é uma artista brasileira de Niterói que mistura rock, indie e elementos eletrônicos. Nascida em 2004, ela representa a nova geração de músicos independentes que recusam se afiliar a grandes gravadoras. Seus trabalhos já sofreram vazamentos que prejudicaram suas estratégias de lançamento. Comprar seus álbuns digitais aqui significa apoiar uma artista que mantém sua liberdade criativa e controle total sobre sua obra. Sem intermediários, ela pode investir em melhor produção e continuar crescendo organicamente.",
    albums: [
      { id: "7", title: "I Felt Like a Sketch", price: 10.99, releaseDate: "2024-04-11" },
      { id: "8", title: "Coincidência", price: 9.99, releaseDate: "2024-02-17" },
      { id: "9", title: "My Demos", price: 7.99, releaseDate: "2024-11-11" },
    ],
  },
  {
    id: "bunii",
    name: "Bunii",
    monthlyListeners: 295367,
    spotifyUrl: "https://open.spotify.com/intl-pt/artist/6mx3Y8XNLPaS2pjJbQFq3W",
    soundcloudUrl: "https://soundcloud.com/lovebunii",
    bio: "Bunii é um produtor que cria 'deep fluffy hybrid melodic sexy trap house music'. Com mais de 400 mil seguidores no SoundCloud, ele representa a força da comunidade independente. Seus trabalhos já enfrentaram vazamentos que prejudicaram seus lançamentos e receita. Quando você compra um álbum de Bunii, você está garantindo que ele possa continuar produzindo a música que ama sem depender de contratos restritivos. Artistas independentes como Bunii precisam do apoio direto de seus fãs para prosperar.",
    albums: [
      { id: "10", title: "8:30 is to early", price: 11.99, releaseDate: "2025-01-10" },
      { id: "11", title: "SIX", price: 10.99, releaseDate: "2024-10-18" },
      { id: "12", title: "bastard", price: 12.99, releaseDate: "2025-07-25" },
    ],
  },
  {
    id: "jaydes",
    name: "Jaydes",
    monthlyListeners: 1707981,
    spotifyUrl: "https://open.spotify.com/intl-pt/artist/5zI4LODdVYwnKZHv4mDHRv",
    soundcloudUrl: "https://soundcloud.com/jaydes",
    bio: "Jaydes é um rapper e produtor nascido em 2006 que começou sua jornada musical ainda jovem. Sua música reflete a realidade da geração independente que quer controle total sobre sua carreira. Enfrentou vazamentos que prejudicaram seus lançamentos iniciais. Apoiar Jaydes através de compras diretas significa investir em um artista que está construindo sua carreira sem depender de grandes gravadoras. Cada compra o ajuda a investir em melhor equipamento, produção e promoção.",
    albums: [
      { id: "13", title: "ghetto cupid", price: 9.99, releaseDate: "2023-08-29" },
      { id: "14", title: "romanticism", price: 11.99, releaseDate: "2022-04-30" },
      { id: "15", title: "Count up Dracula", price: 10.99, releaseDate: "2024-07-19" },
    ],
  },
];
