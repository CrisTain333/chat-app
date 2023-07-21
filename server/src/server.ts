import mongoose from 'mongoose';
import config from './config';
import app from './app';
// import { errorLogger, logger } from './shared/logger';
import { Server } from 'http';

process.on('uncaughtException', error => {
    console.log(error);
    process.exit(1);
});

let server: Server;

async function fire() {
    try {
        await mongoose.connect(config.database_url as string);
        console.log('🛢 Connected To Database');
        server = app.listen(config.port, () => {
            console.log(
                `Server Fire in http:localhost//${config.port}`
            );
        });
    } catch (error) {
        console.log('Error to connect Database');
    }

    process.on('unhandledRejection', error => {
        if (server) {
            server.close(() => {
                console.log(error);
                process.exit(1);
            });
        } else {
            process.exit(1);
        }
    });
}

fire();

process.on('SIGTERM', () => {
    console.log('SIGTERM received');
    if (server) {
        server.close();
    }
});
