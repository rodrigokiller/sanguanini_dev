# Deploy - sanguanini.dev na KingHost

O site é a raiz deste repositório: https://github.com/rodrigokiller/sanguanini_dev

## O que subir por FTP (raiz `www/`)

Tudo, **exceto**: os arquivos `.md` (PRODUCT/DESIGN/DEPLOY), a pasta `marca/`
(kit de marca, só para documentos/propostas) e `OLD_2024/` (nem está no git;
se ainda existir no seu disco/servidor, apague de lá).

```
index.html
favicon.svg
manifest.webmanifest
.htaccess
css/site.css
js/site.js
fonts/*.woff2
img/  (ícones, og.png e shots/)
files/cv.pdf   files/cv.html
erros/404.html  erros/500.html
```

## Passo a passo (FileZilla ou similar)

1. Conecte no FTP da KingHost como sempre.
2. **Faça backup do site atual** (baixe a pasta `www/` para o seu PC).
3. Apague o conteúdo antigo de `www/` - principalmente `OLD_2024/`
   (contém uma senha SMTP real; além de remover do servidor,
   **troque a senha do e-mail rodrigo@sanguanini.dev**).
4. Envie os arquivos listados acima para `www/`.
5. Teste: https://sanguanini.dev , uma URL inexistente (deve mostrar o 404
   verde) e o site no celular (menu → "Adicionar à tela inicial" instala
   como app).

## Manutenção

- **Currículo**: edite `files/cv.html` e re-imprima em PDF (Ctrl+P no
  navegador, A4, sem margens/cabeçalhos, "salvar como PDF" → `files/cv.pdf`).
- **Galeria**: prints reais em `img/shots/` para jhourney (4), conectax (4),
  romvault (6), seniorops (5), gocli (4), lom-studio (7), tile-studio (1),
  tim-studio (1). Faltam sig/wms/sgcq (placeholders). Para adicionar/remover
  imagens, edite o atributo `data-shots` do botão `./screenshots` de cada
  card no `index.html` (lista separada por vírgula).
- **Kit de marca**: pasta `marca/` (SVG, PNG claro/escuro, GIF do boot).

## Pendências conhecidas

- Prints do sig, wms e sgcq (ainda placeholders).
- Formulário de contato ficou fora de propósito (o `mail.php` antigo estava
  quebrado). O mailto resolve; se quiser formulário depois, dá para reativar
  com PHPMailer + as variáveis do `.htaccess`.
- Versão em inglês: se quiser, criamos `en/index.html` espelhada depois.
- Links do ~/lab apontam para o perfil do GitHub; quando os repositórios
  dos Studios estiverem públicos com nomes finais, trocar para as URLs diretas.
