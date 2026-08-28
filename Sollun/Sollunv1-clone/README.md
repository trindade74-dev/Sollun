# Sollun — Automação de processos

Pitch da Sollun Automation. Projeto atualmente em troca de stack por motivos legais.


## 📂 Estrutura da pagina

```
SollunProject/
├── Pagina/                    # Landing page principal
│   ├── src/
│   │   ├── main.ts           # Chat loop e inicializações
│   │   ├── parallax.ts       # Efeitos parallax e tilt 3D
│   │   ├── sol-lua.ts        # Canvas animation (Sun/Moon)
│   │   ├── demo.ts           # Demo interativa
│   │   ├── ajuda.ts          # Central de ajuda
│   │   └── style.css         # Design System Desert Protocol
│   ├── index.html            # Landing page
│   ├── demo.html             # Página demo interativa
│   ├── ajuda.html            # Central de ajuda
│   ├── vite.config.ts        # Configuração Vite
│   ├── tsconfig.json         # TypeScript config
│   └── package.json
│
├── sollun-animation/         # Projeto separado: Canvas animation
│   ├── src/animation.ts
│   ├── index.html
│   └── style.css
│
├── Credentials-n8n/          # 🔐 NÃO VERSIONADO
├── Docker/                   # 🔐 NÃO VERSIONADO
└── Variáveis de ambiente/    # 🔐 NÃO VERSIONADO
```

## 🚀 Quick Start

### Desenvolvimento

```bash
cd Pagina
npm install
npm run dev
```

Acesse: **http://localhost:5173/**

### Build Production

```bash
npm run build
```

Outputs em `dist/` — arquivos prontos para deploy.

## 📱 Testar no Mobile

1. Inicie o servidor: `npm run dev`
2. No mobile (mesma Wi-Fi): **http://172.28.32.1:5173**
3. Ou escaneie: `Pagina/qr-mobile.html`

Veja `COMO_TESTAR_MOBILE.txt` para mais detalhes.

## 🎨 Design System

**Desert Protocol Palette:**
- **NIGHT** (#0B0A14) — Fundo escuro
- **EMBER** (#D97543) — Accent solar
- **ION** (#7DD3D8) — Sinal lunar
- **SAND** (#EBC9A0) — Primário
- **DUST** (#C9A878) — Secundário

CSS Variables: `--bg`, `--ember`, `--ion`, `--sand`, `--dust`, `--radius`, `--maxw`

## ✨ Funcionalidades

- ✅ **Hero com Parallax** — Camadas de profundidade com mouse tracking
- ✅ **Chat Desktop Interativo** — WhatsApp Web style com 4 contatos
- ✅ **Demo Interativa** — Chat scenarios com quick replies
- ✅ **Central de Ajuda** — Search e categorias
- ✅ **Canvas Animation** — Sol & Lua com hover effects
- ✅ **Mobile Responsivo** — Otimizado para < 560px
- ✅ **Acessibilidade** — ARIA labels, semantic HTML
- ✅ **Performance** — < 6 KB gzip por página

## 🔐 Segurança & Credenciais

### ⚠️ Informações Sensíveis

**NÃO ESTÃO VERSIONADAS:**
- `.env` e `.env.*.local`
- `Credentials-n8n/`
- `Docker/.env*`
- `Variáveis de ambiente/`

### Para Contribuidores

1. Copie `.env.example` → `.env.local`
2. Preencha com suas credenciais
3. **NUNCA commit `.env` ou credenciais**

```bash
# ✅ Seguro
cp .env.example .env.local
echo ".env.local" >> .gitignore

# ❌ NUNCA faça
git add .env
git add Credentials-n8n/
```

## 📦 Tech Stack

- **Frontend:** TypeScript + Vanilla HTML/CSS
- **Build:** Vite 5.4.21
- **Animations:** Canvas 2D, requestAnimationFrame
- **Styling:** CSS Grid, Flexbox, Custom Properties
- **Accessibility:** ARIA, semantic HTML

## 🔄 Git Workflow

```bash
# Clonar
git clone https://github.com/yourusername/SollunProject.git
cd SollunProject

# Setup
cd Pagina && npm install

# Desenvolver
git checkout -b feature/minha-feature
npm run dev
# ... fazer mudanças ...
git add .
git commit -m "feat: descrição curta"
git push origin feature/minha-feature

# Criar PR no GitHub
```

## 📊 Performance

| Página | Size (gzip) | Assets |
|--------|------------|--------|
| index.html | 5.05 KB | main.js, style.css |
| demo.html | 4.62 KB | demo.js |
| ajuda.html | 4.41 KB | ajuda.js |
| **Total** | **~56 KB** | 12 modules |

**Lighthouse Target:** > 90 (Performance, Accessibility, Best Practices)

## 🐛 Troubleshooting

### Não consigo conectar no mobile
- Verifique: `ipconfig | find "IPv4"`
- PC e mobile na mesma Wi-Fi? ✅
- Servidor rodando? ✅ `npm run dev`
- Firewall bloqueando porta 5173? ❌

### TypeScript errors
```bash
npx tsc --noEmit
```

### Build falhando
```bash
rm -rf node_modules package-lock.json
npm install
npm run build
```

## 📝 Commit Message Format

```
<type>(<scope>): <subject>

<body>

<footer>
```

**Types:** feat, fix, docs, style, refactor, perf, test, chore

**Exemplo:**
```
feat(chat): adiciona suporte a typing indicators

- Implementa animação de "digitando"
- Adiciona delay realistic
- Testa em todos os contatos

Closes #123
```

## 🤝 Contribuindo

1. Fork o projeto
2. Crie sua branch: `git checkout -b feature/AmazingFeature`
3. Commit: `git commit -m 'feat: Add AmazingFeature'`
4. Push: `git push origin feature/AmazingFeature`
5. Abra um Pull Request

## 📄 Licença

[Especificar licença — ex: MIT, Apache 2.0]

## 📞 Contato

- **Email:** trindade7474@gmail.com
- **GitHub:** [@trindade74-dev](https://github.com/trindade74-dev)

---

**Desenvolvido com ❤️ para Sollun**  
*Last updated: 2026-06-09*
