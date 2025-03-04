import { Types, Schema, model } from "mongoose";

export interface IPedido {
  orderid: number;
  user: Types.ObjectId;
  items: string[];
  price: number;
}

const PedidoSchema = new Schema<IPedido>({
  orderid: { type: Number, required: true, unique: true },
  user: { type: Schema.Types.ObjectId, ref: "User" },
  items: [{ type: String }],
  price: { type: Number, required: true }
});

export const PedidoModel = model("Pedido", PedidoSchema);
