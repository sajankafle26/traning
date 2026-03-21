import { createHandler } from "@/lib/apiHandlers";
import InstituteStudent from "@/models/InstituteStudent";

const handlers = createHandler(InstituteStudent);
export const PUT = handlers.PUT;
export const DELETE = handlers.DELETE;
