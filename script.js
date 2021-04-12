window.onload = function(){  // Carrega os primeiros comandos
    iniciar();			// Inicializa os primeiros comandos e variaveis
    setInterval(principal, 1000/ 40);  // Roda o jogo dentro do laço
}

var folhaDesenho = document.getElementById("folha");
    var areaDesenho = folhaDesenho.getContext("2d");

function iniciar(){
// Apagar os 'var' pois são variaveis globais usadas em outras funções
 larguraCampo = 600;
 alturaCampo = 500;
 espessuraRede = 5;

 diametroBola = 10;

 espessuraRaquete = 11;
 alturaRaquete = 100;

 efeitoRaquete = 0.3;
 velocidadeJogador2 = 4;


 posicaoJogador1 = posicaoJogador2 = 40;
 posicaoBolaX = posicaoBolaY = 10;
 velocidadeBolaPosicaoX = velocidadeBolaPosicaoY = 5;
 pontuacaoJogador1 = pontuacaoJogador2 = 0;

//movimentação do mouse, função padrão do javascript
folhaDesenho.addEventListener('mousemove', function(e){
    //eixo y
    posicaoJogador1 = e.clientY - alturaRaquete/2;
});
}

function principal(){
desenho();
calcular();
}

function desenho(){
// Desenho Campo
areaDesenho.fillStyle = "#286047"; //cor verde
areaDesenho.fillRect(0, 0, larguraCampo, alturaCampo);

// Desenho rede
areaDesenho.fillStyle = "#ffffff";
areaDesenho.fillRect(larguraCampo/2 - espessuraRede/2, 0, espessuraRede, alturaCampo);

// Desenho da raquete
//raquete 1
areaDesenho.fillRect(0, posicaoJogador1, espessuraRaquete,alturaRaquete); 
//raquete 2
areaDesenho.fillRect(larguraCampo - espessuraRaquete, posicaoJogador2, espessuraRaquete, alturaRaquete); 
}

function calcular(){
// Calculos e lógicas

// Finalizar o jogo
if (pontuacaoJogador1 == 5  || pontuacaoJogador2 == 5) {
areaDesenho.fillText("FIM DE JOGO!!", 310, 50);
posicaoBolaX = posicaoBolaY = 0;

folhaDesenho.addEventListener('mousemove', function(e){
//parar a movimentação da função JS e do jogador 2
posicaoJogador1 = 0;
velocidadeJogador2 = 0;
});
}
// Escrever a pontuação dos jogadores
areaDesenho.fillText("Jogador : " + pontuacaoJogador1 + " pontos", 100, 100);
areaDesenho.fillText("BOT : " + pontuacaoJogador2 + " pontos", larguraCampo -200, 100);

// Desenho da bola
areaDesenho.fillRect(posicaoBolaX - diametroBola/2, posicaoBolaY - diametroBola/2, diametroBola, diametroBola);

// Movimentação da bola
posicaoBolaX = posicaoBolaX + velocidadeBolaPosicaoX; 
posicaoBolaY = posicaoBolaY + velocidadeBolaPosicaoY;

// Verifica lateral superior para rebater a bola
// Quando tenta ultrapassar o eixo e quando ainda nao tem incrementação pela velocidade de posição
if(posicaoBolaY < 0 && velocidadeBolaPosicaoY < 0){ 
velocidadeBolaPosicaoY = - velocidadeBolaPosicaoY;
}

// Verifica lateral inferior
// Quando a posicao é maior que o limite do height e tenta incrementar para descida
if(posicaoBolaY > alturaCampo && velocidadeBolaPosicaoY > 0){
velocidadeBolaPosicaoY = - velocidadeBolaPosicaoY;
}

// Verifica se o jogador 2 fez um ponto
if(posicaoBolaX < 0){ 

// Se a bola for maior que a posição do jogador, porém não ser maior que a posição dele com a altura da raquete
if(posicaoBolaY > posicaoJogador1 && posicaoBolaY < posicaoJogador1 + alturaRaquete ){
    
// Rebater a bola
    velocidadeBolaPosicaoX = -velocidadeBolaPosicaoX;

// Efeito quando bate na ponta
// Se a bola for no meio, irá se igualar com o parenteses, torando 0 a mult e não ter efeito
    var diferencaY = posicaoBolaY - (posicaoJogador1 + alturaRaquete/2); 
    velocidadeBolaPosicaoY = diferencaY * efeitoRaquete; // Subir mais do que avançar na horizontal
}else{
// Ponto do jogador 2
pontuacaoJogador2++;

// Colocar a bola no centro
continuar();
}
}

// Verifica se o jogador 1 fez ponto
if(posicaoBolaX > larguraCampo){
if (posicaoBolaY > posicaoJogador2 && posicaoBolaY < posicaoJogador2 + alturaRaquete) {
    
// Rebater a bola
    velocidadeBolaPosicaoX = -velocidadeBolaPosicaoX;

// Efeito quando bate na ponta
    var diferencaY = posicaoBolaY - (posicaoJogador2 + alturaRaquete/2);
    velocidadeBolaPosicaoY = diferencaY * efeitoRaquete;
}else{
// Pontos do jogador 1
    pontuacaoJogador1++;

// Colocar no centro
    continuar();
}
}
// Atualiza posição do jogador 2
if(posicaoJogador2 + alturaRaquete/2 < posicaoBolaY){
// Se tiver para cima de onde a bola vem
posicaoJogador2 = posicaoJogador2 + velocidadeJogador2;
}else{
// Se tiver para baixo de onde a bola vem
posicaoJogador2 = posicaoJogador2 - velocidadeJogador2;
}

function continuar(){
posicaoBolaX = larguraCampo /2;
posicaoBolaY = larguraCampo /2;
velocidadeBolaPosicaoX = -velocidadeBolaPosicaoX;
velocidadeBolaPosicaoY = 3;
}
}		