# Guia de Personalização

Este guia mostra como personalizar o boilerplate para suas necessidades específicas.

## 🎨 Personalizando Cores

### 1. Editando as Variáveis de Cor

No arquivo `src/scss/_variables.scss`, você pode alterar as cores principais:

```scss
// Substitua estas cores pelas da sua marca
:root {
  --primary-500: #your-brand-color;
  --primary-600: #your-brand-darker;
  --primary-400: #your-brand-lighter;
}
```

### 2. Exemplo de Personalização

```scss
// Exemplo para uma marca azul
:root {
  --primary-500: #1e40af;
  --primary-600: #1e3a8a;
  --primary-400: #3b82f6;
}

// Exemplo para uma marca vermelha
:root {
  --primary-500: #dc2626;
  --primary-600: #b91c1c;
  --primary-400: #ef4444;
}
```

## 🔧 Header Personalizado

### 1. Design do Header

O header atual utiliza um design flutuante e arredondado com:
- **Posicionamento**: Fixo no topo da página com margem
- **Background**: Vidro fosco (backdrop-filter blur)
- **Logo**: Texto "FERNANDO CICCERO" com fonte Roboto Extra Bold
- **Navegação**: Links horizontais com botão CTA destacado
- **Responsivo**: Menu hamburger em dispositivos móveis

### 2. Personalizando a Logo

Para alterar a logo textual no `index.html`:

```html
<h1 class="nav__logo">SEU NOME<br>AQUI</h1>
```

Para ajustar as propriedades da fonte no CSS:

```scss
.nav__logo {
  font-family: $font-family-secondary; // Roboto
  font-weight: 800; // Extra Bold
  font-size: 36.31px;
  line-height: 0.82; // 82%
  letter-spacing: 0;
  color: white;
}
```

### 3. Modificando a Navegação

Para alterar os itens do menu no `index.html`:

```html
<ul class="nav__menu" role="menubar">
  <li class="nav__item">
    <a href="#secao1" class="nav__link">ITEM 1</a>
  </li>
  <li class="nav__item">
    <a href="#secao2" class="nav__link">ITEM 2</a>
  </li>
  <!-- Botão CTA -->
  <li class="nav__item nav__item--cta">
    <a href="#inscricao" class="nav__link nav__link--cta">CTA BUTTON</a>
  </li>
</ul>
```

### 4. Alterando Transparência do Header

Para ajustar a transparência do header:

```scss
.nav {
  background: rgba(255, 255, 255, 0.1); // Ajuste o último valor (0.1 = 10% de opacidade)
  backdrop-filter: blur(20px); // Ajuste o blur
  border: 1px solid rgba(255, 255, 255, 0.2); // Borda sutil
}
```

## 📝 Personalizando o Conteúdo

### 1. Alterando o Hero

No `index.html`, encontre a seção hero e personalize:

```html
<h1 class="hero__title">
    Seu Título Aqui
    <span class="hero__highlight">Palavra Destacada</span>
</h1>
<p class="hero__subtitle">
    Sua descrição personalizada aqui.
</p>
```

### 2. Adicionando/Removendo Seções

O layout atual inclui estas seções:
- **#inicio**: Seção principal (Hero)
- **#aprender**: O que você vai aprender (Features)
- **#curso**: Sobre o curso
- **#ensinar**: Quem vai te ensinar
- **#inscrever**: Call-to-action

Para adicionar uma nova seção:

```html
<section id="nova-secao" class="nova-secao">
  <div class="container">
    <h2>Título da Nova Seção</h2>
    <p>Conteúdo da seção</p>
  </div>
</section>
```

```scss
// Em src/scss/main.scss
.nova-secao {
  padding: $spacing-24 0;
  background-color: $bg-secondary;
  
  h2 {
    font-size: $font-size-4xl;
    margin-bottom: $spacing-6;
    text-align: center;
  }
}
```

### 3. Adicionando ao Menu de Navegação

```html
<li class="nav__item">
  <a href="#nova-secao" class="nav__link">NOVA SEÇÃO</a>
</li>
```

## 🖼️ Personalizando Imagens

### 1. Substituindo Imagens

Coloque suas imagens na pasta `public/` e atualize os caminhos:

```html
<!-- Antes -->
<img src="/vite.svg" alt="Logo">

<!-- Depois -->
<img src="/sua-logo.png" alt="Sua Logo">
```

### 2. Adicionando Lazy Loading

Para imagens que não estão na viewport inicial:

```html
<img data-src="/sua-imagem.jpg" alt="Descrição" class="lazy">
```

## 🔧 Personalizando JavaScript

### 1. Alterando Configurações do Formulário

No arquivo `src/js/modules/formHandler.js`, você pode personalizar:

```javascript
// Alterar URL de envio
async submitForm(data) {
  const response = await fetch('/api/contato', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data)
  });
  
  return response.json();
}
```

### 2. Adicionando Validações Personalizadas

```javascript
validateField(input) {
  // Suas validações personalizadas
  if (input.name === 'telefone') {
    if (!this.isValidBrazilianPhone(input.value)) {
      this.setError(input, 'Digite um telefone brasileiro válido');
      return false;
    }
  }
  
  return true;
}

isValidBrazilianPhone(phone) {
  const brazilianPhoneRegex = /^(\+55|55)?[\s\-]?(\(?\d{2}\)?)[\s\-]?(\d{4,5})[\s\-]?(\d{4})$/;
  return brazilianPhoneRegex.test(phone);
}
```

## 📱 Personalizando Responsividade

### 1. Alterando Breakpoints

No arquivo `src/scss/_variables.scss`:

```scss
$breakpoint-sm: 576px;   // Tablets pequenos
$breakpoint-md: 768px;   // Tablets
$breakpoint-lg: 992px;   // Desktops pequenos
$breakpoint-xl: 1200px;  // Desktops grandes
```

### 2. Criando Layouts Específicos

```scss
.minha-secao {
  display: grid;
  grid-template-columns: 1fr;
  gap: $spacing-6;
  
  @include breakpoint(md) {
    grid-template-columns: 1fr 1fr;
  }
  
  @include breakpoint(lg) {
    grid-template-columns: 1fr 1fr 1fr;
  }
}
```

## 🎨 Personalizando Animações

### 1. Alterando Velocidade das Animações

No arquivo `src/scss/_variables.scss`:

```scss
$transition-fast: 0.1s ease-in-out;
$transition-normal: 0.2s ease-in-out;
$transition-slow: 0.4s ease-in-out;
```

### 2. Adicionando Novas Animações

```scss
@keyframes minhaAnimacao {
  0% {
    opacity: 0;
    transform: scale(0.8);
  }
  100% {
    opacity: 1;
    transform: scale(1);
  }
}

.minha-classe {
  animation: minhaAnimacao 0.5s ease-out;
}
```

## 🔌 Integrações Comuns

### 1. Google Analytics

Adicione no `<head>` do `index.html`:

```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_MEASUREMENT_ID');
</script>
```

### 2. Hotjar ou Similar

```html
<!-- Hotjar Tracking Code -->
<script>
  (function(h,o,t,j,a,r){
    // Código do Hotjar aqui
  })(window,document,'https://static.hotjar.com/c/hotjar-','.js?sv=');
</script>
```

### 3. Pixel do Facebook

```html
<!-- Facebook Pixel -->
<script>
  !function(f,b,e,v,n,t,s)
  {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
  n.callMethod.apply(n,arguments):n.queue.push(arguments)};
  if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
  n.queue=[];t=b.createElement(e);t.async=!0;
  t.src=v;s=b.getElementsByTagName(e)[0];
  s.parentNode.insertBefore(t,s)}(window, document,'script',
  'https://connect.facebook.net/en_US/fbevents.js');
  fbq('init', 'YOUR_PIXEL_ID');
  fbq('track', 'PageView');
</script>
```

## 🛠️ Dicas Avançadas

### 1. Lazy Loading de Módulos

```javascript
// Carregar módulos apenas quando necessário
const loadContactForm = async () => {
  const { ContactForm } = await import('./modules/contactForm.js');
  return new ContactForm();
};

// Usar quando o usuário clicar em "Contato"
document.querySelector('.contact-btn').addEventListener('click', async () => {
  const contactForm = await loadContactForm();
  contactForm.show();
});
```

### 2. Otimizações de Performance

```javascript
// Debounce para eventos de scroll
const handleScroll = Utils.debounce(() => {
  // Lógica do scroll
}, 100);

window.addEventListener('scroll', handleScroll);
```

### 3. Temas Claro/Escuro

```scss
// Variáveis para tema escuro
[data-theme="dark"] {
  --primary-50: #1e293b;
  --primary-100: #334155;
  --gray-50: #0f172a;
  --gray-900: #f8fafc;
}
```

```javascript
// Toggle de tema
const toggleTheme = () => {
  const currentTheme = document.documentElement.getAttribute('data-theme');
  const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
  document.documentElement.setAttribute('data-theme', newTheme);
  localStorage.setItem('theme', newTheme);
};
```

## 🎯 Checklist de Personalização

- [ ] Alterar cores da marca
- [ ] Personalizar logo no header
- [ ] Ajustar itens de navegação
- [ ] Personalizar conteúdo das seções
- [ ] Substituir imagens e ícones
- [ ] Configurar formulário de contato
- [ ] Adicionar analytics
- [ ] Testar responsividade
- [ ] Verificar acessibilidade
- [ ] Otimizar para SEO
- [ ] Testar performance

---

**Lembre-se de testar todas as mudanças em diferentes dispositivos e navegadores!** 