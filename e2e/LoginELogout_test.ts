Scenario('Verificar se alertas são exibidos em tentativas falhas de login.', ({ I }) => {
  I.amOnPage('http://localhost/2023-1-pis-g1/app/html/login.html');

  I.click('#entrar');
  I.acceptPopup();

  I.click('#login');
  I.fillField('#login', '2011123GSIS');
  I.click('#entrar');
  I.acceptPopup();

  I.fillField('#senha', '123');
  I.click('#entrar');
  I.seeInCurrentUrl('http://localhost/2023-1-pis-g1/app/html/carrinho.html');

  I.moveCursorTo('#botaoEntrar');
  I.waitForElement('a', 5);
  I.click('a');

  I.seeInCurrentUrl('http://localhost/2023-1-pis-g1/app/html/aluno.html');
  I.see('Olá, José');
  I.see('Matrícula: 2011123GSIS');
  I.see('Nome: José Carlos Augusto');
  I.see('Saldo Atual: $C 0.00');
  I.see('Valor total comprado por ano ($C)');
  I.moveCursorTo('#botaoMenu');
  I.waitForElement('#sair', 5);
  I.see('Sair');
  I.click('#sair');
  I.seeInCurrentUrl('http://localhost/2023-1-pis-g1/app/html/index.html');
  I.see('Entrar');
});
