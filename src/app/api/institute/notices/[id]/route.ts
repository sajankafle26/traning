import { createHandler } from "@/lib/apiHandlers";
import Notice from "@/models/Notice";

const handlers = createHandler(Notice);
export const PUT = handlers.PUT;
export const DELETE = handlers.DELETE;
