import mongoose from 'mongoose';
import config from '../config';

export const connectToDatabase = async (): Promise<void> => {
    try {
        await mongoose.connect(config.local_database_url as string);
        // eslint-disable-next-line no-console
        console.log(' Connected To Database');
    } catch (error) {
        // eslint-disable-next-line no-console
        console.log('⚠️ Error to connect Database');
    }
};
