import { Client, Account, TablesDB, Storage, Functions } from "appwrite";

export const client = new Client();

client
    .setEndpoint(import.meta.env.VITE_APPWRITE_PROJECT_ENDPOINT) // Your Appwrite Endpoint
    .setProject(import.meta.env.VITE_APPWRITE_PROJECT_ID)
;

export const account = new Account(client);
export const tablesDB = new TablesDB(client);
export const storage = new Storage(client);

export  {ID} from 'appwrite'

const functions = new Functions(client);

export const createStripeSession = async (amount: number) => {
  const res = await functions.createExecution(
    "69db23cac39551b65501", 
    JSON.stringify({ amount })
  );

  return JSON.parse(res.responseBody);
};
