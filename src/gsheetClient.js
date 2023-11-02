import { google } from 'googleapis';

import key from '../secretGS.json' assert {type:'json'}


export const SHEET_ID = "197v1jq84By0IuyQb5ul4JCby8t22_r6LVlKwqODa5ao";

const client = new google.auth.JWT(key.client_email, null, key.private_key, ['https://www.googleapis.com/auth/spreadsheets'])

const sheets = google.sheets({ version: 'v4', auth: client });

export default sheets;