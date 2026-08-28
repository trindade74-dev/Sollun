// ── Types ──────────────────────────────────────────────

interface BodyConfig {
  x: number;
  y: number;
  r: number;
}

// ── Canvas setup ───────────────────────────────────────

export function initSolLua(canvasId: string): void {
  const canvas = document.getElementById(canvasId) as HTMLCanvasElement;
  if (!canvas) return;

  const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;
  const dpr = Math.min(window.devicePixelRatio || 1, 3);

  const isMobile = window.innerWidth < 560;
  const W: number = isMobile ? 130 : 160;
  const H: number = isMobile ? 130 : 160;

  // Canvas buffer em device pixels, exibição em CSS pixels
  canvas.width  = W * dpr;
  canvas.height = H * dpr;
  canvas.style.width  = W + 'px';
  canvas.style.height = H + 'px';
  ctx.scale(dpr, dpr);

  // ── Desert Protocol palette ─────────────────────────────

  const ION: string = '#7DD3D8';

  // ── Scene center ────────────────────────────────────────

  const CX: number = W / 2;
  const CY: number = H / 2;

  // ── Logo geometry escalada proporcionalmente (base original: 195px) ──

  const s = W / 195;

  const SUN_REST: BodyConfig  = { x: CX - 10 * s, y: CY + 3 * s,  r: Math.round(23 * s) };
  const MOON_REST: BodyConfig = { x: CX + 11 * s, y: CY - 14 * s, r: Math.round(17 * s) };

  const RING1_R: number = Math.round(50 * s);
  const RING2_R: number = Math.round(71 * s);

  const SEP: number = Math.round(40 * s);

  // ── Float parameters ────────────────────────────────────

  const FLOAT_AMP:   number = 4;
  const FLOAT_SPEED: number = 0.55;

  // ── Animated state ──────────────────────────────────────

  let sunX:    number  = SUN_REST.x;
  let moonX:   number  = MOON_REST.x;
  let hovered: boolean = false;
  let t:       number  = 0;

  // ── Utilities ───────────────────────────────────────────

  function lerp(a: number, b: number, k: number): number {
    return a + (b - a) * k;
  }

  // ── Draw helpers ────────────────────────────────────────

  function drawRings(floatY: number): void {
    const ry = CY + floatY * 0.3;
    ctx.save();
    ctx.globalAlpha = 0.20;
    ctx.strokeStyle = ION;
    ctx.lineWidth   = 0.35;
    ctx.beginPath();
    ctx.arc(CX, ry, RING2_R, 0, Math.PI * 2);
    ctx.stroke();
    ctx.lineWidth = 0.25;
    ctx.beginPath();
    ctx.arc(CX, ry, RING1_R, 0, Math.PI * 2);
    ctx.stroke();
    ctx.restore();
  }

  function drawSun(x: number, y: number, r: number): void {
    ctx.save();

    // Soft glow
    const grd = ctx.createRadialGradient(x, y, r * 0.1, x, y, r * 2.0);
    grd.addColorStop(0,   'rgba(217,117,67,0.20)');
    grd.addColorStop(0.5, 'rgba(217,117,67,0.05)');
    grd.addColorStop(1,   'rgba(217,117,67,0)');
    ctx.beginPath();
    ctx.arc(x, y, r * 2.0, 0, Math.PI * 2);
    ctx.fillStyle = grd;
    ctx.fill();

    // Body
    const body = ctx.createRadialGradient(
      x - r * 0.28, y - r * 0.28, r * 0.04,
      x, y, r
    );
    body.addColorStop(0,   '#EDAA70');
    body.addColorStop(0.5, '#D97543');
    body.addColorStop(1,   '#A84F28');
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2);
    ctx.fillStyle = body;
    ctx.fill();

    ctx.restore();
  }

  function drawMoon(x: number, y: number, r: number): void {
    ctx.save();

    // Dark fill
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2);
    ctx.fillStyle = '#0C0B18';
    ctx.fill();

    // ION stroke
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2);
    ctx.strokeStyle = ION;
    ctx.lineWidth   = 0.8;
    ctx.stroke();

    // Bite arc
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2);
    ctx.clip();
    ctx.beginPath();
    ctx.arc(x + r * 0.38, y - 1, r * 0.78, 0, Math.PI * 2);
    ctx.strokeStyle = 'rgba(125,211,216,0.22)';
    ctx.lineWidth   = 0.5;
    ctx.stroke();

    ctx.restore();
  }

  function drawScanlines(): void {
    ctx.save();
    ctx.globalAlpha = 0.032;
    for (let y = 0; y < H; y += 3) {
      ctx.fillStyle = '#000';
      ctx.fillRect(0, y, W, 1);
    }
    ctx.restore();
  }

  // ── Main loop ───────────────────────────────────────────

  function tick(): void {
    t += 0.016;

    const floatY: number = Math.sin(t * FLOAT_SPEED) * FLOAT_AMP;

    const sunTargetX:  number = SUN_REST.x  + (hovered ? -SEP : 0);
    const moonTargetX: number = MOON_REST.x + (hovered ?  SEP : 0);

    const easeK: number = hovered ? 0.05 : 0.07;
    sunX  = lerp(sunX,  sunTargetX,  easeK);
    moonX = lerp(moonX, moonTargetX, easeK);

    const sunY:  number = SUN_REST.y  + floatY;
    const moonY: number = MOON_REST.y + floatY;

    ctx.clearRect(0, 0, W, H);

    drawRings(floatY);
    drawSun(sunX,   sunY,  SUN_REST.r);
    drawMoon(moonX, moonY, MOON_REST.r);
    drawScanlines();

    requestAnimationFrame(tick);
  }

  // ── Events ──────────────────────────────────────────────

  canvas.addEventListener('mouseenter', (): void => { hovered = true;  });
  canvas.addEventListener('mouseleave', (): void => { hovered = false; });
  canvas.addEventListener('touchstart', (e: TouchEvent): void => {
    e.preventDefault();
    hovered = true;
  }, { passive: false });
  canvas.addEventListener('touchend', (e: TouchEvent): void => {
    e.preventDefault();
    hovered = false;
  }, { passive: false });

  tick();
}
