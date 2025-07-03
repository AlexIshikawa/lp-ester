# Changelog

Todas as alterações notáveis neste projeto serão documentadas neste arquivo.

## [1.1.0] - 2024-01-XX

### ✨ Adicionado
- **Sass Moderno**: Migração completa de `@import` para `@use`/`@forward`
- **API Moderna**: Configuração atualizada do Vite para usar `api: 'modern-compiler'`
- **Arquivo Index**: Criado `_index.scss` para organizar melhor os partials
- **Cores Personalizadas**: Sistema de cores com `#FF6B4D` como cor primária
- **Fontes Premium**: Integração com Proxima Nova (principal) e Roboto (secundária)
- **Zero Warnings**: Eliminação completa dos warnings de deprecação do Sass

### 🔄 Alterado
- **Vite Config**: Removida configuração deprecada `additionalData`
- **Estrutura SCSS**: Modernizada para seguir as melhores práticas do Sass
- **Imports de Fonte**: Atualizados para Proxima Nova + Roboto
- **Theme Color**: Alterado para `#FF6B4D` no HTML
- **Preload**: Otimizado para as novas fontes

### 🚀 Melhorado
- **Performance**: Compilação mais rápida com API moderna do Sass
- **Manutenibilidade**: Código mais limpo e future-proof
- **Organização**: Melhor estrutura de arquivos SCSS
- **Documentação**: README atualizado com todas as melhorias

## [1.0.0] - 2024-01-XX

### ✨ Versão Inicial
- **Boilerplate Completo**: Landing page moderna e responsiva
- **HTML5 Semântico**: Estrutura acessível com roles ARIA
- **SASS Modular**: Sistema de variáveis, mixins e componentes
- **JavaScript Modular**: Arquitetura em módulos ES6+
- **Vite**: Build tool moderno com hot reload
- **Responsividade**: Design mobile-first
- **Acessibilidade**: Navegação por teclado e leitores de tela
- **Performance**: Lazy loading e otimizações
- **SEO**: Meta tags e estrutura semântica

### 📦 Módulos JavaScript
- **Navigation**: Menu mobile responsivo
- **SmoothScroll**: Navegação suave entre seções
- **FormHandler**: Validação e envio de formulários
- **AnimationObserver**: Animações on-scroll
- **Utils**: Funções utilitárias

### 🎨 Seções da Landing Page
- **Header**: Navegação fixa com menu mobile
- **Hero**: Seção principal com call-to-action
- **Features**: Apresentação de recursos/benefícios
- **CTA**: Formulário de contato/conversão
- **Footer**: Rodapé com links

---

**Padrão de Versionamento**: [Semantic Versioning](https://semver.org/)
- **MAJOR**: Mudanças incompatíveis na API
- **MINOR**: Funcionalidades adicionadas de forma compatível
- **PATCH**: Correções de bugs compatíveis 