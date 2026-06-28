import { createHandler } from "@/lib/apiHandlers";
import Team from "@/models/Team";

const handler = createHandler(Team);
export const GET = handler.GET;
export const POST = handler.POST;
