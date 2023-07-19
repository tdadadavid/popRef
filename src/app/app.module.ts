import { createServer } from "http";

import {config} from "../core";
import { app } from "./app.service";
import { dispatch } from "./app.events";

export const startApp = async () => {
    const server = createServer(app);
    server.listen(config.port, () => dispatch("app:up"));
}
