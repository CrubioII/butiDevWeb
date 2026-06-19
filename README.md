# butiDev — Sitio web

Landing page de butiDev. SPA estática construida con **React 18 + Vite**,
desplegada en **Azure App Service** (runtime Node 22 LTS).

- **Producción:** https://butidev-web-fwgmcnasdfaefre9.canadacentral-01.azurewebsites.net/
- **Kudu / SSH (SCM):** https://butidev-web-fwgmcnasdfaefre9.scm.canadacentral-01.azurewebsites.net/

---

## Stack

| Capa        | Tecnología                          |
|-------------|-------------------------------------|
| UI          | React 18, JSX                       |
| Bundler     | Vite 5                              |
| Estilos     | CSS plano (`src/index.css`)         |
| Hosting     | Azure App Service (Linux, Node 22)  |
| i18n        | ES / EN (toggle en `src/data.jsx`)  |

---

## Desarrollo local

Requiere Node 18+ (recomendado 20/22) y npm.

```bash
npm install      # instala dependencias
npm run dev      # servidor de desarrollo en http://localhost:5173
```

Otros scripts:

```bash
npm run build    # genera el build de producción en dist/
npm run preview  # sirve el build de dist/ localmente para verificar
```

---

## Estructura del proyecto

```
.
├── index.html            # HTML raíz (entry de Vite)
├── public/
│   └── assets/           # ⚠️ imágenes servidas tal cual (ver nota abajo)
│       ├── butidev-emblem.png
│       ├── butidev-logo.png
│       ├── saipan-airsoft-hero.jpg
│       └── troqueles-ink-home.jpg
├── src/
│   ├── main.jsx          # punto de entrada React
│   ├── App.jsx           # componentes y secciones de la página
│   ├── data.jsx          # contenido y traducciones ES/EN (proyectos, textos)
│   ├── icons.jsx         # íconos SVG inline
│   └── index.css         # todos los estilos
├── vite.config.js
└── dist/                 # build generado (NO se versiona)
```

### ⚠️ Nota importante: imágenes en `public/assets/`

Las imágenes referenciadas desde JSX/CSS con rutas absolutas (`/assets/...`)
**deben vivir en `public/assets/`**. Vite solo copia al build lo que está en
`public/`; cualquier imagen fuera de ahí no se incluye en `dist/` y aparecerá
rota en producción (responde 404 aunque funcione en `npm run dev`).

Para agregar una imagen nueva:
1. Colócala en `public/assets/`.
2. Referénciala como `/assets/mi-imagen.png`.
3. `npm run build` y confirma que aparece en `dist/assets/`.

---

## Deploy a Azure

### Configuración del recurso

| Parámetro              | Valor          |
|------------------------|----------------|
| Grupo de recursos      | `butiWeb`      |
| Nombre del App Service | `butidev-web`  |
| Región                 | Canada Central |
| Modelo de publicación  | Código         |
| Runtime                | Node 22 LTS    |

Azure sirve el sitio estático con su script por defecto
(`/opt/startup/default-static-site.js`), que entrega `index.html` desde
`/home/site/wwwroot`. No hace falta `server.js` ni `web.config`: basta con
subir el contenido de `dist/` a `wwwroot/`.

### Pasos

Requiere [Azure CLI](https://learn.microsoft.com/cli/azure/) y estar logueado
(`az login`).

```bash
# 1. Build de producción
npm run build

# 2. Empaquetar el CONTENIDO de dist/ (no la carpeta) en deploy.zip
cd dist && rm -f ../deploy.zip && zip -rq ../deploy.zip . -x ".*" && cd ..

# 3. Desplegar el zip al App Service
az webapp deploy \
  --resource-group butiWeb \
  --name butidev-web \
  --src-path deploy.zip \
  --type zip
```

> `deploy.zip` está en `.gitignore` (es un artefacto de build).

El deploy tarda ~1-2 min. Espera a ver `"status": "RuntimeSuccessful"` en la
salida.

### Verificar el deploy

```bash
# El bundle servido debe coincidir con el recién generado
curl -s https://butidev-web-fwgmcnasdfaefre9.canadacentral-01.azurewebsites.net/ \
  | grep -oE 'assets/index-[A-Za-z0-9]+\.(js|css)'

# Las imágenes deben responder 200
for f in butidev-emblem.png butidev-logo.png saipan-airsoft-hero.jpg troqueles-ink-home.jpg; do
  echo "$f -> $(curl -s -o /dev/null -w '%{http_code}' \
    https://butidev-web-fwgmcnasdfaefre9.canadacentral-01.azurewebsites.net/assets/$f)"
done
```

En el navegador, abre en **incógnito** o usa **Ctrl+Shift+R** para saltar la
caché y ver la versión nueva.

---

## Troubleshooting

### Las imágenes no cargan en producción (404)
La imagen no estaba en `public/assets/` al hacer el build. Muévela ahí,
`npm run build` y redeploy. Confirma con `ls dist/assets/`.

### Sigue apareciendo la versión vieja
Caché del navegador o del App Service.
- Navegador: incógnito / `Ctrl+Shift+R`.
- Servidor: `az webapp restart --name butidev-web --resource-group butiWeb`.

### Ver logs del contenedor
```bash
az webapp log tail --name butidev-web --resource-group butiWeb
```
Logs de arranque también en Kudu:
`https://butidev-web-fwgmcnasdfaefre9.scm.canadacentral-01.azurewebsites.net/api/vfs/LogFiles/`

### Acceso por SSH / archivos en el servidor
Vía Kudu SSH. El contenido del sitio vive en `/home/site/wwwroot`.

---

## Notas de responsive

- Los elementos decorativos (`CurvyArrow`, `Check`) usan posición absoluta con
  offsets negativos. En móvil se ocultan con la clase `.deco-mobile-hide`
  (`@media max-width: 760px`) porque, de lo contrario, se salen del viewport,
  expanden el *layout viewport* y desplazan los elementos `position: fixed`
  (menú burger y botón flotante de WhatsApp).
- `html` y `body` tienen `overflow-x: hidden` como red de seguridad para evitar
  scroll horizontal accidental.
- Breakpoints principales en `src/index.css`: `1000px` (nav → burger),
  `760px` (grids a 1 columna + ocultar decoraciones), `520px` y `400px`
  (compactación de header y botones).
