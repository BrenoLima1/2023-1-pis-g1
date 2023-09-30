Feature('Verificação do Valor no Carrinho');

Scenario('Verificar se o valor "1" é exibido ao adicionar um produto ao carrinho', ({ I }) => {
  I.amOnPage('http://localhost/2023-1-pis-g1/app/html/produto.html#26');
  I.click('Adicionar ao carrinho');
  I.wait(2);
  I.see('1', { css: '.badge' });
});
