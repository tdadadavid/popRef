import Redis from "ioredis";

export const cache = new Redis({
    port: 6379,
    host: '127.0.0.1',
});
