// const Parse = require('parse/node');
const axios = require('axios');
const crypto = require('crypto');


const mailChimpAPI = process.env.MAILCHIMP_API_KEY;
const mailChimpListID = process.env.MAILCHIMP_AUDIENCE_ID;
const mailChimpServer = process.env.MAILCHIMP_SERVER;


exports.handler = (event, context, callback) => {
  let body = {}
  body = JSON.parse(event.body)

  if (!body.email) {
    console.log('missing email')
    return callback(null, {
      statusCode: 400,
      body: JSON.stringify({
        error: 'missing email'
      })
    })
  }

  if (!mailChimpAPI) {
    console.log('missing mailChimpAPI key')
    return callback(null, {
      statusCode: 400,
      body: JSON.stringify({
        error: 'missing mailChimpAPI key'
      })
    })
  }

  if (!mailChimpListID) {
    console.log('missing mailChimpListID key')
    return callback(null, {
      statusCode: 400,
      body: JSON.stringify({
        error: 'missing mailChimpListID key'
      })
    })
  }

  const data = {
    email_address: body.email,
    status_if_new: "pending",
    merge_fields: {}
  };
  const emailHash = crypto.createHash('md5').update(body.email).digest('hex');
  const subscriber = JSON.stringify(data);
  const url = `https://${mailChimpServer}.api.mailchimp.com/3.0/lists/${mailChimpListID}/members/${emailHash}`;

  axios(
    {
      method: 'put',
      url,
      data: subscriber,
      auth: {
        username: 'apikey',
        password: mailChimpAPI
      }
    }
  ).then(function(response){

    // Return data to AJAX request
    return callback(null, {
      statusCode: 200,
      body: JSON.parse({ ok: true, data: {
        status: response.data.status,
        email: response.data.email_address,
      } })
    })
  }).catch(function(error) {
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      return callback(null, {
            statusCode: 400,
            body: JSON.stringify({ ok: true, data: error.response.data })
        })
    } else if (error.request) {
      // The request was made but no response was received
      console.log(error.request, 'error.request');
    } else {
      // Something happened in setting up the request that triggered an Error
      console.log('Error', error.message);
    }
    return callback(null, {
        statusCode: 400,
        body: JSON.stringify({ ok: true, data: error.response.data })
    })
  });
};