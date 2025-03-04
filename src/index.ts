import { startConnection } from './database.js';
import { IUser } from './models/User.js';
import { IPedido } from './models/Pedido.js';
import { createUser, findUserByUsername, updateUserAddress, findAllUsers } from './services/User.js';
import { createPedido, findPedidoByOrderId, findPedidosByPriceRange, findPedidosWithUserDetails, updatePedidoItems } from './services/Pedido.js';

async function main() {
  await startConnection();

  // Create users
  const user1: IUser = {
    name: "María López",
    username: "marialopez",
    email: "maria@ejemplo.com",
    phone: "555-123-4567",
    address: {
      street: "Calle Diagonal 123",
      city: "Barcelona"
    }
  }
  
  const user2: IUser = {
    name: "Pedro Ramírez",
    username: "pedroramirez",
    email: "pedro@ejemplo.com",
    phone: "555-987-6543"
  }

  // Insert users
  const newUser1 = await createUser(user1);
  console.log('Usuario 1 creado:', newUser1?.name);
  
  const newUser2 = await createUser(user2);
  console.log('Usuario 2 creado:', newUser2?.name);

  // Update user address
  if (newUser2?._id) {
    const updatedUser = await updateUserAddress(
      newUser2._id.toString(),
      "Calle Mayor 45",
      "Madrid"
    );
    console.log('Dirección actualizada para:', updatedUser?.name);
  }

  // Create pedidos
  const pedido1: Partial<IPedido> = {
    orderid: 1001,
    items: ["Laptop HP", "Mouse inalámbrico"],
    price: 899.99
  }
  
  const pedido2: Partial<IPedido> = {
    orderid: 1002,
    items: ["Monitor 27\"", "Teclado mecánico", "Webcam HD"],
    price: 459.50
  }
  
  const pedido3: Partial<IPedido> = {
    orderid: 1003,
    items: ["Disco duro SSD 1TB"],
    price: 129.95
  }

  // Insert pedidos for users
  const newPedido1 = await createPedido(pedido1, "marialopez");
  console.log('Pedido 1 creado con ID:', newPedido1?.orderid);
  
  const newPedido2 = await createPedido(pedido2, "marialopez");
  console.log('Pedido 2 creado con ID:', newPedido2?.orderid);
  
  const newPedido3 = await createPedido(pedido3, "pedroramirez");
  console.log('Pedido 3 creado con ID:', newPedido3?.orderid);

  // Find pedido by orderid
  const foundPedido = await findPedidoByOrderId(1001);
  console.log('Pedido encontrado:', foundPedido?.orderid, 'precio:', foundPedido?.price);

  // Find pedidos in price range
  const affordablePedidos = await findPedidosByPriceRange(100, 500);
  console.log('Pedidos entre 100 y 500:', affordablePedidos.length);
  affordablePedidos.forEach((p: IPedido) => {
    console.log(`- Pedido ${p.orderid}: ${p.price}€`);
  });

  // Update pedido items
  const updatedPedido = await updatePedidoItems(1003, ["Disco duro SSD 1TB", "Cable HDMI 2m"]);
  console.log('Items actualizados para pedido:', updatedPedido?.orderid);
  console.log('Nuevos items:', updatedPedido?.items);

  // Find pedidos with user details
  const pedidosWithUsers = await findPedidosWithUserDetails();
  console.log('Pedidos con detalles de usuario:');
  pedidosWithUsers.forEach((p: IPedido) => {
    const user = p.user as any;
    console.log(`- Pedido ${p.orderid}: Usuario ${user.name}, Email: ${user.email}`);
  });

  // Find all users (with populated pedidos)
  const allUsers = await findAllUsers();
  console.log(`Se encontraron ${allUsers.length} usuarios en total`);
}

main().catch(error => console.error('Error en la ejecución:', error));