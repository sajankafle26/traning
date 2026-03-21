import { createHandler } from "@/lib/apiHandlers";
import Order from "@/models/Order";

export const { GET, POST } = createHandler(Order);
