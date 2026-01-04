# Plan de Implementación: Sistema de Temas "Kanto" (Light & Dark)

Este plan describe la transición de estilos estáticos a un sistema dinámico basado en Variables CSS, permitiendo cambiar entre "Kanto Dark" (Actual) y "Kanto Light" en tiempo real sin romper la arquitectura existente.

## Filosofía del Diseño

No es simplemente invertir colores. "Kanto Light" debe mantener la identidad premium.

- **Kanto Dark**: Misterioso, profundo (Indigo/Violeta), neón suave.
- **Kanto Light**: Limpio, profesional (Slate/Blanco), con acentos Indigo fuertes.

---

## Fase 1: Motor de Temas (CSS Variables)

Refactorizar `_variables.scss` para que actúe como "puente". Los componentes seguirán usando las variables de SCSS (`$bg-card`), pero estas apuntarán a variables CSS (`var(--bg-card)`).

**Archivo**: `src/styles/_variables.scss`

```scss
// ANTES
$bg-card: #2e2a5b;

// DESPUÉS
$bg-card: var(--bg-card);
```

## Fase 2: Definición de Mundos (Theming)

Crear un nuevo archivo `src/styles/_themes.scss` para definir los valores de las variables.

**Archivo**: `src/styles/_themes.scss`

```scss
:root {
  // === KANTO DARK (Default) ===
  --bg-app: #1a1b4b; // Meseta Añil Profundo
  --bg-card: #2e2a5b; // Indigo Card
  --text-main: #ffffff;
  --text-secondary: #8ba8b7;
  --border-subtle: rgba(255, 255, 255, 0.08);
}

.light-theme {
  // === KANTO LIGHT ===
  --bg-app: #f1f5f9; // Slate 100 (Pueblo Paleta Día)
  --bg-card: #ffffff; // White Card
  --text-main: #1e293b; // Slate 800 (Texto fuerte)
  --text-secondary: #64748b; // Slate 500
  --border-subtle: #e2e8f0; // Slate 200
}
```

## Fase 3: Servicio de Gestión (`ThemeService`)

Un servicio simple de Angular para manejar la clase `.light-theme` en el `<body>` y persistir la preferencia del usuario en `localStorage`.

- `toggleTheme()`
- `isDark()`

## Fase 4: La Interfaz (UI)

Añadir un botón "Sol/Luna" en el `HeaderComponent`.

---

## Estrategia de Migración (Segura)

1.  **Paso 1**: Crear `_themes.scss` con las variables CSS copiando los valores actuales de `_variables.scss`.
2.  **Paso 2**: Importar `_themes.scss` en `styles.scss`.
3.  **Paso 3**: Modificar `_variables.scss` una por una para usar `var(--...)`.
    - _Ventaja_: Si algo falla, el CSS sigue compilando.
    - _Prueba_: Verificar que la app se ve idéntica (Dark).
4.  **Paso 4**: Implementar el switch y ajustar los colores Light.

## Riesgos y Mitigaciones

- **Riesgo**: Colores hardcodeados en componentes específicos (ej: `background: #1a1b4b` en un CSS local).
  - _Mitigación_: Haremos una búsqueda global (grep) de los códigos de color hexadecimales y los reemplazaremos por las variables.
- **Riesgo**: Sombras y bordes.
  - _Mitigación_: Las sombras en Light mode deben ser más suaves y difusas que en Dark mode. Definiremos `--shadow-card` también.
