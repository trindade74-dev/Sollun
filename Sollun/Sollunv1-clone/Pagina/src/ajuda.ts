// @ts-ignore: Cannot find module './style.css'.
import "./style.css";

/* ============================================================
   Sollun — central de ajuda
   ============================================================ */

type Article = {
  title: string;
  cat: string;
  catLabel: string;
};

const articles: Article[] = [
  // Primeiros Passos
  { title: "Como conectar seu WhatsApp Business",         cat: "primeiros-passos", catLabel: "Primeiros Passos" },
  { title: "Criando seu primeiro fluxo de atendimento",   cat: "primeiros-passos", catLabel: "Primeiros Passos" },
  { title: "Tour pelo painel da Sollun",                  cat: "primeiros-passos", catLabel: "Primeiros Passos" },
  { title: "Configurando horários de atendimento",        cat: "primeiros-passos", catLabel: "Primeiros Passos" },
  // Configuração
  { title: "Personalizando as mensagens do bot",          cat: "configuracao", catLabel: "Configuração do Bot" },
  { title: "Criando menus interativos",                   cat: "configuracao", catLabel: "Configuração do Bot" },
  { title: "Respostas automáticas por palavra-chave",     cat: "configuracao", catLabel: "Configuração do Bot" },
  { title: "Transferindo para atendimento humano",        cat: "configuracao", catLabel: "Configuração do Bot" },
  // Integrações
  { title: "Conectando com Google Agenda",                cat: "integracoes", catLabel: "Integrações" },
  { title: "Integrando com seu sistema de pedidos",       cat: "integracoes", catLabel: "Integrações" },
  { title: "Webhooks e API da Sollun",                    cat: "integracoes", catLabel: "Integrações" },
  { title: "Conectando com seu CRM",                      cat: "integracoes", catLabel: "Integrações" },
  // Conta e Planos
  { title: "Diferença entre os planos",                   cat: "conta-planos", catLabel: "Conta e Planos" },
  { title: "Como fazer upgrade do plano",                 cat: "conta-planos", catLabel: "Conta e Planos" },
  { title: "Gerenciando usuários da equipe",              cat: "conta-planos", catLabel: "Conta e Planos" },
  { title: "Cobrança e fatura",                           cat: "conta-planos", catLabel: "Conta e Planos" },
  // WhatsApp Business
  { title: "Verificando sua conta Business",              cat: "whatsapp", catLabel: "WhatsApp Business" },
  { title: "Usando templates aprovados pela Meta",        cat: "whatsapp", catLabel: "WhatsApp Business" },
  { title: "Limites de mensagens por dia",                cat: "whatsapp", catLabel: "WhatsApp Business" },
  { title: "Boas práticas para não ser bloqueado",        cat: "whatsapp", catLabel: "WhatsApp Business" },
  // Problemas
  { title: "Bot não está respondendo",                    cat: "problemas", catLabel: "Solução de Problemas" },
  { title: "Mensagens com delay alto",                    cat: "problemas", catLabel: "Solução de Problemas" },
  { title: "Erro ao conectar WhatsApp",                   cat: "problemas", catLabel: "Solução de Problemas" },
  { title: "Como reportar um problema",                   cat: "problemas", catLabel: "Solução de Problemas" },
];

const catLabels: Record<string, string> = {
  "primeiros-passos": "Primeiros Passos",
  "configuracao":     "Configuração do Bot",
  "integracoes":      "Integrações",
  "conta-planos":     "Conta e Planos",
  "whatsapp":         "WhatsApp Business",
  "problemas":        "Solução de Problemas",
};

/* ===== DOM ===== */
const articleList    = document.getElementById("articleList")!;
const articlesTitle  = document.getElementById("articlesTitle")!;
const articlesCount  = document.getElementById("articlesCount")!;
const searchInput    = document.getElementById("searchInput") as HTMLInputElement;
const searchResults  = document.getElementById("searchResults")!;
const searchClear    = document.getElementById("searchClear")!;

/* ===== Render ===== */
const docIcon = `
  <svg class="article-item__icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
    <polyline points="14 2 14 8 20 8"/>
    <line x1="16" y1="13" x2="8" y2="13"/>
    <line x1="16" y1="17" x2="8" y2="17"/>
  </svg>`;

const arrowIcon = `
  <svg class="article-item__arrow" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
    <line x1="5" y1="12" x2="19" y2="12"/>
    <polyline points="12 5 19 12 12 19"/>
  </svg>`;

function renderArticleList(items: Article[]): void {
  articleList.innerHTML = items
    .map(a => `
      <a class="article-item" href="#" role="listitem">
        ${docIcon}
        <div class="article-item__content">
          <p class="article-item__title">${a.title}</p>
          <p class="article-item__cat">${a.catLabel}</p>
        </div>
        ${arrowIcon}
      </a>`)
    .join("");
}

function loadCategory(cat: string): void {
  const filtered = articles.filter(a => a.cat === cat);
  articlesTitle.textContent = catLabels[cat];
  articlesCount.textContent = `${filtered.length} artigos`;
  renderArticleList(filtered);

  document.querySelectorAll<HTMLElement>(".cat-card").forEach(card => {
    const active = card.dataset.cat === cat;
    card.classList.toggle("is-active", active);
    card.setAttribute("aria-pressed", String(active));
  });

  document.getElementById("artigos")?.scrollIntoView({ behavior: "smooth", block: "start" });
}

function doSearch(query: string): void {
  searchClear.classList.toggle("is-visible", query.length > 0);

  if (!query.trim()) {
    searchResults.classList.remove("is-visible");
    searchResults.innerHTML = "";
    return;
  }

  const q = query.toLowerCase();
  const matches = articles.filter(a => a.title.toLowerCase().includes(q));

  searchResults.innerHTML = matches.length
    ? matches.map(a => `
        <a class="search-result-item" href="#">
          <span class="search-result-item__icon">${docIcon}</span>
          <div>
            <p class="search-result-item__title">${a.title}</p>
            <p class="search-result-item__cat">${a.catLabel}</p>
          </div>
        </a>`).join("")
    : `<p class="search-empty">Nenhum artigo encontrado para "<strong>${query}</strong>"</p>`;

  searchResults.classList.add("is-visible");
}

/* ===== Init ===== */
function ready(fn: () => void): void {
  if (document.readyState !== "loading") fn();
  else document.addEventListener("DOMContentLoaded", fn);
}

ready(() => {
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());

  const header = document.getElementById("header");
  if (header) {
    const onScroll = () => header.classList.toggle("is-scrolled", window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
  }

  const toggle = document.getElementById("navToggle");
  const nav = document.getElementById("nav");
  if (toggle && nav) {
    const close = () => {
      nav.classList.remove("is-open");
      toggle.classList.remove("is-open");
      toggle.setAttribute("aria-expanded", "false");
    };
    toggle.addEventListener("click", () => {
      const open = nav.classList.toggle("is-open");
      toggle.classList.toggle("is-open", open);
      toggle.setAttribute("aria-expanded", String(open));
    });
    nav.querySelectorAll("a").forEach(link => link.addEventListener("click", close));
  }

  const revealItems = document.querySelectorAll<HTMLElement>(".reveal");
  if ("IntersectionObserver" in window) {
    const io = new IntersectionObserver(
      entries => entries.forEach(e => {
        if (e.isIntersecting) { e.target.classList.add("is-visible"); io.unobserve(e.target); }
      }),
      { threshold: 0.15 }
    );
    revealItems.forEach(el => io.observe(el));
  } else {
    revealItems.forEach(el => el.classList.add("is-visible"));
  }

  document.querySelectorAll<HTMLElement>(".cat-card").forEach(card => {
    card.addEventListener("click", () => loadCategory(card.dataset.cat!));
  });

  searchInput.addEventListener("input", () => doSearch(searchInput.value));
  searchInput.addEventListener("focus", () => { if (searchInput.value) doSearch(searchInput.value); });

  searchClear.addEventListener("click", () => {
    searchInput.value = "";
    doSearch("");
    searchInput.focus();
  });

  document.addEventListener("click", e => {
    if (!searchInput.contains(e.target as Node) && !searchResults.contains(e.target as Node)) {
      searchResults.classList.remove("is-visible");
    }
  });

  loadCategory("primeiros-passos");
});
