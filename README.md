# CV — María René Quispe Condori

Sitio estático de currículum, listo para publicar en GitHub Pages.

## Estructura

```
index.html      Estructura de la página
style.css       Estilos (paleta y tipografía)
script.js       Datos de certificaciones y animaciones del timeline
assets/foto.jpg Foto de perfil
```

## Cómo publicarlo en GitHub Pages

1. Crea un repositorio nuevo en GitHub. Puedes llamarlo, por ejemplo, `cv` o,
   si quieres que sea tu sitio "principal", `tu-usuario.github.io`.
2. Sube estos 4 archivos/carpetas tal cual están (manteniendo la carpeta `assets`).
   - Por la web: botón "Add file → Upload files" y arrastra todo.
   - Por consola:
     ```bash
     git init
     git add .
     git commit -m "Primera versión del CV"
     git branch -M main
     git remote add origin https://github.com/TU-USUARIO/TU-REPO.git
     git push -u origin main
     ```
3. En el repositorio, ve a **Settings → Pages**.
4. En "Source" elige la rama `main` y la carpeta `/ (root)`.
5. Guarda. En uno o dos minutos tu sitio queda publicado en:
   `https://tu-usuario.github.io/tu-repo/`

## Editar contenido más adelante

- **Textos generales** (perfil, habilidades, contacto): edítalos directamente
  en `index.html`.
- **Certificaciones**: se generan desde la lista `TIMELINE` al inicio de
  `script.js`. Para añadir un curso nuevo, agrega un objeto con `date`,
  `title`, `org` y `hours` (o `null` si no tiene carga horaria certificada).
- **Foto**: reemplaza `assets/foto.jpg` por otra imagen con el mismo nombre.
