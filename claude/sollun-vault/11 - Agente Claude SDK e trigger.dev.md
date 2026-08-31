---
title: Agente Claude SDK e trigger.dev
tags:
  - sollun
  - tecnico
  - ia
---

# Agente Claude SDK e trigger.dev

## Divisão de papel

> [!abstract] A analogia
> O **trigger.dev** é o chefe de cozinha que não cozinha: garante que cada prato saia na hora certa, mesmo se a cozinha pegar fogo. Quem cozinha é o **seu próprio código** — é ele que chama a API do Claude, recebe o JSON estruturado de volta e decide o passo seguinte (acionar a API de imagem, aplicar o patch no banco, consultar a identidade visual).

Eles não competem — se completam. O **Client SDK** (`@anthropic-ai/sdk`) é só o canal de uma chamada de API: não guarda estado, não reexecuta em falha, não agenda. Uma extração termina em segundos e o SDK esquece que ela existiu — o trigger.dev cobre esse buraco (durabilidade, agendamento, retry).

## trigger.dev

O que ele resolve: agendamento, retry, e principalmente **durabilidade** — uma tarefa esperando resposta do cliente por 3 horas não fica travada consumindo memória, ela pausa de verdade e retoma no evento.

**Decisão: versão Cloud, não self-hosted.**

> [!failure] O que self-hosted custaria
> Provisionar e manter infra, aplicar patch de segurança, monitorar uptime, gerenciar registry de container e object storage, proteger o socket do Docker, travar versão manualmente — sem garantia de performance. Cada task roda em container isolado, então ele é a peça **mais pesada** da stack.

Preços Cloud: Free (US$0, US$5 de crédito, 20 runs concorrentes) → Hobby (US$10) → Pro (US$50). O volume dos 10 fundadores cabe em Free ou Hobby.

## Claude Client SDK

`@anthropic-ai/sdk` — o wrapper puro sobre a Messages API (o "Client SDK" na terminologia da Anthropic). Ele não roda loop de agente, não gerencia contexto nem compacta nada: quando um loop de ferramentas for preciso, é o seu código que o implementa.

Isso bate com o critério oficial da Anthropic pra escolher entre as duas opções — **Client SDK** quando você orquestra as chamadas você mesmo; **Agent SDK** quando quer que a lib rode o loop de agente sozinha (bash, edição de arquivo, multi-step autônomo). O caso da Sollun é o primeiro: extração estruturada de 1 chamada (gerar o JSON de camadas do post), não um agente autônomo.

| Necessidade original (pensada no Agent SDK) | Como fica no Client SDK |
|---|---|
| **Tools** — "gerar imagem", "aplicar patch no JSON", "consultar identidade visual" | Não são tools que o SDK gerencia. São chamadas de função no seu próprio código, disparadas depois que você lê o output estruturado do Claude. |
| **Hooks** — forçar o refinamento de prompt antes de acionar a geração de imagem (Regra nº 1) | Não existe mecanismo de hook. Viram duas chamadas sequenciais na sua lógica: a 1ª refina o prompt, a 2ª aciona a geração de imagem no seu código. |
| **Sessions** — fluxo que pausa esperando resposta do cliente no check-in diário | Não é conceito do SDK. Resolvido pela arquitetura stateless já documentada no vault (fonte única de verdade no Postgres, nenhum canal guarda estado) combinada com o trigger.dev — não por uma "sessão" do agente. |

### Geração estruturada: o padrão

Toda saída estruturada na Sollun usa o mesmo mecanismo: a chamada declara **uma** tool cujo `input_schema` é o schema desejado e força `tool_choice` nela. O Claude preenche os argumentos dessa ferramenta em vez de responder com texto solto, e o resultado sai em `tool_use.input` — já no formato, sem parsing de string.

Vale pra tudo que vier: o JSON de camadas do post, a classificação de um patch, o output de um brainstorm.

## Custo por token

Billing padrão da Claude API (API key própria — sem camada de crédito separada).

| Modelo | Input | Output | Cache hit |
|---|---|---|---|
| Sonnet | $2/MTok | $10/MTok | $0.20/MTok |
| Haiku | $1/MTok | $5/MTok | $0.10/MTok |

> [!tip] Alavanca de custo
> Orquestração multi-modelo: Sonnet para raciocínio complexo, **Haiku para sub-tarefas simples e de alto volume**. Prompt caching reduz em até 90% o custo de reprocessar contexto repetido — a identidade visual do cliente se repete em toda geração.

## Isolamento

A recomendação de rodar em ambiente containerizado com sandbox e limites de CPU/memória vinha do **Agent SDK**, que expõe bash e edição de arquivo por padrão — era essa superfície que justificava o cuidado. O **Client SDK** não expõe ferramenta nenhuma desse tipo: faz a chamada de API e nada além do que o código pedir explicitamente. Essa preocupação específica cai de prioridade — a superfície de risco é bem menor.

==O trigger.dev já cria e destrói container por execução== de qualquer forma, então o isolamento continua acontecendo na prática — só deixou de ser um requisito a defender.
