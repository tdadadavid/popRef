import * as dotenv from "dotenv";

dotenv.config();


export const config = Object.freeze({
    port: parseInt(process.env.PORT!),
    appEnvironment: process.env.NODE_ENV as string,
    mail: {
        globalFrom: process.env.MAIL_FROM || "davidtofunmidada@gmail.com" as string,
        smtpHost: "smtp.gmail.com",
        smtpPort: 465,
        smtpUsername: process.env.USER_EMAIL,
        smtpClientId: process.env.CLIENT_ID as string,
        smtpClientSecret: process.env.CLIENT_SECRET as string,
        smtpRefreshToken: process.env.REFRESH_TOKEN as string,
    },
    auth: {
        accessTokenSecret: process.env.ACCESS_TOKEN as string,
        accessTokenExpiresIn: process.env.ACCESS_TOKEN_SECRET as string,
        refreshTokenSecret: process.env.REFRESH_TOKEN as string,
        refreshTokenExpiresIn: process.env.REFRESH_TOKEN_SECRET as string,
    },
    db: {
        dbUser: process.env.DATABASE_USER as string ,
        dbPassword: process.env.DATABASE_PASSWORD as string,
        dbHost: process.env.DATABASE_HOST as string ,
        dbPort: process.env.DATABASE_PORT as string,
        dbPool: process.env.DATABASE_POOL as string,
        dbName: process.env.DATABASE_NAME as string
    },
    rateLimit: {
        limit: process.env.WINDOW_RATE_LIMIT
    }, 
});
