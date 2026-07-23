/* sanguanini.dev - sem dependências, sem build */
(function () {
  'use strict';

  var reduzMovimento = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- boot: o S se monta e o prompt digita ----------
     roda em TODO carregamento (F5 incluso); só o reduced-motion pula */
  var boot = document.getElementById('boot');
  var bootLinha = document.getElementById('boot-linha');

  function fechaBoot() {
    if (!boot || boot.classList.contains('saindo')) return;
    boot.classList.add('saindo');
    document.body.classList.add('pos-boot');
    setTimeout(function () { boot.hidden = true; }, 460);
  }

  if (boot && !reduzMovimento) {
    boot.hidden = false;
    boot.classList.add('rodando');
    document.documentElement.style.overflow = 'hidden';

    var cmd = 'whoami';
    var prefixo = '<span class="user">rodrigo@sanguanini.dev</span>:~$ ';
    var i = 0;
    setTimeout(function digita() {
      if (boot.hidden) return;
      bootLinha.innerHTML = prefixo + '<span class="cmd">' + cmd.slice(0, i) + '</span><span class="caret"></span>';
      i++;
      if (i <= cmd.length) setTimeout(digita, 90);
      else setTimeout(fim, 520);
    }, 1000);

    var fim = function () {
      document.documentElement.style.overflow = '';
      fechaBoot();
    };
    boot.addEventListener('click', fim);
    document.addEventListener('keydown', function esc(ev) {
      if (boot.hidden) { document.removeEventListener('keydown', esc); return; }
      fim();
    });
    /* trava de segurança: nunca prende o visitante */
    setTimeout(fim, 3200);
  } else if (boot) {
    boot.hidden = true;
    document.body.classList.add('pos-boot');
  }

  /* ---------- idade dinâmica (16/07/1990) ---------- */
  var nasc = new Date(1990, 6, 16);
  var hoje = new Date();
  var idade = hoje.getFullYear() - nasc.getFullYear();
  var m = hoje.getMonth() - nasc.getMonth();
  if (m < 0 || (m === 0 && hoje.getDate() < nasc.getDate())) idade--;
  var idadeEl = document.getElementById('idade');
  if (idadeEl) idadeEl.textContent = idade;

  var anoEl = document.getElementById('ano');
  if (anoEl) anoEl.textContent = hoje.getFullYear();

  /* ---------- frase rotativa do hero ---------- */
  var frases = [
    'desenvolvo aplicações web e Windows.',
    'faço consultoria de tecnologia Senior ERP.',
    'crio customizações e regras LSP.',
    'desenvolvo integrações entre sistemas.',
    'escrevo scripts para o seu banco de dados.',
    'crio programas diversos por hobby e diversão.',
    'sou um grande entusiasta de novas tecnologias.',
  ];
  var rotEl = document.getElementById('rotativa-txt');
  if (rotEl && !reduzMovimento) {
    var fi = 0, ci = frases[0].length, apagando = true;
    setTimeout(function tique() {
      var atual = frases[fi];
      ci += apagando ? -1 : 1;
      rotEl.textContent = atual.slice(0, ci);
      var espera = apagando ? 26 : 46;
      if (!apagando && ci === atual.length) { apagando = true; espera = 2400; }
      else if (apagando && ci === 0) { apagando = false; fi = (fi + 1) % frases.length; espera = 300; }
      setTimeout(tique, espera);
    }, 2600);
  }

  /* ---------- revelação das seções + barras de skill ---------- */
  var revela = document.querySelectorAll('.revela');
  if ('IntersectionObserver' in window && !reduzMovimento) {
    var io = new IntersectionObserver(function (entradas) {
      entradas.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add('visto'); io.unobserve(e.target); }
      });
    }, { rootMargin: '0px 0px -8% 0px' });
    revela.forEach(function (el) { io.observe(el); });
  } else {
    revela.forEach(function (el) { el.classList.add('visto'); });
  }

  /* ---------- seção ativa no menu ---------- */
  var links = document.querySelectorAll('.nav a[data-sec]');
  var secoes = [];
  links.forEach(function (a) {
    var alvo = document.getElementById(a.dataset.sec) || document.querySelector('main');
    if (alvo) secoes.push({ a: a, el: a.dataset.sec === 'inicio' ? document.querySelector('.hero') : alvo });
  });
  function marcaAtiva() {
    var y = window.scrollY + window.innerHeight * 0.35;
    var atual = secoes[0];
    secoes.forEach(function (s) { if (s.el && s.el.offsetTop <= y) atual = s; });
    links.forEach(function (a) { a.removeAttribute('aria-current'); });
    if (atual) atual.a.setAttribute('aria-current', 'true');
  }
  window.addEventListener('scroll', marcaAtiva, { passive: true });
  marcaAtiva();

  /* ---------- galeria de screenshots ---------- */
  var galeria = document.getElementById('galeria');
  if (galeria && typeof galeria.showModal === 'function') {
    var gImg = document.getElementById('galeria-img');
    var gTitulo = document.getElementById('galeria-titulo');
    var gConta = document.getElementById('galeria-conta');
    var gLegenda = document.getElementById('galeria-legenda');
    var shots = [], nomeAtual = '', idx = 0;

    function mostra(n) {
      if (!shots.length) return;
      idx = (n + shots.length) % shots.length;
      gImg.src = shots[idx];
      gImg.alt = nomeAtual + ' - screenshot ' + (idx + 1) + ' de ' + shots.length;
      gConta.textContent = (idx + 1) + '/' + shots.length;
      gLegenda.textContent = '$ feh ' + shots[idx].split('/').pop() + '   (setas navegam, esc fecha)';
    }

    document.querySelectorAll('.shots').forEach(function (bt) {
      bt.addEventListener('click', function () {
        var card = bt.closest('.produto, .ferramenta');
        nomeAtual = bt.dataset.nome || 'projeto';
        shots = (bt.dataset.shots || '').split(',').map(function (s) { return s.trim(); }).filter(Boolean);
        gTitulo.textContent = nomeAtual;
        if (card) galeria.style.setProperty('--marca', getComputedStyle(card).getPropertyValue('--marca'));
        mostra(0);
        galeria.showModal();
      });
    });

    document.getElementById('galeria-ant').addEventListener('click', function () { mostra(idx - 1); });
    document.getElementById('galeria-prox').addEventListener('click', function () { mostra(idx + 1); });
    document.getElementById('galeria-fechar').addEventListener('click', function () { galeria.close(); });
    galeria.addEventListener('keydown', function (ev) {
      if (ev.key === 'ArrowLeft') { mostra(idx - 1); ev.preventDefault(); }
      if (ev.key === 'ArrowRight') { mostra(idx + 1); ev.preventDefault(); }
    });
    /* clique no backdrop fecha */
    galeria.addEventListener('click', function (ev) {
      if (ev.target === galeria) galeria.close();
    });
    /* imagem que não existe ainda (placeholder não substituído) */
    gImg.addEventListener('error', function () {
      gLegenda.textContent = 'erro: ' + gImg.src.split('/').pop() + ' não encontrado - suba o print em img/shots/';
    });
  }

  /* ---------- modo CRT (easter egg) ---------- */
  var crtBt = document.getElementById('crt');
  var crtLigado = false;
  try { crtLigado = localStorage.getItem('crt') === '1'; } catch (e) { /* ignora */ }
  function aplicaCrt() {
    document.documentElement.classList.toggle('crt', crtLigado);
    if (crtBt) {
      crtBt.setAttribute('aria-pressed', String(crtLigado));
      crtBt.textContent = crtLigado ? '[ crt: on ]' : '[ crt: off ]';
    }
  }
  if (crtBt) {
    crtBt.addEventListener('click', function () {
      crtLigado = !crtLigado;
      try { localStorage.setItem('crt', crtLigado ? '1' : '0'); } catch (e) { /* ignora */ }
      aplicaCrt();
    });
  }
  aplicaCrt();
})();
