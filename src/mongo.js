import { App, Credentials } from 'realm-web'

const REALM_APP_ID = "application-1-rpvhe";
export const app = new App({ id: REALM_APP_ID });
export const credentials = Credentials.anonymous();