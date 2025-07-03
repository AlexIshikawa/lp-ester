# Landing Page Boilerplate

Um boilerplate moderno e responsivo para landing pages usando HTML5 semântico, SASS e JavaScript vanilla, configurado com Vite.

## 🚀 Características

- **HTML5 Semântico**: Estrutura acessível e SEO-friendly
- **SASS Moderno**: Preprocessador CSS com sintaxe `@use`/`@forward` e API moderna
- **JavaScript Modular**: Código organizado em módulos ES6+
- **Vite**: Build tool moderno com hot reload
- **Responsivo**: Design que funciona em todos os dispositivos
- **Acessibilidade**: Componentes acessíveis e navegação por teclado
- **Performance**: Otimizações de carregamento e lazy loading

## 🔧 Tecnologias Utilizadas

- **Vite 5.x** - Build tool moderno
- **Sass** - Preprocessador CSS com API moderna
- **JavaScript ES6+** - Módulos nativos
- **HTML5** - Semântico e acessível
- **Proxima Nova & Roboto** - Fontes profissionais
- **Cores personalizadas** - Sistema de design escalável

## 📁 Estrutura do Projeto

```
├── index.html              # Página principal
├── package.json           # Dependências e scripts
├── vite.config.js         # Configuração do Vite
├── src/
│   ├── scss/
│   │   ├── main.scss      # Arquivo principal de estilos
│   │   ├── _index.scss    # Forward de todos os partials
│   │   ├── _variables.scss # Variáveis CSS/SCSS
│   │   ├── _mixins.scss   # Mixins reutilizáveis
│   │   └── _reset.scss    # Reset CSS
│   └── js/
│       ├── main.js        # Arquivo principal JavaScript
│       └── modules/
│           ├── navigation.js      # Navegação e menu mobile
│           ├── smoothScroll.js    # Scroll suave
│           ├── formHandler.js     # Manipulação de formulários
│           ├── animationObserver.js # Animações on scroll
│           └── utils.js           # Utilitários
└── dist/                  # Pasta de build (gerada automaticamente)
```

## 🛠️ Instalação

1. **Clone ou baixe o boilerplate**
2. **Instale as dependências:**
   ```bash
   npm install
   ```

## 📝 Scripts Disponíveis

- `npm run dev` - Inicia o servidor de desenvolvimento
- `npm run build` - Gera build de produção
- `npm run preview` - Visualiza o build de produção

## 🎨 Personalização

### Cores e Variáveis
Edite o arquivo `src/scss/_variables.scss` para personalizar:
- Cores da marca (atualmente usando `#FF6B4D`)
- Tipografia (Proxima Nova + Roboto)
- Espaçamentos
- Breakpoints

### Seções da Landing Page
A landing page inclui:
- **Header**: Navegação fixa com menu mobile
- **Hero**: Seção principal com call-to-action
- **Features**: Apresentação de recursos/benefícios
- **CTA**: Formulário de contato/conversão
- **Footer**: Rodapé com links

### Módulos JavaScript
- **Navigation**: Menu mobile e navegação
- **SmoothScroll**: Scroll suave entre seções
- **FormHandler**: Validação e envio de formulários
- **AnimationObserver**: Animações na entrada da viewport
- **Utils**: Funções utilitárias

## 🌐 Recursos Incluídos

### Acessibilidade
- Navegação por teclado
- Textos alternativos
- Atributos ARIA
- Suporte a leitores de tela
- Redução de movimento para usuários sensíveis

### Performance
- Lazy loading de imagens
- Preload de recursos críticos
- Otimização de fontes
- Compressão de assets

### SEO
- Meta tags essenciais
- Open Graph e Twitter Cards
- Estrutura semântica
- Schema markup pronto

## 🔧 Configuração do Vite

O arquivo `vite.config.js` está configurado para:
- Processar SCSS automaticamente com API moderna
- Otimizar assets para produção
- Gerar build na pasta `dist/`
- Servidor de desenvolvimento na porta 3000

## 📱 Responsividade

Breakpoints configurados:
- Mobile: < 640px
- Tablet: 640px - 1024px
- Desktop: > 1024px
- Large: > 1280px

## 🎯 Próximos Passos

1. **Personalize o conteúdo** no `index.html`
2. **Ajuste as cores** em `_variables.scss`
3. **Configure seu formulário** em `formHandler.js`
4. **Adicione suas imagens** e atualize os caminhos
5. **Implemente sua API** para o formulário de contato

## 🚀 Deploy

Para fazer deploy:
1. Execute `npm run build`
2. Suba a pasta `dist/` para seu servidor
3. Configure seu domínio e SSL

## 📦 Extensões Recomendadas

- Adicionar animações com bibliotecas como AOS ou Lottie
- Implementar analytics (Google Analytics, GTM)
- Adicionar chat/suporte ao cliente
- Integrar com CMS headless
- Implementar PWA features

## 🔄 Atualizações Recentes

- ✅ **Sass Moderno**: Migração para `@use`/`@forward`
- ✅ **API Moderna**: Configuração atualizada do Vite
- ✅ **Cores Personalizadas**: Sistema com `#FF6B4D`
- ✅ **Fontes Premium**: Proxima Nova + Roboto
- ✅ **Zero Warnings**: Código limpo e future-proof

## 🤝 Contribuição

Sinta-se à vontade para contribuir com melhorias:
1. Fork o projeto
2. Crie uma branch para sua feature
3. Commit suas mudanças
4. Push para a branch
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo LICENSE para mais detalhes.

---

**Desenvolvido com ❤️ para criar landing pages modernas e eficientes!** 