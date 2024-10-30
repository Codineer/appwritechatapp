import { Account, Client, Databases } from "appwrite";

export const PROJECT_ID = import.meta.env.PROJECT_ID
export const DATABASE_ID = import.meta.env.DATABASE_ID
export const COLLECTION_ID_MESSAGES = import.meta.env.COLLECTION_ID_MESSAGES
const client = new Client();

client
    .setEndpoint('https://cloud.appwrite.io/v1')
    .setProject(import.meta.env.PROJECT_ID);

export const databases = new Databases(client)
export const account = new Account(client)
export default client