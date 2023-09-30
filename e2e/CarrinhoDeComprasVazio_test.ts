Feature('Verificação de Alerta');

Scenario('Verificar se o alerta "Seu carrinho está vazio" é exibido corretamente', ({ I }) => {
  I.amOnPage('http://localhost/2023-1-pis-g1/app/html/carrinho.html');
  I.acceptPopup();
});
