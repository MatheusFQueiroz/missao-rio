/* Cenas em SVG do jogo (mapa das partes do rio, rio doente e mapa da expedição). Desenhos próprios. */
var SVG1='<svg viewBox="0 0 1000 520">'+
 '<rect width="1000" height="520" fill="#CFEBB8"/>'+
 '<g fill="#8CC56B"><circle cx="300" cy="410" r="20"/><circle cx="330" cy="430" r="16"/><circle cx="520" cy="430" r="18"/><circle cx="555" cy="448" r="14"/><circle cx="720" cy="430" r="19"/><circle cx="760" cy="95" r="17"/><circle cx="790" cy="110" r="13"/><circle cx="470" cy="160" r="15"/><circle cx="90" cy="420" r="18"/></g>'+
 '<path d="M150,170 C200,40 520,10 700,30 C860,50 905,200 905,300 C905,420 600,470 420,430 C250,400 120,320 150,170 Z" fill="#2F9E44" fill-opacity=".10" stroke="#2A3081" stroke-width="4" stroke-dasharray="14 10"/>'+
 '<path d="M910,0 C890,150 930,300 900,520 L1000,520 L1000,0 Z" fill="#4DABF7"/>'+
 '<text x="965" y="260" fill="#fff" font-size="26" font-weight="bold" text-anchor="middle" transform="rotate(90 965 260)" font-family="Fredoka, Nunito, sans-serif">MAR</text>'+
 '<polygon points="30,340 140,110 200,190 255,95 350,340" fill="#A88B6E"/>'+
 '<polygon points="140,110 122,148 134,141 146,150 158,141 169,148" fill="#fff"/><polygon points="255,95 232,135 244,128 257,138 270,135" fill="#fff"/>'+
 '<g fill="none" stroke-linecap="round">'+
 '<path d="M420,55 C430,140 400,200 470,280" stroke="#1971C2" stroke-width="12"/><path d="M420,55 C430,140 400,200 470,280" stroke="#74C0FC" stroke-width="6"/>'+
 '<path d="M640,30 C600,120 650,220 606,352" stroke="#1971C2" stroke-width="13"/><path d="M640,30 C600,120 650,220 606,352" stroke="#74C0FC" stroke-width="7"/>'+
 '<path d="M195,212 C300,300 360,200 470,280 S640,380 720,320 S860,300 940,335" stroke="#1971C2" stroke-width="22"/><path d="M195,212 C300,300 360,200 470,280 S640,380 720,320 S860,300 940,335" stroke="#74C0FC" stroke-width="12"/></g>'+
 '<circle cx="195" cy="212" r="9" fill="#1971C2"/></svg>';

function meses(seco){var s='<svg class="ico" viewBox="0 0 134 40">';for(var m=0;m<12;m++){var d=seco.indexOf(m)>=0;s+='<rect x="'+(m*11+2)+'" y="'+(d?22:4)+'" width="9" height="'+(d?6:30)+'" rx="2" fill="'+(d?'#E9C46A':'#1C7ED6')+'"/>';}return s+'<line x1="0" y1="36" x2="134" y2="36" stroke="#2A3081" stroke-width="2"/></svg>';}
var ICO={
 perene:meses([]),
 intermitente:meses([4,5,6,7,8,9]),
 planalto:'<svg class="ico" viewBox="0 0 134 60"><polygon points="0,60 0,14 54,14 54,40 134,46 134,60" fill="#8CC56B"/><path d="M0,13 L54,13" stroke="#1C7ED6" stroke-width="6"/><path d="M55,14 L57,40" stroke="#74C0FC" stroke-width="7"/><path d="M57,41 L134,46" stroke="#1C7ED6" stroke-width="6"/><circle cx="57" cy="42" r="6" fill="#fff" opacity=".8"/></svg>',
 planicie:'<svg class="ico" viewBox="0 0 134 60"><polygon points="0,60 0,40 134,40 134,60" fill="#8CC56B"/><path d="M0,40 L134,40" stroke="#1C7ED6" stroke-width="7"/><path d="M50,32 L84,32 L77,39 L57,39 Z" fill="#E8590C"/><path d="M67,32 L67,14 L79,30 Z" fill="#fff" stroke="#2A3081" stroke-width="2"/></svg>'};

var HOTS=[['lixo',282,300],['esgoto',520,200],['margem',690,445],['agro',885,122],['agua',448,412]];
function peixe(x,y,c,n){return '<g id="peixe'+n+'" style="display:none"><ellipse cx="'+x+'" cy="'+y+'" rx="18" ry="9" fill="'+c+'"/><polygon points="'+(x-16)+','+y+' '+(x-30)+','+(y-9)+' '+(x-30)+','+(y+9)+'" fill="'+c+'"/><circle cx="'+(x+9)+'" cy="'+(y-2)+'" r="2.4" fill="#2A3081"/></g>';}
function arvore(x,y){return '<rect x="'+(x-4)+'" y="'+(y-6)+'" width="8" height="26" fill="#8B5E3C"/><circle cx="'+x+'" cy="'+(y-16)+'" r="20" fill="#2F9E44"/><circle cx="'+(x-12)+'" cy="'+(y-6)+'" r="13" fill="#37B24D"/>';}
function lixeira(x,c){return '<rect x="'+x+'" y="394" width="24" height="36" rx="3" fill="'+c+'"/><rect x="'+(x-2)+'" y="389" width="28" height="7" rx="2" fill="'+c+'"/>';}
function svg4(){var s='<svg viewBox="0 0 1000 520">'+
 '<rect width="1000" height="170" fill="#BFE3FF"/><circle cx="70" cy="60" r="32" fill="#FFD43B"/>'+
 '<g fill="#fff"><ellipse cx="250" cy="55" rx="46" ry="16"/><ellipse cx="280" cy="45" rx="30" ry="14"/><ellipse cx="650" cy="70" rx="40" ry="14"/></g>'+
 '<rect y="150" width="1000" height="100" fill="#9BD37A"/>'+
 '<g fill="#2F9E44">';
 for(var r=0;r<3;r++)for(var c=0;c<9;c++)s+='<circle cx="'+(808+c*21)+'" cy="'+(166+r*20)+'" r="7"/>';
 s+='</g><g class="s-agro"><rect x="955" y="168" width="22" height="30" rx="3" fill="#7048E8"/><path d="M880,212 C876,222 884,228 880,240" stroke="#9C36B5" stroke-width="7" fill="none"/></g>'+
 '<g class="l-agro" style="display:none"><circle cx="829" cy="176" r="5" fill="#FA5252"/><circle cx="892" cy="196" r="5" fill="#FAB005"/><circle cx="955" cy="176" r="5" fill="#FA5252"/><circle cx="934" cy="206" r="5" fill="#FAB005"/></g>'+
 '<g class="l-esgoto" style="display:none"><rect x="372" y="150" width="112" height="34" rx="5" fill="#E9ECEF" stroke="#868E96" stroke-width="2"/><text x="428" y="173" font-size="15" font-weight="bold" text-anchor="middle" fill="#495057" font-family="Fredoka, Nunito, sans-serif">TRATAMENTO</text></g>'+
 '<rect x="415" y="182" width="26" height="52" fill="#868E96"/><rect x="411" y="226" width="34" height="9" fill="#5C636A"/>'+
 '<path id="rio4" d="M0,232 C200,218 400,246 600,230 S900,222 1000,236 L1000,338 C800,350 600,326 400,342 S100,330 0,340 Z" fill="#8C6D46"/>'+
 '<g class="s-esgoto"><path d="M428,235 L428,252" stroke="#5C4033" stroke-width="10"/><ellipse cx="432" cy="262" rx="44" ry="12" fill="#4A3426" opacity=".8"/></g>'+
 '<g class="l-esgoto" style="display:none"><path d="M428,235 L428,250" stroke="#A5D8FF" stroke-width="8"/></g>'+
 '<g class="s-agro"><ellipse cx="880" cy="258" rx="48" ry="11" fill="#9C36B5" opacity=".55"/></g>'+
 '<g class="s-margem"><ellipse cx="690" cy="322" rx="78" ry="13" fill="#C2A878"/></g>'+
 '<g class="s-lixo"><rect x="132" y="268" width="38" height="15" rx="6" fill="#E03131" transform="rotate(-12 151 275)"/><rect x="164" y="263" width="10" height="7" fill="#fff" transform="rotate(-12 151 275)"/><ellipse cx="205" cy="292" rx="22" ry="11" fill="#F8F9FA" stroke="#ADB5BD" stroke-width="2"/><rect x="238" y="262" width="17" height="24" rx="3" fill="#ADB5BD"/></g>';
 [[90,302,'#FF922B'],[330,262,'#FAB005'],[560,300,'#FF922B'],[790,270,'#FAB005'],[960,300,'#FF922B']].forEach(function(p,i){s+=peixe(p[0],p[1],p[2],i+1);});
 s+='<path d="M0,340 C100,330 300,350 400,342 S800,350 1000,338 L1000,520 L0,520 Z" fill="#A9DB86"/>'+
 '<g class="s-margem"><path d="M615,342 C650,360 730,360 770,342 L760,392 C720,400 650,400 620,392 Z" fill="#B08968"/><rect x="630" y="368" width="14" height="10" fill="#7F5539"/><rect x="684" y="378" width="14" height="10" fill="#7F5539"/><rect x="738" y="366" width="14" height="10" fill="#7F5539"/></g>'+
 '<g class="l-margem" style="display:none">'+arvore(615,378)+arvore(665,392)+arvore(715,378)+arvore(765,392)+'</g>'+
 '<g class="l-lixo" style="display:none">'+lixeira(62,'#1C7ED6')+lixeira(94,'#E03131')+lixeira(126,'#2F9E44')+lixeira(158,'#FAB005')+'</g>'+
 '<polygon points="270,410 335,362 400,410" fill="#E8590C"/><rect x="282" y="408" width="106" height="72" fill="#FFE8CC"/><rect x="300" y="428" width="26" height="52" fill="#B08968"/><rect x="345" y="424" width="28" height="24" fill="#A5D8FF" stroke="#fff" stroke-width="3"/>'+
 '<rect x="388" y="434" width="20" height="8" fill="#868E96"/><rect x="402" y="436" width="7" height="14" fill="#868E96"/>'+
 '<g class="s-agua"><circle cx="405" cy="460" r="4" fill="#4DABF7"/><circle cx="405" cy="475" r="4" fill="#4DABF7"/><ellipse cx="405" cy="496" rx="22" ry="6" fill="#74C0FC"/></g>'+
 '</svg>';return s;}

var ESTS=[[110,96],[310,190],[545,108],[780,205],[560,352],[870,448]];
function caminho(p){var d='M'+p[0][0]+','+p[0][1];for(var i=0;i<p.length-1;i++){var a=p[i-1]||p[i],b=p[i],c=p[i+1],e=p[i+2]||c;
 d+=' C'+(b[0]+(c[0]-a[0])/6).toFixed(1)+','+(b[1]+(c[1]-a[1])/6).toFixed(1)+' '+(c[0]-(e[0]-b[0])/6).toFixed(1)+','+(c[1]-(e[1]-b[1])/6).toFixed(1)+' '+c[0]+','+c[1];}return d;}
function svgMapa(){var d=caminho(ESTS.concat([[985,500]]));
 return '<svg viewBox="0 0 1000 520"><rect width="1000" height="520" fill="#BDE5A8"/>'+
 '<path d="M740,520 C820,470 900,420 1000,350 L1000,520 Z" fill="#4DABF7"/><text x="958" y="438" fill="#fff" font-size="24" font-weight="bold" text-anchor="middle" font-family="Fredoka, Nunito, sans-serif">MAR</text>'+
 '<polygon points="0,250 0,120 60,40 110,10 170,60 230,0 0,0" fill="#A88B6E"/><polygon points="60,40 110,10 170,60 150,72 120,52 90,66" fill="#fff" opacity=".85"/>'+
 '<g fill="#ADB5BD"><rect x="600" y="40" width="34" height="62"/><rect x="640" y="62" width="26" height="40"/><rect x="672" y="30" width="30" height="72"/><rect x="476" y="56" width="26" height="40"/></g>'+
 '<g fill="#fff" opacity=".7"><rect x="606" y="48" width="8" height="8"/><rect x="620" y="48" width="8" height="8"/><rect x="606" y="64" width="8" height="8"/><rect x="678" y="40" width="8" height="8"/><rect x="690" y="56" width="8" height="8"/></g>'+
 '<ellipse cx="520" cy="352" rx="70" ry="30" fill="#74C0FC"/><rect x="590" y="326" width="14" height="56" rx="3" fill="#868E96"/>'+
 '<g fill="#2F9E44"><circle cx="840" cy="170" r="18"/><circle cx="870" cy="190" r="15"/><circle cx="720" cy="250" r="17"/><circle cx="745" cy="268" r="13"/><circle cx="260" cy="300" r="17"/><circle cx="230" cy="320" r="13"/><circle cx="420" cy="440" r="16"/><circle cx="140" cy="430" r="18"/><circle cx="360" cy="100" r="15"/></g>'+
 '<path d="'+d+'" stroke="#1971C2" stroke-width="26" fill="none" stroke-linecap="round"/><path d="'+d+'" stroke="#74C0FC" stroke-width="14" fill="none" stroke-linecap="round"/></svg>';}
