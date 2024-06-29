# Quiosco con Next.js

### Descripción
En este proyecto se construyó un quiosco de comida para un negocio. 
Dicho proyecto cuenta con varias interfaces, cada una para cumplir una función y satisfacer una necesidad en especifico.

- La pantalla principal mostrará el menú de comida con 2 barras laterales, la primera mostrara las categorias de alimentos para seleccionar, la segunda barra mostrará los productos seleccionados, el total a pagar y el boton para confirmar la orden.

- El panel del administrador permitirá a cocina gestionar las ordenes y productos disponibles en el menú, todo esto en tiempo real.

### Vista en vivo
[Link aqui](https://quisco-next-app.vercel.app/order/cafe)

### Tecnologías usadas
- Next.js
- TypeScript
- Tailwind
- Prisma
- React
- Zustand
- Zod
- PostgreSQL

### Instalación
1. Clonar el repositorio `git clone https://github.com/EnocDE/quisco-next.git`
2. Instalar dependencias del proyecto `npm install`
3. Crea el archivo .env con las siguientes variables de entorno:
```
DATABASE_URL=databaseUrl
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=cloudinaryName
NEXT_PUBLIC_CLOUDINARY_API_KEY=cloudinaryKey
CLOUDINARY_API_SECRET=cloudinaryApiSecret
```
4. Ejecuta los siguientes comandos:
```
npx prisma generate
npx prisma seed
```
5. Inicializar el proyecto `npm run dev`

## Capturas de pantalla
Interfaz del menú
![Menú](https://res.cloudinary.com/djhttc5bd/image/upload/v1716265908/Captura_de_pantalla_2024-05-20_222907_ope75i.png)

Interfaz de las ordenes
![Ordenes](https://res.cloudinary.com/djhttc5bd/image/upload/v1716266417/Captura_de_pantalla_2024-05-20_224000_pkghdd.png)

Interfaz de administrador para gestionar los productos
![Administrador](https://res.cloudinary.com/djhttc5bd/image/upload/v1716265908/Captura_de_pantalla_2024-05-20_222930_cbmpud.png)

Agregar nuevo producto
![Agregar nuevo producto](https://res.cloudinary.com/djhttc5bd/image/upload/v1716265908/Captura_de_pantalla_2024-05-20_223106_inx3nn.png)
