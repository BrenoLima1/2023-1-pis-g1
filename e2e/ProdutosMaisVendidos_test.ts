Feature('Teste de Página Inicial');

Scenario('Verificar elementos na página inicial', ({ I }) => {
  I.amOnPage('http://localhost/2023-1-pis-g1/app/html/index.html');

  I.see('Cefet Shop');
  I.see('Bem-vindo');
  I.see('Produtos mais vendidos');
  I.see('Bandeira com imagem do lobo, mascote da Alcateia.');
  I.see('Uma pulseira azul estilosa feita a mão com detalhe preto.');
  I.see('Boné azul estiloso com imagem representando o mascote da Alcateia, o nosso amado lobo.');
  I.see('Camisa preta com estilo da Atlética.');
  I.see('Jaqueta personalizada Preto e amarelo, com bordado, feita para a Atlética CEFET.');
  I.see('AQUELE JALECO QUE TODO O VETERANO DO CEFET ORGULHA-SE TANTO DE TER VESTIDO. BRIM PROFISSIONAL');
  I.see('Ver mais');

});
