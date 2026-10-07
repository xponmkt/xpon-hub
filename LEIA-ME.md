# Hub XP On (versão out/2026)

Central do marketing da XP On: sites, landing pages, apresentações, ferramentas, arquivos da marca, calendário de posts, eventos e Central de Demandas.

## Como abrir
Dê dois cliques em `index.html`. Para ver sem o tour de abertura, abra `index.html?semtour`.
O tour aparece só na primeira visita de cada pessoa. Depois fica no link "Ver o tour de novo", no rodapé do menu.

## Como editar o conteúdo
Tudo o que aparece no Hub está em `assets/data.js`:
- `links`: cada site, apresentação e ferramenta (nome, link, descrição, área, e se pode ir para o cliente)
- `sharepoint`: cole aqui o link da pasta do Time de Marketing no SharePoint
- `posts`: calendário de posts (as miniaturas ficam em `assets/posts/`, com o mesmo código do post)
- `eventos`: eventos e webinars do ano

## Publicação
Repositório GitHub `xponmkt/xpon-hub`, ligado ao site `hub-xpon.netlify.app`. Cada envio ao GitHub publica sozinho.
O arquivo `_redirects` mantém `/inteligencia` apontando para o painel Inteligência XP On e leva os links do Hub antigo para as áreas novas.

## Uso das páginas
O bloco "Uso das páginas" lê o CRM Marketing (Supabase do crm-xpon). Site, LPs e apresentações enviam visitas, cliques em WhatsApp/telefone/e-mail e formulários para lá.
