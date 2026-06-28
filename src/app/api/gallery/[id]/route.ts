import { createHandler } from "@/lib/apiHandlers";
import Gallery from "@/models/Gallery";

const handler = createHandler(Gallery);
export const DELETE = handler.DELETE;
export const GET = handler.GET;
export const PUT = handler.PUT;
