import * as express from "express";
import * as cors from "cors";
import helmet from "helmet";
import * as morgan from "morgan";
import * as compression from "compression";


import { corsOptions, notFoundErrorHandler, errorHanlder, globalRateLimiter  } from "../core";
import { appRouter } from "./app.router";
import { currentUser } from "../auth";

export const app = express();

app.use(express.json());
app.use(helmet());
app.use(morgan('dev'));
app.use(compression());
app.use(globalRateLimiter)
app.use(cors(corsOptions));
app.use(currentUser.handle);
app.use("/api/v1", appRouter);
app.use(notFoundErrorHandler.handle);
app.use(errorHanlder.handle);