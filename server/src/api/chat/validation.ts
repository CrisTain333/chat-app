import { z } from 'zod';

const createChatZodSchema = z.object({
    body: z.object({
        senderId: z.string({
            required_error: 'Sender Id is required'
        }),
        receiverId: z.string({
            required_error: 'Receiver Id is required'
        })
    })
});

export const chatValidation = { createChatZodSchema };
