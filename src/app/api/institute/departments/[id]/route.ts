import { createHandler } from "@/lib/apiHandlers";
import Department from "@/models/Department";

const handlers = createHandler(Department);
export const PUT = handlers.PUT;
export const DELETE = handlers.DELETE;
