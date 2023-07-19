import * as express from "express";
import * as cors from "cors";
import helmet from "helmet";
import * as morgan from "morgan";
import * as compression from "compression";


import { corsOptions, notFoundHandler, errorHandler, globalRateLimiter  } from "../core";
import { appRouter } from "./app.router";

export const app = express();

app.use(express.json());
app.use(helmet());
app.use(morgan('dev'));
app.use(compression());
app.use(globalRateLimiter)
app.use(cors(corsOptions));
app.use("/api/v1", appRouter);
app.use(notFoundHandler.handle);
app.use(errorHandler.handle);