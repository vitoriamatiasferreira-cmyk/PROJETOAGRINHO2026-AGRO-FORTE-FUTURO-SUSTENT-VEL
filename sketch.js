<!DOCTYPE html>
<html lang="en">
  <head>
 <meta charset="UTF-8">
  <title>Agro Forte: Futuro Sustentável</title>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/p5.js/1.9.4/p5.min.js"></script>
  <style>
    body { margin: 0; background: #0f2a1a; font-family: Arial, sans-serif; text-align: center; color: #fff; }
    h1 { margin: 10px; color: #4ade80; }
    canvas { display: block; margin: 0 auto; border: 4px solid #4ade80; border-radius: 12px; }
    .info { position: absolute; top: 10px; left: 10px; background: rgba(0,0,0,0.7); padding: 10px; border-radius: 8px; }
  </style>
</head>
<body>
  <h1>🌱 Agro Forte: Futuro Sustentável 🌾</h1>
  <div class="info" id="info"></div>

  <script>
    let farm = [];
    let scoreProducao = 50;
    let scoreSustentabilidade = 50;
    let dinheiro = 200;
    let ano = 2026;
    let tempo = 0;

    let plantas = []; // {x, y, tipo, maturidade}
    let arvores = [];
    let poluentes = [];

    const tiposPlantas = [
      {nome: "Milho", prod: 8, sust: -3, cor: "#facc15"},
      {nome: "Soja", prod: 6, sust: -1, cor: "#84cc16"},
      {nome: "Café", prod: 10, sust: -5, cor: "#854d0e"},
      {nome: "Agrofloresta", prod: 4, sust: 8, cor: "#22c55e"}
    ];

    function setup() {
      createCanvas(800, 500);
      
      // Cria campos
      for (let i = 0; i < 6; i++) {
        farm.push({
          x: 80 + (i % 3) * 180,
          y: 120 + Math.floor(i / 3) * 140,
          ocupado: false,
          tipo: null
        });
      }
    }

    function draw() {
      background(34, 139, 34); // verde fazenda
      
      // Céu
      fill(135, 206, 235);
      rect(0, 0, width, 100);
      
      // Sol
      fill(255, 220, 0);
      circle(650, 80, 60);
      
      // Terra
      fill(139, 69, 19);
      rect(0, 380, width, height - 380);
      
      // Desenhar campos
      for (let campo of farm) {
        fill(campo.ocupado ? "#4d7c0f" : "#8b5a2b");
        rect(campo.x, campo.y, 140, 100, 12);
        
        if (campo.ocupado && campo.tipo) {
          let p = tiposPlantas.find(t => t.nome === campo.tipo);
          fill(p.cor);
          rect(campo.x + 30, campo.y + 20, 80, 60, 8);
          fill(255);
          textAlign(CENTER);
          textSize(14);
          text(campo.tipo, campo.x + 70, campo.y + 85);
        }
      }
      
      // Desenhar árvores
      for (let arv of arvores) {
        fill(34, 100, 34);
        triangle(arv.x, arv.y, arv.x-25, arv.y+50, arv.x+25, arv.y+50);
        fill(139, 69, 19);
        rect(arv.x-8, arv.y+45, 16, 25);
      }
      
      // Desenhar plantas extras (efeito visual)
      for (let p of plantas) {
        fill(p.cor);
        circle(p.x, p.y, 25 + p.maturidade * 8);
        fill(34, 100, 34);
        circle(p.x - 10, p.y - 15, 12);
      }
      
      // Poluentes (fumaça vermelha se desbalanceado)
      for (let pol of poluentes) {
        fill(255, 50, 50, 120);
        ellipse(pol.x, pol.y, 40, 25);
      }
      
      // HUD
      fill(255);
      textAlign(LEFT);
      textSize(18);
      text(`💰 Dinheiro: R$ ${dinheiro}`, 20, 40);
      text(`📈 Produção: ${scoreProducao}%`, 20, 65);
      text(`♻️🌳 Sustentabilidade: ${scoreSustentabilidade}%`, 20, 90);
      text(`📅 Ano: ${ano}`, 620, 40);
      
      // Barra de equilíbrio
      let equilibrio = (scoreProducao + scoreSustentabilidade) / 2;
      fill(255, 215, 0);
      rect(250, 25, equilibrio * 3, 20);
      fill(255);
      text("Equilíbrio", 280, 20);
      
      tempo++;
      if (tempo % 120 === 0) { // a cada ~2 segundos
        atualizarJogo();
      }
      
      // Game Over / Vitória
      if (scoreSustentabilidade <= 10) {
        fill(200, 0, 0);
        textSize(48);
        textAlign(CENTER);
        text("🌍 COLAPSO AMBIENTAL", width/2, height/2);
      }
      if (scoreProducao <= 10) {
        fill(200, 0, 0);
        textSize(48);
        textAlign(CENTER);
        text("💸 FALÊNCIA", width/2, height/2);
      }
      if (equilibrio > 85 && ano > 2035) {
        fill(0, 255, 100);
        textSize(42);
        textAlign(CENTER);
        text("🎉 FUTURO SUSTENTÁVEL ALCANÇADO!", width/2, height/2);
      }
    }

    function atualizarJogo() {
      ano++;
      
      // Atualiza produção e sustentabilidade
      let prodTotal = 0;
      let sustTotal = 0;
      let camposOcupados = 0;
      
      for (let campo of farm) {
        if (campo.ocupado && campo.tipo) {
          let tipo = tiposPlantas.find(t => t.nome === campo.tipo);
          prodTotal += tipo.prod;
          sustTotal += tipo.sust;
          camposOcupados++;
        }
      }
      
      if (camposOcupados > 0) {
        scoreProducao = constrain(scoreProducao + (prodTotal / camposOcupados) - 2, 0, 100);
        scoreSustentabilidade = constrain(scoreSustentabilidade + (sustTotal / camposOcupados) - 1, 0, 100);
      }
      
      // Ganhar dinheiro
      dinheiro += Math.floor(scoreProducao * 1.2);
      
      // Efeitos visuais
      plantas = [];
      poluentes = [];
      
      for (let campo of farm) {
        if (campo.ocupado) {
          let tipo = tiposPlantas.find(t => t.nome === campo.tipo);
          plantas.push({
            x: campo.x + 70,
            y: campo.y + 50,
            cor: tipo.cor,
            maturidade: random(0.6, 1.2)
          });
          
          if (tipo.sust < -3) {
            poluentes.push({x: campo.x + 100, y: campo.y + 30});
          }
        }
      }
      
      // Árvores ajudam a recuperar sustentabilidade
      if (arvores.length > 0) {
        scoreSustentabilidade = constrain(scoreSustentabilidade + arvores.length * 1.5, 0, 100);
      }
    }

    function mousePressed() {
      // Clique nos campos
      for (let i = 0; i < farm.length; i++) {
        let c = farm[i];
        if (mouseX > c.x && mouseX < c.x + 140 && 
            mouseY > c.y && mouseY < c.y + 100) {
          
          if (!c.ocupado) {
            // Menu de plantio (simples)
            let escolha = prompt("O que plantar?\n1-Milho\n2-Soja\n3-Café\n4-Agrofloresta");
            if (escolha) {
              let idx = parseInt(escolha) - 1;
              if (idx >= 0 && idx < tiposPlantas.length) {
                c.ocupado = true;
                c.tipo = tiposPlantas[idx].nome;
                dinheiro -= 40;
              }
            }
          } else {
            // Colher
            if (confirm("Colher este campo?")) {
              let tipo = tiposPlantas.find(t => t.nome === c.tipo);
              dinheiro += tipo.prod * 25;
              c.ocupado = false;
              c.tipo = null;
            }
          }
          return;
        }
      }
      
      // Botão de plantar árvores (área lateral)
      if (mouseX > 650 && mouseY > 150 && mouseY < 300 && dinheiro >= 80) {
        arvores.push({
          x: 680 + random(-30, 30),
          y: 200 + random(-40, 40)
        });
        dinheiro -= 80;
        scoreSustentabilidade = constrain(scoreSustentabilidade + 8, 0, 100);
      }
      
      // Botão de usar adubo orgânico (melhora um pouco)
      if (mouseX > 650 && mouseY > 320 && mouseY < 380 && dinheiro >= 30) {
        scoreSustentabilidade = constrain(scoreSustentabilidade + 12, 0, 100);
        dinheiro -= 30;
      }
    }

    function keyPressed() {
      if (key === 'r' || key === 'R') {
        // Reset
        location.reload();
      }
    }
  </script>

  <p style="margin-top:10px; color:#ddd;">
    <strong>Como jogar:</strong> Clique nos campos marrons para plantar → Colha para ganhar dinheiro.<br>
    Plante Árvores (clique na direita) e use Adubo Orgânico para manter o equilíbrio.<br>
    Mantenha Produção e Sustentabilidade altos! <strong>Tecla R</strong> para reiniciar.
  </p>
</body>
</html>

