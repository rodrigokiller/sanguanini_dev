# DESIGN.md - sanguanini.dev (tema Fósforo)

## Tema

Terminal de fósforo verde, calmo e legível - a versão "web refinada" do tema dos
Studios (c:\dev). Escuro comprometido: não existe modo claro; um CRT desligado
não tem tema claro. Textura: scanlines a 1.3% de opacidade + vinheta radial,
ambas `pointer-events:none`.

## Cores

| Token | Valor | Uso |
|---|---|---|
| `--bg` | `#0b0e10` | fundo |
| `--panel` | `#10151a` | superfícies (cards, rodapé) |
| `--panel-2` | `#141b1f` | superfície elevada / hover |
| `--line` | `#1c262c` | régua sutil (bordas padrão) |
| `--line-bright` | `#2c3d45` | régua ativa / hover |
| `--ink` | `#d6e2dc` | texto de corpo |
| `--ink-bright` | `#eaf3ee` | títulos |
| `--muted` | `#7f948c` | secundário |
| `--accent` | `#34e2a0` | fósforo - links, foco, CTA, status |
| `--on-accent` | `#06110c` | texto sobre o acento |
| `--amber` | `#ffb454` | seção lab / romhacking |
| `--blue` | `#7db8ff` | formação (timeline) |
| `--red` | `#ff6b6b` | erro (500) |

Cores de marca dos produtos (clareadas p/ fundo escuro):
jhourney `#e08b3c` · conectax `#639ff7` · romvault `#34e2a0` ·
seniorops `#2ec4a6` · gocli `#a78bfa`.

## Tipografia

- `--mono`: JetBrains Mono (variável, self-hosted `fonts/jetbrains-mono-latin.woff2`) - títulos, dados, rótulos, nav, botões.
- `--sans`: Inter (variável, self-hosted `fonts/inter-latin.woff2`) - prosa.
- Corpo 15px/1.65. H1 `clamp(2rem, 6vw, 3.4rem)` peso 700, tracking -0.025em.
- Kicker: mono 0.72rem, tracking 0.18em, minúsculas com prefixo `//`, na cor da seção.
- Números com `tabular-nums` (`.tnum`).

## Forma e espaço

- `border-radius: 0` absoluto (regra da casa).
- Separação por réguas de 1px; **nenhuma sombra decorativa**. Grades usam `gap:1px` sobre fundo `--line`.
- Escala de espaçamento base 4: 4/8/12/16/24/32/48/64 (`--s1..--s8`).
- Conteúdo max 1080px. Header sticky 58px.

## Motion

- Curva única `cubic-bezier(0.22,1,0.36,1)`; durações 110/190ms.
- Boot (~2.2s, 1x por sessão, pulável, trava de segurança 3.2s): peças do S deslizam e encaixam → pulso no contorno → prompt digita `whoami` → fade.
- Reveals por IntersectionObserver (fallback: tudo visível). Barras de skill crescem ao entrar na viewport.
- `prefers-reduced-motion`: boot vira nada, typing vira texto fixo, reveals instantâneos.

## Componentes

- **Botão** `.bt`: mono 13px/600, 40px de altura, acento sólido; `.sec` = contorno. `:active` desce 1px.
- **Card de produto** `.produto`: painel + hover translateY(-2px), título na cor `--marca` do produto, tags de stack com borda.
- **Nav** `~/secao`: mono 12px, ativo = acento + fundo `--accent-dim` via `aria-current`.
- **Rodapé** = barra de status de terminal (`● online`, © ano, toggle CRT).
- **Modo CRT** (`html.crt`): scanlines fortes + text-shadow/drop-shadow de fósforo. Easter egg persistido em localStorage.

## Z-index

sticky 20 → boot 40 → skip-link 50. Nada acima disso.
