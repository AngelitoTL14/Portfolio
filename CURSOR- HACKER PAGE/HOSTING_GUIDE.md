# 🚀 GUÍA COMPLETA DE HOSTING - HACKER PORTFOLIO

## 📋 Índice
1. [GitHub Pages](#github-pages)
2. [Netlify](#netlify)
3. [Vercel](#vercel)
4. [Comparación de Plataformas](#comparación)
5. [Configuración de Dominio Personalizado](#dominio)
6. [Optimizaciones Adicionales](#optimizaciones)

---

## 🐙 GitHub Pages

### Requisitos Previos
- Cuenta de GitHub
- Repositorio creado con los archivos del portfolio

### Pasos para Desplegar

#### 1. Crear Repositorio
```bash
# Crear nuevo repositorio en GitHub
# Nombre recomendado: angel-teran-portfolio
```

#### 2. Subir Archivos
```bash
# Clonar el repositorio
git clone https://github.com/tu-usuario/angel-teran-portfolio.git
cd angel-teran-portfolio

# Copiar archivos del portfolio
# - index.html
# - styles.css
# - script.js

# Hacer commit y push
git add .
git commit -m "Initial portfolio deployment"
git push origin main
```

#### 3. Configurar GitHub Pages
1. Ve a **Settings** del repositorio
2. Scroll hasta **Pages** en el menú lateral
3. En **Source**, selecciona **Deploy from a branch**
4. Selecciona **main** branch y **/ (root)**
5. Click **Save**

#### 4. Acceder al Sitio
- URL: `https://tu-usuario.github.io/angel-teran-portfolio`
- Tiempo de despliegue: 5-10 minutos

### Configuración Avanzada
```yaml
# .github/workflows/deploy.yml
name: Deploy to GitHub Pages
on:
  push:
    branches: [ main ]
jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Deploy
        uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./
```

---

## 🌐 Netlify

### Método 1: Drag & Drop (Más Rápido)

#### 1. Preparar Archivos
- Comprimir `index.html`, `styles.css`, `script.js` en un archivo ZIP

#### 2. Desplegar
1. Ve a [netlify.com](https://netlify.com)
2. Crea cuenta o inicia sesión
3. Arrastra el archivo ZIP al área de **"Want to deploy a new site without connecting to Git?"**
4. Espera el despliegue (30-60 segundos)

#### 3. Configurar
- **Site name**: `angel-teran-hacker-portfolio`
- **Custom domain**: Opcional
- **HTTPS**: Automático

### Método 2: Git Integration

#### 1. Conectar Repositorio
1. En Netlify, click **"New site from Git"**
2. Selecciona **GitHub**
3. Autoriza la conexión
4. Selecciona tu repositorio

#### 2. Configurar Build
```yaml
# netlify.toml
[build]
  publish = "."
  command = "echo 'No build needed'"

[[headers]]
  for = "/*"
  [headers.values]
    X-Frame-Options = "DENY"
    X-XSS-Protection = "1; mode=block"
    X-Content-Type-Options = "nosniff"
```

#### 3. Variables de Entorno (Opcional)
```bash
# En Netlify Dashboard > Site settings > Environment variables
NODE_ENV=production
SITE_URL=https://angel-teran-portfolio.netlify.app
```

### Funciones Netlify (Opcional)
```javascript
// netlify/functions/contact.js
exports.handler = async (event, context) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }
  
  const { name, email, message } = JSON.parse(event.body);
  
  // Procesar formulario de contacto
  return {
    statusCode: 200,
    body: JSON.stringify({ message: 'Mensaje enviado correctamente' })
  };
};
```

---

## ▲ Vercel

### Método 1: Vercel CLI

#### 1. Instalar Vercel CLI
```bash
npm install -g vercel
```

#### 2. Desplegar
```bash
# En la carpeta del proyecto
vercel

# Seguir las instrucciones:
# - Set up and deploy? Y
# - Which scope? Tu cuenta
# - Link to existing project? N
# - Project name: angel-teran-portfolio
# - Directory: ./
# - Override settings? N
```

#### 3. Configuración Automática
- Vercel detecta automáticamente que es un sitio estático
- Configura HTTPS automáticamente
- Genera URL: `https://angel-teran-portfolio.vercel.app`

### Método 2: GitHub Integration

#### 1. Conectar Repositorio
1. Ve a [vercel.com](https://vercel.com)
2. Click **"New Project"**
3. Importa tu repositorio de GitHub
4. Configura:
   - **Framework Preset**: Other
   - **Root Directory**: ./
   - **Build Command**: (dejar vacío)
   - **Output Directory**: ./

#### 2. Configuración Avanzada
```json
// vercel.json
{
  "version": 2,
  "builds": [
    {
      "src": "index.html",
      "use": "@vercel/static"
    }
  ],
  "routes": [
    {
      "src": "/(.*)",
      "dest": "/index.html"
    }
  ],
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        {
          "key": "X-Content-Type-Options",
          "value": "nosniff"
        },
        {
          "key": "X-Frame-Options",
          "value": "DENY"
        }
      ]
    }
  ]
}
```

---

## 📊 Comparación de Plataformas

| Característica | GitHub Pages | Netlify | Vercel |
|----------------|--------------|---------|---------|
| **Gratuito** | ✅ | ✅ | ✅ |
| **HTTPS** | ✅ | ✅ | ✅ |
| **CDN** | ✅ | ✅ | ✅ |
| **Dominio Personalizado** | ✅ | ✅ | ✅ |
| **CI/CD** | ✅ | ✅ | ✅ |
| **Funciones Serverless** | ❌ | ✅ | ✅ |
| **Formularios** | ❌ | ✅ | ❌ |
| **Tiempo de Despliegue** | 5-10 min | 1-2 min | 30-60 seg |
| **Límite de Ancho de Banda** | 100GB/mes | 100GB/mes | 100GB/mes |
| **Límite de Sitios** | Ilimitado | 100 | Ilimitado |

### Recomendación
- **Para principiantes**: Netlify (drag & drop)
- **Para desarrolladores**: Vercel (mejor rendimiento)
- **Para proyectos open source**: GitHub Pages

---

## 🌍 Configuración de Dominio Personalizado

### 1. Comprar Dominio
- **Recomendados**: Namecheap, GoDaddy, Google Domains
- **Sugerencias**: `angelteran.com`, `hackerangel.dev`, `cybersecangel.net`

### 2. Configurar DNS

#### Para Netlify
```dns
# Registros DNS necesarios
Type: A
Name: @
Value: 75.2.60.5

Type: CNAME
Name: www
Value: angel-teran-portfolio.netlify.app
```

#### Para Vercel
```dns
# Registros DNS necesarios
Type: A
Name: @
Value: 76.76.19.61

Type: CNAME
Name: www
Value: cname.vercel-dns.com
```

#### Para GitHub Pages
```dns
# Registros DNS necesarios
Type: A
Name: @
Value: 185.199.108.153
Value: 185.199.109.153
Value: 185.199.110.153
Value: 185.199.111.153

Type: CNAME
Name: www
Value: tu-usuario.github.io
```

### 3. Configurar en la Plataforma
1. Ve a la configuración del sitio
2. Añade tu dominio personalizado
3. Configura SSL/TLS
4. Espera la propagación DNS (24-48 horas)

---

## ⚡ Optimizaciones Adicionales

### 1. Compresión de Archivos
```bash
# Comprimir CSS y JS
gzip -k styles.css
gzip -k script.js

# Minificar HTML
html-minifier --collapse-whitespace --remove-comments index.html -o index.min.html
```

### 2. Cache Headers
```yaml
# netlify.toml
[[headers]]
  for = "*.css"
  [headers.values]
    Cache-Control = "public, max-age=31536000"

[[headers]]
  for = "*.js"
  [headers.values]
    Cache-Control = "public, max-age=31536000"
```

### 3. Optimización de Imágenes
```html
<!-- Usar WebP cuando sea posible -->
<picture>
  <source srcset="image.webp" type="image/webp">
  <img src="image.jpg" alt="Description">
</picture>
```

### 4. Lazy Loading
```html
<!-- Para imágenes futuras -->
<img src="image.jpg" loading="lazy" alt="Description">
```

### 5. Service Worker (PWA)
```javascript
// sw.js
const CACHE_NAME = 'hacker-portfolio-v1';
const urlsToCache = [
  '/',
  '/styles.css',
  '/script.js'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
  );
});
```

---

## 🔧 Solución de Problemas

### Problemas Comunes

#### 1. CSS/JS no se carga
```html
<!-- Verificar rutas relativas -->
<link rel="stylesheet" href="./styles.css">
<script src="./script.js"></script>
```

#### 2. HTTPS Mixed Content
```html
<!-- Usar protocolos relativos -->
<script src="//cdn.example.com/library.js"></script>
```

#### 3. CORS Issues
```javascript
// En script.js, usar rutas relativas
fetch('./data.json') // ✅ Correcto
fetch('https://api.example.com/data') // ❌ Puede causar CORS
```

#### 4. Cache Issues
```html
<!-- Añadir versioning -->
<link rel="stylesheet" href="styles.css?v=1.0.0">
<script src="script.js?v=1.0.0"></script>
```

### Comandos de Debugging
```bash
# Verificar headers HTTP
curl -I https://tu-sitio.com

# Verificar SSL
openssl s_client -connect tu-sitio.com:443

# Verificar DNS
nslookup tu-sitio.com
```

---

## 📱 Testing en Diferentes Dispositivos

### Herramientas de Testing
1. **Chrome DevTools**: F12 > Device Toolbar
2. **BrowserStack**: Testing en dispositivos reales
3. **Lighthouse**: Auditoría de rendimiento
4. **GTmetrix**: Análisis de velocidad

### Checklist de Testing
- [ ] Desktop (1920x1080)
- [ ] Laptop (1366x768)
- [ ] Tablet (768x1024)
- [ ] Mobile (375x667)
- [ ] Animaciones funcionan
- [ ] Chatbot responsive
- [ ] Modales se abren/cierran
- [ ] Carousel funciona
- [ ] Matrix animation visible

---

## 🎯 Métricas de Rendimiento

### Objetivos
- **Lighthouse Score**: >90
- **First Contentful Paint**: <1.5s
- **Largest Contentful Paint**: <2.5s
- **Cumulative Layout Shift**: <0.1

### Herramientas de Monitoreo
1. **Google PageSpeed Insights**
2. **WebPageTest**
3. **GTmetrix**
4. **Lighthouse CI**

---

## 🚀 Despliegue Final

### Checklist Pre-Despliegue
- [ ] Todos los archivos están en el repositorio
- [ ] No hay errores en la consola del navegador
- [ ] Responsive design funciona en todos los dispositivos
- [ ] Todas las funcionalidades están operativas
- [ ] Chatbot responde correctamente
- [ ] Modales se abren y cierran
- [ ] Carousel funciona con navegación
- [ ] Animación Matrix es visible
- [ ] Efectos de glow y animaciones funcionan

### Post-Despliegue
1. Verificar que el sitio carga correctamente
2. Probar todas las funcionalidades
3. Verificar en diferentes navegadores
4. Configurar Google Analytics (opcional)
5. Configurar Search Console (opcional)

---

## 📞 Soporte

Si encuentras problemas durante el despliegue:

1. **GitHub Pages**: [Documentación oficial](https://docs.github.com/en/pages)
2. **Netlify**: [Documentación oficial](https://docs.netlify.com/)
3. **Vercel**: [Documentación oficial](https://vercel.com/docs)

---

**¡Tu portfolio hacker está listo para conquistar el ciberespacio! 🚀💚**
