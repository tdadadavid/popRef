import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import compression from "compression";
import rateLimit from "express-rate-limit";


import { corsOptions, notFoundErrorHandler, errorHanlder, rateLimitOptions  } from "../core";
import { appRouter } from "./app.router";
import { currentUser } from "../auth";


export const app = express();

app.use(express.json());
app.use(helmet());
app.use(morgan('combined'));
app.use(compression());
app.use(rateLimit(rateLimitOptions))
app.use(cors(corsOptions));
app.use(currentUser.handle);
app.use("/api/v1", appRouter);
app.use(notFoundErrorHandler.handle);
app.use(errorHanlder.handle);