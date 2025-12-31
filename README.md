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
