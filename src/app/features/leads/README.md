# Documentación del Módulo Leads

Este módulo implementa un tablero Kanban para la gestión de prospectos (leads). A continuación se explica la arquitectura y las funciones clave para facilitar su mantenimiento.

## Estructura de Archivos

- **`leads.component.ts`**: El componente "Padre" e inteligente.
  - Gestiona el estado global del tablero (columnas y leads).
  - Maneja la lógica de arrastrar y soltar (Drag & Drop).
- **`components/lead-drawer/`**: Componente "Hijo" tonto (Presentacional).
  - Solo se encarga de mostrar los detalles y el formulario de notas/acciones.
  - Se comunica con el padre via `@Input()` (recibe datos) y `@Output()` (avisa eventos).
- **`../../core/models/lead.model.ts`**: Interfaces de TypeScript. Definen qué forma tienen los datos (`Lead`, `TimelineEvent`).

## Conceptos Clave

### 1. Drag & Drop (CDK)

Usamos el **Angular CDK (Component Dev Kit)**. No reinventamos la rueda.

**Función `drop(event)` en el padre:**

- `event.previousContainer === event.container`: Significa que el usuario movió la tarjeta pero la soltó en la misma columna. Usamos `moveItemInArray` para reordenar.
- `else` (transferencia): El usuario movió la tarjeta a otra columna. Usamos `transferArrayItem` que mueve el objeto de un array a otro automáticamente.

### 2. Panel Lateral (Lead Drawer)

Funciona con un booleano simple implícito:

- Si `selectedLead` tiene datos -> El panel se muestra (clase CSS `.open`).
- Si `selectedLead` es `null` -> El panel se oculta.

### 3. Historial (Timeline)

El historial es simplemente un array de objetos `TimelineEvent` dentro de cada Lead.
Cuando guardas una nota o envías un correo, no estamos llamando a una API real todavía, simplemente hacemos un `.unshift()` (agregar al principio) a ese array local.

## Flumo de Datos (Data Flow)

1. **Usuario** arrastra tarjeta -> **LeadsComponent** actualiza los arrays.
2. **Usuario** hace click en tarjeta -> **LeadsComponent** asigna `selectedLead`.
3. **LeadsComponent** pasa `selectedLead` al **LeadDrawerComponent**.
4. **LeadDrawerComponent** renderiza la info y los formularios.
5. **Usuario** guarda una nota -> **LeadDrawerComponent** modifica el objeto `lead` directamente (por referencia) y agrega el evento al timeline.

## ¿Cómo extender esto?

- **Conectar a Backend:** En `drop()`, después de `transferArrayItem`, deberías llamar a un servicio: `this.leadsService.updateStatus(lead.id, newStatus)`.
- **Nuevas Acciones:** Para agregar un botón (ej: "WhatsApp"), ve a `lead-drawer.component.html`, agrega el botón y crea su función correspondiente en el `.ts`.
