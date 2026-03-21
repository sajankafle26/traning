import { createHandler } from "@/lib/apiHandlers";
import Teacher from "@/models/Teacher";

const handlers = createHandler(Teacher);
export const GET = handlers.GET;
export const POST = handlers.POST;
