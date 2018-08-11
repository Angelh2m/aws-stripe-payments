'use strict';
const serverless = require('serverless-http');
const express = require('express');
const app = express();

const { SECRET_KEY } = require('./keys/');
const stripe = require("stripe")(SECRET_KEY);

/* *
 *  Use the express.json instead of bodyparser
 */
app.use(express.urlencoded({ extended: true }));


app.post('/', (req, res) => {

    const token = req.body.token;
    const email = req.body.email

    stripe.charges.create({
            amount: 2000,
            currency: "usd",
            source: token, // obtained with Stripe.js
            description: `Charge for ${ email }`,
            metadata: {
                accepted_terms_and_conditions: true,
            },
        }).then(success => res.status(200).json({ success }))
        .catch(err => res.json({ err }))
});


module.exports.handler = serverless(app);

/* *
 *  Un comment the follow lines to run the local server
 */

// const port = process.env.PORT || 6100;
// app.listen(port, () => {
//     console.log('Server Running');
// });