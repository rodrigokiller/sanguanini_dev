# Product

## Register

brand

## Users

Três públicos, nesta ordem: clientes de consultoria Senior ERP (gestores de TI e
analistas que precisam confiar no consultor antes de contratar), recrutadores e
devs (validação técnica rápida via portfólio e GitHub), e a cena de romhacking
(comunidade que chega pelos Studios e pelo RomVault).

## Product Purpose

Site pessoal de Rodrigo Sanguanini (sanguanini.dev). O site é o cartão de visita
e o hub: apresenta quem ele é, prova o que ele constrói (5 produtos no ar) e
aponta para contato. Sucesso = visitante entende em 10 segundos o que Rodrigo
faz e clica em um projeto ou no e-mail.

## Brand Personality

Calmo, técnico, artesanal. A voz é de terminal: prompts, caminhos `~/`,
mensagens curtas em minúsculas nos rótulos, prosa normal no corpo. Nunca
alarmista, nunca vendedor. O humor aparece em detalhes (404 estilo `cat`,
modo CRT como easter egg), não em piadas no texto principal.

## Anti-references

- O site anterior: template ThemeForest (Arter) genérico com jQuery - identidade alugada.
- Portfólios "dark neon" com glassmorphism, gradientes roxos e partículas.
- Landing pages SaaS com hero-metric e cards idênticos de ícone+título+texto.

## Design Principles

1. **O site é o portfólio.** Cada detalhe (raio zero, réguas de 1px, boot) demonstra o mesmo cuidado dos produtos.
2. **DNA da casa.** O tema é o do RomVault/Studios - fósforo verde sobre near-black - porque é o que Rodrigo realmente constrói, não um figurino.
3. **Cada produto com a própria cor.** No portfólio, Jhourney é âmbar, ConectaX azul, RomVault verde, SeniorOps teal, GoCLI roxo - sobre o mesmo terminal neutro.
4. **Zero dependências.** HTML/CSS/JS puros, sem build, sem CDN. Editar e subir por FTP.
5. **Teatro dosado.** Scanlines quase invisíveis e boot de ~2s pulável por padrão; o exagero (glow, scanlines fortes) mora no modo CRT opcional.

## Accessibility & Inclusion

Contraste AA em texto de corpo, foco visível em tudo, `prefers-reduced-motion`
elimina boot/typing/reveals, HTML semântico com skip-link, navegação por teclado.
