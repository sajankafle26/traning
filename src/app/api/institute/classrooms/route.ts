import { createHandler } from "@/lib/apiHandlers";
import ClassRoom from "@/models/ClassRoom";

const handlers = createHandler(ClassRoom);
export const GET = handlers.GET;
export const POST = handlers.POST;
