# 🍳 CookTogether Frontend

Aplicación web React para gestión y compartición de recetas culinarias con autenticación y roles de usuario.

## 🚀 Tecnologías

- **React** 18.2.0
- **TypeScript** 4.9.5
- **React Router DOM** 7.5.1
- **Bootstrap** 5.3.5
- **Axios** 1.8.4
- **SweetAlert2** 11.19.1

## 📋 Requisitos Previos

- Node.js 16.x o superior
- npm o yarn
- Backend API corriendo en `http://localhost:3000/apiRecetas` (o configurar en `.env`)

## 🔧 Instalación

1. **Clonar el repositorio**
```bash
git clone <repo-url>
cd CookTogetherFront
```

2. **Instalar dependencias**
```bash
npm install
```

3. **Configurar variables de entorno**
```bash
# Crear archivo .env.development basado en .env.example
cp .env.example .env.development

# Editar .env.development con tus valores si es necesario
```

4. **Iniciar servidor de desarrollo**
```bash
npm start
```

La aplicación estará disponible en `http://localhost:3000`

## 📁 Estructura del Proyecto

```
src/
├── components/        # Componentes reutilizables
│   └── common/       # Componentes comunes (LoadingSpinner, etc.)
├── config/           # Configuración (axios, API endpoints)
├── contexts/         # Context API (AuthContext)
├── interfaces/       # TypeScript interfaces
├── pages/           # Páginas/views de la aplicación
└── services/        # Servicios de API
```

## 🧪 Testing

```bash
npm test
```

## 🏗️ Build para Producción

```bash
npm run build
```

Esto crea una carpeta `build` con los archivos optimizados para producción.

## 📝 Scripts Disponibles

- `npm start` - Inicia servidor de desarrollo
- `npm build` - Crea build de producción
- `npm test` - Ejecuta tests
- `npm eject` - Expone la configuración de Create React App (irreversible)

## 🔐 Autenticación

La aplicación utiliza:
- JWT tokens almacenados en localStorage
- Context API para manejo de estado de autenticación
- Interceptores de Axios para agregar tokens automáticamente

## 🎯 Funcionalidades

- ✅ Login y registro de usuarios
- ✅ Gestión de recetas (crear, listar, eliminar, publicar)
- ✅ Gestión de ingredientes
- ✅ Gestión de pasos de recetas
- ✅ Roles de usuario (admin/usuario)
- ✅ Interfaz responsive con Bootstrap

## 🤝 Contribuir

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT.

## 👥 Autores

- Tu nombre aquí

## 🙏 Agradecimientos

- Create React App
- Bootstrap
- React Router
