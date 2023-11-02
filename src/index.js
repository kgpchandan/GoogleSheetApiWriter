import express from 'express';

import { ZodError, z } from 'zod';

import sheets, { SHEET_ID } from './gsheetClient.js';
 
import  cors  from "cors"; 
  
// Creating express object 

 const app = express(); 
// Using cors middleware to allow all origins 
app.use(cors()); 

app.use(express.json());
app.use(express.static('public'));

const formSchema = z.object(
    {
        name: z.string().min(1,{message:'Name is a required field'}),
        phone: z.string().min(10, { message: 'Phone no. is a required field' }),
        email: z.string().email(),
        dob:z.string(),
        location: z.string(),
        language:z.string(),
    }
)


app.post('/send-message', async (req, res) =>
{
    try
    {
        const body = formSchema.parse(req.body);
        const dataRow = Object.values(body);
        
        await sheets.spreadsheets.values.append
            ({
        spreadsheetId: SHEET_ID,
        range: 'Sheet1!A:F',
        insertDataOption: 'INSERT_ROWS',
        valueInputOption: 'RAW',
        requestBody: {
                        values: [dataRow],
                     },
            });
        res.json({message:"data added successfully"})
    }
    catch (error)
    {
        if (error instanceof ZodError)
        { 
            res.status(400).json({ error: error.message });
        }
         else
        { 
            res.status(400).json({ error });
        }

        // console.log( 'error' + error.message);
    }
   // console.log(req.body);
})
app.listen(5555,()=> console.log('express app running'))
