import { IPedido, PedidoModel } from '../models/Pedido.js';
import { IUser, UserModel } from '../models/User.js';
import { addPedidoToUser } from '../services/User.js';

// Create new Pedido
export async function createPedido(data: Partial<IPedido>, username: string): Promise<IPedido|null> {
  // Find User by username
  const userFound = await UserModel.findOne({ username });
  if (!userFound) {
    console.log("Usuario no encontrado");
    return null;
  }

  // Create full pedido object
  const pedido = {
    ...data,
    user: userFound._id
  };

  // Save to database
  const newPedido = new PedidoModel(pedido);
  const savedPedido = await newPedido.save();
  
  // Add reference to user
  await addPedidoToUser(savedPedido.user, savedPedido._id);

  return savedPedido;
}

// Find Pedido by orderid
export async function findPedidoByOrderId(orderid: number): Promise<IPedido|null> {
  return await PedidoModel.findOne({ orderid });
}

// Find Pedidos by price range
export async function findPedidosByPriceRange(min: number, max: number): Promise<IPedido[]> {
  return await PedidoModel.find({ 
    price: { $gte: min, $lte: max } 
  });
}

// Find Pedidos with user details
export async function findPedidosWithUserDetails(): Promise<IPedido[]> {
  return await PedidoModel.find().populate('user', 'name email -_id');
}

// Update Pedido items
export async function updatePedidoItems(orderid: number, items: string[]): Promise<IPedido|null> {
  return await PedidoModel.findOneAndUpdate(
    { orderid }, 
    { items }, 
    { new: true }
  );
}
