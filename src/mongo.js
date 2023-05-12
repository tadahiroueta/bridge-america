import { App, Credentials } from 'realm-web'

const REALM_APP_ID = process.env.REACT_APP_REALM_APP_ID;
export const app = new App({ id: REALM_APP_ID });
export const credentials = Credentials.anonymous();