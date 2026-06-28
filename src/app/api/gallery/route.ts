import { createHandler } from "@/lib/apiHandlers";
import Gallery from "@/models/Gallery";

const handler = createHandler(Gallery);
export const GET = handler.GET;
export const POST = handler.POST;
