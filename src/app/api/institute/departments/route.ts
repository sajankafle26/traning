import { createHandler } from "@/lib/apiHandlers";
import Department from "@/models/Department";

const handlers = createHandler(Department);
export const GET = handlers.GET;
export const POST = handlers.POST;
