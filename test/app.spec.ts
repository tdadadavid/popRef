import { createServer } from "http"; 
import request from "supertest";

import { app } from "../src/app"

describe('App Health', () => {


    let server;
    beforeAll(() => {
        server = createServer(app);
    })


    it('should return 200 Ok response when the /health endpoint is down', async () => {
        const response = request(server).get('/api/v1/health');
        expect(response.statusCode).toBe(200);
    })
})