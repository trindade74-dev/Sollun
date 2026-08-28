"use client"

import { useRef, useState } from "react"
import { motion, useScroll, useTransform } from "motion/react"
import {
  ArrowPathIcon,
  CheckCircleIcon,
  CheckIcon,
  ChatBubbleLeftRightIcon,
  PhotoIcon,
  RectangleStackIcon,
  Square2StackIcon,
} from "@heroicons/react/24/outline"

import { cn } from "@/lib/utils"
import {
  BOX_WIDTH_PX,
  CORNER_RADIUS_PX,
  INITIAL_INSET_PERCENT,
  RESTING_TOP_PX,
} from "./showcase-tokens"

const PEEK_HEIGHT_PX = 15
/** Largura e inset inicial vêm de showcase-tokens.ts — exatamente as mesmas
 * medidas usadas pelo carrossel (DetailCarousel), antes e depois de
 * renderizar. */
const WINDOW_WIDTH_PX = BOX_WIDTH_PX

type DemoStatus = "idle" | "loading" | "done" | "approved"
type Format = "post" | "story" | "carrossel"

/** Custo em créditos por tipo — valores reais (12 - Planos e Créditos). */
const formats: { id: Format; label: string; cost: string; icon: typeof PhotoIcon }[] = [
  { id: "post", label: "Post", cost: "1 crédito", icon: PhotoIcon },
  { id: "story", label: "Story", cost: "0,5 crédito", icon: RectangleStackIcon },
  { id: "carrossel", label: "Carrossel", cost: "4 créditos", icon: Square2StackIcon },
]

function WindowChrome() {
  return (
    <div className="border-border/60 flex items-center justify-center gap-2 border-b px-4 py-2.5">
      <span className="bg-ember size-2.5 rounded-full" />
      <span className="bg-sand size-2.5 rounded-full" />
      <span className="bg-ion size-2.5 rounded-full" />
      <span className="text-muted-foreground ml-2 font-mono text-[11px]">
        app.sollun.com.br/estudio
      </span>
    </div>
  )
}

function BriefingPanel({
  prompt,
  format,
  status,
  onPromptChange,
  onFormatChange,
  onGenerate,
}: {
  prompt: string
  format: Format
  status: DemoStatus
  onPromptChange: (value: string) => void
  onFormatChange: (format: Format) => void
  onGenerate: () => void
}) {
  const selectedFormat = formats.find((f) => f.id === format)!

  return (
    <div className="border-border/60 flex flex-col gap-4 border-b p-6 md:border-r md:border-b-0">
      <span className="text-muted-foreground font-mono text-xs tracking-widest uppercase">
        Briefing
      </span>

      <label className="border-border bg-background/60 focus-within:border-ring flex items-center gap-2 rounded-(--radius) border px-4 py-3">
        <ChatBubbleLeftRightIcon
          className="text-muted-foreground size-4 shrink-0"
          aria-hidden="true"
        />
        <input
          value={prompt}
          onChange={(e) => onPromptChange(e.target.value)}
          placeholder="Descreva o post que você quer"
          className="text-foreground placeholder:text-muted-foreground w-full bg-transparent text-sm outline-none"
        />
      </label>

      <div className="flex flex-col gap-2">
        <span className="text-muted-foreground font-mono text-[10px] tracking-widest uppercase">
          Formato
        </span>
        <div className="grid grid-cols-3 gap-2">
          {formats.map((f) => {
            const Icon = f.icon
            const active = f.id === format
            return (
              <button
                key={f.id}
                type="button"
                onClick={() => onFormatChange(f.id)}
                className={cn(
                  "border-border flex flex-col items-center gap-1 rounded-(--radius) border px-2 py-2.5 text-center transition-colors",
                  active
                    ? "border-ion bg-ion/10 text-ion"
                    : "text-muted-foreground hover:border-ion/40"
                )}
              >
                <Icon className="size-4" aria-hidden="true" />
                <span className="text-[11px] font-medium">{f.label}</span>
              </button>
            )
          })}
        </div>
      </div>

      <button
        type="button"
        onClick={onGenerate}
        disabled={!prompt.trim() || status === "loading"}
        className="bg-ember text-background inline-flex h-9 items-center justify-center gap-2 self-start rounded-[10px] px-4 text-sm font-semibold transition-opacity disabled:opacity-40"
      >
        {status === "loading" && (
          <ArrowPathIcon className="size-3.5 animate-spin" aria-hidden="true" />
        )}
        {status === "loading" ? "Gerando…" : "Gerar prévia"}
      </button>
      <span className="text-muted-foreground -mt-2 text-[11px]">
        Custo: {selectedFormat.cost}
      </span>
    </div>
  )
}

function CreativePreview({ prompt, format }: { prompt: string; format: Format }) {
  const aspect = format === "story" ? "aspect-[9/16]" : "aspect-square"

  const card = (
    <div
      className={cn(
        "from-ember via-sand to-ion relative flex w-full flex-col justify-end overflow-hidden rounded-(--radius) bg-gradient-to-br p-5",
        aspect
      )}
    >
      <div className="bg-background/70 rounded-(--radius) p-4 backdrop-blur-sm">
        <p className="text-foreground line-clamp-2 text-base font-semibold">
          {prompt}
        </p>
      </div>
    </div>
  )

  if (format === "carrossel") {
    return (
      <div className="relative w-full max-w-md">
        <div className="border-border bg-card absolute inset-x-5 -top-5 aspect-square rounded-(--radius) border opacity-60" />
        <div className="border-border bg-card absolute inset-x-2.5 -top-2.5 aspect-square rounded-(--radius) border opacity-80" />
        <div className="relative">{card}</div>
        <div className="mt-4 flex justify-center gap-1.5">
          <span className="bg-ion size-1.5 rounded-full" />
          <span className="bg-border size-1.5 rounded-full" />
          <span className="bg-border size-1.5 rounded-full" />
        </div>
      </div>
    )
  }

  return <div className="w-full max-w-md">{card}</div>
}

function DemoPanel({
  prompt,
  format,
  status,
  onApprove,
  onRegenerate,
}: {
  prompt: string
  format: Format
  status: DemoStatus
  onApprove: () => void
  onRegenerate: () => void
}) {
  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-6 p-8">
      {status === "idle" && (
        <div className="border-border bg-background/60 flex aspect-square w-full max-w-md flex-col items-center justify-center gap-3 rounded-(--radius) border">
          <PhotoIcon className="text-muted-foreground size-12" aria-hidden="true" />
          <span className="text-muted-foreground font-mono text-sm uppercase">
            Prévia do criativo
          </span>
        </div>
      )}

      {status === "loading" && (
        <div className="border-border bg-background/60 flex aspect-square w-full max-w-md flex-col items-center justify-center gap-3 rounded-(--radius) border">
          <ArrowPathIcon className="text-muted-foreground size-12 animate-spin" aria-hidden="true" />
          <span className="text-muted-foreground font-mono text-sm uppercase">
            Gerando…
          </span>
        </div>
      )}

      {status === "done" && (
        <>
          <CreativePreview prompt={prompt} format={format} />
          <div className="flex gap-3">
            <button
              type="button"
              onClick={onApprove}
              className="bg-ion text-background inline-flex h-10 items-center gap-1.5 rounded-[8px] px-4 text-sm font-semibold"
            >
              <CheckIcon className="size-4" aria-hidden="true" />
              Aprovar
            </button>
            <button
              type="button"
              onClick={onRegenerate}
              className="border-border text-foreground inline-flex h-10 items-center gap-1.5 rounded-[8px] border px-4 text-sm font-semibold"
            >
              <ArrowPathIcon className="size-4" aria-hidden="true" />
              Regenerar
            </button>
          </div>
        </>
      )}

      {status === "approved" && (
        <div className="border-ion/40 bg-ion/5 flex aspect-square w-full max-w-md flex-col items-center justify-center gap-3 rounded-(--radius) border">
          <CheckCircleIcon className="text-ion size-14" aria-hidden="true" />
          <span className="text-foreground text-lg font-semibold">Publicado</span>
          <span className="text-muted-foreground font-mono text-xs uppercase">
            via WhatsApp ou app
          </span>
        </div>
      )}
    </div>
  )
}

/**
 * Janela ancorada na base do hero — só 15px de topo ficam visíveis no
 * primeiro carregamento (PEEK_HEIGHT_PX via margin-top negativo). Expandida,
 * para a RESTING_TOP_PX do topo (HEADER_GAP_PX abaixo do header fixo —
 * showcase-tokens.ts) — nunca anima width/height diretamente, só a máscara
 * de clip-path (com `round`, pra manter bordas arredondadas em qualquer
 * estado, estreito ou expandido).
 *
 * Demo interativa de verdade: formato (post/story/carrossel, custo em
 * créditos real) + geração simulada + aprovar/regenerar, espelhando o fluxo
 * real descrito em 08 - Fluxo de Criacao de Criativo.md.
 *
 * Os painéis internos (briefing/demo) começam sobrepostos no centro e se
 * encaixam nas posições finais conforme o mesmo scrollYProgress do
 * clip-path externo — termina exatamente junto, sem gap extra antes do
 * carrossel (que fica SECTION_GAP_PX abaixo no fluxo normal —
 * DetailCarousel).
 *
 * Mobile e prefers-reduced-motion: neutralizados via CSS puro
 * (.reveal-window-clip / .reveal-panel em globals.css), nunca por branch de
 * JSX — branch de árvore condicionado a hook client-only quebra hidratação.
 */
function RevealWindow() {
  const ref = useRef<HTMLDivElement>(null)
  const [prompt, setPrompt] = useState("")
  const [format, setFormat] = useState<Format>("post")
  const [status, setStatus] = useState<DemoStatus>("idle")

  const { scrollYProgress } = useScroll({
    target: ref,
    // A renderização completa (progress 1) acontece quando o topo da janela
    // chega a RESTING_TOP_PX do topo da viewport — HEADER_GAP_PX de folga
    // abaixo do header fixo (68px), a mesma marca usada pelo carrossel
    // (showcase-tokens.ts).
    offset: ["start end", `start ${RESTING_TOP_PX}px`],
  })

  const clipPath = useTransform(
    scrollYProgress,
    [0, 1],
    [
      `inset(0% ${INITIAL_INSET_PERCENT}% 0% ${INITIAL_INSET_PERCENT}% round ${CORNER_RADIUS_PX}px)`,
      `inset(0% 0% 0% 0% round ${CORNER_RADIUS_PX}px)`,
    ]
  )
  const briefingX = useTransform(scrollYProgress, [0, 1], ["55%", "0%"])
  const demoX = useTransform(scrollYProgress, [0, 1], ["-55%", "0%"])
  const panelOpacity = useTransform(scrollYProgress, [0, 0.4, 1], [0, 0.3, 1])

  const handleGenerate = () => {
    if (!prompt.trim()) return
    setStatus("loading")
    setTimeout(() => setStatus("done"), 900)
  }

  const handleRegenerate = () => {
    setStatus("loading")
    setTimeout(() => setStatus("done"), 700)
  }

  const handlePromptChange = (value: string) => {
    setPrompt(value)
    if (status === "done" || status === "approved") setStatus("idle")
  }

  const handleFormatChange = (next: Format) => {
    setFormat(next)
    if (status === "done" || status === "approved") setStatus("idle")
  }

  return (
    <div
      ref={ref}
      style={{ marginTop: `-${PEEK_HEIGHT_PX}px`, maxWidth: `${WINDOW_WIDTH_PX + 48}px` }}
      className="relative z-10 mx-auto px-6"
    >
      <motion.div
        style={{
          clipPath,
          width: "100%",
          willChange: "clip-path",
        }}
        className="reveal-window-clip border-line bg-card mx-auto flex h-auto max-w-full flex-col overflow-hidden rounded-[24px] border shadow-[0_40px_120px_rgba(0,0,0,0.6)] md:h-[620px]"
      >
        <WindowChrome />
        <div className="flex flex-1 flex-col md:grid md:grid-cols-[320px_1fr]">
          <motion.div
            style={{
              x: briefingX,
              opacity: panelOpacity,
              willChange: "transform, opacity",
            }}
            className="reveal-panel"
          >
            <BriefingPanel
              prompt={prompt}
              format={format}
              status={status}
              onPromptChange={handlePromptChange}
              onFormatChange={handleFormatChange}
              onGenerate={handleGenerate}
            />
          </motion.div>
          <motion.div
            style={{
              x: demoX,
              opacity: panelOpacity,
              willChange: "transform, opacity",
            }}
            className="reveal-panel"
          >
            <DemoPanel
              prompt={prompt}
              format={format}
              status={status}
              onApprove={() => setStatus("approved")}
              onRegenerate={handleRegenerate}
            />
          </motion.div>
        </div>
      </motion.div>
    </div>
  )
}

export { RevealWindow }
