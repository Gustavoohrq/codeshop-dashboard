# CodeShop Dashboard

Este é um aplicativo web construído com Next.js, NextAuth.js, e JWT para fornecer uma interface simples e eficiente para gerenciar uma loja online. 

## Funcionalidades Principais

### Estatísticas de Vendas

Na página principal do Dashboard, você encontrará estatísticas de vendas em tempo real, proporcionando insights valiosos sobre o desempenho da sua loja. Os gráficos e métricas apresentados ajudam a compreender o volume de vendas, tendências de consumo e outras informações importantes para tomar decisões estratégicas.

### Gerenciamento de Produtos

A página de produtos oferece ferramentas completas para cadastrar, editar e remover produtos do catálogo da loja. Com uma interface intuitiva, é fácil adicionar novos produtos, atualizar informações existentes e manter o inventário sempre atualizado.

### Gerenciamento de Usuários

Na página de usuários, é possível visualizar e administrar os usuários da plataforma. Com o NextAuth.js e JWT, você pode controlar o acesso de usuários com diferentes níveis de permissão, garantindo a segurança dos dados da sua loja.

## Como Utilizar

1. **Login**: Faça login na aplicação utilizando suas credenciais de usuário.

2. **Estatísticas de Vendas**: Na página inicial, você terá acesso às estatísticas de vendas em tempo real, apresentadas de forma clara e visualmente atraente.

3. **Gerenciamento de Produtos**: Acesse a página de produtos para adicionar, editar ou remover produtos do catálogo da sua loja. Utilize os formulários intuitivos para inserir informações detalhadas sobre cada produto.

4. **Gerenciamento de Usuários**: Na página de usuários, você pode visualizar e administrar os usuários da plataforma. Controle o acesso de usuários e atribua diferentes níveis de permissão conforme necessário.

## Tecnologias Utilizadas

- **Next.js**: Um framework React que facilita a construção de aplicativos web modernos e eficientes.

- **NextAuth.js**: Uma biblioteca de autenticação para Next.js que simplifica a implementação de autenticação com várias estratégias, incluindo JWT.


## Como Executar Localmente

Para executar o Dashboard de Loja Online localmente, siga estas etapas:

1. **Clone o Repositório**: Clone este repositório para o seu ambiente local utilizando o seguinte comando:

   ```
   git clone https://github.com/Gustavoohrq/codeshop-dashboard.git
   ```

2. **Instale as Dependências**: Navegue até o diretório do projeto e instale as dependências necessárias utilizando o npm ou yarn:

   ```
   cd codeshop-dashboard
   npm install
   ```

   ou

   ```
   cd codeshop-dashboard
   yarn
   ```

3. **Configure as Variáveis de Ambiente**: Crie um arquivo `.env.local` na raiz do projeto e configure as variáveis de ambiente necessárias, como as chaves secretas para NextAuth.js e outras configurações específicas do ambiente.

4. **Inicie o Servidor de Desenvolvimento**: Execute o seguinte comando para iniciar o servidor de desenvolvimento:

   ```
   npm run dev
   ```

   ou

   ```
   yarn dev
   ```

5. **Acesse o Aplicativo**: Abra o navegador e acesse o aplicativo em `http://localhost:3000`. Você será redirecionado para a página de login, onde poderá fazer login com suas credenciais de usuário.

Com estas instruções, você estará pronto para explorar e utilizar o Dashboard de Loja Online em seu ambiente local!

