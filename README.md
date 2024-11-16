## 1 - Descrição Geral
> O sistema é um e-commerce desenvolvido em um formato multi-página, com integração ao Stripe para gerenciar pagamentos. A experiência do usuário inclui uma "Sacola Online" (shoppingPage.html) para visualização e manipulação dos itens do carrinho, páginas dedicadas para feedback do pagamento (successPage.html e failedPage.html), e funcionalidades como cálculo de subtotal e total com frete grátis.

## 2 - Estrutura do Projeto
### O site possui as seguintes páginas principais
#### 2.1 shoppingPage.html (Sacola Online)
- Descrição

  > Página que exibe os produtos adicionados ao carrinho e permite ao usuário verificar detalhes de preços e continuar com o processo de compra.

- Elementos Principais
  
  - Listagem de Produtos

    > Exibe os itens adicionados ao carrinho, incluindo imagem, nome, quantidade e preço.

- Resumo do Pedido
  - Mini Tabela com
    - [x] Subtotal: Soma do valor dos itens no carrinho.
    - [x] Frete: Exibido como "Grátis".
    - [x] Total: Soma do subtotal com o frete.

- Botões
  - "Proceder ao Checkout": Direciona para o Stripe Checkout.
  - "Voltar à Página Inicial": Retorna à página principal para continuar explorando os produtos.

#### 2.2 successPage.html (Compra realizada com Sucesso)
- Descrição
  
  > Página exibida quando o pagamento é concluído com sucesso.

- Elementos Principais
    - Mensagem de agradecimento personalizada ao cliente.
    - Botão para retornar à página Principal.
 
#### 2.3 failedPage.html (Erro durante o processo)
- Descrição
  
    > Página exibida quando ocorre um erro durante o processo de pagamento como cancelamento ou queda de Internet.

- Elementos Principais
    - Mensagem informando o erro e orientações para tentar novamente.
    - Botão para retornar à página da Sacola Online.

## 3 - Integração com Stripe
### 3.1 Configuração
- Conta Stripe
  - Configure uma conta no Stripe [https://dashboard.stripe.com/login] e obtenha as chaves de API (Public ou Secret).
  - Inicialize o modo teste na sua conta do Stripe.

### 3.2 Funcionalidades do Checkout
- Descrição
    - Quando o usuário clicar no botão "Proceder ao Checkout", os itens do carrinho serão enviados ao servidor.
    - O servidor cria uma sessão de checkout do Stripe com os itens, valores e URLs de redirecionamento:
       - [x] successPage.html
       - [x] failedPage.html

## 4 - Fluxo do Usuário
- Fluxo
   -  [x] Usuário adiciona produtos ao carrinho na página de produtos.
   -  [x] O usuário acessa a shoppingPage.html para revisar os itens, conferir o subtotal, frete e total.
   -  [x] Ao clicar em "Proceder ao Checkout", o Stripe gerencia a etapa de pagamento.
   -  [x] Após o pagamento, o usuário é redirecionado para successPage.html: Em caso de sucesso e failedPage.html: Em caso de falha.

## 5  - Benefícios do Sistema:
- Fluxo
  - [x] Integração segura e confiável com Stripe.
  - [x] Layout intuitivo e funcional para todas as etapas da compra (Nota: Alguns elementos podem "sumir" em telas menores - recomendo telas 1080px por 1920px)
  - [x] Gerenciamento dinâmico do carrinho utilizando localStorage.
  - [x] Mensagens claras de feedback ao usuário em cada etapa do processo.

### Nota
> [!NOTE]  
> Você precisa abrir uma conta no Stripe, assim você pode pegar as chaves de acesso da API.

### Dica
> [!TIP]
> Como mencionando anteriormente, você pode entrar atrvés desse link oficial do Stripe e criar sua conta [https://dashboard.stripe.com/login]

### Importante
> [!WARNING]  
> Se este projeto te inspirou ou ajudou, seu apoio significaria muito para mim. 💛
