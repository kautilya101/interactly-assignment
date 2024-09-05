import express from 'express';
import twilio from 'twilio'
import dotenv from 'dotenv'

dotenv.config();

const app = express();

const accountSid = process.env.ASID; 
const authToken = process.env.AUTH_TOKEN; 
const client = twilio(accountSid, authToken);

const TWILIO_PHONE_NUMBER = process.env.PHONE_NUMBER; 

app.use(express.urlencoded({ extended: true }));

app.post('/handleCall', async(req, res) => {
    const { Digits } = req.body;
    
    if (Digits === '1') {
      try{
        const message = await client.messages.create({
          body: 'Here is your personalized interview link: https://v.personaliz.ai/?id=9b697c1a&uid=fe141702f66c760d85ab&mode=test',
          from: TWILIO_PHONE_NUMBER,
          to: '+918287271936' 
        })
        console.log(message.sid)
      }
      catch(e){
        console.error(e);
      }
    }
    res.type('text/xml');
    res.send(`
        <Response>
            <Gather action="/handleCall" method="POST">
                <Say>Welcome to the IVR system. Press 1 to receive your personalized interview link.</Say>
            </Gather>
            <Pause length="5"/>
            <Say>Goodbye.</Say>
        </Response>
    `);
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});

// To initiate the call
client.calls.create({
    url: 'http://localhost:3000/handleCall',
    to: '+918287271936',
    from: TWILIO_PHONE_NUMBER,
})
.then(call => console.log(call.sid))
.catch(error => console.error(error));
