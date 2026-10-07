'use strict';
/* Missão Rio: expedição da nascente até a foz. Sem pontos, vidas ou recordes.
   Ícones: icones.js (IconPark). Cenas: cenas.js (desenhos próprios). */
var TINTA='#2F3A4A';
var C={tinta:'#2F3A4A',rio:'#2A9D8F',rioEsc:'#1F7A6F',sol:'#F4A261',coral:'#E76F51',ceu:'#457B9D',folha:'#6A994E',terra:'#B08968',amarelo:'#E9C46A',roxo:'#7048E8'};
function clareia(hex,t){var n=parseInt(hex.slice(1),16),r=n>>16,g=n>>8&255,b=n&255;r=Math.round(r+(255-r)*t);g=Math.round(g+(255-g)*t);b=Math.round(b+(255-b)*t);return '#'+((1<<24)|(r<<16)|(g<<8)|b).toString(16).slice(1);}
function icone(nome,cor,cor2){if(!ICONES[nome])nome='water';var corpo=ICONES[nome].replace(/"#000"/g,'"'+TINTA+'"').replace(/#2F88FF/gi,cor||C.rio).replace(/#43CCF8/gi,cor2||clareia(cor||C.rio,.55));return '<svg class="ic" viewBox="0 0 48 48" aria-hidden="true">'+corpo+'</svg>';}
function el(tag,cls,html){var e=document.createElement(tag);if(cls)e.className=cls;if(html!=null)e.innerHTML=html;return e;}
function $(id){return document.getElementById(id);}
function emb(a){a=a.slice();for(var i=a.length-1;i>0;i--){var j=Math.floor(Math.random()*(i+1)),t=a[i];a[i]=a[j];a[j]=t;}return a;}
function pega(a,i){return a.filter(function(x){return x[0]===i;})[0];}

/* ---------------- estado ---------------- */
var CHAVE='missao-rio-expedicao';
var est={feitas:[],som:false,anim:!(window.matchMedia&&matchMedia('(prefers-reduced-motion: reduce)').matches),livre:false,turma:false,nome:''};
try{var s=JSON.parse(localStorage.getItem(CHAVE)||'null');if(s)Object.keys(s).forEach(function(k){est[k]=s[k];});}catch(e){}
function salva(){try{localStorage.setItem(CHAVE,JSON.stringify(est));}catch(e){}}
function aplicaAjustes(){document.body.classList.toggle('sem-animacao',!est.anim);document.body.classList.toggle('turma',!!est.turma);}
aplicaAjustes();

/* ---------------- sons e voz (só quando ligados) ---------------- */
var ctx;
function tom(freqs){if(!est.som)return;try{ctx=ctx||new (window.AudioContext||window.webkitAudioContext)();freqs.forEach(function(f,i){var o=ctx.createOscillator(),g=ctx.createGain(),t=ctx.currentTime+i*.12;o.type='sine';o.frequency.value=f;g.gain.setValueAtTime(0,t);g.gain.linearRampToValueAtTime(.08,t+.03);g.gain.exponentialRampToValueAtTime(.0001,t+.35);o.connect(g);g.connect(ctx.destination);o.start(t);o.stop(t+.4);});}catch(e){}}
var SOM={certo:[523,659,784],quase:[330,294],fim:[523,659,784,1047],clique:[440]};
function fala(t){try{speechSynthesis.cancel();var u=new SpeechSynthesisUtterance(t.replace(/<[^>]+>/g,''));u.lang='pt-BR';u.rate=.9;speechSynthesis.speak(u);}catch(e){}}
function confete(){if(!est.anim)return;var cores=[C.rio,C.sol,C.coral,C.folha,C.ceu,C.amarelo];for(var i=0;i<28;i++){var c=el('div','confete');c.style.left=(Math.random()*100)+'vw';c.style.background=cores[i%6];c.style.borderRadius=i%3===0?'50%':'3px';c.style.setProperty('--dx',(Math.random()*160-80)+'px');c.style.setProperty('--giro',(Math.random()*720-360)+'deg');c.style.setProperty('--dur',(2.4+Math.random()*1.4)+'s');c.style.setProperty('--atraso',(Math.random()*.5)+'s');document.body.appendChild(c);setTimeout(c.remove.bind(c),4600);}}

/* ---------------- Capi, a capivara ---------------- */
function capi(cls){return '<svg class="capi '+(cls||'')+'" viewBox="0 0 120 110" aria-hidden="true">'+
 '<ellipse cx="60" cy="102" rx="40" ry="6" fill="rgba(47,58,74,.12)"/>'+
 '<g class="c-corpo">'+
 '<ellipse cx="62" cy="76" rx="40" ry="26" fill="#A47148" stroke="'+TINTA+'" stroke-width="3"/>'+
 '<rect x="30" y="84" width="12" height="16" rx="5" fill="#8B5E3C" stroke="'+TINTA+'" stroke-width="3"/><rect x="78" y="84" width="12" height="16" rx="5" fill="#8B5E3C" stroke="'+TINTA+'" stroke-width="3"/>'+
 '<g class="c-orelha"><ellipse cx="34" cy="30" rx="8" ry="9" fill="#8B5E3C" stroke="'+TINTA+'" stroke-width="3"/></g><ellipse cx="80" cy="30" rx="8" ry="9" fill="#8B5E3C" stroke="'+TINTA+'" stroke-width="3"/>'+
 '<path d="M24 46 Q24 22 57 22 Q92 22 92 46 L92 56 Q92 72 68 72 L48 72 Q24 72 24 56 Z" fill="#B8865B" stroke="'+TINTA+'" stroke-width="3"/>'+
 '<path d="M60 56 Q60 70 78 70 Q94 70 94 56 Q94 46 78 46 Q60 46 60 56 Z" fill="#D9A878" stroke="'+TINTA+'" stroke-width="3"/>'+
 '<ellipse cx="82" cy="54" rx="4.5" ry="3.2" fill="'+TINTA+'"/><path d="M70 64 Q76 68 82 64" fill="none" stroke="'+TINTA+'" stroke-width="2.5" stroke-linecap="round"/>'+
 '<g class="c-olhos"><circle cx="44" cy="46" r="4" fill="'+TINTA+'"/><circle cx="68" cy="44" r="4" fill="'+TINTA+'"/><circle cx="45.5" cy="44.5" r="1.3" fill="#fff"/><circle cx="69.5" cy="42.5" r="1.3" fill="#fff"/></g>'+
 '<circle cx="36" cy="58" r="5" fill="#E9967A" opacity=".55"/>'+
 '<path d="M22 32 Q22 14 58 14 Q96 14 96 32 L100 34 Q60 38 18 34 Z" fill="#6A994E" stroke="'+TINTA+'" stroke-width="3" stroke-linejoin="round"/><path d="M36 20 Q58 10 82 20" fill="none" stroke="#2F3A4A" stroke-width="2" opacity=".35"/>'+
 '<path d="M96 32 L112 30 L108 38 Z" fill="#6A994E" stroke="'+TINTA+'" stroke-width="3" stroke-linejoin="round"/>'+
 '</g></svg>';}
function balaoCapi(titulo,texto,cls){return '<div class="fala">'+capi(cls)+'<div class="balao">'+(titulo?'<b>'+titulo+'</b>':'')+texto+'</div></div>';}

/* ======================================================================
   CADERNO DE CAMPO (informações, exemplos, ilustrações e fontes)
   ====================================================================== */
var CAD={
 visao:{tit:'Visão geral',ic:'compass-one',intro:'Nossa expedição estuda os rios em cinco temas. Cada tema tem uma pergunta-guia: é ela que você vai responder jogando.',
  itens:[
   ['Tipos de rios','Todos os rios têm água o ano todo?',['perene','intermitente','planalto','planície','nascente','curso','afluente','foz','bacia hidrográfica'],'waves'],
   ['Importância dos rios','O que aconteceria com a cidade se o rio secasse?',['água','alimento','energia','transporte','lazer','natureza','indústria'],'building-one'],
   ['Preservação','O que eu posso fazer para proteger um rio?',['lixo','esgoto','mata ciliar','agrotóxico','desperdício'],'leaf'],
   ['Ação humana','Mudar o rio traz só vantagens?',['barragem','retificação','canalização','ocupação das margens','poluição'],'tool'],
   ['Computação e IA','Como a tecnologia ajuda a estudar e cuidar dos rios?',['pesquisa','dados','gráfico','mapa','IA','conferir fontes'],'robot-one']]},
 tipos:{tit:'Tipos de rios',ic:'water',intro:'Os rios podem ser classificados pela água ao longo do ano, pelo relevo do terreno e também pelas suas partes.',
  itens:[
   ['Rio perene','Pela água','Tem água o ano inteiro, mesmo na época de seca.','Rio Amazonas e Rio Paraná.','water',C.ceu],
   ['Rio intermitente','Pela água','Seca em algumas épocas do ano e volta a correr quando chove.','Rios do Sertão do Nordeste.','cactus',C.sol],
   ['Rio de planalto','Pelo relevo','Corre em terreno alto e inclinado, com corredeiras e quedas-d\'água. Bom para gerar energia.','Rio Iguaçu (Cataratas do Iguaçu).','picture',C.ceu],
   ['Rio de planície','Pelo relevo','Corre em terreno plano, com água calma. Bom para navegar.','Rio Amazonas.','ship',C.rio],
   ['Nascente','Parte do rio','Lugar onde o rio começa, quando a água brota do chão.','Nascente do Rio São Francisco, na Serra da Canastra (MG).','mountain',C.folha],
   ['Curso','Parte do rio','Caminho que o rio percorre, da nascente até a foz.','O curso do Rio Paraná passa pelo oeste do Paraná.','road-sign',C.terra],
   ['Afluente','Parte do rio','Rio menor que deságua em um rio maior.','O Rio Negro é afluente do Rio Amazonas.','mind-mapping',C.rio],
   ['Foz','Parte do rio','Lugar onde o rio termina: no mar, num lago ou em outro rio.','A foz do Amazonas fica no Oceano Atlântico.','flag',C.coral],
   ['Bacia hidrográfica','Parte do rio','Região formada pelo rio principal e todos os seus afluentes.','Bacia do Rio Paraná.','map-draw',C.folha]]},
 importancia:{tit:'Importância dos rios',ic:'building-one',intro:'A cidade depende do rio de muitos jeitos. Veja para que a água do rio serve.',
  itens:[
   ['Água para beber e higiene','A água do rio é tratada e chega às casas pela torneira e pelo chuveiro.','Estações de tratamento de água das cidades.','drink',C.ceu],
   ['Alimento','Peixes para comer e água para irrigar plantações de arroz, frutas e verduras.','Pesca nos rios e irrigação das lavouras.','rice',C.sol],
   ['Energia elétrica','A força da água gira as turbinas da usina hidrelétrica.','Usina de Itaipu, no Rio Paraná.','lightning',C.amarelo],
   ['Transporte','Barcos e balsas levam pessoas e cargas onde há poucas estradas.','Rio Amazonas.','ship',C.rio],
   ['Lazer e turismo','Passeios, banho de rio, pesca esportiva e paisagens bonitas.','Cataratas do Iguaçu.','camera',C.coral],
   ['Natureza e animais','O rio é a casa de peixes, garças, capivaras e mantém a vegetação em volta.','Mata ciliar e áreas de proteção.','bird',C.folha],
   ['Indústria','As fábricas usam muita água para produzir e para esfriar as máquinas.','Fábricas instaladas perto dos rios.','factory-building',C.terra]]},
 preservacao:{tit:'Preservação',ic:'leaf',intro:'Cada problema tem uma causa, um efeito e um jeito de cuidar. Cuidar do rio começa em casa.',
  itens:[
   ['Lixo no rio','Sacolas, garrafas e embalagens jogadas na rua são levadas pela chuva até o rio.','A água fica suja, os animais se machucam e o rio pode entupir.','Jogar o lixo na lixeira e separar para a coleta seletiva.','delete',C.coral],
   ['Esgoto sem tratamento','O esgoto das casas e das fábricas cai direto no rio.','Polui a água e espalha doenças.','Tratar o esgoto antes de devolver ao rio. Não jogar óleo na pia.','caution',C.terra],
   ['Falta de mata ciliar','Cortaram as árvores da beira do rio.','A terra cai no rio (assoreamento), ele fica raso e pode haver enchentes.','Replantar árvores na margem: a mata ciliar segura a terra.','tree-one',C.folha],
   ['Agrotóxicos','Veneno usado em excesso na plantação escorre para o rio.','Prejudica os peixes e os outros seres vivos do rio.','Agricultura mais sustentável, com menos veneno.','seedling',C.roxo],
   ['Desperdício de água','Torneira aberta, vazamentos e banhos muito longos.','Menos água para todos.','Fechar a torneira, consertar vazamentos e tomar banhos curtos.','shower-head',C.ceu]]},
 acao:{tit:'Ação humana',ic:'tool',intro:'As pessoas mudam os rios. Toda mudança tem vantagens e problemas. A poluição é a única que não tem vantagem nenhuma.',
  itens:[
   ['Barragem (represa)','Parede que segura a água e forma um lago.','Gera energia e guarda água para a seca.','Inunda terras e muda o caminho dos peixes.','Itaipu, no Rio Paraná.','lightning',C.amarelo],
   ['Retificação','O rio fica mais reto, sem curvas.','Facilita obras e o uso do terreno em volta.','A água corre mais rápido e as enchentes podem aumentar.','Rio Tietê, em São Paulo.','ruler',C.ceu],
   ['Canalização','O rio vai para dentro de um canal de concreto ou para baixo da rua.','Ganha espaço para ruas e construções.','O chão vira concreto, a chuva não entra na terra e o rio perde a vida.','Córregos canalizados nas cidades.','road-sign',C.terra],
   ['Ocupação das margens','Casas e ruas construídas muito perto do rio.','Mais espaço para as pessoas morarem.','Risco de enchente e perda da mata ciliar.','Bairros na beira de rios.','home',C.sol],
   ['Poluição','Esgoto e resíduos jogados no rio.','Nenhuma.','Os peixes morrem e a água fica imprópria para usar.','Rio Pinheiros, em São Paulo.','factory-building',C.coral]]},
 fontes:{tit:'Fontes',ic:'link',intro:'De onde vieram as informações deste caderno. Um bom pesquisador sempre diz a fonte e confere em mais de um lugar, de preferência com a professora.',itens:[]},
 atividade:{tit:'Computação e IA',ic:'robot-one',intro:'A atividade de computação tem 7 etapas. Anote no seu caderno o que você fez em cada uma: é o seu diário de bordo.',
  itens:[
   ['Pesquisar','Procurar informações sobre um rio da sua região em sites, livros e com a família.','Buscador na internet','Pesquisei o Rio Paraná no site da prefeitura e numa enciclopédia.','search'],
   ['Conferir','Ver se a informação aparece igual em duas fontes confiáveis.','Sites oficiais, livros, professora','Conferi em dois lugares que a Usina de Itaipu fica no Rio Paraná.','check-one'],
   ['Organizar dados','Montar uma tabela: nome do rio, tipo, para que serve, problema.','Planilha (tabela no computador)','Fiz uma tabela com 3 rios e 4 colunas.','table'],
   ['Criar gráfico','Transformar os números da tabela em um gráfico de barras.','Planilha ou papel quadriculado','Fiz um gráfico de quantos usos cada rio tem.','chart-histogram'],
   ['Mapa','Marcar no mapa a nascente, o curso e a foz do rio.','Mapa digital ou impresso','Marquei a nascente do Rio Iguaçu e onde ele deságua no Rio Paraná.','map-draw'],
   ['Pedir ajuda à IA','Escrever um bom pedido (prompt): dizer quem você é, o que quer e como quer. Depois conferir a resposta.','Assistente de IA, com a professora','Pedi: "Explique para uma criança de 9 anos o que é mata ciliar, em 3 frases." E conferi no livro.','robot-one'],
   ['Apresentar','Mostrar para a turma o que você descobriu.','Cartaz, slides ou vídeo','Apresentei meu cartaz sobre o Rio Paraná com o mapa e o gráfico.','projector']]}
};
var FONTES={
 ana:{n:'Agência Nacional de Águas e Saneamento Básico (ANA)',u:'https://www.gov.br/ana/pt-br',o:'Dados sobre rios, bacias e uso da água no Brasil.'},
 ibge:{n:'IBGE Educa',u:'https://educa.ibge.gov.br/',o:'Geografia do Brasil explicada para estudantes.'},
 itaipu:{n:'Itaipu Binacional',u:'https://www.itaipu.gov.br/',o:'A usina hidrelétrica do Rio Paraná.'},
 icmbio:{n:'ICMBio: Parques Nacionais do Iguaçu e da Serra da Canastra',u:'https://www.gov.br/icmbio/pt-br',o:'Cataratas do Iguaçu e nascente do Rio São Francisco.'},
 embrapa:{n:'Embrapa',u:'https://www.embrapa.br/',o:'Mata ciliar, solo, agricultura e água.'},
 mma:{n:'Ministério do Meio Ambiente e Mudança do Clima',u:'https://www.gov.br/mma/pt-br',o:'Preservação dos rios e saneamento.'},
 sabesp:{n:'Sabesp',u:'https://www.sabesp.com.br/',o:'Tratamento de água e esgoto; rios Tietê e Pinheiros.'},
 sgb:{n:'Serviço Geológico do Brasil (SGB)',u:'https://www.sgb.gov.br/',o:'Relevo, planaltos e planícies.'},
 mec:{n:'MEC: Computação na Educação Básica (BNCC)',u:'https://www.gov.br/mec/pt-br',o:'Pesquisa, dados, pensamento computacional e uso responsável da tecnologia.'}
};
/* ilustração e fonte de cada ficha, pelo título */
var FICHA={
 'Rio perene':['perene','ana'],'Rio intermitente':['intermitente','ana'],'Rio de planalto':['planalto','sgb'],'Rio de planície':['planicie','sgb'],
 'Nascente':['nascente','icmbio'],'Curso':['curso','ibge'],'Afluente':['afluente','ibge'],'Foz':['foz','ibge'],'Bacia hidrográfica':['bacia','ana'],
 'Água para beber e higiene':['agua','sabesp'],'Alimento':['alimento','embrapa'],'Energia elétrica':['energia','itaipu'],'Transporte':['transporte','ibge'],'Lazer e turismo':['lazer','icmbio'],'Natureza e animais':['natureza','mma'],'Indústria':['industria','ana'],
 'Lixo no rio':['lixo','mma'],'Esgoto sem tratamento':['esgoto','sabesp'],'Falta de mata ciliar':['margem','embrapa'],'Agrotóxicos':['agro','embrapa'],'Desperdício de água':['desperdicio','ana'],
 'Barragem (represa)':['barragem','itaipu'],'Retificação':['retificacao','sabesp'],'Canalização':['canalizacao','mma'],'Ocupação das margens':['aterro','mma'],'Poluição':['poluicao','sabesp'],
 'Pesquisar':['pesquisa','mec'],'Conferir':['pesquisa','mec'],'Organizar dados':['tabela','mec'],'Criar gráfico':['grafico','mec'],'Mapa':['mapa','mec'],'Pedir ajuda à IA':['ia','mec'],'Apresentar':['apresentar','mec']
};
function ilu(t){var f=FICHA[t];return f&&ILU[f[0]]?ILU[f[0]]():'';}
function fonte(t){var f=FICHA[t];if(!f)return '';var F=FONTES[f[1]];return '<div class="fonte">'+icone('link',C.ceu)+'<span>Fonte: <a href="'+F.u+'" target="_blank" rel="noopener">'+F.n+'</a></span></div>';}
var ORDEM_ABAS=['visao','tipos','importancia','preservacao','acao','atividade','fontes'];

function paginaCaderno(aba){
 var a=CAD[aba],h='<div class="pagina"><h2>'+icone(a.ic,C.rio)+a.tit+'</h2><p class="intro">'+a.intro+'</p>';
 if(aba==='visao'){h+='<div class="ficha">'+a.itens.map(function(i){return '<div class="ficha-item"><div class="cab">'+icone(i[3],C.ceu)+'<b>'+i[0]+'</b></div><div class="guia">'+icone('thinking-problem',C.sol)+i[1]+'</div><div class="palavras">'+i[2].map(function(p){return '<span>'+p+'</span>';}).join('')+'</div></div>';}).join('')+'</div>';}
 else if(aba==='fontes'){h+='<div class="ficha">'+Object.keys(FONTES).map(function(k){var F=FONTES[k];return '<div class="ficha-item"><div class="cab">'+icone('link',C.ceu)+'<b>'+F.n+'</b></div><p>'+F.o+'</p><div class="ex"><a href="'+F.u+'" target="_blank" rel="noopener">'+F.u.replace(/^https?:\/\//,'')+'</a></div></div>';}).join('')+'</div>';}
 else if(aba==='tipos'){h+='<div class="ficha">'+a.itens.map(function(i){return '<div class="ficha-item">'+ilu(i[0])+'<div class="cab">'+icone(i[4],i[5])+'<div><small>'+i[1]+'</small><b>'+i[0]+'</b></div></div><p>'+i[2]+'</p><div class="ex"><b>Exemplo:</b> '+i[3]+'</div>'+fonte(i[0])+'</div>';}).join('')+'</div>';}
 else if(aba==='importancia'){h+='<div class="ficha">'+a.itens.map(function(i){return '<div class="ficha-item">'+ilu(i[0])+'<div class="cab">'+icone(i[3],i[4])+'<b>'+i[0]+'</b></div><p>'+i[1]+'</p><div class="ex"><b>Exemplo:</b> '+i[2]+'</div>'+fonte(i[0])+'</div>';}).join('')+'</div>';}
 else if(aba==='preservacao'){h+='<div class="ficha">'+a.itens.map(function(i){return '<div class="ficha-item">'+ilu(i[0])+'<div class="cab">'+icone(i[4],i[5])+'<b>'+i[0]+'</b></div><p><span class="lbl">Causa:</span> '+i[1]+'</p><p><span class="lbl">Efeito:</span> '+i[2]+'</p><div class="ex"><b>Como cuidar:</b> '+i[3]+'</div>'+fonte(i[0])+'</div>';}).join('')+'</div>';}
 else if(aba==='acao'){h+='<div class="ficha">'+a.itens.map(function(i){return '<div class="ficha-item">'+ilu(i[0])+'<div class="cab">'+icone(i[5],i[6])+'<b>'+i[0]+'</b></div><p>'+i[1]+'</p><div class="vp"><div class="v"><span class="lbl">Vantagem</span>'+i[2]+'</div><div class="p"><span class="lbl">Problema</span>'+i[3]+'</div></div><div class="ex"><b>Exemplo:</b> '+i[4]+'</div>'+fonte(i[0])+'</div>';}).join('')+'</div>';}
 else {h+='<div class="etapas">'+a.itens.map(function(i,n){return '<div class="etapa"><div class="n">'+(n+1)+'</div><div class="etapa-txt"><b>'+i[0]+'</b><p>'+i[1]+'</p><p class="tec">Ferramenta: '+i[2]+'</p><p><span class="lbl">Exemplo de anotação no caderno:</span> “'+i[3]+'”</p></div>'+ilu(i[0])+'</div>';}).join('')+'</div>';}
 return h+'</div>';
}
function cadernoHTML(abaAtiva,fixa){
 var abas=fixa?[abaAtiva]:ORDEM_ABAS;
 return '<div class="caderno"><div class="abas">'+abas.map(function(k){return '<button class="aba'+(k===abaAtiva?' ativa':'')+'" data-aba="'+k+'">'+icone(CAD[k].ic,k===abaAtiva?C.rio:C.ceu)+CAD[k].tit+'</button>';}).join('')+'</div><div class="pag-caixa">'+paginaCaderno(abaAtiva)+'</div></div>';
}
function ligaAbas(raiz){raiz.querySelectorAll('.aba').forEach(function(b){b.onclick=function(){raiz.querySelectorAll('.aba').forEach(function(x){x.classList.toggle('ativa',x===b);x.querySelector('svg').outerHTML=icone(CAD[x.dataset.aba].ic,x===b?C.rio:C.ceu);});raiz.querySelector('.pag-caixa').innerHTML=paginaCaderno(b.dataset.aba);tom(SOM.clique);};});}

/* ======================================================================
   DADOS DAS PARADAS
   ====================================================================== */
var PINS=[['nascente',195,212],['curso',371,246],['afluente',623,144],['foz',905,322],['bacia',862,135]];
var P1=[
 {id:'nascente',nome:'NASCENTE',tit:'É a nascente!',p:'Lugar onde o rio começa, quando a água brota do chão.',d:'Procure lá no alto da montanha, onde tudo começa.',x:'A nascente é onde o rio começa. A nascente do Rio São Francisco fica na Serra da Canastra, em Minas Gerais.'},
 {id:'curso',nome:'CURSO',tit:'É o curso do rio!',p:'Caminho que o rio percorre, da nascente até a foz.',d:'É o próprio rio correndo, lá no meio do caminho.',x:'O curso é todo o caminho que o rio faz, do começo até o fim.'},
 {id:'afluente',nome:'AFLUENTE',tit:'É um afluente!',p:'Rio menor que deságua em um rio maior.',d:'Procure um rio mais fino que se junta ao rio principal.',x:'O afluente é um rio menor que entrega a sua água para um rio maior. O Rio Negro é afluente do Rio Amazonas.'},
 {id:'foz',nome:'FOZ',tit:'É a foz!',p:'Lugar onde o rio termina, quando deságua no mar.',d:'Siga o rio até o fim, onde ele encontra o mar.',x:'A foz é onde o rio termina: no mar, num lago ou em outro rio. A foz do Rio Amazonas fica no Oceano Atlântico.'},
 {id:'bacia',nome:'BACIA HIDROGRÁFICA',tit:'É a bacia hidrográfica!',p:'Região formada pelo rio principal e todos os seus afluentes.',d:'Repare na linha tracejada em volta de todos os rios.',x:'A bacia hidrográfica é a região do rio principal com todos os afluentes. O oeste do Paraná faz parte da Bacia do Rio Paraná.'}
];
var NT={perene:'PERENE',intermitente:'INTERMITENTE',planalto:'DE PLANALTO',planicie:'DE PLANÍCIE'};
var P2=[
 {g:'agua',ic:'water',f:'Tem água o ano inteiro, mesmo na época de seca.',c:'perene',x:'O rio <b>perene</b> tem água o ano todo. Exemplos: Rio Amazonas e Rio Paraná.'},
 {g:'agua',ic:'cactus',f:'Seca em algumas épocas do ano e volta a ter água quando chove.',c:'intermitente',x:'O rio <b>intermitente</b> é temporário: seca na época da seca e volta na época das chuvas.'},
 {g:'agua',ic:'sun-one',f:'Os rios do Sertão do Nordeste, que secam quando passa muito tempo sem chover.',c:'intermitente',x:'No Sertão do Nordeste muitos rios são <b>intermitentes</b>: só têm água na época das chuvas.'},
 {g:'agua',ic:'tree-one',f:'O Rio Amazonas, que tem água todos os dias do ano.',c:'perene',x:'O Amazonas nunca seca: é um rio <b>perene</b>.'},
 {g:'relevo',ic:'mountain',f:'Corre em terreno alto e inclinado, com corredeiras e quedas-d\'água.',c:'planalto',x:'O rio <b>de planalto</b> corre em terreno alto e inclinado, cheio de corredeiras e quedas-d\'água.'},
 {g:'relevo',ic:'sailboat-one',f:'Corre em terreno plano, com água calma. É bom para navegar.',c:'planicie',x:'O rio <b>de planície</b> corre em terreno plano. A água é calma e os barcos navegam bem.'},
 {g:'relevo',ic:'picture',f:'O Rio Iguaçu, com as Cataratas, aqui no oeste do Paraná.',c:'planalto',x:'O Iguaçu é rio <b>de planalto</b>: as Cataratas são quedas-d\'água enormes.'},
 {g:'relevo',ic:'lightning',f:'É o melhor tipo de rio para gerar energia, por causa da força das quedas.',c:'planalto',x:'A água que cai com força gira as turbinas. Por isso o rio <b>de planalto</b> é bom para gerar energia.'},
 {g:'relevo',ic:'ship',f:'O Rio Amazonas, onde barcos grandes navegam com calma.',c:'planicie',x:'O Amazonas também é rio <b>de planície</b>: plano e calmo, ótimo para navegar. Um rio pode ser perene E de planície ao mesmo tempo!'}
];
var RIOS=[['amazonas','Rio Amazonas','ship',C.rio],['parana','Rio Paraná','lightning',C.amarelo],['iguacu','Rio Iguaçu','picture',C.ceu],['saofrancisco','Rio São Francisco','mountain',C.folha],['negro','Rio Negro','mind-mapping',C.ceu],['tiete','Rio Tietê','ruler',C.terra],['pinheiros','Rio Pinheiros','factory-building',C.coral],['sertao','Rios do Sertão','cactus',C.sol]];
var PQ=[
 {f:'Tem água o ano inteiro e é tão plano e calmo que navios grandes navegam nele.',c:'amazonas',o:['amazonas','sertao','iguacu'],x:'O <b>Rio Amazonas</b> é perene e de planície: nunca seca e é ótimo para navegar.'},
 {f:'Nele fica a Usina de Itaipu, que gera energia para muitas cidades.',c:'parana',o:['parana','negro','tiete'],x:'A Usina de <b>Itaipu</b> fica no <b>Rio Paraná</b>, aqui no oeste do Paraná.'},
 {f:'Rio de planalto famoso pelas Cataratas, visitadas por turistas do mundo todo.',c:'iguacu',o:['iguacu','pinheiros','amazonas'],x:'As Cataratas ficam no <b>Rio Iguaçu</b>: quedas-d\'água enormes num rio de planalto.'},
 {f:'A nascente deste rio fica na Serra da Canastra, em Minas Gerais.',c:'saofrancisco',o:['saofrancisco','parana','sertao'],x:'A nascente do <b>Rio São Francisco</b> fica na Serra da Canastra (MG).'},
 {f:'É um afluente: um rio menor que entrega a sua água para o Amazonas.',c:'negro',o:['negro','tiete','iguacu'],x:'O <b>Rio Negro</b> é afluente do Rio Amazonas.'},
 {f:'Em São Paulo, este rio foi retificado: ficou mais reto, sem curvas.',c:'tiete',o:['tiete','amazonas','saofrancisco'],x:'O <b>Rio Tietê</b>, em São Paulo, foi retificado. Sem curvas, a água corre mais rápido.'},
 {f:'Exemplo de rio poluído: recebe esgoto e resíduos, e os peixes não conseguem viver.',c:'pinheiros',o:['pinheiros','negro','parana'],x:'O <b>Rio Pinheiros</b>, em São Paulo, é um exemplo de poluição. Já existem projetos para limpá-lo.'},
 {f:'Rios intermitentes: secam quando passa muito tempo sem chover e voltam na época das chuvas.',c:'sertao',o:['sertao','amazonas','iguacu'],x:'No <b>Sertão do Nordeste</b> muitos rios são intermitentes.'},
 {f:'Sua foz fica no Oceano Atlântico e é a maior do mundo.',c:'amazonas',o:['amazonas','tiete','negro'],x:'A foz do <b>Rio Amazonas</b> fica no Oceano Atlântico.'},
 {f:'O oeste do Paraná faz parte da bacia hidrográfica deste rio.',c:'parana',o:['parana','saofrancisco','pinheiros'],x:'Vivemos na <b>Bacia do Rio Paraná</b>: o rio principal e todos os seus afluentes.'}
];
var USOS=[['agua','drink','Água para beber e higiene',C.ceu],['alimento','rice','Alimento',C.sol],['energia','lightning','Energia elétrica',C.amarelo],['transporte','ship','Transporte',C.rio],['lazer','camera','Lazer e turismo',C.coral],['natureza','bird','Natureza e animais',C.folha],['industria','factory-building','Indústria',C.terra]];
var P3=[
 {ic:'light',f:'A lâmpada da sua casa acende.',c:'energia',x:'A força da água gira as turbinas da usina hidrelétrica. A Usina de Itaipu, no Rio Paraná, fica aqui no oeste do Paraná.'},
 {ic:'shower-head',f:'Você abre o chuveiro para tomar banho.',c:'agua',x:'A água do rio é tratada e chega às casas pela torneira e pelo chuveiro.'},
 {ic:'fishing',f:'O pescador leva peixe para o almoço da família.',c:'alimento',x:'Os rios têm peixes, que viram alimento.'},
 {ic:'seedling',f:'A plantação de arroz recebe água do rio.',c:'alimento',x:'A água do rio irriga as plantações de arroz, frutas e verduras. Sem água, sem comida.'},
 {ic:'car',f:'Uma balsa leva pessoas e carros para o outro lado.',c:'transporte',x:'Barcos e balsas levam pessoas e cargas, principalmente onde há poucas estradas, como na Amazônia.'},
 {ic:'picture',f:'Turistas do mundo todo visitam as Cataratas do Iguaçu.',c:'lazer',x:'Passeios, banho de rio, pesca esportiva e paisagens bonitas: o rio também é lazer e turismo.'},
 {ic:'bird',f:'Garças, capivaras e peixes vivem perto da água.',c:'natureza',x:'O rio é a casa de muitos animais e ajuda a manter a vegetação em volta.'},
 {ic:'tool',f:'A fábrica usa água para produzir e para esfriar as máquinas.',c:'industria',x:'As indústrias usam muita água. Por isso muitas fábricas ficam perto de rios.'},
 {ic:'handwashing',f:'Você lava as mãos antes do lanche.',c:'agua',x:'Higiene também é água do rio: lavar as mãos, escovar os dentes, lavar a roupa.'},
 {ic:'bowl',f:'A horta da escola é regada com água do riacho.',c:'alimento',x:'Irrigar a horta é usar o rio para produzir alimento.'}
];
var P4=[
 {id:'lixo',ic:'delete',tit:'Lixo no rio',causa:'Sacolas, garrafas e embalagens jogadas na rua são levadas pela chuva até o rio.',o:['Jogar o lixo na lixeira e separar para a coleta seletiva.','Empurrar o lixo para o fundo do rio.','Esperar a chuva levar o lixo embora.'],ok:'Lixo no lixo, e separado!',x:'O lixo deixa a água suja, machuca os animais e pode entupir o rio.'},
 {id:'esgoto',ic:'caution',tit:'Esgoto sem tratamento',causa:'O esgoto das casas e das fábricas está caindo direto no rio.',o:['Tratar o esgoto antes de devolver ao rio, e não jogar óleo na pia.','Jogar o óleo de cozinha na pia.','Colocar mais canos jogando esgoto no rio.'],ok:'Esgoto tratado!',x:'Esgoto sem tratamento polui a água e espalha doenças.'},
 {id:'margem',ic:'tree-one',tit:'Margem sem árvores',causa:'Cortaram as árvores da beira do rio.',o:['Replantar árvores na margem: a mata ciliar.','Cortar as árvores que sobraram.','Construir casas bem na beira do rio.'],ok:'A mata ciliar voltou!',x:'Sem a <b>mata ciliar</b>, a terra cai no rio (é o <b>assoreamento</b>), ele fica raso e pode haver enchentes. As raízes das árvores seguram a terra.'},
 {id:'agro',ic:'seedling',tit:'Veneno da plantação',causa:'Agrotóxicos usados em excesso escorrem da plantação para o rio.',o:['Usar uma agricultura mais sustentável, com menos veneno.','Usar o dobro de veneno na plantação.','Lavar as embalagens de veneno no rio.'],ok:'Plantação sustentável!',x:'O veneno que escorre prejudica os peixes e os outros seres vivos do rio.'},
 {id:'agua',ic:'shower-head',tit:'Torneira pingando',causa:'Torneira aberta, vazamentos e banhos muito longos desperdiçam água.',o:['Fechar a torneira e consertar o vazamento.','Lavar a calçada com a mangueira todo dia.','Tomar banhos bem demorados.'],ok:'Sem desperdício!',x:'Água desperdiçada é menos água para todos. Cada gota conta.'}
];
/* Organize a tabela: cada ficha vai para a linha certa da tabela de preservação */
var PT=[];CAD.preservacao.itens.forEach(function(i,n){PT.push({lin:n,col:'causa',f:i[1]});PT.push({lin:n,col:'efeito',f:i[2]});PT.push({lin:n,col:'cuidar',f:i[3]});});
var MOD={barragem:['lightning','BARRAGEM (REPRESA)','Parede que segura a água e forma um lago. Exemplo: Itaipu, no Rio Paraná.',C.amarelo],
 retificacao:['ruler','RETIFICAÇÃO','O rio fica mais reto, sem curvas. Exemplo: Rio Tietê, em São Paulo.',C.ceu],
 canalizacao:['road-sign','CANALIZAÇÃO','O rio vai para dentro de um canal de concreto ou para baixo da rua.',C.terra],
 aterro:['home','OCUPAÇÃO DAS MARGENS','Casas e ruas construídas muito perto do rio.',C.sol],
 poluicao:['factory-building','POLUIÇÃO','Esgoto e resíduos jogados no rio. Exemplo: Rio Pinheiros, em São Paulo.',C.coral]};
var P5=[
 {m:'barragem',f:'Gera energia elétrica para as cidades.',c:'v',x:'A água da represa passa pelas turbinas e gera energia.'},
 {m:'barragem',f:'Inunda terras e muda o caminho dos peixes.',c:'p',x:'O lago cobre matas e terras, e os peixes não conseguem mais subir o rio.'},
 {m:'barragem',f:'Guarda água para usar na época de seca.',c:'v',x:'O lago da represa funciona como uma caixa-d\'água gigante.'},
 {m:'retificacao',f:'Facilita fazer obras e usar o terreno em volta.',c:'v',x:'Sem curvas, fica mais fácil construir perto do rio.'},
 {m:'retificacao',f:'A água corre mais rápido e as enchentes podem aumentar.',c:'p',x:'Sem as curvas para frear, a água desce com mais força.'},
 {m:'canalizacao',f:'Ganha espaço para ruas e construções.',c:'v',x:'Com o rio no canal ou embaixo da avenida, sobra espaço em cima.'},
 {m:'canalizacao',f:'O chão vira concreto, a água da chuva não entra na terra e o rio perde a vida.',c:'p',x:'O solo fica impermeável e o rio vira um cano: sem plantas e sem bichos.'},
 {m:'aterro',f:'Mais espaço para as pessoas morarem.',c:'v',x:'Mais terreno para casas e ruas.'},
 {m:'aterro',f:'Risco de enchente e perda da mata ciliar.',c:'p',x:'Quem mora na beira do rio corre risco quando ele enche, e as árvores da margem somem.'},
 {m:'poluicao',f:'Os peixes morrem e a água fica imprópria para usar.',c:'p',x:'A poluição é a única mudança <b>sem nenhuma vantagem</b>. Só traz problema.'}
];
var P6=[
 {q:'Qual é um rio perene do Brasil?',r:'O Rio Amazonas: ele tem água o ano todo.',c:'certo',x:'Conferido no caderno: o Amazonas é perene, tem água o ano inteiro.'},
 {q:'O que é um rio intermitente?',r:'É um rio que tem água o ano inteiro, sem parar.',c:'errou',x:'No caderno: o intermitente <b>seca em algumas épocas</b> e volta com as chuvas. Quem tem água o ano todo é o perene.'},
 {q:'O que é a nascente de um rio?',r:'É o lugar onde o rio termina, quando chega ao mar.',c:'errou',x:'No caderno: a nascente é onde o rio <b>começa</b>. Onde ele termina é a foz.'},
 {q:'Em qual rio fica a Usina de Itaipu?',r:'No Rio Paraná.',c:'certo',x:'Conferido no caderno: Itaipu fica no Rio Paraná.'},
 {q:'As Cataratas do Iguaçu ficam em que tipo de rio?',r:'Num rio de planície, bem plano e calmo.',c:'errou',x:'No caderno: o Iguaçu é rio <b>de planalto</b>, com terreno inclinado e quedas-d\'água.'},
 {q:'O que é mata ciliar?',r:'É a vegetação que protege as margens do rio.',c:'certo',x:'Conferido no caderno: mata ciliar é a vegetação da beira do rio.'},
 {q:'O Rio Negro é afluente de qual rio?',r:'Do Rio Amazonas.',c:'certo',x:'Conferido no caderno: o Rio Negro é afluente do Amazonas.'},
 {q:'Posso jogar óleo de cozinha na pia?',r:'Pode, o óleo não faz mal nenhum ao rio.',c:'errou',x:'No caderno: <b>não jogue óleo na pia</b>. Ele vai para o esgoto e polui o rio.'},
 {q:'Deixar o rio reto, sem curvas, acaba com as enchentes?',r:'Sim, rio reto nunca tem enchente.',c:'errou',x:'No caderno: no rio retificado a água corre mais rápido e <b>as enchentes podem aumentar</b>.'},
 {q:'Qual tipo de rio é bom para navegar?',r:'O rio de planície, porque a água é mais calma.',c:'certo',x:'Conferido no caderno: rio de planície é plano e calmo, bom para navegar.'},
 {q:'Onde fica a nascente do Rio São Francisco?',r:'Na Serra da Canastra, em Minas Gerais.',c:'certo',x:'Conferido no caderno: a nascente do São Francisco fica na Serra da Canastra (MG).'},
 {q:'A poluição do rio tem alguma vantagem?',r:'Sim, a poluição deixa a água mais limpa para os peixes.',c:'errou',x:'No caderno: a poluição é a única mudança <b>sem nenhuma vantagem</b>. Os peixes morrem.'}
];
/* Pedir ajuda à IA: escolha o melhor pedido (prompt) ou a melhor atitude */
var PP=[
 {t:'Você quer entender o que é mata ciliar.',o:['Explique para uma criança de 9 anos o que é mata ciliar, em 3 frases simples.','mata','Me fala tudo sobre rios.'],c:0,x:'O melhor pedido diz <b>para quem</b> é (criança de 9 anos), <b>o que</b> quer (mata ciliar) e <b>como</b> quer (3 frases simples).'},
 {t:'Você precisa de ideias para o cartaz sobre o Rio Paraná.',o:['cartaz','Faça meu trabalho de escola inteiro.','Dê 5 ideias de títulos para um cartaz sobre o Rio Paraná, para alunos do 4º ano.'],c:2,x:'Peça ideias para <b>você</b> fazer, dizendo o tema, a quantidade e a turma. A IA ajuda, mas o trabalho é seu.'},
 {t:'A IA respondeu que a Usina de Itaipu fica no Rio Amazonas.',o:['Acreditar, porque a IA sempre acerta.','Conferir no caderno de campo ou num site oficial antes de usar.','Apagar a pergunta e desistir.'],c:1,x:'A IA pode errar mesmo parecendo ter certeza. Itaipu fica no <b>Rio Paraná</b>. Um bom pesquisador sempre <b>confere</b>.'},
 {t:'Você quer uma tabela para organizar os dados dos rios.',o:['tabela de rios','Monte uma tabela com as colunas: nome do rio, tipo, para que serve e problema, com 3 linhas em branco para eu preencher.','Faz uma tabela aí.'],c:1,x:'Diga exatamente <b>quais colunas</b> e <b>quantas linhas</b>. Quanto mais claro o pedido, melhor a resposta.'},
 {t:'Você não entendeu a palavra "assoreamento".',o:['O que significa assoreamento? Explique com um exemplo de um rio, para uma criança.','assoreamento???','Escreva um texto de 10 páginas sobre assoreamento.'],c:0,x:'Pedido claro, com <b>exemplo</b> e <b>para quem</b>. Textos enormes não ajudam a entender.'},
 {t:'A IA deu uma resposta que não aparece em nenhum livro nem site confiável.',o:['Usar mesmo assim, ela parecia certa.','Não usar essa informação e perguntar para a professora.','Copiar para o cartaz sem ler.'],c:1,x:'Informação que <b>não se confirma</b> em fonte confiável não entra no trabalho. Pergunte para a professora.'},
 {t:'Você quer saber se o rio da sua cidade é perene ou intermitente.',o:['Meu rio é legal?','O rio X, da cidade Y, tem água o ano todo ou seca em alguma época? Onde posso conferir essa informação?','Rio.'],c:1,x:'Diga <b>qual rio</b> e <b>qual cidade</b>, e peça <b>onde conferir</b>. Assim você já sai com a fonte.'},
 {t:'Você vai usar a IA na atividade da escola.',o:['Usar escondido e dizer que fez tudo sozinho.','Avisar a professora, mostrar o pedido que fez e conferir a resposta junto.','Pedir para a IA fazer a prova.'],c:1,x:'IA se usa <b>com a professora</b>, mostrando o que pediu e conferindo a resposta. Isso é usar a tecnologia com honestidade.'}
];
var ETAPAS=CAD.atividade.itens;
var FERR=[['buscador','Buscador na internet','search',C.ceu],['fontes','Sites oficiais, livros, professora','book-open',C.sol],['planilha','Planilha (tabela no computador)','table',C.terra],['grafico','Gráfico de barras','chart-histogram',C.rio],['mapa','Mapa digital ou impresso','map-draw',C.folha],['ia','Assistente de IA, com a professora','robot-one',C.coral],['cartaz','Cartaz, slides ou vídeo','projector',C.roxo]];
var PF=[
 {f:'Quero saber onde fica a nascente do Rio Iguaçu.',c:'buscador',x:'Para <b>pesquisar</b>, usamos um buscador na internet, com palavras bem escolhidas.'},
 {f:'Achei a informação num site. Quero ter certeza de que está certa.',c:'fontes',x:'Para <b>conferir</b>, procuramos a mesma informação em um site oficial, num livro ou com a professora.'},
 {f:'Tenho os dados de 3 rios e quero colocar em linhas e colunas.',c:'planilha',x:'Para <b>organizar dados</b>, usamos uma planilha: cada rio numa linha, cada informação numa coluna.'},
 {f:'Quero mostrar com desenho quantos usos cada rio tem.',c:'grafico',x:'Para comparar números, criamos um <b>gráfico de barras</b>.'},
 {f:'Quero marcar a nascente, o curso e a foz do rio.',c:'mapa',x:'Para localizar, usamos um <b>mapa</b> digital ou impresso.'},
 {f:'Não entendi uma palavra difícil e quero uma explicação simples.',c:'ia',x:'Podemos <b>pedir ajuda à IA</b> com um bom pedido, e conferir a resposta com a professora.'},
 {f:'Quero mostrar para a turma tudo o que descobri.',c:'cartaz',x:'Para <b>apresentar</b>, fazemos um cartaz, slides ou um vídeo.'}
];

/* ======================================================================
   PARADAS DA EXPEDIÇÃO
   ====================================================================== */
var PARADAS=[
 {id:'partes',nome:'Partes do rio',parada:'Nascente',ic:'mountain',cor:C.folha,aba:'tipos',perg:'Por onde o rio passa, do começo ao fim?',
  resp:'O rio começa na <b>nascente</b>, percorre o seu <b>curso</b>, recebe os <b>afluentes</b> e termina na <b>foz</b>. Tudo isso junto forma a <b>bacia hidrográfica</b>.',
  como:'Leia a pista e toque no número certo do mapa.',jogar:jogoPartes,n:P1.length},
 {id:'tipos',nome:'Tipos de rio',parada:'Corredeira',ic:'water',cor:C.ceu,aba:'tipos',perg:'Todos os rios têm água o ano todo?',
  resp:'Não! O rio <b>perene</b> tem água o ano inteiro, mas o <b>intermitente</b> seca em algumas épocas. Pelo relevo, há rio <b>de planalto</b> (com quedas-d\'água) e rio <b>de planície</b> (calmo, bom para navegar).',
  como:'Leia sobre cada rio e escolha o tipo certo. Olhe as figuras dos botões!',jogar:jogoEscolha,n:P2.length,
  ordem:function(){return emb(P2.filter(function(i){return i.g==='agua';})).concat(emb(P2.filter(function(i){return i.g==='relevo';})));},
  cartao:function(it){return '<div class="tag">'+(it.g==='agua'?'Pela água ao longo do ano':'Pelo relevo (o terreno)')+'</div><div class="fig">'+icone(it.ic,C.ceu)+'</div><div class="frase">'+it.f+'</div>';},
  opcoes:function(it){return (it.g==='agua'?['perene','intermitente']:['planalto','planicie']).map(function(t){return {v:t,html:ICO[t]+'RIO '+NT[t]};});},
  titOk:function(it){return 'É rio '+NT[it.c].toLowerCase()+'!';},dica:'Pense de novo. Olhe a figura de cada botão.'},
 {id:'qualrio',nome:'Qual rio é?',parada:'Mirante',ic:'telescope',cor:C.sol,aba:'tipos',perg:'Você reconhece os rios do Brasil?',
  resp:'Cada rio tem a sua história: o <b>Amazonas</b> é perene e de planície, o <b>Iguaçu</b> tem as Cataratas, o <b>Paraná</b> tem Itaipu, o <b>São Francisco</b> nasce na Serra da Canastra e o <b>Negro</b> é afluente do Amazonas.',
  como:'Leia a pista e descubra de qual rio estamos falando. O caderno de campo ajuda!',jogar:jogoEscolha,n:PQ.length,
  ordem:function(){return emb(PQ);},
  cartao:function(it){return '<div class="tag">Pista do mirante</div><div class="fig">'+icone('telescope',C.sol)+'</div><div class="frase">'+it.f+'</div><div class="desc">De qual rio estamos falando?</div>';},
  opcoes:function(it){return emb(it.o).map(function(k){var r=pega(RIOS,k);return {v:k,html:icone(r[2],r[3])+r[1]};});},
  titOk:function(it){return 'É o '+pega(RIOS,it.c)[1]+'!';},dica:'Olhe o caderno de campo, aba Tipos de rios.'},
 {id:'usos',nome:'Para que serve o rio?',parada:'Cidade',ic:'building-one',cor:C.ceu,aba:'importancia',perg:'O que aconteceria com a cidade se o rio secasse?',
  resp:'Faltaria água na torneira, comida, energia, transporte e lazer. <b>A cidade depende do rio</b>, por isso precisamos cuidar dele.',
  como:'Leia a situação e descubra como o rio está ajudando. A cada acerto o gráfico cresce!',jogar:jogoEscolha,n:P3.length,grade:'grade4',grafico:true,
  ordem:function(){return emb(P3);},
  cartao:function(it){return '<div class="fig">'+icone(it.ic,C.ceu)+'</div><div class="frase">'+it.f+'</div><div class="desc">Como o rio está ajudando aqui?</div>';},
  opcoes:function(){return USOS.map(function(u){return {v:u[0],html:icone(u[1],u[3])+u[2]};});},
  titOk:function(it){return pega(USOS,it.c)[2]+'!';},dica:'Pense de novo: o que o rio está dando nessa situação?'},
 {id:'salve',nome:'Salve o rio',parada:'Margem',ic:'tree-one',cor:C.folha,aba:'preservacao',perg:'O que eu posso fazer para proteger um rio?',
  resp:'Jogar o lixo na lixeira, não jogar óleo na pia, plantar árvores na margem e <b>não desperdiçar água</b>. Cuidar do rio começa em casa.',
  como:'O rio está doente! Toque em cada ponto vermelho e escolha como cuidar dele.',jogar:jogoSalve,n:P4.length},
 {id:'tabela',nome:'Organize a tabela',parada:'Laboratório',ic:'table',cor:C.terra,aba:'preservacao',perg:'Como organizar o que descobrimos?',
  resp:'Cientistas organizam as informações em <b>tabelas</b>: cada problema numa linha, com a sua causa, o seu efeito e como cuidar. Assim fica fácil comparar e entender.',
  como:'Leia a ficha e toque no problema certo. A tabela vai se preenchendo.',jogar:jogoTabela,n:10},
 {id:'acao',nome:'Vantagem ou problema?',parada:'Represa',ic:'lightning',cor:C.amarelo,aba:'acao',perg:'Mudar o rio traz só vantagens?',
  resp:'Não. <b>Toda mudança tem vantagens e problemas.</b> E a poluição não tem vantagem nenhuma.',
  como:'As pessoas mudaram o rio. Diga se cada frase é uma vantagem ou um problema.',jogar:jogoEscolha,n:P5.length,
  ordem:function(){var o=[];['barragem','retificacao','canalizacao','aterro','poluicao'].forEach(function(m){o=o.concat(emb(P5.filter(function(i){return i.m===m;})));});return o;},
  cartao:function(it){var M=MOD[it.m];return '<div class="tag">'+M[1]+'</div><div class="fig">'+icone(M[0],M[3])+'</div><div class="desc">'+M[2]+'</div><div class="frase">“'+it.f+'”</div>';},
  opcoes:function(){return [{v:'v',cls:'sim',html:icone('good',C.rio)+'VANTAGEM'},{v:'p',cls:'nao',html:icone('attention',C.coral)+'PROBLEMA'}];},
  titOk:function(it){return it.c==='v'?'É vantagem!':'É problema!';},dica:'Pense de novo: isso ajuda as pessoas ou causa um estrago?'},
 {id:'detetive',nome:'Detetive da IA',parada:'Estação de pesquisa',ic:'search',cor:C.coral,aba:'atividade',perg:'A IA sempre acerta?',
  resp:'Não. <b>A IA pode errar</b>, mesmo parecendo ter certeza. Um bom pesquisador sempre confere numa fonte confiável, como o caderno de campo, um livro ou um site oficial.',
  como:'A IA respondeu perguntas sobre rios, mas ela pode errar! Leia, consulte o caderno se precisar e diga se a IA acertou ou errou.',jogar:jogoEscolha,n:P6.length,
  ordem:function(){return emb(P6);},
  cartao:function(it){return '<div class="chat"><div class="msg eu"><span class="av">'+icone('user',C.ceu)+'</span><p><small>Pergunta</small>'+it.q+'</p></div><div class="msg ia"><span class="av">'+icone('robot-one',C.coral)+'</span><p><small>A IA respondeu</small>'+it.r+'</p></div></div>';},
  opcoes:function(){return [{v:'certo',cls:'sim',html:icone('check-one',C.rio)+'A IA ACERTOU'},{v:'errou',cls:'nao',html:icone('close-one',C.coral)+'A IA ERROU'}];},
  titOk:function(it){return it.c==='certo'?'A IA acertou!':'Você pegou o erro da IA!';},dica:'Confira no caderno de campo antes de responder.'},
 {id:'prompt',nome:'Pedir ajuda à IA',parada:'Antena',ic:'robot-one',cor:C.ceu,aba:'atividade',perg:'Como pedir ajuda à IA do jeito certo?',
  resp:'Um bom pedido (prompt) diz <b>quem você é</b>, <b>o que quer</b> e <b>como quer</b>. E a resposta sempre se <b>confere</b> com a professora ou numa fonte confiável. A IA ajuda, mas o trabalho é seu.',
  como:'Leia a situação e escolha o melhor pedido ou a melhor atitude.',jogar:jogoEscolha,n:PP.length,vert:true,
  ordem:function(){return emb(PP);},
  cartao:function(it){return '<div class="tag">Situação</div><div class="fig">'+icone('message',C.ceu)+'</div><div class="frase">'+it.t+'</div><div class="desc">Qual é a melhor escolha?</div>';},
  opcoes:function(it){return emb(it.o.map(function(t,i){return {v:i,t:t};})).map(function(o,n){return {v:o.v,html:'<span class="num">'+(n+1)+'</span>'+o.t};});},
  titOk:function(){return 'Boa escolha!';},dica:'Pense: o pedido diz para quem, o que e como? A atitude confere a resposta?'},
 {id:'plano',nome:'Plano de pesquisa',parada:'Foz',ic:'checklist',cor:C.rio,aba:'atividade',perg:'Como a tecnologia ajuda a estudar e cuidar dos rios?',
  resp:'Pesquisando, conferindo as fontes, organizando dados em <b>tabelas</b>, criando <b>gráficos</b> e <b>mapas</b>, pedindo ajuda à <b>IA</b> do jeito certo e <b>apresentando</b> o que descobrimos. Anote cada etapa no seu caderno: é o seu diário de bordo.',
  como:'Chegamos à foz! Primeiro coloque as 7 etapas da atividade na ordem certa. Depois escolha a ferramenta certa para cada tarefa.',jogar:jogoPlano,n:ETAPAS.length+PF.length}
];
var ESTS=[[80,70],[215,150],[365,95],[505,160],[645,105],[790,165],[770,290],[560,345],[395,420],[600,462]];

/* ======================================================================
   MAPA DA EXPEDIÇÃO
   ====================================================================== */
function svgExpedicao(){
 var d=caminho(ESTS.concat([[985,505]]));
 return '<svg viewBox="0 0 1000 520" xmlns="http://www.w3.org/2000/svg"><rect width="1000" height="520" fill="#BDE5A8"/>'+
 '<path d="M700,520 C800,470 900,420 1000,340 L1000,520 Z" fill="#8ECAE6"/><path d="M760,520 C840,480 920,440 1000,380" fill="none" stroke="#fff" stroke-width="3" opacity=".5"/><text x="945" y="480" fill="#fff" font-size="22" font-weight="bold" text-anchor="middle" font-family="Fredoka, Nunito, sans-serif">MAR</text>'+
 '<polygon points="0,220 0,110 50,40 100,10 160,60 210,0 0,0" fill="#A88B6E"/><polygon points="50,40 100,10 160,60 140,72 110,52 80,66" fill="#fff" opacity=".85"/>'+
 '<g fill="#ADB5BD"><rect x="470" y="40" width="30" height="56"/><rect x="506" y="60" width="24" height="36"/><rect x="536" y="30" width="28" height="66"/></g><g fill="#fff" opacity=".7"><rect x="476" y="48" width="7" height="7"/><rect x="488" y="48" width="7" height="7"/><rect x="476" y="62" width="7" height="7"/><rect x="542" y="40" width="7" height="7"/><rect x="552" y="56" width="7" height="7"/></g>'+
 '<ellipse cx="760" cy="238" rx="64" ry="26" fill="#74C0FC"/><rect x="824" y="214" width="12" height="50" rx="3" fill="#868E96"/>'+
 '<g fill="#2F9E44"><circle cx="300" cy="200" r="16"/><circle cx="325" cy="215" r="12"/><circle cx="880" cy="110" r="17"/><circle cx="905" cy="130" r="13"/><circle cx="140" cy="300" r="17"/><circle cx="115" cy="320" r="13"/><circle cx="250" cy="470" r="15"/><circle cx="470" cy="260" r="15"/><circle cx="640" cy="400" r="14"/></g>'+
 '<path d="'+d+'" fill="none" stroke="#1F7A6F" stroke-width="30" stroke-linecap="round" stroke-linejoin="round" opacity=".35"/><path d="'+d+'" fill="none" stroke="#4DABF7" stroke-width="22" stroke-linecap="round" stroke-linejoin="round"/><path d="'+d+'" fill="none" stroke="#fff" stroke-width="3" stroke-dasharray="14 18" stroke-linecap="round" opacity=".6"/>'+
 /* elementos que ganham vida conforme as paradas são concluídas */
 '<g class="vivo" data-v="0">'+arvore(60,130)+arvore(120,125)+'</g>'+
 '<g class="vivo" data-v="1"><g class="peixe-nada"><ellipse cx="290" cy="130" rx="12" ry="6" fill="#FF922B"/><polygon points="279,130 268,124 268,136" fill="#FF922B"/></g></g>'+
 '<g class="vivo" data-v="2"><rect x="340" y="40" width="10" height="34" fill="#8B5E3C"/><polygon points="345,22 362,32 345,42" fill="#E76F51"/></g>'+
 '<g class="vivo" data-v="3"><rect x="430" y="150" width="34" height="26" fill="#FFE8CC"/><polygon points="425,150 447,132 469,150" fill="#E8590C"/><rect x="441" y="160" width="10" height="16" fill="#B08968"/></g>'+
 '<g class="vivo" data-v="4"><g class="passaro-voa"><path d="M0,60 q8,-8 16,0 q8,-8 16,0" fill="none" stroke="#2F3A4A" stroke-width="3" stroke-linecap="round"/><path d="M40,80 q8,-8 16,0 q8,-8 16,0" fill="none" stroke="#2F3A4A" stroke-width="3" stroke-linecap="round"/></g></g>'+
 '<g class="vivo" data-v="5">'+arvore(700,120)+arvore(740,135)+'</g>'+
 '<g class="vivo" data-v="6"><rect x="690" y="226" width="22" height="22" fill="#E9ECEF" stroke="#868E96" stroke-width="2"/><rect x="696" y="212" width="10" height="14" fill="#868E96"/></g>'+
 '<g class="vivo" data-v="7"><g class="peixe-nada"><ellipse cx="480" cy="360" rx="12" ry="6" fill="#FAB005"/><polygon points="469,360 458,354 458,366" fill="#FAB005"/></g></g>'+
 '<g class="vivo" data-v="8">'+arvore(330,470)+arvore(370,480)+'<circle cx="300" cy="440" r="8" fill="#A47148" stroke="#2F3A4A" stroke-width="2"/><circle cx="312" cy="438" r="5" fill="#B8865B" stroke="#2F3A4A" stroke-width="2"/></g>'+
 '<g class="vivo" data-v="9"><g class="peixe-nada"><ellipse cx="840" cy="470" rx="14" ry="7" fill="#FF922B"/><polygon points="827,470 814,463 814,477" fill="#FF922B"/></g><path d="M880,430 q8,-8 16,0 q8,-8 16,0" fill="none" stroke="#2F3A4A" stroke-width="3" stroke-linecap="round"/></g>'+
 '</svg>';
}
function barcoSVG(){return '<svg class="barco" viewBox="0 0 64 56" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path d="M8 38l6-12h36l6 12z" fill="#B08968" stroke="'+TINTA+'" stroke-width="3" stroke-linejoin="round"/><path d="M32 26V6l14 10-14 4" fill="#E76F51" stroke="'+TINTA+'" stroke-width="3" stroke-linejoin="round"/><path d="M6 40c10-5 16 5 26 0s16 5 26 0" fill="none" stroke="#fff" stroke-width="3" stroke-linecap="round"/><circle cx="24" cy="32" r="5" fill="#A47148" stroke="'+TINTA+'" stroke-width="2"/></svg>';}

function aberta(i){return est.livre||i===0||est.feitas.indexOf(PARADAS[i-1].id)>=0;}
function feita(i){return est.feitas.indexOf(PARADAS[i].id)>=0;}
function atual(){for(var i=0;i<PARADAS.length;i++)if(!feita(i))return i;return PARADAS.length;}
function todas(){return est.feitas.length>=PARADAS.length;}

function telaMapa(){
 var m=$('mapa');m.innerHTML='';
 var a=atual(),fim=todas();
 var txt=fim?'Você chegou à foz e completou toda a expedição. Seu certificado está pronto!':(a===0&&!est.feitas.length?'Sou a Capi, sua guia. Vamos seguir o rio da nascente até a foz, parando para aprender em cada lugar. Toque na parada que está brilhando.':'Já passamos por '+est.feitas.length+(est.feitas.length===1?' parada':' paradas')+'. A próxima é <b>'+PARADAS[a].nome+'</b>. Vamos remar?');
 m.appendChild(el('div',null,balaoCapi(fim?'Expedição concluída!':'Olá, '+(est.nome||'explorador')+'!',txt)));
 var cena=el('div','cena');cena.innerHTML=svgExpedicao();
 PARADAS.forEach(function(p,i){var pos=ESTS[i],f=feita(i),ab=aberta(i);
  var r=el('div','rotulo'+(f?' feita':i===a?' atual':''),p.nome);r.style.left=pos[0]/10+'%';r.style.top=(pos[1]>400?pos[1]/5.2-13.5:pos[1]/5.2+7.5)+'%';cena.appendChild(r);
  var b=el('button','parada'+(f?' feita':!ab?' fechada':i===a?' atual':''),f||ab?icone(p.ic,p.cor):icone('lock','#C9C1B0'));
  b.style.left=pos[0]/10+'%';b.style.top=pos[1]/5.2+'%';b.setAttribute('aria-label',(i+1)+'. '+p.nome+(f?' (concluída)':!ab?' (fechada)':''));
  b.onclick=function(){if(!ab){aviso2(b,'Primeiro complete a parada anterior.');return;}tom(SOM.clique);abreParada(i);};cena.appendChild(b);});
 var barco=el('div',null,barcoSVG()).firstChild;var pb=ESTS[Math.min(a,ESTS.length-1)];barco.style.left=pb[0]/10+'%';barco.style.top=(pb[1]/5.2-1)+'%';if(fim){barco.style.left='93%';barco.style.top='94%';}cena.appendChild(barco);
 m.appendChild(cena);
 setTimeout(function(){cena.querySelectorAll('.vivo').forEach(function(g){g.classList.toggle('ver',est.feitas.indexOf(PARADAS[+g.dataset.v].id)>=0);});},50);
 m.appendChild(el('div','legenda-mapa','<span><i class="a"></i>Próxima parada</span><span><i class="f"></i>Concluída</span><span><i class="x"></i>Ainda fechada</span>'));
 var bts=el('div','linha-bts');
 if(fim){var bc=el('button','bt-principal',icone('certificate','#fff')+'Ver meu certificado');bc.onclick=abreCertificado;bts.appendChild(bc);}
 else{var bp=el('button','bt-principal',icone('sailboat-one','#fff')+'Ir para: '+PARADAS[a].nome);bp.onclick=function(){abreParada(a);};bts.appendChild(bp);}
 var bcad=el('button','bt-leve',icone('book-open',C.rio)+'Caderno de campo');bcad.onclick=function(){mostra('caderno');};bts.appendChild(bcad);
 m.appendChild(bts);
 // barquinho desliza até a parada atual
 if(est.anim&&est.ultimaPos!=null&&est.ultimaPos!==a&&!fim){var pa=ESTS[Math.min(est.ultimaPos,ESTS.length-1)];barco.style.transition='none';barco.style.left=pa[0]/10+'%';barco.style.top=(pa[1]/5.2-1)+'%';requestAnimationFrame(function(){requestAnimationFrame(function(){barco.style.transition='';barco.style.left=pb[0]/10+'%';barco.style.top=(pb[1]/5.2-1)+'%';});});}
 est.ultimaPos=a;
}
function aviso2(b,t){b.classList.remove('treme');void b.offsetWidth;b.classList.add('treme');var av=el('div','aviso-caixa',t);av.style.position='fixed';av.style.left='50%';av.style.bottom='24px';av.style.transform='translateX(-50%)';av.style.zIndex=40;document.body.appendChild(av);setTimeout(function(){av.remove();},1800);}

/* ======================================================================
   NAVEGAÇÃO
   ====================================================================== */
function mostra(id){['mapa','jogo','caderno','ajustes'].forEach(function(t){var e=$(t);e.classList.toggle('oculto',t!==id);if(t===id){e.classList.remove('entra');void e.offsetWidth;e.classList.add('entra');}});
 ['Mapa','Caderno','Ajustes'].forEach(function(n){$('bt'+n).classList.toggle('ativo',n.toLowerCase()===id);});
 if(id==='mapa')telaMapa();if(id==='caderno')telaCaderno();if(id==='ajustes')telaAjustes();
 window.scrollTo({top:0,behavior:est.anim?'smooth':'auto'});
}
function telaCaderno(){var c=$('caderno');c.innerHTML='';c.appendChild(el('div',null,balaoCapi('Caderno de campo','Aqui estão as informações da nossa expedição, com desenhos, exemplos e a fonte de cada uma. Toque nas abas para folhear.')));var cad=el('div',null,cadernoHTML('visao'));c.appendChild(cad.firstChild);ligaAbas(c);}
function janela(html,cls){var j=$('janela');j.innerHTML='';var cx=el('div','cartao '+(cls||''),html);j.appendChild(cx);j.classList.remove('oculto');return cx;}
function fechaJanela(){$('janela').classList.add('oculto');}
function abreCadernoJanela(aba){var cx=janela('<button class="bt-redondo fecha-janela" aria-label="Fechar">'+icone('close-one',C.coral)+'</button>'+cadernoHTML(aba||'visao'),'caderno-janela');cx.querySelector('.fecha-janela').onclick=fechaJanela;ligaAbas(cx);}

/* ======================================================================
   JOGO: estrutura comum
   ====================================================================== */
var J={};
function abreParada(i){
 var p=PARADAS[i];J={i:i,p:p,k:0,acertos:0};
 mostra('jogo');
 $('chipParada').innerHTML=icone(p.ic,p.cor)+'Parada '+(i+1)+': '+p.nome;
 $('btLivro').innerHTML=icone('book-open',C.rio);$('btOuvir').innerHTML=icone('volume-up',C.ceu);$('btVoltar').innerHTML=icone('arrow-left','#fff')+'Mapa';
 desenhaPrevia();
 // Introdução: Capi apresenta a pergunta-guia e a página do caderno
 var palco=$('palco');palco.innerHTML='';$('aviso').innerHTML='';
 palco.appendChild(el('div',null,balaoCapi(p.perg,p.como,'pensando')));
 var la=el('div','leia-antes',icone('book-open',C.sol)+'<span>Antes de jogar, dê uma olhada na página do caderno de campo sobre este tema.</span>');
 var cad=el('div',null,cadernoHTML(p.aba,true));
 palco.appendChild(la);palco.appendChild(cad.firstChild);
 var bt=el('button','bt-principal',icone('sailboat-one','#fff')+'Começar a parada');bt.onclick=function(){tom(SOM.clique);J.fase=p.ordem?p.ordem():null;J.k=0;desenhaPrevia();p.jogar();};
 palco.appendChild(el('div','linha-bts')).appendChild(bt);
 J.textoOuvir=p.perg+'. '+p.como;
}
function desenhaPrevia(){var pv=$('previa');pv.innerHTML='';var n=J.p.n;if(n<=1){pv.innerHTML='';return;}for(var i=0;i<n;i++){var d=el('i');if(i<J.k)d.className='f';else if(i===J.k)d.className='a';pv.appendChild(d);}}
function avisa(html,bom,btTxt,fn){var a=$('aviso');a.innerHTML='';var cx=el('div','aviso-caixa'+(bom?' bom':''),html);if(btTxt){var b=el('button','bt-principal',icone('right','#fff')+btTxt);b.style.margin='10px auto 0';b.style.height='52px';b.style.fontSize='18px';b.onclick=fn;cx.appendChild(b);}a.appendChild(cx);if(btTxt)setTimeout(function(){b.focus({preventScroll:true});},50);}
function erro(elm,txt){tom(SOM.quase);elm.classList.remove('treme');void elm.offsetWidth;elm.classList.add('treme');avisa(txt);}
function concluiParada(){
 var p=J.p;if(est.feitas.indexOf(p.id)<0){est.feitas.push(p.id);salva();}
 tom(SOM.fim);confete();
 var j=$('premio');j.innerHTML='';
 var fim=todas();
 var cx=el('div','cartao','<div class="kick">Parada '+(J.i+1)+' concluída</div><div class="carimbo-c" style="--cor-selo:'+p.cor+'">'+icone(p.ic,p.cor)+'</div><h2>'+p.nome+'</h2><div class="perg">'+p.perg+'</div><div class="resp">'+p.resp+'</div>'+(fim?'<p class="sub">Você completou toda a expedição! Seu certificado está pronto no mapa.</p>':'<p class="sub">O barquinho segue para a próxima parada.</p>'));
 var bt=el('button','bt-principal',icone(fim?'certificate':'sailboat-one','#fff')+(fim?'Ver o certificado':'Voltar ao mapa'));bt.onclick=function(){j.classList.add('oculto');mostra('mapa');if(fim)setTimeout(abreCertificado,900);};cx.appendChild(bt);
 j.appendChild(cx);j.classList.remove('oculto');setTimeout(function(){bt.focus();},100);
}

/* ---------- Parada: partes do rio (mapa com pinos) ---------- */
function jogoPartes(){
 var palco=$('palco');palco.innerHTML='';$('aviso').innerHTML='';
 var ordem=emb(P1);var pista=el('div','pista');palco.appendChild(pista);
 var cena=el('div','cena');cena.innerHTML=SVG1;
 var pins={};PINS.forEach(function(p,n){var b=el('button','pin','<span>'+(n+1)+'</span><span class="rot"></span>');b.style.left=p[1]/10+'%';b.style.top=p[2]/5.2+'%';b.setAttribute('aria-label','Ponto '+(n+1));cena.appendChild(b);pins[p[0]]=b;});
 palco.appendChild(cena);
 var k=0;
 function passo(){var it=ordem[k];J.k=k;desenhaPrevia();pista.innerHTML='<span class="pn">'+(k+1)+' de '+ordem.length+'</span>Onde está... <em>'+it.p+'</em><br><small style="font-weight:600;color:var(--tinta-2)">Dica: '+it.d+'</small>';J.textoOuvir='Onde está '+it.p+' Dica: '+it.d;
  Object.keys(pins).forEach(function(id){var b=pins[id];b.onclick=function(){if(b.classList.contains('ok'))return;if(id===it.id){tom(SOM.certo);b.classList.add('ok');b.querySelector('.rot').textContent=it.nome;b.querySelector('span').innerHTML=icone('check-one',C.rio);
    avisa('<b>'+it.tit+'</b><br>'+it.x,true,k+1<ordem.length?'Próxima pista':'Concluir parada',function(){k++;if(k<ordem.length)passo();else concluiParada();});}
   else erro(b,'Esse é outro lugar. '+it.d);};});}
 passo();
}

/* ---------- Parada genérica: cartão + opções ---------- */
function jogoEscolha(){
 var p=J.p,itens=J.fase||p.ordem();var k=0;var palco=$('palco');var contagem={};
 function passo(){
  var it=itens[k];J.k=k;desenhaPrevia();palco.innerHTML='';$('aviso').innerHTML='';
  var cs=el('div','cartao-sit',p.cartao(it));palco.appendChild(cs);J.textoOuvir=cs.textContent;
  if(p.grafico){palco.appendChild(graficoUsos(contagem));}
  var ops=el('div','opcoes'+(p.grade?' '+p.grade:'')+(p.vert?' vert':''));
  p.opcoes(it).forEach(function(o,n){var b=el('button','opcao'+(o.cls?' '+o.cls:''),o.html);b.style.animationDelay=(n*.06)+'s';b.dataset.v=o.v;
   b.onclick=function(){if(ops.classList.contains('travada'))return;
    if(String(o.v)===String(it.c)){ops.classList.add('travada');tom(SOM.certo);b.classList.add('certa');b.appendChild(el('span','ok-op',icone('check-one',C.rio)));ops.querySelectorAll('.opcao').forEach(function(x){if(x!==b)x.classList.add('fora');});
     if(p.grafico){contagem[it.c]=(contagem[it.c]||0)+1;var g=palco.querySelector('.grafico');if(g)g.replaceWith(graficoUsos(contagem));}
     avisa('<b>'+p.titOk(it)+'</b><br>'+it.x,true,k+1<itens.length?'Próxima':'Concluir parada',function(){k++;if(k<itens.length)passo();else concluiParada();});}
    else erro(b,p.dica);};
   ops.appendChild(b);});
  palco.appendChild(ops);
 }
 passo();
}
function graficoUsos(cont){var g=el('div','grafico');var max=3;USOS.forEach(function(u){var n=cont[u[0]]||0;var c=el('div','col'+(n?' acesa':''),'<div class="bar" style="height:'+(n?Math.min(100,n/max*100):4)+'%">'+(n?'<b>'+n+'</b>':'')+'</div>'+icone(u[1],u[3])+'<div class="n">'+u[2]+'</div>');g.appendChild(c);});g.setAttribute('aria-label','Gráfico: quantas vezes cada uso do rio apareceu');return g;}

/* ---------- Parada: salve o rio ---------- */
function jogoSalve(){
 var palco=$('palco');palco.innerHTML='';$('aviso').innerHTML='';
 palco.appendChild(el('div','pista','Toque em cada ponto vermelho do rio doente e escolha o jeito certo de cuidar.'));
 var cena=el('div','cena');cena.innerHTML=svg4();palco.appendChild(cena);
 var sa=el('div','saude','Saúde do rio <div class="barra-s"><i style="width:0%"></i></div>');palco.appendChild(sa);
 var feitos=0;J.textoOuvir='Toque em cada ponto vermelho do rio doente e escolha o jeito certo de cuidar.';
 HOTS.forEach(function(h,n){var it=P4.filter(function(x){return x.id===h[0];})[0];var b=el('button','hot','!');b.style.left=h[1]/10+'%';b.style.top=h[2]/5.2+'%';b.setAttribute('aria-label',it.tit);
  b.onclick=function(){if(b.classList.contains('ok'))return;tom(SOM.clique);
   var cx=janela('<div class="kick">Problema</div><div class="carimbo-c" style="--cor-selo:'+C.coral+'">'+icone(it.ic,C.coral)+'</div><h2>'+it.tit+'</h2><div class="perg">'+it.causa+'</div><p class="sub">Como cuidar do rio?</p><div class="opcoes vert"></div>');
   var ops=cx.querySelector('.opcoes');emb(it.o.map(function(t,i){return [t,i];})).forEach(function(o,n2){var bo=el('button','opcao','<span class="num">'+(n2+1)+'</span>'+o[0]);bo.onclick=function(){if(o[1]===0){tom(SOM.certo);bo.classList.add('certa');ops.querySelectorAll('.opcao').forEach(function(x){if(x!==bo)x.classList.add('fora');});
     setTimeout(function(){fechaJanela();b.classList.add('ok');b.innerHTML=icone('check-one',C.rio);feitos++;J.k=feitos;desenhaPrevia();
      cena.querySelectorAll('.s-'+it.id).forEach(function(g){g.style.display='none';});cena.querySelectorAll('.l-'+it.id).forEach(function(g){g.style.display='';});
      var rio=cena.querySelector('#rio4');var cores=['#8C6D46','#7E8F6B','#6FA98E','#5BB7B0','#4DABF7','#4DABF7'];rio.setAttribute('fill',cores[feitos]);
      var px=cena.querySelector('#peixe'+feitos);if(px)px.style.display='';sa.querySelector('i').style.width=(feitos/HOTS.length*100)+'%';
      avisa('<b>'+it.ok+'</b><br>'+it.x,true,feitos<HOTS.length?'Continuar':'Concluir parada',function(){if(feitos>=HOTS.length)concluiParada();else $('aviso').innerHTML='';});},700);}
    else{tom(SOM.quase);bo.classList.remove('treme');void bo.offsetWidth;bo.classList.add('treme');bo.classList.add('fora');}};ops.appendChild(bo);});
   var bf=el('button','bt-leve',icone('arrow-left',C.tinta)+'Voltar');bf.onclick=fechaJanela;cx.appendChild(bf);};
  cena.appendChild(b);});
}

/* ---------- Parada: organize a tabela ---------- */
function jogoTabela(){
 var palco=$('palco');var linhas=CAD.preservacao.itens;var cel={};var fichas=[],usadas={};[0,1,2,3,4].forEach(function(n){var cand=emb(PT.filter(function(f){return f.lin===n;}))[0];fichas.push(cand);usadas[cand.lin+cand.col]=1;});fichas=emb(fichas.concat(emb(PT.filter(function(f){return !usadas[f.lin+f.col];})).slice(0,5)));J.fase=fichas;
 var k=0;
 function tabela(){var h='<table class="tabela"><thead><tr><th>Problema</th><th>Causa</th><th>Efeito</th><th>Como cuidar</th></tr></thead><tbody>';linhas.forEach(function(l,n){h+='<tr><th>'+l[0]+'</th>'+['causa','efeito','cuidar'].map(function(c){var v=cel[n+c];return '<td class="'+(v?'v':'vazio')+'">'+(v?v:'…')+'</td>';}).join('')+'</tr>';});return h+'</tbody></table>';}
 function passo(){var it=fichas[k];J.k=k;desenhaPrevia();palco.innerHTML='';$('aviso').innerHTML='';
  var nomeCol={causa:'Causa',efeito:'Efeito',cuidar:'Como cuidar'}[it.col];
  var cs=el('div','cartao-sit','<div class="tag">Ficha: '+nomeCol+'</div><div class="fig">'+icone(it.col==='causa'?'search':it.col==='efeito'?'attention':'leaf',C.terra)+'</div><div class="frase">'+it.f+'</div><div class="desc">Essa informação é de qual problema?</div>');palco.appendChild(cs);J.textoOuvir=nomeCol+': '+it.f+'. Essa informação é de qual problema?';
  var ops=el('div','opcoes grade4');linhas.forEach(function(l,n){var b=el('button','opcao',icone(l[4],l[5])+l[0]);b.onclick=function(){if(ops.classList.contains('travada'))return;if(n===it.lin){ops.classList.add('travada');tom(SOM.certo);b.classList.add('certa');b.appendChild(el('span','ok-op',icone('check-one',C.rio)));ops.querySelectorAll('.opcao').forEach(function(x){if(x!==b)x.classList.add('fora');});cel[n+it.col]=it.f;var t=palco.querySelector('.tabela');t.outerHTML=tabela();
    avisa('<b>Entrou na tabela!</b> '+l[0]+' → '+nomeCol+'.',true,k+1<fichas.length?'Próxima ficha':'Concluir parada',function(){k++;if(k<fichas.length)passo();else concluiParada();});}
   else erro(b,'Leia de novo a ficha. De qual problema ela fala?');};ops.appendChild(b);});
  palco.appendChild(ops);palco.insertAdjacentHTML('beforeend',tabela());}
 passo();
}

/* ---------- Parada: plano de pesquisa (ordem das etapas + ferramentas) ---------- */
function jogoPlano(){
 var palco=$('palco');var k=0,restam=emb(ETAPAS.map(function(e,n){return n;}));var feitas=[];
 function listaOrdem(){return '<ol class="ordem">'+ETAPAS.map(function(e,n){var ok=feitas.indexOf(n)>=0;return '<li class="'+(ok?'ok':'')+'">'+(ok?icone('check-one',C.rio)+e[0]:'<span class="vago">etapa '+(n+1)+'</span>')+'</li>';}).join('')+'</ol>';}
 function passoA(){var alvo=feitas.length;J.k=k;desenhaPrevia();palco.innerHTML='';$('aviso').innerHTML='';
  palco.appendChild(el('div','cartao-sit','<div class="tag">Parte 1: a ordem das etapas</div><div class="frase">Qual é a etapa '+(alvo+1)+' de 7?</div><div class="desc">'+(alvo===0?'Por onde uma pesquisa começa?':'Depois de <b>'+ETAPAS[feitas[feitas.length-1]][0]+'</b>, o que vem?')+'</div>'+listaOrdem()));
  J.textoOuvir='Qual é a etapa '+(alvo+1)+' de 7?';
  var ops=el('div','opcoes grade4');restam.forEach(function(n){var e=ETAPAS[n];var b=el('button','opcao',icone(e[4],C.ceu)+e[0]);b.onclick=function(){if(ops.classList.contains('travada'))return;
   if(n===alvo){ops.classList.add('travada');tom(SOM.certo);b.classList.add('certa');b.appendChild(el('span','ok-op',icone('check-one',C.rio)));ops.querySelectorAll('.opcao').forEach(function(x){if(x!==b)x.classList.add('fora');});feitas.push(n);restam.splice(restam.indexOf(n),1);
    avisa('<b>Etapa '+(alvo+1)+': '+e[0]+'.</b> '+e[1],true,restam.length?'Próxima etapa':'Agora as ferramentas',function(){k++;if(restam.length)passoA();else passoB();});}
   else erro(b,'Pense na ordem: '+(alvo===0?'tudo começa procurando informação.':'o que precisa estar pronto antes dessa etapa?'));};ops.appendChild(b);});
  palco.appendChild(ops);}
 var itensB=emb(PF),kb=0;
 function passoB(){var it=itensB[kb];J.k=k;desenhaPrevia();palco.innerHTML='';$('aviso').innerHTML='';
  palco.appendChild(el('div','cartao-sit','<div class="tag">Parte 2: qual ferramenta?</div><div class="fig">'+icone('tool',C.rio)+'</div><div class="frase">'+it.f+'</div><div class="desc">Qual ferramenta ajuda aqui?</div>'));J.textoOuvir=it.f+' Qual ferramenta ajuda aqui?';
  var ops=el('div','opcoes grade4');var opc=emb(FERR.filter(function(f){return f[0]!==it.c;})).slice(0,3).concat([pega(FERR,it.c)]);emb(opc).forEach(function(f){var b=el('button','opcao',icone(f[2],f[3])+f[1]);b.onclick=function(){if(ops.classList.contains('travada'))return;
   if(f[0]===it.c){ops.classList.add('travada');tom(SOM.certo);b.classList.add('certa');b.appendChild(el('span','ok-op',icone('check-one',C.rio)));ops.querySelectorAll('.opcao').forEach(function(x){if(x!==b)x.classList.add('fora');});
    avisa('<b>'+f[1]+'!</b> '+it.x,true,kb+1<itensB.length?'Próxima':'Concluir parada',function(){k++;kb++;if(kb<itensB.length)passoB();else concluiParada();});}
   else erro(b,'Pense de novo: qual ferramenta faz exatamente isso?');};ops.appendChild(b);});
  palco.appendChild(ops);}
 passoA();
}
function imprime(node){var imp=$('impressao')||document.body.appendChild(el('div'));imp.id='impressao';imp.innerHTML='';imp.appendChild(node);document.body.classList.add('imprimindo');setTimeout(function(){window.print();document.body.classList.remove('imprimindo');},100);}

/* ---------- Certificado de participação ---------- */
function certificadoHTML(){var hoje=new Date().toLocaleDateString('pt-BR');
 return '<div class="certificado">'+capi()+'<div class="kick">Certificado de participação</div><h2>Expedição Missão Rio</h2><p>Este certificado é de</p><div class="nome">'+(est.nome||'________________')+'</div><p>que seguiu o rio da nascente até a foz, passou pelas 10 paradas e descobriu como os rios funcionam, para que servem, como cuidar deles e como a tecnologia e a IA ajudam a estudá-los.</p><div class="aprendi">'+PARADAS.map(function(p){return '<div>'+icone(p.ic,p.cor)+'<div><b>'+p.nome+'</b>'+p.resp.replace(/<[^>]+>/g,'')+'</div></div>';}).join('')+'</div><div class="data">Concluído em '+hoje+'</div></div>';}
function abreCertificado(){
 var cx=janela('<div class="kick">Parabéns pela expedição!</div>','cert-janela');
 if(!est.nome){var inp=el('input','campo-nome');inp.placeholder='Escreva seu nome';inp.maxLength=30;inp.setAttribute('aria-label','Seu nome para o certificado');var bn=el('button','bt-principal',icone('check-one','#fff')+'Pronto');bn.onclick=function(){est.nome=inp.value.trim()||'';salva();fechaJanela();abreCertificado();};cx.appendChild(el('p','sub','Qual é o seu nome, explorador?'));cx.appendChild(inp);cx.appendChild(bn);var bp0=el('button','bt-leve',icone('arrow-left',TINTA)+'Depois');bp0.onclick=fechaJanela;cx.appendChild(bp0);inp.focus();return;}
 cx.insertAdjacentHTML('beforeend',certificadoHTML());
 var bts=el('div','linha-bts');var bi=el('button','bt-principal',icone('printer','#fff')+'Imprimir');bi.onclick=function(){var n=el('div');n.innerHTML=certificadoHTML();imprime(n);};bts.appendChild(bi);
  var bf=el('button','bt-leve',icone('close-one',C.coral)+'Fechar');bf.onclick=fechaJanela;bts.appendChild(bf);cx.appendChild(bts);
}

/* ======================================================================
   AJUSTES
   ====================================================================== */
function telaAjustes(){
 var a=$('ajustes');a.innerHTML='';
 a.appendChild(el('h2','titulo-tela',icone('setting-two',C.ceu)+'Ajustes'));
 a.appendChild(el('p','texto-tela','Para a professora ou para quem joga. Nada aqui tem pontos, tempo ou ranking: a expedição é no seu ritmo.'));
 var lista=el('div','ajustes');
 function chave(ic,t,sub,k,fn){var b=el('button','ajuste',icone(ic,C.ceu)+'<div class="txt">'+t+'<small>'+sub+'</small></div><span class="chave"></span>');b.setAttribute('role','switch');b.setAttribute('aria-checked',String(!!est[k]));b.onclick=function(){est[k]=!est[k];salva();aplicaAjustes();b.setAttribute('aria-checked',String(!!est[k]));if(fn)fn();if(k==='som'&&est.som)tom(SOM.certo);};lista.appendChild(b);}
 chave('volume-up','Sons','Toques curtos ao acertar. Começa desligado.','som');
 chave('magic','Animações','Barquinho, confete e movimentos. Desligue se incomodar.','anim');
 chave('projector','Modo turma','Letras maiores para projetar no quadro.','turma');
 chave('unlock','Todas as paradas abertas','Deixa escolher qualquer parada, sem precisar seguir a ordem.','livre');
 var nome=el('div','ajuste',icone('user',C.ceu)+'<div class="txt">Nome do explorador<small>Aparece no mapa e no certificado.</small></div>');var inp=el('input','campo-nome');inp.value=est.nome||'';inp.placeholder='Nome';inp.maxLength=30;inp.style.fontSize='18px';inp.style.width='150px';inp.setAttribute('aria-label','Nome do explorador');inp.onchange=function(){est.nome=inp.value.trim();salva();};nome.appendChild(inp);lista.appendChild(nome);
 var rec=el('button','ajuste perigo',icone('refresh',C.coral)+'<div class="txt">Recomeçar a expedição<small>Apaga as paradas concluídas deste computador.</small></div>');rec.onclick=function(){var cx=janela('<div class="carimbo-c" style="--cor-selo:'+C.coral+'">'+icone('refresh',C.coral)+'</div><h2>Recomeçar?</h2><p class="sub">As paradas concluídas e o nome serão apagados deste computador.</p>');var l=el('div','linha-bts');var s=el('button','bt-principal',icone('refresh','#fff')+'Sim, recomeçar');s.style.background='linear-gradient(180deg,#F08A6E,'+C.coral+')';s.style.boxShadow='0 7px 0 #B04A33';s.onclick=function(){est.feitas=[];est.nome='';est.ultimaPos=null;salva();fechaJanela();mostra('mapa');};var n=el('button','bt-leve',icone('arrow-left',TINTA)+'Não');n.onclick=fechaJanela;l.appendChild(s);l.appendChild(n);cx.appendChild(l);};lista.appendChild(rec);
 a.appendChild(lista);
 a.appendChild(el('p','texto-tela','Ícones IconPark (Apache-2.0). Fontes das informações na aba Fontes do caderno de campo. Veja CREDITOS.md.'));
}

/* ======================================================================
   LIGAÇÕES
   ====================================================================== */
$('btInicio').onclick=function(){mostra('mapa');};$('btMapa').onclick=function(){mostra('mapa');};$('btCaderno').onclick=function(){mostra('caderno');};$('btAjustes').onclick=function(){mostra('ajustes');};
$('btVoltar').onclick=function(){mostra('mapa');};
$('btLivro').onclick=function(){abreCadernoJanela(J.p?J.p.aba:'visao');};
$('btOuvir').onclick=function(){fala(J.textoOuvir||'');};
$('janela').addEventListener('click',function(e){if(e.target===$('janela'))fechaJanela();});
document.addEventListener('keydown',function(e){if(e.key==='Escape')fechaJanela();});
document.querySelector('.capi-mini').innerHTML=capi();
['btMapa','btCaderno','btAjustes'].forEach(function(id,n){$(id).insertAdjacentHTML('afterbegin',icone(['map-draw','book-open','setting-two'][n],[C.rio,C.sol,'#64707F'][n]));});
mostra('mapa');
