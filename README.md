# ICFES IQ500 - Plataforma GitHub Pages

## Qué incluye
- Diseño responsive para celular y computador.
- Video de YouTube integrado.
- Biblioteca de PDFs.
- Calendario de estudio de 30 días.
- Checkboxes de progreso.
- Puntos IQ y racha diaria guardados en el navegador.
- WhatsApp conectado al número 3007540786.
- Botón Wompi listo para configurar.

## Subir a GitHub
1. Descomprime este ZIP.
2. Sube TODO el contenido al repositorio, no el ZIP.
3. En GitHub: Settings > Pages > Deploy from branch > main > /root > Save.

## Configurar Wompi
Entra a Wompi, crea un link de cobro por $200.000 y copia el enlace.
Luego abre `script.js` y cambia:

```js
const WOMPI_LINK = "";
```

por:

```js
const WOMPI_LINK = "https://checkout.wompi.co/l/TU_LINK";
```

## Sobre cuentas de estudiantes
Esta versión funciona en GitHub Pages y guarda el progreso en el celular o computador del estudiante usando localStorage.
Para cuentas reales con usuario y contraseña, necesitas backend/base de datos como Firebase, Supabase o una app con Node/Django.


## Actualización incluida

- Se dejaron solo **Mini simulacros** con los 5 enlaces de Google Forms.
- El progreso se guarda por perfil de estudiante usando `localStorage`; se conserva aunque cierren la página o la app, siempre que usen el mismo celular/computador y navegador.
- Para cuentas reales con usuario, contraseña y progreso sincronizado entre dispositivos se necesita conectar Firebase o Supabase.
- Para Wompi: pega tu link de cobro real en `script.js`, variable `WOMPI_LINK`.
