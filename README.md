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
