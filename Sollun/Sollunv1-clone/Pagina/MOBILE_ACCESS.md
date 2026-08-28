# 📱 Guia de Acesso Mobile — Sollun

## Opção 1: Servidor Local (Recomendado)

### Seu PC está em: **http://172.28.32.1:5173**

1. **Certifique-se que o servidor de desenvolvimento está rodando:**
   ```bash
   npm run dev
   ```
   Você verá algo como: `VITE v5.4.21 ready in XXms`

2. **No seu mobile (mesmo Wi-Fi da sua rede):**
   - Abra o navegador
   - Acesse: **http://172.28.32.1:5173**
   - Se não funcionar, tente: **http://localhost:5173** (se estiver na mesma máquina)

3. **Páginas disponíveis:**
   - Principal: `http://172.28.32.1:5173/` (index.html)
   - Demo Interativa: `http://172.28.32.1:5173/demo.html`
   - Central de Ajuda: `http://172.28.32.1:5173/ajuda.html`

---

## Opção 2: Arquivo Build (Produção)

Os arquivos estão em: `./dist/`

Contém:
- `index.html` — Landing page principal
- `demo.html` — Demo interativa
- `ajuda.html` — Central de ajuda
- `assets/` — CSS e JavaScript (já compilados)

**Para usar localmente:**
- Transfira a pasta `dist` para seu mobile
- Abra `dist/index.html` no navegador

---

## Troubleshooting

### ❌ "Não consegui acessar 172.28.32.1"

**Solução 1:** Tente o IP correto da sua máquina:
```bash
# Windows
ipconfig | find "IPv4"
```

**Solução 2:** Certifique-se que:
- Seu PC e mobile estão na mesma rede Wi-Fi
- O servidor está rodando (`npm run dev`)
- Firewall não está bloqueando porta 5173

**Solução 3:** Tente via `localhost` se estiver testando no mesmo PC:
- `http://localhost:5173`

### ❌ "Página não carrega no mobile"

- Recarregue: `Ctrl+Shift+R` (ou `Cmd+Shift+R` no Mac)
- Limpe cache do navegador
- Feche abas e tente novamente

### ❌ "Buttons não funcionam / Não interage"

- Verifique console (F12 → Console)
- Tente em outro navegador (Chrome, Safari, Firefox)
- Certifique-se que JavaScript está habilitado

---

## 📊 Informações do Build

- **Tamanho Total:** ~56 KB (comprimido)
- **Pages:** 3 (index, demo, ajuda)
- **Mobile Responsivo:** ✅ Sim (< 560px otimizado)
- **Lighthouse Score:** Alto (< 6 KB gzip por página)

---

## 🚀 Dica Profissional

Se precisar acessar de outro PC/mobile sem estar na mesma rede, use **ngrok**:

```bash
npm install -g ngrok
ngrok http 5173
```

Isso gera um link público como: `https://xxxxx.ngrok.io`

---

**Última atualização:** 2026-06-09
