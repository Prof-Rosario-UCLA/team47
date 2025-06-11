import { SecretManagerServiceClient } from '@google-cloud/secret-manager';
const secretsToPull = ['OPENAI_API_KEY', 'REDIS_HOST', 'REDIS_PORT', 'JWT_SECRET', 'DATABASE_URL'];
import dotenv from 'dotenv';

export function runningOnAppEngine() {
    return !!process.env.GAE_ENV || !!process.env.GAE_SERVICE;
}

export async function loadConfig() {
    if (!runningOnAppEngine()) {
        dotenv.config({ path: 'server/.env' });
        console.log('Loaded vars from .env');
    } else {
        const client = new SecretManagerServiceClient();
        const project = process.env.GOOGLE_CLOUD_PROJECT;
        await Promise.all(secretsToPull.map(async name => {
            const [v] = await client.accessSecretVersion({
                name: `projects/${project}/secrets/${name}/versions/latest`,
            });
            process.env[name] = v.payload.data.toString('utf8');
            console.log(`Loaded secret ${name}`);
            console.log(v.payload.data.toString('utf8'))
        }));
    }
}