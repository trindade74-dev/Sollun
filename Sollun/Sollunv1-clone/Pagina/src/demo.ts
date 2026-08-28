// @ts-ignore: Cannot find module './style.css'.
import "./style.css";

/* ============================================================
   Sollun — demo interativa
   ============================================================ */

type ScenarioStep =
  | { side: "user"; text: string }
  | { side: "bot"; text: string };

type Scenario = {
  id: string;
  botName: string;
  context: string;
  tagline: string;
  steps: ScenarioStep[];
  fallback: string;
};

/* ===== Dados dos cenários ===== */
const scenarios: Record<string, Scenario> = {
  restaurante: {
    id: "restaurante",
    botName: "Bella Vista",
    context: "Restaurante Bella Vista · Recife, PE",
    tagline: "Pedidos e reservas automáticos",
    fallback: "Deixa eu verificar isso! Posso te ajudar com pedidos, horários ou reservas 😊",
    steps: [
      { side: "bot",  text: "Oi! Sou o assistente do Bella Vista 🍕 Estou aqui 24h. Em que posso ajudar?" },
      { side: "user", text: "Vocês estão abertos agora?" },
      { side: "bot",  text: "Sim! Funcionamos seg-dom das 11h às 23h. Quer ver o cardápio ou fazer um pedido?" },
      { side: "user", text: "Quero fazer um pedido!" },
      { side: "bot",  text: "Ótimo! 🎉 Me diz o que vai querer e te passo o total com opções de entrega ou retirada." },
      { side: "user", text: "Pizza portuguesa grande + refri 2L" },
      { side: "bot",  text: "Perfeito! 🍕\n\n• Pizza Portuguesa G: R$ 58,00\n• Refrigerante 2L: R$ 12,00\n\nTotal: R$ 70,00\n\nEntrega ou retirada?" },
    ],
  },
  clinica: {
    id: "clinica",
    botName: "Saúde Total",
    context: "Clínica Saúde Total · São Paulo, SP",
    tagline: "Agendamentos e lembretes automáticos",
    fallback: "Para te ajudar melhor: precisa agendar, cancelar ou tirar alguma dúvida? 😊",
    steps: [
      { side: "bot",  text: "Olá! Clínica Saúde Total. Como posso te ajudar hoje? 😊" },
      { side: "user", text: "Quero agendar uma consulta" },
      { side: "bot",  text: "Com prazer! Qual especialidade você precisa?\n\n• Clínico Geral\n• Dermatologia\n• Cardiologia\n• Ortopedia" },
      { side: "user", text: "Dermatologia" },
      { side: "bot",  text: "Temos disponibilidade:\n\n📅 Terça, 10/06 às 10h\n📅 Quinta, 12/06 às 15h\n📅 Sexta, 13/06 às 09h\n\nQual prefere?" },
      { side: "user", text: "Terça às 10h" },
      { side: "bot",  text: "Agendado! ✅\n\nDermatologia · Terça, 10/06 às 10h\nVou te enviar um lembrete 1 dia antes.\n\nPrecisa de mais alguma coisa?" },
    ],
  },
  salao: {
    id: "salao",
    botName: "Studio Bella",
    context: "Studio Bella · Belo Horizonte, MG",
    tagline: "Agenda cheia sem esforço manual",
    fallback: "Posso te ajudar com agendamentos, horários e informações sobre serviços! ✨",
    steps: [
      { side: "bot",  text: "Oi! Studio Bella aqui ✨ Vamos cuidar de você! Em que posso ajudar?" },
      { side: "user", text: "Tem horário amanhã?" },
      { side: "bot",  text: "Amanhã temos:\n\n⏰ 10h00\n⏰ 14h00\n⏰ 16h30\n\nQual serviço você quer agendar?" },
      { side: "user", text: "Corte + escova" },
      { side: "bot",  text: "Corte + escova dura ~1h30. Qual horário prefere?\n\n10h, 14h ou 16h30?" },
      { side: "user", text: "14h — perfeito!" },
      { side: "bot",  text: "Marcado! 💇‍♀️\n\nAmanhã às 14h — corte + escova\nRua das Flores, 123 · BH\n\nVou te enviar um lembrete 1h antes. Até lá! 😊" },
    ],
  },
  ecommerce: {
    id: "ecommerce",
    botName: "ModaFácil",
    context: "ModaFácil · E-commerce nacional",
    tagline: "Suporte e vendas 24/7",
    fallback: "Posso te ajudar com rastreio, trocas, devoluções ou dúvidas sobre produtos! 🛍️",
    steps: [
      { side: "bot",  text: "Olá! ModaFácil aqui 🛍️ Posso te ajudar com pedidos, trocas ou novidades!" },
      { side: "user", text: "Onde está meu pedido?" },
      { side: "bot",  text: "Claro! Me passa o número do pedido para eu rastrear." },
      { side: "user", text: "Pedido #MF-8821" },
      { side: "bot",  text: "📦 Pedido #MF-8821\n\nStatus: Em rota de entrega\nSaiu às 07h40 de hoje\nPrevisão: até 18h\n\nRastreio completo: [ver mapa]" },
      { side: "user", text: "Quero trocar o tamanho" },
      { side: "bot",  text: "Sem problema! 😊 Trocas aceitas em até 30 dias.\n\nAbrindo ticket de troca agora. Nossa equipe confirma em até 2h (horário comercial)." },
    ],
  },
};

/* ===== Estado ===== */
let currentScenario = scenarios.restaurante;
let stepIndex = 0;
let isBotTyping = false;

/* ===== DOM ===== */
const demoChat    = document.getElementById("demoChat")!;
const quickReplies = document.getElementById("quickReplies")!;
const chatInput   = document.getElementById("chatInput") as HTMLInputElement;
const sendBtn     = document.getElementById("sendBtn") as HTMLButtonElement;
const resetBtn    = document.getElementById("resetBtn")!;
const chatBotName = document.getElementById("chatBotName")!;
const contextName = document.getElementById("contextName")!;
const contextTagline = document.getElementById("contextTagline")!;

/* ===== Helpers ===== */
function formatTime(): string {
  return new Date().toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" });
}

function updateProgressBar(): void {
  const chat = document.querySelector(".chat--demo");
  if (!chat) return;
  const progress = Math.round((stepIndex / currentScenario.steps.length) * 100);
  chat.classList.remove("progress-50", "progress-75", "progress-100");
  if (progress >= 100) chat.classList.add("progress-100");
  else if (progress >= 75) chat.classList.add("progress-75");
  else if (progress >= 50) chat.classList.add("progress-50");
}

function addBubble(text: string, side: "user" | "bot"): void {
  const msgWrapper = document.createElement("div");
  msgWrapper.style.display = "flex";
  msgWrapper.style.flexDirection = "column";
  msgWrapper.style.gap = "4px";

  const bubble = document.createElement("div");
  bubble.className = `bubble bubble--${side}`;
  bubble.style.whiteSpace = "pre-line";
  bubble.textContent = text;

  const timestamp = document.createElement("span");
  timestamp.className = "bubble__timestamp";
  timestamp.textContent = formatTime();

  msgWrapper.appendChild(bubble);
  msgWrapper.appendChild(timestamp);

  if (side === "user") {
    const status = document.createElement("span");
    status.className = "bubble__status";
    status.textContent = "✓";
    bubble.appendChild(status);
  }

  demoChat.appendChild(msgWrapper);
  demoChat.scrollTop = demoChat.scrollHeight;
  updateProgressBar();
}

function showTyping(): HTMLElement {
  const label = document.createElement("div");
  label.className = "typing-label";
  label.textContent = `${currentScenario.botName} está digitando…`;

  const el = document.createElement("div");
  el.className = "bubble bubble--typing";
  el.dataset.typing = "true";
  el.innerHTML = "<span></span><span></span><span></span>";

  demoChat.appendChild(label);
  demoChat.appendChild(el);
  demoChat.scrollTop = demoChat.scrollHeight;

  const avatar = document.querySelector(".chat__avatar");
  if (avatar) avatar.classList.add("is-speaking");

  return el;
}

function setInputsDisabled(disabled: boolean): void {
  chatInput.disabled = disabled;
  sendBtn.disabled = disabled;
  quickReplies.querySelectorAll<HTMLButtonElement>("button").forEach(b => (b.disabled = disabled));
}

function updateQuickReplies(): void {
  quickReplies.innerHTML = "";
  const step = currentScenario.steps[stepIndex];

  if (stepIndex >= currentScenario.steps.length) {
    const completion = document.createElement("div");
    completion.className = "completion-screen";
    completion.innerHTML = `
      <h3>✅ Conversa concluída</h3>
      <p>Em apenas ${Math.ceil(currentScenario.steps.length / 2)} trocas, o cliente já tinha tudo que precisava.</p>
      <div class="btn-group">
        <button class="btn btn--secondary" id="seeMore">Ver outro cenário</button>
        <button class="btn btn--primary" id="joinWaitlist">Iniciar na lista</button>
      </div>
    `;
    quickReplies.appendChild(completion);

    document.getElementById("seeMore")?.addEventListener("click", () => {
      const tabs = document.querySelectorAll<HTMLButtonElement>(".scenario-tab");
      const currentIdx = Array.from(tabs).findIndex(t => t.dataset.scenario === currentScenario.id);
      const nextTab = tabs[(currentIdx + 1) % tabs.length];
      nextTab.click();
    });

    document.getElementById("joinWaitlist")?.addEventListener("click", () => {
      const listSection = document.getElementById("lista");
      if (listSection) listSection.scrollIntoView({ behavior: "smooth" });
    });

    resetBtn.classList.remove("is-visible");
    return;
  }

  if (step && step.side === "user") {
    const btn = document.createElement("button");
    btn.className = "quick-reply-btn";
    btn.textContent = step.text;
    btn.addEventListener("click", () => sendMessage(step.text));
    quickReplies.appendChild(btn);
    resetBtn.classList.remove("is-visible");
  } else {
    resetBtn.classList.toggle("is-visible", stepIndex > 0);
  }
}

function botRespond(text: string, delay = 1100): void {
  isBotTyping = true;
  setInputsDisabled(true);

  const typingEl = showTyping();
  setTimeout(() => {
    typingEl.remove();
    const label = demoChat.querySelector(".typing-label");
    if (label) label.remove();
    const avatar = document.querySelector(".chat__avatar");
    if (avatar) avatar.classList.remove("is-speaking");
    addBubble(text, "bot");
    isBotTyping = false;
    setInputsDisabled(false);
    updateQuickReplies();
  }, delay);
}

function sendMessage(text: string): void {
  if (isBotTyping || !text.trim()) return;

  addBubble(text, "user");
  chatInput.value = "";
  quickReplies.innerHTML = "";

  const currentStep = currentScenario.steps[stepIndex];

  if (currentStep && currentStep.side === "user" && currentStep.text === text) {
    stepIndex++; // past user step
    const botStep = currentScenario.steps[stepIndex];
    if (botStep && botStep.side === "bot") {
      stepIndex++; // past bot step before it responds
      botRespond(botStep.text);
    } else {
      updateQuickReplies();
    }
  } else {
    botRespond(currentScenario.fallback, 900);
  }
}

function loadScenario(id: string): void {
  currentScenario = scenarios[id];
  stepIndex = 0;
  isBotTyping = false;
  setInputsDisabled(false);

  const chat = document.querySelector(".chat--demo") as HTMLElement | null;
  if (chat) {
    chat.style.opacity = "0";
    chat.style.transform = "translateY(8px)";
    chat.style.transition = "opacity 0.2s, transform 0.2s";
  }

  setTimeout(() => {
    demoChat.innerHTML = "";
    quickReplies.innerHTML = "";
    resetBtn.classList.remove("is-visible");

    chatBotName.textContent = currentScenario.botName;
    contextName.textContent = currentScenario.context;
    contextTagline.textContent = currentScenario.tagline;

    // Show opening bot messages
    while (stepIndex < currentScenario.steps.length && currentScenario.steps[stepIndex].side === "bot") {
      addBubble(currentScenario.steps[stepIndex].text, "bot");
      stepIndex++;
    }

    updateQuickReplies();

    if (chat) {
      chat.style.opacity = "1";
      chat.style.transform = "translateY(0)";
    }
  }, 200);
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

  function animateCounter(card: Element): void {
    const numEl = card.querySelector(".behind-card__num") as HTMLElement | null;
    if (!numEl) return;

    const text = numEl.textContent || "";
    let targetValue = 0;
    if (text.includes("01")) targetValue = 200;
    else if (text.includes("02")) targetValue = 97;
    else if (text.includes("03")) targetValue = 1200;

    if (targetValue === 0) return;

    let current = 0;
    const duration = 1200;
    const startTime = performance.now();

    const tick = (now: number): void => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      current = Math.round(progress * targetValue);

      const textContent = numEl?.textContent || "";
      if (numEl && textContent.includes("01")) {
        numEl.innerHTML = `01 · Recebe <strong class="counter">&lt; ${current}ms</strong>`;
      } else if (numEl && textContent.includes("02")) {
        numEl.innerHTML = `02 · Analisa <strong class="counter">${current}%</strong>`;
      } else if (numEl && textContent.includes("03")) {
        numEl.innerHTML = `03 · Responde <strong class="counter">&lt; ${(current / 1000).toFixed(1)}s</strong>`;
      }

      if (progress < 1) requestAnimationFrame(tick);
    };

    requestAnimationFrame(tick);
  }

  if ("IntersectionObserver" in window) {
    const io = new IntersectionObserver(
      entries => entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add("is-visible");
          if (e.target.classList.contains("behind-card")) {
            animateCounter(e.target);
          }
          io.unobserve(e.target);
        }
      }),
      { threshold: 0.15 }
    );
    revealItems.forEach(el => io.observe(el));
  } else {
    revealItems.forEach(el => el.classList.add("is-visible"));
  }

  document.querySelectorAll<HTMLButtonElement>(".scenario-tab").forEach(tab => {
    tab.addEventListener("click", () => {
      document.querySelectorAll(".scenario-tab").forEach(t => {
        t.classList.remove("is-active");
        t.setAttribute("aria-selected", "false");
      });
      tab.classList.add("is-active");
      tab.setAttribute("aria-selected", "true");
      loadScenario(tab.dataset.scenario!);
    });
  });

  sendBtn.addEventListener("click", () => sendMessage(chatInput.value));
  chatInput.addEventListener("keydown", e => { if (e.key === "Enter") sendMessage(chatInput.value); });
  resetBtn.addEventListener("click", () => loadScenario(currentScenario.id));

  loadScenario("restaurante");
});
