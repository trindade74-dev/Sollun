# Teste da Página Demo — Checklist

## Bug Fix: Bubble Alignment
- [ ] Bolhas do bot aparecem **alinhadas à ESQUERDA**
- [ ] Bolhas do usuário aparecem **alinhadas à DIREITA**
- [ ] Bolhas do bot têm fundo cinza, user tem fundo laranja/ember

## Melhoria 1: Timestamps
- [ ] Cada bolha mostra a hora no formato HH:MM em baixo
- [ ] Timestamp em cor cinza (muted)

## Melhoria 2: Status de Mensagem
- [ ] Bolhas do usuário têm ✓ cinza ao lado da bolha
- [ ] (Placeholder para futuro: ✓✓ azul quando entregue)

## Melhoria 3: Typing Label
- [ ] Ao bot responder, aparece texto "Bella Vista está digitando…" acima dos pontos
- [ ] Avatar (S) fica com animação de ring pulse enquanto digita

## Melhoria 4: Progress Bar
- [ ] Barra fina azul ION no topo do chat
- [ ] Barra cresce conforme conversa avança

## Melhoria 5: Trocar Cenários com Transição
- [ ] Ao clicar em outro cenário, o chat faz fade-out
- [ ] Novo cenário carrega com fade-in
- [ ] Contexto (nome, tagline) atualiza corretamente

## Melhoria 6: Completion Screen
- [ ] Após completar a conversa do restaurante, aparece tela azul/laranja
- [ ] Mostra "✅ Conversa concluída"
- [ ] Dois botões: "Ver outro cenário" e "Iniciar na lista"
- [ ] Clicar "Ver outro cenário" vai para próximo cenário (clinica)
- [ ] Clicar "Iniciar na lista" tenta scrollar (ou erro é OK se #lista não existe)

## Melhoria 7: Counter Animations
- [ ] Rolar até seção "Por baixo dos panos"
- [ ] Cards aparecem com animação de slide-up
- [ ] Números dos cards animam:
  - Card 01: "< 200ms"
  - Card 02: "97%"
  - Card 03: "< 1.2s"

## Melhoria 8: Quick-Reply Buttons
- [ ] Buttons têm borda sutil e padding arredondado
- [ ] Hover: border fica laranja, fundo sutil laranja

## Mobile (560px)
- [ ] Chat ocupa largura total
- [ ] Cenários em coluna
- [ ] Tudo responsivo

## TypeScript
- [ ] `npx tsc --noEmit` retorna 0 (sem erros)
