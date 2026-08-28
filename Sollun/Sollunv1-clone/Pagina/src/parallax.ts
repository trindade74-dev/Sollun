/* ============================================================
   Sollun — parallax de mouse + tilt 3D em cards
   ============================================================ */

const reducedMotion = matchMedia("(prefers-reduced-motion: reduce)");
const coarsePointer  = matchMedia("(hover: none), (pointer: coarse)");

function shouldSkip(): boolean {
  return reducedMotion.matches || coarsePointer.matches;
}

/* ===== Parallax de camadas no hero ===== */
export function initParallax(): void {
  if (shouldSkip()) return;

  const hero = document.getElementById("hero");
  if (!hero) return;

  const layers = Array.from(
    hero.querySelectorAll<HTMLElement>("[data-parallax]")
  );
  if (!layers.length) return;

  // Guarda o transform original de cada camada (ex.: translateY(-50%) dos rings).
  const baseTransform = new WeakMap<HTMLElement, string>();
  layers.forEach(el => {
    const computed = getComputedStyle(el).transform;
    baseTransform.set(el, computed === "none" ? "" : computed);
  });

  // Posição alvo (lerp target) e posição atual.
  let tx = 0, ty = 0; // target normalizado [-0.5, 0.5]
  let cx = 0, cy = 0; // current
  let raf = 0;
  const LERP = 0.08;

  const onMove = (e: MouseEvent) => {
    const rect = hero.getBoundingClientRect();
    tx = (e.clientX - rect.left) / rect.width  - 0.5;
    ty = (e.clientY - rect.top)  / rect.height - 0.5;
  };

  const onLeave = () => { tx = 0; ty = 0; };

  const tick = () => {
    cx += (tx - cx) * LERP;
    cy += (ty - cy) * LERP;

    layers.forEach(el => {
      const depth = parseFloat(el.dataset.depth ?? "10");
      const ox = cx * depth;
      const oy = cy * depth;
      const base = baseTransform.get(el) ?? "";
      // Aplica deslocamento APÓS o transform base, na GPU.
      el.style.transform = `${base} translate3d(${ox}px, ${oy}px, 0)`;
    });

    raf = requestAnimationFrame(tick);
  };

  hero.addEventListener("mousemove", onMove, { passive: true });
  hero.addEventListener("mouseleave", onLeave, { passive: true });
  raf = requestAnimationFrame(tick);

  // Limpa quando o elemento sai do DOM (HMR / SPA).
  new MutationObserver(() => {
    if (!document.contains(hero)) {
      cancelAnimationFrame(raf);
      hero.removeEventListener("mousemove", onMove);
      hero.removeEventListener("mouseleave", onLeave);
    }
  }).observe(document.body, { childList: true, subtree: false });
}

/* ===== Tilt 3D em cards ===== */
export function initTilt(): void {
  if (shouldSkip()) return;

  const SELECTOR = ".card, .sector, .step";
  const MAX_DEG  = 6;

  document.querySelectorAll<HTMLElement>(SELECTOR).forEach(el => {
    el.addEventListener("mousemove", (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const nx = (e.clientX - rect.left) / rect.width  - 0.5; // [-0.5, 0.5]
      const ny = (e.clientY - rect.top)  / rect.height - 0.5;
      const rx =  ny * MAX_DEG * -1; // rotateX inverte eixo Y
      const ry =  nx * MAX_DEG;
      el.style.transform = `perspective(800px) rotateX(${rx}deg) rotateY(${ry}deg) translateY(-4px)`;
    }, { passive: true });

    el.addEventListener("mouseleave", () => {
      el.style.transform = "";
    }, { passive: true });
  });
}
