import { Account, Client, Databases } from "appwrite";

export const PROJECT_ID = '66dc695e0020986b7c95'
export const DATABASE_ID = '66dcb715002c347f507c'
export const COLLECTION_ID_MESSAGES = '66dcb7270013a62f8fde'
const client = new Client();

client
    .setEndpoint('https://cloud.appwrite.io/v1')
    .setProject('66dc695e0020986b7c95');

export const databases = new Databases(client)
export const account = new Account(client)
export default client