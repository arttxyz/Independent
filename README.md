# Independent Music Hub 🎵

Uma plataforma moderna de venda de álbuns digitais focada em **segurança contra vazamentos** e **apoio direto a artistas independentes**. Sem intermediários, sem gravadoras — **100% da receita vai diretamente para o criador**.

## 🎯 Objetivo

O Independent Music Hub (IMH) foi criado para artistas independentes que sofrem com vazamentos e perdas financeiras. A plataforma oferece:

- **Distribuição Segura** – Proteção contra leaks e compartilhamento não autorizado
- **Suporte Direto ao Artista** – 100% da receita vai para o criador
- **Crescimento Sustentável** – Liberdade sem contratos com gravadoras

---

## 🚀 Como Rodar o Projeto

### Pré-requisitos

Instale o **Node.js** (versão 18+):
- [Download Node.js](https://nodejs.org/)

Verifique se está instalado:

```bash
node --version
npm --version
```

### Passo 1: Extrair o Projeto

Descompacte o arquivo `.zip` em uma pasta da sua escolha.

### Passo 2: Abrir no VS Code

1. Abra o **VS Code**
2. Clique em **File** → **Open Folder**
3. Selecione a pasta do projeto

### Passo 3: Instalar Dependências

Abra o terminal integrado (**Ctrl + `**) e execute:

```bash
npm install --legacy-peer-deps
```

> **Nota:** O `--legacy-peer-deps` resolve conflitos de dependências, especialmente em Windows.

### Passo 4: Iniciar o Servidor de Desenvolvimento

```bash
npm run dev
```

Você verá algo assim:

```
➜  Local:   http://localhost:3000/
```

### Passo 5: Acessar a Aplicação

Abra o navegador e acesse:

```
http://localhost:3000
```

**Pronto! 🎉** O projeto está rodando localmente.

---

## 📁 Estrutura do Projeto

```
IndependentMusicHub/
├── client/                    # Frontend React
│   ├── src/
│   │   ├── components/        # Componentes reutilizáveis
│   │   │   ├── Header.tsx     # Navegação principal
│   │   │   ├── ArtistCard.tsx # Card de artista
│   │   │   └── ui/            # Componentes shadcn/ui
│   │   ├── pages/             # Páginas da aplicação
│   │   │   ├── Home.tsx       # Página principal
│   │   │   └── NotFound.tsx   # Página 404
│   │   ├── lib/               # Mock data e utilidades
│   │   │   └── mockData.ts    # Dados dos artistas
│   │   ├── App.tsx            # Componente raiz
│   │   ├── main.tsx           # Entry point
│   │   └── index.css          # Estilos globais
│   ├── public/                # Arquivos estáticos
│   └── index.html             # HTML principal
├── server/                    # Backend Express (placeholder)
├── shared/                    # Código compartilhado
├── package.json               # Dependências do projeto
├── vite.config.ts             # Configuração do Vite
├── tsconfig.json              # Configuração TypeScript
└── README.md                  # Este arquivo
```

---

## 🎨 Design e Tecnologias

### Stack Tecnológico

- **React 19** – Framework UI moderno
- **Vite** – Build tool rápido
- **Tailwind CSS 4** – Utilitários CSS
- **TypeScript** – Type safety
- **shadcn/ui** – Componentes UI prontos
- **Lucide Icons** – Ícones SVG
- **Wouter** – Roteamento leve

### Design System

Estilo **minimalista moderno** com:

- **Tipografia:** Poppins / DM Sans / Inter
- **Paleta:** Preto e branco com acento **cyan neon (#00D9FF)**
- **Animações:** Suaves (200–300ms)
- **Layout:** Espaço negativo generoso

---

## 📊 Artistas Mockados

O projeto inclui **8 artistas independentes** com dados simulados:

### Artistas Principais (com histórico de vazamentos)

1. **OsamaSon** – 45k ouvintes/mês – Rapper underground
2. **Twikipedia** – 28k ouvintes/mês – Artista experimental
3. **Key vs. Locket** – 35k ouvintes/mês – Rock/Indie
4. **Bunii** – 52k ouvintes/mês – Trap/House
5. **Jaydes** – 31k ouvintes/mês – Rapper/Produtor

### Artistas Genéricos

6. **Luna Echo** – 22k ouvintes/mês – Eletrônico
7. **Cipher Beats** – 18k ouvintes/mês – Hip-hop
8. **Violet Pulse** – 26k ouvintes/mês – Indie-pop

Cada artista possui:
- Ouvintes mensais no Spotify
- Links para Spotify e SoundCloud
- Bio detalhada
- 2-3 álbuns disponíveis

---

## 🛠️ Scripts Disponíveis

```bash
# Iniciar servidor de desenvolvimento
npm run dev

# Criar build de produção
npm run build

# Visualizar a build
npm run preview

# Verificar tipos TypeScript
npm run check

# Formatar código
npm run format
```

---

## 🎯 Funcionalidades Já Implementadas

✅ Navegação completa (header + footer)  
✅ Página principal com Hero section  
✅ Cards de artistas com informações completas  
✅ Grid responsivo de álbuns  
✅ Botões de compra (mockados)  
✅ Páginas responsivas (mobile, tablet, desktop)  
✅ Animações suaves  
✅ Paleta minimalista com acento neon  
✅ Links para Spotify e SoundCloud  
✅ Bios detalhadas sobre apoio a artistas independentes  

---

## 📝 Melhorias Futuras

- **Checkout real** – Integração com Stripe / PayPal
- **Páginas dinâmicas de artistas** – Rotas individuais com perfil completo
- **Busca e filtros avançados** – Por gênero, preço, ouvintes
- **Autenticação de usuários** – Login, perfil, wishlist
- **Dashboard para artistas** – Upload, vendas, estatísticas

---

## 🔒 Segurança (implementação futura)

- **DRM** – Digital Rights Management
- **Watermarking** – Marca d'água nos arquivos
- **Streaming seguro** – Ao invés de download direto
- **Hashing de integridade** – Verificação de arquivos

---

## 📞 Suporte

Se encontrar erros ao instalar:

1. **Delete as pastas de cache:**
   ```bash
   rm -rf node_modules
   rm package-lock.json
   ```

2. **Limpe o cache do npm:**
   ```bash
   npm cache clean --force
   ```

3. **Instale novamente:**
   ```bash
   npm install --legacy-peer-deps
   ```

4. **Inicie o servidor:**
   ```bash
   npm run dev
   ```

---

## 📄 Licença

Código aberto. Uso liberado para fins educacionais e comerciais.

---

**Desenvolvido com ❤️ para artistas independentes**
