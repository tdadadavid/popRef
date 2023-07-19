import { startApp } from "./app";
import { initializeDbConnection, gracefullyShutdown, logger } from "./core";

initializeDbConnection()
    .then(startApp)
    .catch(gracefullyShutdown);

process.on('uncaughtException', (error: unknown) => {
    logger.debug("Uncaught exception", error);
    process.exit(1);
})

process.on('unhandledRejection', (error: unknown) => {
    logger.debug("Uncaught exception", error);
    process.exit(1);
})