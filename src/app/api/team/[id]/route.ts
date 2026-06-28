import { createHandler } from "@/lib/apiHandlers";
import Team from "@/models/Team";

const handler = createHandler(Team);
export const DELETE = handler.DELETE;
export const GET = handler.GET;
export const PUT = handler.PUT;
