/* Hub XP On · navegação, busca, calendário, pulso do CRM e tour */
(function () {
  'use strict';
  var H = window.HUB;
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var main = $('#conteudo');

  var EIXOS = {
    colab: { nome: 'Colaboração', cor: 'var(--colab)' },
    ciber: { nome: 'Cibersegurança', cor: 'var(--ciber)' },
    infra: { nome: 'Infraestrutura e Redes', cor: 'var(--infra)' },
    serv: { nome: 'Serviços', cor: 'var(--serv)' },
    inst: { nome: 'Institucional', cor: 'var(--inst)' }
  };
  var PUBLICO = {
    cliente: 'Pode enviar ao cliente',
    interno: 'Uso interno',
    login: 'Pede login',
    rascunho: 'Em revisão'
  };
  var CRM = {
    url: 'https://dttsydouqpqmejwsrjhq.supabase.co/rest/v1/eventos_site',
    key: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImR0dHN5ZG91cXBxbWVqd3NyamhxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODgyNzMwMzAsImV4cCI6MjEwMzg0OTAzMH0.yObXebre21x6XEVP5nPacRBH86IjYv2OPgUHuanI2hQ'
  };
  var MESES = ['jan', 'fev', 'mar', 'abr', 'mai', 'jun', 'jul', 'ago', 'set', 'out', 'nov', 'dez'];
  var MESES_LONGO = ['janeiro', 'fevereiro', 'março', 'abril', 'maio', 'junho', 'julho', 'agosto', 'setembro', 'outubro', 'novembro', 'dezembro'];
  var DIAS = ['dom', 'seg', 'ter', 'qua', 'qui', 'sex', 'sáb'];

  function esc(s) { return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]; }); }
  function hoje() { var d = new Date(); d.setHours(0, 0, 0, 0); return d; }
  function dt(iso) { var p = iso.split('-'); return new Date(+p[0], +p[1] - 1, +p[2]); }
  function secao(id) { return H.secoes.filter(function (s) { return s.id === id; })[0]; }
  function host(url) { return url.replace(/^https?:\/\//, '').replace(/\/$/, ''); }
  function urlDe(l) { return l.url === '@sharepoint' ? (H.sharepoint || '') : l.url; }
  function store(k, v) { try { if (v === undefined) return localStorage.getItem(k); localStorage.setItem(k, v); } catch (e) { return null; } }

  /* ── navegação ───────────────────────── */
  function renderNav() {
    var html = '<ul><li class="nav-home"><a class="nav-a" href="#/inicio" data-id="inicio"><span class="port-key">0</span>Início</a></li>';
    H.secoes.forEach(function (s) {
      html += '<li><a class="nav-a" href="#/' + s.id + '" data-id="' + s.id + '"><span class="port-key">' + s.tecla + '</span>' + esc(s.curto) + '</a></li>';
    });
    $('#nav').innerHTML = html + '</ul>';
    $('#railMeta').textContent = 'Conteúdo atualizado em ' + H.atualizado;
  }
  function marcarNav(id) {
    document.querySelectorAll('.nav-a').forEach(function (a) {
      if (a.dataset.id === id) a.setAttribute('aria-current', 'page'); else a.removeAttribute('aria-current');
    });
  }

  /* ── linhas do diretório ─────────────── */
  function row(l) {
    var u = urlDe(l), e = l.eixo && EIXOS[l.eixo];
    var side = '<span class="chip ' + l.publico + '">' + PUBLICO[l.publico] + '</span>';
    if (u) {
      side += '<a class="btn" href="' + esc(u) + '" target="_blank" rel="noopener">Abrir</a>';
      if (l.publico === 'cliente') side += '<button class="btn ghost" type="button" data-copy="' + esc(u) + '">Copiar link</button>';
    } else {
      side += '<span class="btn" aria-disabled="true">Link a configurar</span>';
    }
    return '<li class="row"><div>' +
      '<div class="row-name">' + (e ? '<span class="eixo-dot" style="background:' + e.cor + '" title="' + e.nome + '"></span>' : '') + esc(l.nome) + '</div>' +
      '<p class="row-desc">' + esc(l.desc) + '</p>' +
      (u ? '<div class="row-host">' + esc(host(u)) + '</div>' : '') +
      '</div><div class="row-side">' + side + '</div></li>';
  }
  function grupos(sec) {
    var lista = H.links.filter(function (l) { return l.secao === sec; }), ordem = [], por = {};
    lista.forEach(function (l) { if (!por[l.grupo]) { por[l.grupo] = []; ordem.push(l.grupo); } por[l.grupo].push(l); });
    return ordem.map(function (g) {
      return '<section class="group"><h2>' + esc(g) + '</h2><ul class="rows">' + por[g].map(row).join('') + '</ul></section>';
    }).join('');
  }
  function cabeca(s, extra) {
    return '<header class="page-head"><h1>' + esc(s.nome) + '</h1><p class="lead">' + esc(extra || s.resumo) + '</p></header>';
  }
  function rodape() {
    return '<p class="foot">Hub do marketing da XP On. Falta algum link ou material? Escreva para <a href="mailto:marketing@xpon.com.br">marketing@xpon.com.br</a>.</p>';
  }

  /* ── páginas ─────────────────────────── */
  var paginas = {
    inicio: function () {
      var nov = novidades();
      var ports = H.secoes.map(function (s) {
        return '<li><a class="port' + (nov[s.id] ? ' novo' : '') + '" href="#/' + s.id + '"><span class="port-top"><span class="led" aria-hidden="true"></span>' + (nov[s.id] ? '<span class="sr">Novidade: ' + esc(nov[s.id]) + '. </span>' : '') + '<span class="port-num">' + s.tecla + '</span></span>' +
          '<span class="port-name">' + esc(s.nome) + '</span><span class="port-desc">' + esc(s.resumo) + '</span></a></li>';
      }).join('');
      main.innerHTML =
        '<section class="hero" aria-labelledby="hTitle">' +
          '<h1 id="hTitle">O marketing da XP On num lugar só.</h1>' +
          '<p class="lead">Sites, apresentações, arquivos da marca, calendário de posts e eventos. Procure pelo nome ou escolha uma área no painel.</p>' +
          '<div class="search" id="searchBox"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/></svg>' +
            '<label class="sr" for="q">Buscar no Hub</label><input id="q" type="search" autocomplete="off" placeholder="Ex.: Serpro, Zoom, atestado, LP"><kbd>/</kbd></div>' +
          '<div id="results" class="results" hidden></div>' +
          '<div class="plate" id="plate"><span class="screw-b" aria-hidden="true"></span><ul class="ports">' + ports + '</ul>' +
          '<p class="plate-legend"><span><span class="led-key"></span>Luz azul: tem novidade nesta semana</span><span>Atalho: tecle o número da área. O 0 volta para o início.</span></p></div>' +
        '</section>' +
        '<div class="home-grid">' +
          '<section class="panel" aria-labelledby="pTitle"><div class="panel-head"><h2 id="pTitle">Uso das páginas</h2></div>' +
            '<p class="note">Últimos 30 dias, somando site, landing pages e apresentações. Dados do CRM Marketing.</p><div id="pulso"><p class="note">Carregando…</p></div></section>' +
          '<section class="panel" aria-labelledby="rTitle"><div class="panel-head"><h2 id="rTitle">Próximos posts</h2><a href="#/redes">Ver calendário</a></div>' +
            '<div class="mini-posts">' + proximosPosts(3) + '</div>' + proximoEvento() + '</section>' +
        '</div>' + rodape();
      var q = $('#q');
      q.addEventListener('input', function () { buscar(q.value); });
      pulso();
    },
    sites: function () { main.innerHTML = cabeca(secao('sites')) + grupos('sites') + rodape(); },
    apresentacoes: function () {
      main.innerHTML = cabeca(secao('apresentacoes'), 'Institucionais para qualquer cliente, comerciais feitas para uma conta específica e o repositório para montar propostas. As que podem ir para o cliente têm o botão Copiar link.') + grupos('apresentacoes') + rodape();
    },
    ferramentas: function () {
      main.innerHTML = cabeca(secao('ferramentas'), 'Ferramentas de uso interno. O CRM Marketing organiza leads e funis do marketing; o CRM oficial da empresa continua sendo o CIGAM. A Inteligência XP On pede o login de cada diretoria.') + grupos('ferramentas') + rodape();
    },
    marca: function () {
      var c = H.contatos, ct = ['whatsapp', 'email', 'sede', 'marketing'].map(function (k) {
        return '<div class="contact"><div><span>' + esc(c[k].rotulo) + '</span><b>' + esc(c[k].valor) + '</b></div><button class="btn ghost" type="button" data-copy="' + esc(c[k].valor) + '">Copiar</button></div>';
      }).join('');
      main.innerHTML = cabeca(secao('marca'), 'Logos, fotos, vídeos e documentos oficiais ficam no SharePoint do marketing. Use sempre os arquivos de lá, nunca uma versão salva no computador.') +
        grupos('marca') +
        '<section class="group"><h2>Contatos oficiais</h2><p class="lead" style="margin:0 0 16px;font-size:16px">Use estes em qualquer material, assinatura ou página. O WhatsApp comercial atende em horário comercial.</p><div class="contacts">' + ct + '</div></section>' + rodape();
    },
    redes: function () { renderRedes(); },
    eventos: function () { renderEventos(); },
    demandas: function () {
      var l = H.links.filter(function (x) { return x.secao === 'demandas'; })[0];
      main.innerHTML = cabeca(secao('demandas'), 'Folder, post, apresentação, vídeo, peça para evento ou material digital: todo pedido ao marketing entra pela Central de Demandas, com prazo e status visíveis.') +
        '<ol class="steps">' +
          '<li><h3>Preencha o briefing</h3><p>Diga o que precisa, para quem, o objetivo e a data. Referências ajudam.</p></li>' +
          '<li><h3>O marketing prioriza</h3><p>Cada pedido entra numa fila com prazo. Copie o líder da sua área.</p></li>' +
          '<li><h3>Acompanhe e aprove</h3><p>Veja o status, peça ajustes e receba a entrega numa pasta organizada.</p></li>' +
        '</ol>' +
        '<div class="callout"><div><h2>Abrir um pedido</h2><p>A Central mostra cada demanda com status: pausada, em iniciação, em desenvolvimento, em ajustes, em entrega ou concluída.</p></div>' +
          '<a class="btn" href="' + esc(l.url) + '" target="_blank" rel="noopener">Abrir a Central de Demandas</a></div>' +
        '<p class="lead" style="font-size:16px;margin-top:20px">Sem acesso à Central? Envie o briefing para <a href="mailto:marketing@xpon.com.br">marketing@xpon.com.br</a> com o líder da área em cópia.</p>' + rodape();
    },
    arquivo: function () { main.innerHTML = cabeca(secao('arquivo')) + grupos('arquivo') + rodape(); }
  };

  function novidades() {
    var h = hoje(), sem = new Date(+h + 7 * 864e5), n = {};
    var p = H.posts.filter(function (x) { var d = dt(x.data); return d >= h && d < sem; });
    if (p.length) n.redes = p.length + (p.length > 1 ? ' posts' : ' post') + ' nesta semana';
    var e = H.eventos.filter(function (x) { var d = dt(x.data); return d >= h && d < new Date(+h + 21 * 864e5); });
    if (e.length) n.eventos = 'evento nas próximas semanas';
    return n;
  }

  /* ── busca ───────────────────────────── */
  function norm(s) { return String(s).toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, ''); }
  function buscar(q) {
    var box = $('#results'), plate = $('#plate'), t = norm(q.trim());
    if (!t) { box.hidden = true; plate.hidden = false; return; }
    var achados = H.links.filter(function (l) {
      return norm(l.nome + ' ' + l.desc + ' ' + l.grupo + ' ' + (secao(l.secao) || {}).nome + ' ' + urlDe(l)).indexOf(t) > -1;
    });
    plate.hidden = true; box.hidden = false;
    box.innerHTML = achados.length
      ? '<ul class="rows">' + achados.map(row).join('') + '</ul>'
      : '<p class="empty">Nada com “' + esc(q) + '”. Tente outro nome ou peça o material na <a href="#/demandas">Central de Demandas</a>.</p>';
  }

  /* ── redes ───────────────────────────── */
  function postStatus(p) {
    var d = dt(p.data), h = hoje();
    return d < h ? 'feito' : (+d === +h ? 'hoje' : 'futuro');
  }
  function dataCurta(iso) { var d = dt(iso); return DIAS[d.getDay()] + ', ' + ('0' + d.getDate()).slice(-2) + '/' + ('0' + (d.getMonth() + 1)).slice(-2); }
  function proximosPosts(n) {
    var h = hoje(), lista = H.posts.filter(function (p) { return dt(p.data) >= h; }).slice(0, n);
    if (!lista.length) return '<p class="note">Sem posts programados. O calendário do próximo trimestre entra aqui quando for aprovado.</p>';
    return lista.map(function (p) {
      return '<a class="mini-post" href="#/redes"><img src="assets/posts/' + p.id + '.webp" alt="" loading="lazy"><span><b>' + esc(p.tema) + '</b><small>' + dataCurta(p.data) + ', ' + esc(p.formato).toLowerCase() + ', ' + EIXOS[p.eixo].nome +'</small></span></a>';
    }).join('');
  }
  var mesRedes = null;
  function renderRedes() {
    var meses = [];
    H.posts.forEach(function (p) { var m = p.data.slice(0, 7); if (meses.indexOf(m) < 0) meses.push(m); });
    var atual = hoje().toISOString().slice(0, 7);
    if (!mesRedes) mesRedes = meses.indexOf(atual) > -1 ? atual : meses[0];
    var seg = meses.map(function (m) {
      var nome = MESES_LONGO[+m.slice(5) - 1];
      return '<button type="button" data-mes="' + m + '" aria-pressed="' + (m === mesRedes) + '">' + nome.charAt(0).toUpperCase() + nome.slice(1) + '</button>';
    }).join('');
    var cards = H.posts.filter(function (p) { return p.data.slice(0, 7) === mesRedes; }).map(function (p) {
      var st = postStatus(p), e = EIXOS[p.eixo];
      var flag = st === 'hoje' ? '<span class="flag">Hoje</span>' : st === 'feito' ? '<span class="flag feito">Publicado</span>' : '';
      return '<li class="post ' + st + '"><div class="post-img"><img src="assets/posts/' + p.id + '.webp" alt="Prévia do post: ' + esc(p.tema) + '" loading="lazy">' + flag + '</div>' +
        '<div class="post-bar" style="background:' + e.cor + '"></div><div class="post-body"><div class="post-date">' + dataCurta(p.data) + '</div>' +
        '<div class="post-tema">' + esc(p.tema) + '</div><div class="post-meta">' + esc(p.formato) + ', ' + e.nome + '</div></div></li>';
    }).join('');
    var total = H.posts.length;
    main.innerHTML = cabeca(secao('redes'), 'Calendário de outubro de 2026 a março de 2027: ' + total + ' publicações no feed, de terça a quinta, às 11h30, no Instagram e no Facebook. O LinkedIn recebe os posts de terça e quinta. Os arquivos ficam em MIDIAS SOCIAIS, uma pasta por trimestre.') +
      '<div class="seg" role="group" aria-label="Mês">' + seg + '</div><ul class="posts">' + cards + '</ul>' +
      '<div class="redes-info"><span>Perfis: ' + H.redesPerfis.map(function (r) { return '<a href="' + r.url + '" target="_blank" rel="noopener">' + r.nome + '</a>'; }).join(' e ') + '</span>' +
      '<span>Arquivos e legendas de cada post ficam no SharePoint do marketing, em Mídias Sociais.</span></div>' + rodape();
    main.querySelectorAll('[data-mes]').forEach(function (b) {
      b.addEventListener('click', function () { mesRedes = b.dataset.mes; renderRedes(); });
    });
  }

  /* ── eventos ─────────────────────────── */
  function proximoEvento() {
    var h = hoje(), prox = H.eventos.filter(function (e) { return dt(e.data) >= h; })[0];
    var ult = H.eventos.filter(function (e) { return dt(e.data) < h; }).slice(-1)[0];
    var e = prox || ult; if (!e) return '';
    var d = dt(e.data);
    return '<div class="next-event"><div class="panel-head"><h3>' + (prox ? 'Próximo evento' : 'Último evento') + '</h3><a href="#/eventos">Ver todos</a></div>' +
      '<p style="margin:6px 0 0"><b>' + esc(e.titulo) + '</b><br><span class="post-meta">' + d.getDate() + ' de ' + MESES_LONGO[d.getMonth()] + ', ' + esc(e.formato).toLowerCase() + '</span></p></div>';
  }
  function renderEventos() {
    var feitos = H.eventos.filter(function (e) { return e.status === 'feito'; });
    var webinars = feitos.filter(function (e) { return /webinar/i.test(e.formato); }).length;
    var itens = H.eventos.map(function (e) {
      var d = dt(e.data), cor = EIXOS[e.eixo].cor;
      return '<li class="ev ' + e.status + '"><div class="ev-date"><b>' + ('0' + d.getDate()).slice(-2) + '</b><span>' + MESES[d.getMonth()] + '</span></div>' +
        '<span class="ev-dot" style="background:' + cor + '"></span>' +
        '<div class="ev-card"><h3>' + esc(e.titulo) + '</h3><p class="ev-meta">' + esc(e.formato) + ' com ' + esc(e.parceiro) + (e.status === 'previsto' ? '. Previsto' : '') + '</p>' +
        (e.nota ? '<p class="ev-note">' + esc(e.nota) + '</p>' : '') + '</div></li>';
    }).join('');
    main.innerHTML = cabeca(secao('eventos'), 'Webinars mensais com fabricantes parceiros e eventos presenciais. Quer um evento para a sua conta ou segmento? Peça na Central de Demandas.') +
      '<div class="summary"><div><b>' + feitos.length + '</b><span>eventos em 2026</span></div><div><b>' + webinars + '</b><span>webinars</span></div><div><b>' + (feitos.length - webinars) + '</b><span>presencial</span></div></div>' +
      '<ol class="timeline">' + itens + '</ol>' + rodape();
  }

  /* ── pulso do CRM ────────────────────── */
  var ROT = { visita: 'visitas', whatsapp: 'cliques no WhatsApp', formulario: 'formulários enviados', cta_contato: 'cliques em falar com a XP On', telefone: 'cliques no telefone', email: 'cliques no e-mail', demo: 'demos abertas' };
  function pulso() {
    var box = $('#pulso'); if (!box) return;
    var desde = new Date(Date.now() - 30 * 864e5).toISOString();
    var ctl = window.AbortController ? new AbortController() : null;
    if (ctl) setTimeout(function () { ctl.abort(); }, 8000);
    fetch(CRM.url + '?select=tipo,pagina&criado_em=gte.' + encodeURIComponent(desde) + '&limit=10000', {
      headers: { apikey: CRM.key, Authorization: 'Bearer ' + CRM.key }, signal: ctl ? ctl.signal : undefined
    }).then(function (r) { if (!r.ok) throw new Error(r.status); return r.json(); })
      .then(function (rows) {
        var tipos = {}, pags = {};
        rows.forEach(function (r) { tipos[r.tipo] = (tipos[r.tipo] || 0) + 1; if (r.pagina) { var pg = r.pagina.replace(/^[0-9a-f]{24}--/, ''); pags[pg] = (pags[pg] || 0) + 1; } });
        var ordem = ['visita', 'whatsapp', 'formulario', 'cta_contato'];
        var tiles = ordem.map(function (k) { return '<div class="tile"><b>' + (tipos[k] || 0).toLocaleString('pt-BR') + '</b><span>' + ROT[k] + '</span></div>'; }).join('');
        var top = Object.keys(pags).sort(function (a, b) { return pags[b] - pags[a]; }).slice(0, 6);
        box.innerHTML = '<div class="tiles">' + tiles + '</div>' + (top.length
          ? '<h3 style="margin-bottom:6px">Páginas com mais interação</h3><ul class="rank">' + top.map(function (p) { return '<li><span>' + esc(p) + '</span><b>' + pags[p] + '</b></li>'; }).join('') + '</ul>'
          : '<p class="note">Nenhuma interação registrada nos últimos 30 dias.</p>') +
          '<p class="note" style="margin:14px 0 0">Leads e funil completos no <a href="https://crm-xpon.netlify.app" target="_blank" rel="noopener">CRM Marketing</a>.</p>';
      })
      .catch(function () {
        box.innerHTML = '<p class="status-off">Sem conexão com o CRM Marketing agora. Os números aparecem aqui quando o banco voltar a responder. Os formulários continuam chegando por e-mail em contato@xpon.com.br.</p>';
      });
  }

  /* ── copiar ──────────────────────────── */
  function toast(msg) { var t = $('#toast'); t.textContent = msg; t.classList.add('show'); clearTimeout(toast.t); toast.t = setTimeout(function () { t.classList.remove('show'); }, 2200); }
  function copiar(txt) {
    function ok() { toast('Copiado: ' + txt.replace(/^https?:\/\//, '')); }
    if (navigator.clipboard && window.isSecureContext) return navigator.clipboard.writeText(txt).then(ok, fallback);
    fallback();
    function fallback() {
      var ta = document.createElement('textarea'); ta.value = txt; ta.style.position = 'fixed'; ta.style.opacity = '0';
      document.body.appendChild(ta); ta.select();
      try { document.execCommand('copy'); ok(); } catch (e) { toast('Não deu para copiar. Selecione o link e copie à mão.'); }
      ta.remove();
    }
  }
  document.addEventListener('click', function (e) {
    var b = e.target.closest('[data-copy]'); if (b) copiar(b.dataset.copy);
  });

  /* ── roteador ────────────────────────── */
  function rota() {
    var id = (location.hash.replace(/^#\/?/, '') || 'inicio').split('?')[0];
    if (!paginas[id]) id = 'inicio';
    paginas[id]();
    marcarNav(id);
    var s = secao(id);
    document.title = (s ? s.nome + ' · ' : '') + 'Hub XP On';
    fecharMenu();
    if (rota.feita) { window.scrollTo(0, 0); main.focus({ preventScroll: true }); }
    rota.feita = true;
  }
  window.addEventListener('hashchange', rota);

  /* ── menu móvel ──────────────────────── */
  var rail = $('#rail'), scrim = $('#scrim'), menuBtn = $('#menuBtn');
  function abrirMenu() { rail.classList.add('open'); scrim.hidden = false; menuBtn.setAttribute('aria-expanded', 'true'); }
  function fecharMenu() { rail.classList.remove('open'); scrim.hidden = true; menuBtn.setAttribute('aria-expanded', 'false'); }
  menuBtn.addEventListener('click', function () { rail.classList.contains('open') ? fecharMenu() : abrirMenu(); });
  scrim.addEventListener('click', fecharMenu);

  /* ── atalhos ─────────────────────────── */
  document.addEventListener('keydown', function (e) {
    if (!$('#tour').hidden) {
      if (e.key === 'Escape') tourFim();
      if (e.key === 'ArrowRight') tourIr(tourI + 1);
      if (e.key === 'ArrowLeft') tourIr(tourI - 1);
      return;
    }
    if ($('#gate') && !$('#gate').hidden) return;
    var tag = (e.target.tagName || '').toLowerCase();
    if (tag === 'input' || tag === 'textarea' || tag === 'select' || e.metaKey || e.ctrlKey || e.altKey) {
      if (e.key === 'Escape' && e.target.id === 'q') { e.target.value = ''; buscar(''); e.target.blur(); }
      return;
    }
    if (e.key === '/') { e.preventDefault(); if (!$('#q')) location.hash = '#/inicio'; setTimeout(function () { $('#q') && $('#q').focus(); }, 0); }
    if (e.key === '0') location.hash = '#/inicio';
    var s = H.secoes.filter(function (x) { return x.tecla === e.key; })[0];
    if (s) location.hash = '#/' + s.id;
  });

  /* ── tour de abertura ────────────────── */
  var mobile = function () { return window.matchMedia('(max-width:960px)').matches; };
  var PASSOS = [
    { rota: 'inicio', alvo: null, titulo: 'Este é o Hub do marketing', texto: 'Tudo o que o marketing produz para a XP On está aqui: sites, apresentações, arquivos da marca, posts e eventos. O tour leva meio minuto.' },
    { rota: 'inicio', alvo: function () { return mobile() ? '#menuBtn' : '#nav'; }, titulo: 'Oito áreas no menu', texto: '', textoFn: function () { return mobile() ? "No celular, o menu abre neste botão. Lá estão as oito áreas do Hub." : 'O menu fica sempre à esquerda. Tecle o número da área para ir direto, ou 0 para voltar ao início.'; } },
    { rota: 'inicio', alvo: '#searchBox', titulo: 'Procure pelo nome', texto: 'Digite Serpro, Zoom, atestado ou qualquer outro termo. A tecla / leva o cursor para a busca.' },
    { rota: 'sites', alvo: '.rows .row', titulo: 'Mande para o cliente', texto: 'Itens marcados como Pode enviar ao cliente têm o botão Copiar link. Visitas, cliques no WhatsApp e formulários dessas páginas aparecem no CRM Marketing.' },
    { rota: 'demandas', alvo: '.callout', titulo: 'Precisa de um material novo?', texto: 'Folder, post, apresentação ou peça digital: peça pela Central de Demandas. Você acompanha o status até a entrega.' },
    { rota: 'inicio', alvo: function () { return mobile() ? null : '#tourBtn'; }, titulo: 'Pronto', texto: 'Para ver este tour de novo, use o link no rodapé do menu.', fim: true }
  ];
  var tourI = 0;
  function tourAbrir() { $('#tour').hidden = false; document.body.style.overflow = 'hidden'; tourIr(0); }
  function tourFim() {
    $('#tour').hidden = true; document.body.style.overflow = '';
    store('xphub.tour', 'visto');
    if (location.hash !== '#/inicio') location.hash = '#/inicio';
    setTimeout(function () { $('#q') && $('#q').focus(); }, 50);
  }
  function tourIr(i) {
    if (i < 0 || i >= PASSOS.length) return;
    tourI = i;
    var p = PASSOS[i];
    if ((location.hash.replace(/^#\/?/, '') || 'inicio') !== p.rota) { location.hash = '#/' + p.rota; }
    setTimeout(function () { posicionar(p); }, 60);
    $('#tourStep').textContent = 'Passo ' + (i + 1) + ' de ' + PASSOS.length;
    $('#tourTitle').textContent = p.titulo;
    $('#tourText').textContent = p.textoFn ? p.textoFn() : p.texto;
    $('#tourBack').hidden = i === 0;
    $('#tourNext').textContent = p.fim ? 'Começar a usar' : (i === 0 ? 'Fazer o tour' : 'Próximo');
    $('#tourSkip').hidden = !!p.fim;
    $('#tourNext').focus();
  }
  function posicionar(p) {
    var sel = typeof p.alvo === 'function' ? p.alvo() : p.alvo;
    var el = sel && $(sel), spot = $('#tourSpot'), card = $('#tourCard');
    var vw = window.innerWidth, vh = window.innerHeight, cw = card.offsetWidth, ch = card.offsetHeight;
    if (!el) {
      spot.className = 'tour-spot center'; spot.removeAttribute('style');
      card.style.left = (vw - cw) / 2 + 'px'; card.style.top = Math.max(16, (vh - ch) / 2) + 'px';
      return;
    }
    el.scrollIntoView({ block: 'center', behavior: 'instant' in document.documentElement.style ? 'instant' : 'auto' });
    var r = el.getBoundingClientRect(), pad = 8;
    var top = Math.max(8, r.top - pad), h = Math.min(r.height + pad * 2, vh - top - 8);
    spot.className = 'tour-spot';
    spot.style.cssText = 'left:' + (r.left - pad) + 'px;top:' + top + 'px;width:' + (r.width + pad * 2) + 'px;height:' + h + 'px';
    var left, ctop;
    if (r.right + 20 + cw < vw) { left = r.right + 20; ctop = Math.min(Math.max(16, r.top), vh - ch - 16); }
    else if (r.bottom + 16 + ch < vh) { left = Math.min(Math.max(16, r.left), vw - cw - 16); ctop = r.bottom + 16; }
    else { left = Math.min(Math.max(16, r.left), vw - cw - 16); ctop = Math.max(16, r.top - ch - 16); }
    card.style.left = left + 'px'; card.style.top = ctop + 'px';
  }
  $('#tourNext').addEventListener('click', function () { PASSOS[tourI].fim ? tourFim() : tourIr(tourI + 1); });
  $('#tourBack').addEventListener('click', function () { tourIr(tourI - 1); });
  $('#tourSkip').addEventListener('click', tourFim);
  $('#tourBtn').addEventListener('click', function () { fecharMenu(); tourAbrir(); });
  window.addEventListener('resize', function () { if (!$('#tour').hidden) posicionar(PASSOS[tourI]); });

  /* ── início ──────────────────────────── */
  var LOGO = '<svg class="logo" viewBox="330 258 1275 435" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false"><text fill="currentColor" font-family="\'Disket Mono\',monospace" font-size="320.28" font-weight="700" transform="translate(932.18 584.7)">XP</text> <g fill="currentColor"> <path d="M380.11,670.86c-10.32,0-20.64-3.940-28.52-11.81-15.75-15.750-15.75-41.280,0-57.03l329.09-329.09c7.56-7.560,17.82-11.810,28.52-11.81s20.95,4.25,28.52,11.81l159.64,159.64c15.75,15.75,15.75,41.28,0,57.03l-168.18,168.18c-7.56,7.56-17.82,11.81-28.52,11.81s-20.95-4.25-28.52-11.81l-84.82-84.82c-15.75-15.75-15.75-41.29,0-57.04,15.75-15.75,41.29-15.75,57.04,0l56.3,56.3,111.15-111.15-102.61-102.61-300.57,300.57c-7.87,7.87-18.2,11.81-28.52,11.81Z"/> <path d="M477.35,439.01c-10.32,0-20.64-3.94-28.52-11.81l-97.24-97.24c-15.75-15.75-15.75-41.29,0-57.03,15.75-15.75,41.29-15.75,57.04,0l97.24,97.24c15.75,15.75,15.75,41.29,0,57.03-7.87,7.87-18.2,11.81-28.52,11.81Z"/> <path d="M1555.43,479.2c0-.96.34-1.79,1.04-2.48.69-.69,1.52-1.04,2.48-1.04h15.05c.96,0,1.79.35,2.48,1.04.69.7,1.04,1.52,1.04,2.48v102.81c0,.96-.35,1.79-1.04,2.48-.7.69-1.52,1.04-2.480,1.04h-15.05c-.96,0-1.79-.35-2.48-1.04-.7-.69-1.04-1.52-1.04-2.48v-37.47l-43.88-39.39v76.87c0,.96-.35,1.79-1.04,2.48-.7.69-1.52,1.04-2.48,1.04h-14.89c-.96,0-1.79-.35-2.48-1.04s-1.04-1.52-1.04-2.48v-102.81c0-.96.35-1.79,1.04-2.48.69-.69,1.52-1.04,2.48-1.04h14.89c.96,0,2.03.24,3.2.72,1.17.48,2.13,1.04,2.88,1.68l41.32,36.99v-35.87Z"/> <path d="M1463.67,493.13c-1.5-3.42-3.52-6.41-6.08-8.97-2.56-2.56-5.55-4.59-8.97-6.08-3.42-1.49-7.1-2.24-11.05-2.24h-1.21v21.94h1.21c1.81,0,3.34.59,4.56,1.76,1.23,1.18,1.84,2.67,1.84,4.48v53.33c0,1.82-.61,3.31-1.84,4.48-1.23,1.18-2.75,1.76-4.56,1.76h-31.23c-1.82,0-3.34-.59-4.56-1.76-1.23-1.17-1.84-2.67-1.84-4.48v-53.33c0-1.82.61-3.31,1.84-4.48,1.23-1.17,2.75-1.76,4.56-1.76h1.45v-21.94h-1.45c-3.95,0-7.63.75-11.05,2.24-3.42,1.5-6.41,3.52-8.97,6.08s-4.59,5.55-6.08,8.97c-1.5,3.42-2.24,7.05-2.24,10.89v53.33c0,3.84.75,7.47,2.24,10.89,1.49,3.42,3.52,6.41,6.08,8.97s5.55,4.59,8.97,6.08c3.42,1.5,7.1,2.24,11.05,2.24h31.23c3.950,0,7.63-.75,11.05-2.24,3.42-1.49,6.4-3.52,8.97-6.08,2.56-2.56,4.59-5.55,6.08-8.97,1.49-3.41,2.24-7.05,2.24-10.89v-53.33c0-3.84-.75-7.47-2.24-10.89Z"/> <rect x="1411.27" y="465.42" width="21.38" height="43.18" rx="1.98" ry="1.98"/> </g></svg>';
  document.querySelectorAll('.logo-slot').forEach(function (s) { s.outerHTML = LOGO; });
  renderNav();
  rota();
  /* ── registro de acesso (Netlify Forms, formulário "acesso-hub") ── */
  function registrar(dados, tipo) {
    var corpo = new URLSearchParams({ 'form-name': 'acesso-hub', nome: dados.nome, email: dados.email, area: dados.area, tipo: tipo, navegador: navigator.userAgent.slice(0, 160), bot: '' });
    if (location.protocol === 'file:') return Promise.resolve(false);
    return fetch('/', { method: 'POST', headers: { 'Content-Type': 'application/x-www-form-urlencoded' }, body: corpo.toString(), keepalive: true })
      .then(function (r) { return r.ok; }).catch(function () { return false; });
  }
  function quem() { try { return JSON.parse(store('xphub.quem') || 'null'); } catch (e) { return null; } }
  function depoisDeEntrar() {
    if (store('xphub.tour') !== 'visto' && !/[?&]semtour/.test(location.search)) setTimeout(tourAbrir, 300);
  }
  var eu = quem(), diaHoje = new Date().toISOString().slice(0, 10);
  if (/[?&]semregistro/.test(location.search)) { depoisDeEntrar(); }
  else if (eu && eu.email) {
    if (store('xphub.ultimo') !== diaHoje) { registrar(eu, 'retorno'); store('xphub.ultimo', diaHoje); }
    depoisDeEntrar();
  } else {
    var gate = $('#gate'), form = $('#gateForm'), err = $('#gateErr');
    gate.hidden = false; document.body.style.overflow = 'hidden';
    setTimeout(function () { $('#gNome').focus(); }, 50);
    form.addEventListener('submit', function (ev) {
      ev.preventDefault();
      var d = { nome: $('#gNome').value.trim().replace(/\s+/g, ' '), email: $('#gEmail').value.trim().toLowerCase(), area: $('#gArea').value };
      var falta = !d.nome || d.nome.indexOf(' ') < 0 ? 'Escreva nome e sobrenome.' :
        !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(d.email) ? 'Confira o e-mail. Ele precisa ter o formato nome@empresa.com.br.' :
        !d.area ? 'Escolha a sua área.' : '';
      if (falta) { err.textContent = falta; err.hidden = false; return; }
      err.hidden = true;
      var btn = form.querySelector('button'); btn.disabled = true; btn.textContent = 'Entrando…';
      registrar(d, 'primeiro acesso').then(function () {
        store('xphub.quem', JSON.stringify(d)); store('xphub.ultimo', diaHoje);
        gate.hidden = true; document.body.style.overflow = '';
        toast('Bem-vindo, ' + d.nome.split(' ')[0] + '.');
        depoisDeEntrar();
      });
    });
  }
})();
