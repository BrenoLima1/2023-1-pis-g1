Feature('Teste de Página de Produto');

Scenario('Verificar elementos na página de produto', ({ I }) => {
  I.amOnPage('http://localhost/2023-1-pis-g1/app/html/produto.html#6');

  I.see('Bandeira Lobo Alcateia');
  I.see('$C 28.00');
  I.see('20% de desconto!');
  I.see('Período de lançamento: 10/2023');
  I.see('Adicionar ao carrinho');
  I.see('Ir para o Carrinho');
});
