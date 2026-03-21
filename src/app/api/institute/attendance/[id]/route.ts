import { createHandler } from "@/lib/apiHandlers";
import Attendance from "@/models/Attendance";

const handlers = createHandler(Attendance);
export const PUT = handlers.PUT;
export const DELETE = handlers.DELETE;
