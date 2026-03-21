import { createHandler } from "@/lib/apiHandlers";
import ClassRoom from "@/models/ClassRoom";

const handlers = createHandler(ClassRoom);
export const PUT = handlers.PUT;
export const DELETE = handlers.DELETE;
