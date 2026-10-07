# Missão Rio

Jogo educativo de **Geografia + Computação** para crianças do Ensino Fundamental. Uma expedição que segue o rio da nascente até a foz, com a capivara **Capi** como guia. Em cada parada a turma aprende sobre tipos de rios, para que eles servem, como cuidar deles e como a tecnologia e a IA ajudam a estudá-los.

**Jogue em:** https://missao-rio.cliick.dev

## Como funciona

- **Mapa da expedição**: 10 paradas ao longo do rio. O barquinho avança a cada parada concluída e o mapa ganha árvores, peixes e passarinhos.
- **Caderno de campo**: as informações da expedição em 7 abas (visão geral, tipos de rios, importância, preservação, ação humana, computação e IA, fontes). Cada ficha tem ilustração, explicação, exemplo real e a fonte da informação. Cada parada mostra a página do caderno antes de começar, e o botão do livro abre o caderno a qualquer momento.
- **Diário de bordo no caderno da criança**: a aba Computação e IA mostra as 7 etapas da atividade (pesquisar, conferir, organizar dados, criar gráfico, mapa, pedir ajuda à IA, apresentar), com ferramenta e exemplo de anotação, para a turma registrar no próprio caderno.
- **Certificado de participação**: ao final, um certificado com o nome, a data e o que foi aprendido em cada parada, pronto para imprimir.

### As 10 paradas

| # | Parada | O que a criança faz |
|---|--------|---------------------|
| 1 | Partes do rio | Encontra no mapa a nascente, o curso, o afluente, a foz e a bacia hidrográfica |
| 2 | Tipos de rio | Classifica rios em perene, intermitente, de planalto e de planície |
| 3 | Qual rio é? | Reconhece rios do Brasil pelas pistas (Amazonas, Paraná, Iguaçu, São Francisco, Negro, Tietê, Pinheiros, rios do Sertão) |
| 4 | Para que serve o rio? | Liga situações do dia a dia aos usos do rio e monta um gráfico de barras |
| 5 | Salve o rio | Cura um rio doente escolhendo como cuidar de cada problema |
| 6 | Organize a tabela | Coloca causas, efeitos e cuidados na linha certa da tabela de preservação |
| 7 | Vantagem ou problema? | Analisa barragens, retificação, canalização, ocupação das margens e poluição |
| 8 | Detetive da IA | Confere as respostas de uma IA no caderno de campo e descobre os erros |
| 9 | Pedir ajuda à IA | Escolhe o melhor pedido (prompt) e a melhor atitude ao usar a IA |
| 10 | Plano de pesquisa | Coloca as 7 etapas da atividade na ordem e escolha a ferramenta certa para cada tarefa |

São cerca de 90 interações, pensadas para 30 a 35 minutos de aula.

## Sem competição

O jogo foi feito para turmas que incluem crianças com TEA. **Não há pontos, vidas, tempo, ranking nem estrelas.** Errar só mostra uma dica e deixa tentar de novo. Cada acerto vem com uma explicação curta e um botão para seguir no próprio ritmo.

## Ajustes

- Sons (começam desligados) e animações (desligam sozinhas se o sistema pedir menos movimento).
- Modo turma, com letras maiores para projetar.
- Todas as paradas abertas, para escolher qualquer parada fora da ordem.
- Nome do explorador e botão para recomeçar.

## Tecnologia

HTML, CSS e JavaScript puros, sem dependências. Funciona offline depois de carregado, no computador e no celular. O progresso fica salvo no navegador.

Arquivos: `index.html`, `estilo.css`, `jogo.js` (dados e paradas), `cenas.js` (cenas em SVG), `ilustracoes.js` (desenhos do caderno), `icones.js` (ícones), `fontes/`.

## Créditos

Ícones [IconPark](https://github.com/bytedance/IconPark) (Apache-2.0), fontes Fredoka e Nunito (OFL). Capi, o barquinho, as cenas do rio e as ilustrações do caderno são desenhos próprios. As fontes das informações (ANA, IBGE Educa, Itaipu Binacional, ICMBio, Embrapa, MMA, Sabesp, SGB, MEC) estão na aba Fontes do caderno. Detalhes em `CREDITOS.md`.
