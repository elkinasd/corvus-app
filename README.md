# Aplicación Web Corvus

## 🏗 Arquitectura del Proyecto

Este proyecto está construido sobre **Angular 20** y sigue una **Arquitectura orientada a Features (Funcionalidades)**, utilizando Componentes Standalone y gestión de estado reactiva moderna.

### Definición de la Estructura de Directorios

```text
src/app/
├── core/                       # 🧠 CEREBRO (Singletons & Servicios Globales)
│   ├── auth/                   # Lógica de estado de autenticación
│   ├── models/                 # Interfaces/Tipos globales (ej. DashboardMetrics)
│   ├── services/               # Servicios de API globales
│   └── guards/                 # Guardianes de rutas (Protección de acceso)
│
├── shared/                     # 🧩 PIEZAS REUTILIZABLES (UI Tonta)
│   ├── components/             # Kit UI Genérico (Botones, Cards, Inputs)
│   ├── pipes/                  # Transformación de datos
│   └── directives/             # Comportamiento visual de la UI
│
├── layout/                     # 🖼️ MARCOS ESTRUCTURALES (Shells)
│   ├── main-layout/            # App principal con Sidebar y Header (Material Sidenav)
│   ├── auth-layout/            # [Pendiente] Layout limpio para login/registro
│   └── components/             # Componentes del layout (Sidebar, Toolbar)
│
└── features/                   # 🚀 LÓGICA DE NEGOCIO (Vistas Lazy Loaded)
    ├── dashboard/              # Vista Principal / Métricas
    ├── leads/                  # Gestión de Prospectos (CRM)
    ├── projects/               # Gestión de Proyectos
    └── sales/                  # Ventas
```

---

## 📏 Mejores Prácticas y Convenciones

### 1. Layouts vs. Features

- **Layouts (`/layout`)**: Son el "marco" de la pintura. No manejan datos de negocio complejos.
- **Features (`/features`)**: Son la "pintura". Vistas completas que se cargan dentro del `<router-outlet>` del layout.

### 2. Componentes y Estado

- **Standalone**: Todos los componentes son `standalone: true`.
- **Control Flow**: Uso obligatorio de la sintaxis `@if`, `@for`, `@switch`.
- **Signals**: Preferencia por `signal()`, `computed()` y `effect()` sobre Observables manuales para el estado de la vista.

### 3. Stack Tecnológico (Versiones Actuales)

- **Framework**: Angular 20.3.15
- **UI Lib**: Angular Material 20.2.14 + CDK
- **Lenguaje**: TypeScript 5.9.3
- **Estilos**: SCSS Modular

- **Estilos**: SCSS Modular

### 4. Convención de Modelos de Datos (Feb 2026)

Para mantener una arquitectura semántica y limpia, distinguimos estrictamente entre definiciones de datos y lógica de negocio:

- **Interfaces (`*.interface.ts`)**: Definen la **forma** de los datos (Contratos). Son puramente estructurales y no contienen lógica. Se usan para tipar respuestas de API y props de componentes.
  - *Ejemplo*: `lead.interface.ts`, `client.interface.ts`
- **Modelos (`*.model.ts`)**: Clases que instancian datos y contienen **lógica de negocio**, métodos, getters o validaciones internas.
  - *Uso*: Solo crear archivos `.model.ts` si se requiere instanciar objetos con comportamiento (`new LeadModel(...)`).

---

## 🎨 Sistema de Diseño (Codename: Kanto)

La identidad visual (UI) de Corvus utiliza una paleta de colores semántica inspirada en la región de Kanto, mapeando ciudades icónicas a funciones de la interfaz para crear una experiencia de usuario inmersiva y consistente.

### 🗺️ El Mapa de Colores (The Color Map)

| Referencia (Codename) | Variable CSS         | Color / Tono        | Función en Corvus                                                |
| :-------------------- | :------------------- | :------------------ | :--------------------------------------------------------------- |
| **Meseta Añil**       | `$color-indigo-900`  | **Indigo Profundo** | **Fondo Global (App BG)**. El vacío espacial donde vive la app.  |
| **Pueblo Paleta**     | `$color-white`       | **Blanco Puro**     | **Texto Principal**. El inicio de todo.                          |
| **Ciudad Celeste**    | `$color-cyan-500`    | **Azul Cerúleo**    | **Primario / Nuevos Leads**. Inicio del viaje, fresco y neutral. |
| **Ciudad Azulona**    | `$color-blue-500`    | **Verde Celadón**   | **Contactados**. Crecimiento natural, avance.                    |
| **Ciudad Fucsia**     | `$color-rose-500`    | **Fucsia Intenso**  | **Visitas / Eventos**. Acción y dinamismo.                       |
| **Ciudad Azafrán**    | `$color-amber-500`   | **Dorado Azafrán**  | **Cotización / VIP**. Valor, riqueza y atención.                 |
| **Ciudad Carmín**     | `$color-red-500`     | **Rojo Bermellón**  | **Negociación / Hot**. Urgencia, electricidad y riesgo.          |
| **Ciudad Verde**      | `$color-emerald-500` | **Verde Viridián**  | **Cierre / Ganado**. Éxito sólido y definitivo.                  |
| **Pueblo Lavanda**    | `$color-violet-500`  | **Lavanda Pálido**  | **Inactivo / Perdido**. El lugar de descanso de los leads.       |

### 🌡️ Pipeline de Ventas (Lógica de Temperatura)

El pipeline de leads sigue una progresión de "temperatura" que alinea los colores con la cercanía al cierre:

1.  **Fresco (Azul/Cerúleo)**: Lead Nuevo. Recién llegado, neutral.
2.  **Tibio (Verde Menta/Celadón)**: Contactado. Hay vida, está creciendo.
3.  **Activo (Fucsia)**: Visita Agendada. Hay movimiento físico.
4.  **Valioso (Dorado)**: Cotización. Se habla de dinero.
5.  **Caliente (Rojo/Carmín)**: Negociación. Punto crítico de decisión.
6.  **Éxito (Verde Solido)**: Ganado. Contrato cerrado.
7.  **Muerto (Violeta)**: Perdido/Inactivo. Cementerio de leads.

### 🧠 Lógica de Implementación

El archivo `_variables.scss` actúa como el "traductor" entre el Codename y la UI:

```scss
// Definición Primitiva
$color-viridian-500: #108060;

// Mapeo Semántico (Ejemplo)
$status-won-bg: rgba($color-viridian-500, 0.2);
```

---

## 📅 Bitácora de Desarrollo

### 🚀 Inicio del Proyecto - Diciembre 2025

**1. Fundamentos y Arquitectura**

- Inicialización del proyecto con **Angular Standalone Components**.
- Definición de arquitectura escalable: `core`, `shared`, `layout`, `features`.
- Configuración de sistema de diseño y variables SCSS globales.

**2. Layouts y Navegación**

- **Main Layout**: Implementación de Sidebar moderna con navegación y Header minimalista.
- **Auth Layout**: Estructura centrada para vistas de autenticación.

**3. Módulo de Autenticación**

- **Login**: Diseño premium con efectos de vidrio (glassmorphism/blur), validación de formularios y estética corporativa.

**4. Panel de Control (Dashboard)**

- Creación de tarjetas de **KPIs** con indicadores de tendencia (positiva/negativa).
- Lista de **"Avance de Proyectos"** con barras de progreso dinámicas.
- Sección de **"Últimos Leads"** para acceso rápido.

**5. Gestión de Leads (CRM)**

- **Tablero Kanban**: Implementación completa con **Angular CDK Drag & Drop**.
- **UX/UI**:
  - Diseño de tarjetas de cliente con indicadores visuales de estado.
  - **Responsive Design**: El tablero se adapta a "Fit-to-Screen" en escritorio (sin scroll) y habilita desplazamiento horizontal en móviles.
- Colores consistentes y sistema de estados ("Nuevos", "Contactados", "Visita Agendada", "Cotización").

**6. Evolución a "Sales-Centric" y Base de Datos (31 Dic 2025)**

**Dashboard 2.0 (Enfoque de Ventas)**

- Transformación a una herramienta de gestión comercial agresiva.
- **Pipeline Funnel Chart**: Integración de `Chart.js` para visualizar el volumen de negocio por etapa.
- **Activity Feed**: Reemplazo de listas genéricas por un feed de "Actividades de Hoy" (Llamadas, Visitas, Correos pendientes).

**Directorio de Clientes (Base de Datos Maestra)**

- Creación del módulo `/features/clients` independiente de Leads.
- **Mesa de Datos**: Vista de tabla con filtros, búsqueda y paginación (`MatTable`, `MatPaginator`).
- **Mobile First 100%**: Transformación automática de tabla a "Tarjetas de Contacto" en dispositivos móviles, eliminando problemas de visualización horizontal.
- **Etiquetado Inteligente**: Badges para diferenciar "Inversionistas", "Compradores", y estado "VIP".

**Refinamientos UI/UX**

- Unificación del lenguaje visual: Tema Oscuro/Claro consistente en Dashboard y Directorio.
- Migración a sintaxis moderna `@for` de Angular en vistas principales.

### 🎨 Refinamiento Visual y Estabilidad - Enero 2026

**1. Pulido de Interfaz "Kanto" (Dark/Light Themes)**

- **Lead Drawer V2**: Refactorización completa de los estilos del panel lateral de detalles de lead.
  - Corrección de problemas de contraste en modo oscuro ("Dark Premium").
  - Unificación de estilos de botones, timelines y badges para que sean legibles en ambos temas.
  - Eliminación de artefactos visuales (bordes blancos indeseados).

**2. Optimización del Layout Principal**

- **Clean View por Defecto**: Ajuste en la lógica de `MainLayout` para iniciar con el menú lateral cerrado, maximizando el espacio de trabajo para el usuario desde el primer momento.
- **Sass Moderno**: Actualización de la sintaxis de hojas de estilo para eliminar advertencias de deprecación (migración de anidamiento CSS estándar).

**3. Refactorización de Formularios y Arquitectura CSS**

- **Control de Clientes (Formularios Robustos):**

  - Implementación de validaciones estrictas en el formulario de creación/edición de clientes.
  - Bloqueo de acciones (botón "Guardar") hasta cumplir con la integridad de datos (Personal, Financiera, Legal).
  - Limpieza profunda de código: Eliminación de lógica condicional redundante en templates HTML.

- **Optimización de Rendimiento UI (CSS Diet):**
  - **Reducción del 60% en CSS**: Migración masiva de estilos personalizados a utilidades de **Bootstrap 5** en el Directorio de Clientes.
  - **Responsive Híbrido**: Implementación de Mixins SCSS para transformar tablas de datos complejas en "Tarjetas de Resumen" automáticamente en móviles, sin duplicar código HTML.
  - Estandarización de componentes visuales (Botones, Buscadores) para alinearse con el sistema de diseño global.

### 🔒 Seguridad, UX Premium y Refactoring - Fin Enero 2026

**1. Seguridad y Reglas de Negocio (Lead Lifecycle)**

- **Smart Drag & Drop**: Refinamiento total de la lógica de movimiento de leads en el tablero Kanban.
- **Admin Guard Pattern**: Implementación de un patrón de seguridad para acciones destructivas o sensibles.
  - **Protección de Cierres**: Reversar un negocio cerrado ("Ganado") ahora requiere **autorización de administrador** (Password Challenge).
  - **Transaction Rollback**: Si la autorización falla o se cancela, el sistema devuelve automáticamente la tarjeta a su estado original (UI Optimista con reversión).

**2. Sistema de Diseño Premium (Dark/Light Consistency)**

- **Modales "Floating Card"**: Estandarización de todos los diálogos (Drawer, Crear, Editar) para flotar al 80% del viewport en escritorio con márgenes controlados.
- **Theme-Aware Engine**: Eliminación de colores "hardcoded". Reescritura de estilos para usar Variables CSS (`--bg-card`, `--text-main`) permitiendo transición fluida entre **Modo Claro y Oscuro**.
- **Slim Scroll Global**: Implementación de una barra de desplazamiento minimalista y estética a nivel global (`styles.scss`) para reemplazar el scroll nativo de Windows.

**3. Codebase Cleanup & Performance**

- **Bootstrap-First Refactor**: Reescritura del módulo `ClientUpdateDialog`.
  - Se eliminó el 90% del CSS personalizado del componente.
  - Se migró a clases de utilidad de **Bootstrap** (`d-flex`, `gap-3`, `row/col`) para el layout, manteniendo la mantenibilidad extrema.
- **Flexbox Layouts V3**: Corrección definitiva de "sticky footers" y headers en modales, asegurando que solo el contenido central sea scrolleable.

### 🏛️ Refactorización de Arquitectura - Febrero 2026

**1. Definición Semántica de Datos**

- **Migración de Modelos a Interfaces**: Reestructuración del núcleo de datos (`core/models`).
  - Se renombraron archivos físicos para reflejar su naturaleza real. Los archivos que solo contenían definiciones de tipos (`export interface`) pasaron de `*.model.ts` a `*.interface.ts`.
  - **Objetivo**: Evitar ambigüedad. Reservar el término "Modelo" para clases con lógica de negocio real y usar "Interfaz" para contratos de datos puros.

**2. Optimización UX/UI y Arquitectura de Estilos**

- **Grid Responsive en Proyectos**:
  - Implementación de **Grid CSS moderna** (`auto-fit`) en la vista de detalle de proyectos.
  - **Eliminación del Scroll Horizontal**: Las torres ahora fluyen naturalmente ocupando el 100% del ancho disponible, adaptándose a cualquier pantalla.
  - **Grid de Unidades**: Ajuste a **5 columnas** fijas por piso para mejor legibilidad.
  - **Control de Desbordamiento**: Implementación de `text-overflow: ellipsis` y `min-width: 0` para evitar que precios largos rompan la maquetación en tarjetas pequeñas.

- **Estilización de Navegación**:
  - Rediseño del botón "Atrás": Ahora usa estilos `mat-button` con iconografía y estados `hover` premium que respetan el tema activo.

- **Arquitectura SCSS Refinada**:
  - Configuración de `stylePreprocessorOptions` en `angular.json` para permitir rutas absolutas (`src/styles`).
  - Estandarización de imports: Uso de `@use 'variables' as *;` para un acceso limpio a los tokens de diseño.

