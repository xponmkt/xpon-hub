/* Hub XP On · conteúdo
   Para incluir, trocar ou remover um link, edite só este arquivo.
   publico: 'cliente' (pode enviar ao cliente) | 'interno' | 'login' (pede acesso) | 'rascunho' */

window.HUB = {
  atualizado: '07/10/2026',

  contatos: {
    whatsapp: { rotulo: 'WhatsApp comercial', valor: '(11) 96594-6895', link: 'https://wa.me/5511965946895' },
    email: { rotulo: 'E-mail de contato', valor: 'contato@xpon.com.br', link: 'mailto:contato@xpon.com.br' },
    sede: { rotulo: 'Telefone da sede', valor: '(61) 3247-2000', link: 'tel:+556132472000' },
    marketing: { rotulo: 'E-mail do marketing', valor: 'marketing@xpon.com.br', link: 'mailto:marketing@xpon.com.br' }
  },

  /* Cole aqui o link da pasta do Time de Marketing no SharePoint */
  sharepoint: '',

  secoes: [
    { id: 'sites', tecla: '1', nome: 'Site e landing pages', curto: 'Site e LPs',
      resumo: 'Páginas públicas da XP On. Todas registram visitas, cliques no WhatsApp e formulários no CRM Marketing.' },
    { id: 'apresentacoes', tecla: '2', nome: 'Apresentações', curto: 'Apresentações',
      resumo: 'Institucionais, comerciais por cliente e o repositório de propostas.' },
    { id: 'ferramentas', tecla: '3', nome: 'Ferramentas internas', curto: 'Ferramentas',
      resumo: 'CRM Marketing, Inteligência XP On e as ferramentas do comercial.' },
    { id: 'marca', tecla: '4', nome: 'Marca e arquivos', curto: 'Marca e arquivos',
      resumo: 'SharePoint do marketing, design system e os contatos oficiais.' },
    { id: 'redes', tecla: '5', nome: 'Redes sociais', curto: 'Redes sociais',
      resumo: 'Calendário de posts do trimestre, com data, formato e eixo.' },
    { id: 'eventos', tecla: '6', nome: 'Eventos e webinars', curto: 'Eventos',
      resumo: 'O que já fizemos em 2026 e o que vem por aí.' },
    { id: 'demandas', tecla: '7', nome: 'Central de Demandas', curto: 'Central de Demandas',
      resumo: 'Precisa de folder, post, apresentação ou peça digital? Peça por aqui.' },
    { id: 'arquivo', tecla: '8', nome: 'Arquivo', curto: 'Arquivo',
      resumo: 'Projetos encerrados e versões antigas, guardados para consulta.' }
  ],

  links: [
    /* Site e landing pages */
    { secao: 'sites', grupo: 'Site', nome: 'Site institucional', url: 'https://xpon.com.br', publico: 'cliente',
      desc: 'Site oficial, versão 2026. Tem formulário, WhatsApp e páginas por eixo.' },
    { secao: 'sites', grupo: 'Landing pages por eixo', nome: 'Página de entrada das LPs', url: 'https://xpon-lp-eixos.netlify.app', publico: 'cliente',
      desc: 'Porta de entrada com os três eixos. Boa para mandar quando o cliente ainda não sabe o que precisa.' },
    { secao: 'sites', grupo: 'Landing pages por eixo', nome: 'LP Colaboração', url: 'https://xpon-lp-eixos.netlify.app/colaboracao/', publico: 'cliente', eixo: 'colab',
      desc: 'Zoom, HP | Poly, Logitech, Yealink e AudioCodes, com formulário de diagnóstico.' },
    { secao: 'sites', grupo: 'Landing pages por eixo', nome: 'LP Cibersegurança', url: 'https://xpon-lp-eixos.netlify.app/ciberseguranca/', publico: 'cliente', eixo: 'ciber',
      desc: 'Kaspersky, Fortinet, Palo Alto Networks e e-Safer, com LGPD e ISO 27001 como critério.' },
    { secao: 'sites', grupo: 'Landing pages por eixo', nome: 'LP Infraestrutura e Redes', url: 'https://xpon-lp-eixos.netlify.app/infraestrutura/', publico: 'cliente', eixo: 'infra',
      desc: 'Cisco, Intelbras, Xfusion, Nutanix, Scale Computing e Trusted Data Center.' },
    { secao: 'sites', grupo: 'Landing pages por solução', nome: 'LP Zoom', url: 'https://xpon-zoom-lp.netlify.app', publico: 'cliente', eixo: 'colab',
      desc: 'Zoom Workplace, Phone e Contact Center numa página só, com vídeo explicativo.' },
    { secao: 'sites', grupo: 'Landing pages por solução', nome: 'LP Videoconferência', url: 'https://xpon-lp-videoconferencia.netlify.app', publico: 'cliente', eixo: 'colab',
      desc: 'Salas pequenas, médias e grandes com Poly, Yealink e Logitech.' },

    /* Apresentações */
    { secao: 'apresentacoes', grupo: 'Institucionais', nome: 'Apresentação conceitual XP On', url: 'https://xpon-conceito.netlify.app', publico: 'cliente',
      desc: 'Seis telas sobre quem é a XP On, em português, inglês e espanhol. Fecha com o vídeo conceitual.' },
    { secao: 'apresentacoes', grupo: 'Institucionais', nome: 'Apresentação conceitual (nova versão)', url: 'https://fantastic-cassata-be7fcf.netlify.app', publico: 'rascunho',
      desc: 'Versão em revisão. Confirme com o marketing antes de enviar.' },
    { secao: 'apresentacoes', grupo: 'Comerciais por cliente', nome: 'Serpro', url: 'https://xpon-serpro.netlify.app', publico: 'cliente',
      desc: 'Quatro telas e agradecimento, feitas para a reunião com a diretoria do Serpro.' },
    { secao: 'apresentacoes', grupo: 'Comerciais por cliente', nome: 'Microglobal', url: 'https://xpon-microglobal.netlify.app', publico: 'cliente',
      desc: 'Pitch em inglês e português com o histórico de projetos em conjunto.' },
    { secao: 'apresentacoes', grupo: 'Comerciais por cliente', nome: 'UFRN', url: 'https://xpon-urfnv2.netlify.app', publico: 'cliente', eixo: 'infra',
      desc: 'Manutenção de infraestrutura de servidores e armazenamento.' },
    { secao: 'apresentacoes', grupo: 'Comerciais por cliente', nome: 'Hospital de Amor', url: 'https://xpon-checklist-ha.netlify.app', publico: 'cliente', eixo: 'colab',
      desc: 'Checklist de implantação do Zoom Workvivo.' },
    { secao: 'apresentacoes', grupo: 'Propostas', nome: 'Repositório de propostas comerciais', url: 'https://xpon-propostas.netlify.app', publico: 'interno',
      desc: 'Modelo de proposta e fichas de produto por eixo para montar a sua.' },

    /* Ferramentas */
    { secao: 'ferramentas', grupo: 'Marketing', nome: 'CRM Marketing', url: 'https://crm-xpon.netlify.app', publico: 'login',
      desc: 'Leads, funis e kanban do marketing, com o que chega pelo site, LPs e eventos. O CRM oficial da empresa continua sendo o CIGAM.' },
    { secao: 'ferramentas', grupo: 'Gestão', nome: 'Inteligência XP On', url: 'https://xpon-inteligencia.netlify.app', publico: 'login',
      desc: 'Painéis de gestão com dados do CIGAM, atualizados a cada 6 horas. Cada diretoria entra com o próprio login.' },
    { secao: 'ferramentas', grupo: 'Comercial', nome: 'Comercial em Ação', url: 'https://xpon-comercial-acao.netlify.app', publico: 'interno',
      desc: 'Portal do time comercial com pipeline e rotina de prospecção.' },
    { secao: 'ferramentas', grupo: 'Comercial', nome: 'Plano Comercial 2026', url: 'https://comercial-xpon.netlify.app', publico: 'interno',
      desc: 'Metas, segmentos e estratégia do ano para setor público e privado.' },
    { secao: 'ferramentas', grupo: 'Marketing', nome: 'Post Studio', url: 'https://xpon-post-studio.netlify.app', publico: 'interno',
      desc: 'Gerador de artes e textos para Instagram dentro da identidade da XP On.' },

    /* Marca e arquivos */
    { secao: 'marca', grupo: 'Arquivos', nome: 'SharePoint do marketing', url: '@sharepoint', publico: 'interno',
      desc: 'Logos, fotos, apresentações, vídeos, materiais por eixo e os atestados de capacidade técnica.' },
    { secao: 'marca', grupo: 'Identidade', nome: 'Design System XP On', url: 'https://xpon-design-system.netlify.app', publico: 'interno',
      desc: 'Cores, tipografia, logos e componentes. Consulte antes de criar qualquer peça.' },

    /* Demandas */
    { secao: 'demandas', grupo: 'Pedidos', nome: 'Central de Demandas', url: 'https://xpon-briefing.netlify.app', publico: 'interno',
      desc: 'Formulário de briefing e acompanhamento de cada pedido feito ao marketing.' },

    /* Arquivo */
    { secao: 'arquivo', grupo: 'Lançamento da nova XP On', nome: 'Apresentação do lançamento (junho)', url: 'https://xpon-mudanca.netlify.app', publico: 'interno',
      desc: 'Apresentação usada nas sessões por área no lançamento de junho de 2026.' },
    { secao: 'arquivo', grupo: 'Lançamento da nova XP On', nome: 'Plano de apresentação', url: 'https://xpon-mudanca-roadmap.netlify.app', publico: 'interno',
      desc: 'Roteiro e cronograma das sessões do lançamento.' },
    { secao: 'arquivo', grupo: 'Site', nome: 'Site 2026 (ambiente de teste)', url: 'https://xpon-site-beta.netlify.app', publico: 'interno',
      desc: 'Cópia do site para testar mudanças antes de publicar em xpon.com.br.' }
  ],

  /* Calendário de posts · Instagram e Facebook (11h30) e LinkedIn */
  posts: [
    { id: 'P01', data: '2026-10-06', formato: 'Carrossel', tema: 'Zoom Workplace com IA', eixo: 'colab' },
    { id: 'N01', data: '2026-10-07', formato: 'Reel', tema: 'Outubro, mês da segurança digital', eixo: 'ciber' },
    { id: 'P02', data: '2026-10-08', formato: 'Reel e story', tema: 'Plataforma e IA', eixo: 'colab' },
    { id: 'N02', data: '2026-10-13', formato: 'Carrossel', tema: '5 sinais de que a segurança precisa de atenção', eixo: 'ciber' },
    { id: 'P03', data: '2026-10-15', formato: 'Carrossel', tema: 'Zoom Phone e Contact Center', eixo: 'colab' },
    { id: 'N03', data: '2026-10-20', formato: 'Post', tema: 'Treinamento contra phishing', eixo: 'ciber' },
    { id: 'N04', data: '2026-10-21', formato: 'Carrossel', tema: 'LGPD na prática para a TI', eixo: 'ciber' },
    { id: 'P04', data: '2026-10-22', formato: 'Reel e story', tema: 'Phone e Contact Center', eixo: 'colab' },
    { id: 'N05', data: '2026-10-27', formato: 'Reel', tema: '4 eixos, uma integradora', eixo: 'inst' },
    { id: 'P05', data: '2026-10-29', formato: 'Carrossel', tema: 'O que muda na prática', eixo: 'colab' },
    { id: 'N06', data: '2026-11-03', formato: 'Carrossel', tema: 'Como a XP On conduz um projeto', eixo: 'serv' },
    { id: 'N07', data: '2026-11-04', formato: 'Reel', tema: 'Do cabo ao data center', eixo: 'infra' },
    { id: 'N08', data: '2026-11-05', formato: 'Post', tema: 'Sala grande, reunião híbrida', eixo: 'colab' },
    { id: 'N09', data: '2026-11-10', formato: 'Carrossel', tema: '4 perguntas antes de comprar access points', eixo: 'infra' },
    { id: 'N10', data: '2026-11-12', formato: 'Post', tema: 'Monitoramento contínuo', eixo: 'serv' },
    { id: 'N11', data: '2026-11-17', formato: 'Post', tema: 'Sessão híbrida no setor público', eixo: 'inst' },
    { id: 'N12', data: '2026-11-18', formato: 'Carrossel', tema: 'Tecnologia que apoia o cuidado no hospital', eixo: 'inst' },
    { id: 'N13', data: '2026-11-19', formato: 'Reel', tema: 'Atendimento conectado', eixo: 'colab' },
    { id: 'N14', data: '2026-11-24', formato: 'Post', tema: 'Backup testado', eixo: 'ciber' },
    { id: 'N15', data: '2026-11-26', formato: 'Carrossel', tema: 'Rede no chão de fábrica', eixo: 'infra' },
    { id: 'N16', data: '2026-12-01', formato: 'Post', tema: 'Suporte que conhece o ambiente', eixo: 'serv' },
    { id: 'N17', data: '2026-12-02', formato: 'Carrossel', tema: 'Checklist da sala de reunião que funciona', eixo: 'colab' },
    { id: 'N18', data: '2026-12-03', formato: 'Animação', tema: 'A velocidade começa no que ninguém vê', eixo: 'infra' },
    { id: 'N19', data: '2026-12-08', formato: 'Post', tema: 'Disponibilidade se constrói antes da queda', eixo: 'infra' },
    { id: 'N20', data: '2026-12-10', formato: 'Carrossel', tema: 'Zero Trust em linguagem simples', eixo: 'ciber' },
    { id: 'N21', data: '2026-12-15', formato: 'Post', tema: 'Projeto entregue é projeto em uso', eixo: 'serv' },
    { id: 'N22', data: '2026-12-16', formato: 'Carrossel', tema: 'Atuação nacional', eixo: 'inst' },
    { id: 'N23', data: '2026-12-17', formato: 'Carrossel', tema: '5 perguntas para o orçamento de TI 2027', eixo: 'inst' },
    { id: 'N24', data: '2026-12-22', formato: 'Animação', tema: 'Boas festas', eixo: 'inst' }
  ],

  redesPerfis: [
    { nome: 'LinkedIn', url: 'https://www.linkedin.com/company/xp-on' },
    { nome: 'Instagram', url: 'https://www.instagram.com/xpon_innovation' }
  ],

  /* Eventos de 2026. status: 'feito' | 'previsto' */
  eventos: [
    { data: '2026-02-25', titulo: 'Segurança, redes e colaboração na prática', parceiro: 'Intelbras', formato: 'Webinar', eixo: 'infra', status: 'feito',
      nota: '17 inscritos e 19 participantes' },
    { data: '2026-03-25', titulo: 'Cibersegurança corporativa na prática', parceiro: 'Kaspersky', formato: 'Webinar', eixo: 'ciber', status: 'feito',
      nota: 'Proteção de endpoints e integração com a rede' },
    { data: '2026-04-29', titulo: 'Infraestrutura digital de alta performance para conectividade total', parceiro: 'Trusted Data Center', formato: 'Webinar', eixo: 'infra', status: 'feito',
      nota: '15 participantes, 1h49 de conversa' },
    { data: '2026-06-03', titulo: 'Salas inteligentes: infraestrutura e colaboração integradas', parceiro: 'HP | Poly', formato: 'Webinar', eixo: 'colab', status: 'feito',
      nota: '56 inscritos e 43 participantes, a maior audiência do semestre' },
    { data: '2026-08-28', titulo: 'XP On Tech: Zoom Phone e Contact Center', parceiro: 'Zoom', formato: 'Presencial em Brasília (JFSC)', eixo: 'colab', status: 'feito',
      nota: 'Remarcado de julho por causa do volume de inscrições' },
    { data: '2026-09-30', titulo: 'O futuro do trabalho conectado', parceiro: 'Zoom', formato: 'Webinar', eixo: 'colab', status: 'feito',
      nota: 'Produtividade e colaboração com Zoom Workplace' },
    { data: '2026-10-28', titulo: 'Webinar de outubro', parceiro: '', formato: 'Webinar, das 10h às 11h', eixo: 'inst', status: 'previsto',
      nota: 'Tema a confirmar. A XP On faz um webinar por mês, normalmente na última quarta-feira.' }
  ]
};
