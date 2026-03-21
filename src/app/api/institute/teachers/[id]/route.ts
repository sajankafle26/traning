import { createHandler } from "@/lib/apiHandlers";
import Teacher from "@/models/Teacher";

const handlers = createHandler(Teacher);
export const PUT = handlers.PUT;
export const DELETE = handlers.DELETE;
