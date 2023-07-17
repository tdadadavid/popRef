import { startApp } from "./app";
import { initializeDbConnection, gracefullyShutdown } from "./core";

initializeDbConnection()
    .then(startApp)
    .catch(gracefullyShutdown);