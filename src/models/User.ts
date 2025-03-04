import { ObjectId, Schema, model } from "mongoose";


// 1. Create an interface representing a TS object.
export interface IUser {
  _id?: any;
  name: string;
  email: string;
  username: string;
  phone?: string;
  address?: {
    street: string;
    city: string;
  };
  pedidos?: ObjectId[]
}

// 2. Create a Schema corresponding to the document in MongoDB.
const userSchema = new Schema<IUser>({
  name: { type: String, required: true },
  email: { type: String, required: true },
  username: { type: String, required: true},
  phone: String,
  address: {
    street: String,
    city: String
  },
  pedidos: [{ type: Schema.Types.ObjectId, ref: 'Pedido' }]
});

// 3. Create a Model.
export const UserModel = model('User', userSchema);