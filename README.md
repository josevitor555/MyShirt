## 1 - Descrição Geral
> Este é um projeto de e-commerce desenvolvido em um formato multi-página, com integração ao Stripe para gerenciar pagamentos. O sistema inclui uma "Sacola Online" (shoppingPage.html) para visualização e manipulação dos itens do carrinho, páginas dedicadas para feedback do pagamento (successPage.html e failedPage.html), e funcionalidades como cálculo de subtotal e total com frete grátis.

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

## 5  - Benefícios do Sistema
- Fluxo
  - [x] Integração segura e confiável com Stripe.
  - [x] Layout intuitivo e funcional para todas as etapas da compra (Nota: Alguns elementos podem "sumir" em telas menores - recomendo telas 1080px por 1920px), pois o site ainda não está completamente responsivo.
  - [x] Gerenciamento dinâmico do carrinho utilizando localStorage.
  - [x] Mensagens claras de feedback ao usuário em cada etapa do processo.

## 6 - Instalando as Dependências do projeto
```
# Entra na pasta do projeto com cd
cd .\myshirts\
```
```
# Instale as depências do projeto
npm install
```

## 7 - Inicializando o TailWind
```
# Abra outra terminal e entra no projeto raiz, rodando o comando para inicializar o tailwind
npm run watch-tailwind
```

## 8 - Tabela de Descontos
O sisteme possui uma tabela de descontos com 30% do valor subtraído do original. 30% é um exemplo, mas você pode alterar.
| #  | Nome do Cupom | Valor |
|----| ------------- | ------------- |
| 1  | DISCONTO30  | 30% OFF |
| 2  | SAVE30  | 30% OFF |
| 3  | PROMO30  | 30% OFF |

<strong> 30% do valor subtraído do original: </stronng> Um desconto padrão de 30% está configurado, o que significa que o preço final de um produto ou serviço será reduzido em 30% do preço original. Por exemplo, se o preço original for R$100, o preço com desconto será R$70 (100 - 30%).

### Nota
> [!NOTE]  
> Estas chaves de API funcionam em modo de teste, mas você precisará adicionar seus dados bancários para ver chaves em modo de produção e começar a aceitar pagamentos.
> Navegue até "Para desenvolvedores" e depois "Chaves da API", e escolhe entre Publicável ou Secreta. </br>
> <strong> Modo de Teste: </strong> Permite realizar transações simuladas pelo checkout do Stripe, sem movimentação de dinheiro real. </br>
> <strong> Modo de Produção: </strong> Habilita transações reais pelo checkout do Stripe. Certifique-se de configurar corretamente antes de utilizá-lo.

### Dica
> [!TIP]
> Como mencionando anteriormente, você pode entrar através deste link oficial do Stripe e criar sua conta [https://dashboard.stripe.com/login]

> [!WARNING]  
> Saiba a Diferença entre "Chave Secreta" e "Chave Publicável" </br>
> <strong> Chave Publicável (Publishable Key): </strong> Essa chave é usada principalmente no front-end e pode ser exposta ao público. Ela permite ações que não envolvem informações sensíveis, como inicializar o Stripe no navegador ou criar elementos de checkout. No entanto, ela não permite acessar ou alterar informações confidenciais. </br>
> <strong> Chave Secreta (Secret Key): </strong> Essa chave é destinada ao uso no back-end e deve ser mantida confidencial. Com ela, você pode executar ações mais críticas, como criar, atualizar ou deletar dados em sua conta Stripe. Por segurança, a chave secreta é exibida apenas uma vez ao ser revelada no painel do Stripe, por isso deve ser armazenada em local seguro.

<div align="center">
  <h1> Buy Me a Coffee! </h1>
  <img src="https://github.com/user-attachments/assets/5afacfc7-fa9d-4456-aa47-2a747aa60b4d" alt="Descrição da imagem" width="200">
  <p> Se este projeto te inspirou ou ajudou, seu apoio significaria muito para mim. 💛 </p>
</div>
