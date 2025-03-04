import { IUser, UserModel } from '../models/User.js';
import { Types } from 'mongoose';

// Insert User
export async function createUser(user: Partial<IUser>): Promise<IUser|null> {
  const newUser = new UserModel(user);
  return await newUser.save()
}

// Find User by _id
export async function findUserById(id: string): Promise<IUser|null> {
  return await UserModel.findById(id);
}

// Find User by username
export async function findUserByUsername(username: string): Promise<IUser|null> {
  return await UserModel.findOne({username: username});
}

// Update User address
export async function updateUserAddress(id: string, street: string, city: string): Promise<IUser|null> {
  return await UserModel.findByIdAndUpdate(
    id, 
    { address: { street, city } }, 
    { new: true }
  );
}

// Add Pedido to User
export async function addPedidoToUser(userId: Types.ObjectId, pedidoId: Types.ObjectId): Promise<void|null> {
  return await UserModel.findByIdAndUpdate(userId, {$addToSet:{pedidos: pedidoId}});
}

// Find All Users
export async function findAllUsers(): Promise<IUser[]> {
  return await UserModel.find();
}