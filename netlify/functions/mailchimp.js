// const Parse = require('parse/node');
const axios = require('axios');
const crypto = require('crypto');


const mailChimpAPI = process.env.MAILCHIMP_API_KEY;
const mailChimpListID = process.env.MAILCHIMP_AUDIENCE_ID;
const mailChimpServer = process.env.MAILCHIMP_SERVER;


exports.handler = async (event) => {
  let body = {}
  body = JSON.parse(event.body)

  if (!body.email) {
    console.log('missing email')
    return {
      statusCode: 400,
      body: JSON.stringify({
        error: 'missing email'
      })
    }
  }

  if (!mailChimpAPI) {
    console.log('missing mailChimpAPI key')
    return {
      statusCode: 400,
      body: JSON.stringify({
        error: 'missing mailChimpAPI key'
      })
    }
  }

  if (!mailChimpListID) {
    console.log('missing mailChimpListID key')
    return {
      statusCode: 400,
      body: JSON.stringify({
        error: 'missing mailChimpListID key'
      })
    }
  }

  const emailHash = crypto.createHash('md5').update(body.email).digest('hex');
  // const subscriber = (data);
  const url = `https://${mailChimpServer}.api.mailchimp.com/3.0/lists/${mailChimpListID}/members/${emailHash}`;
  const config = {
    method: 'put',
    url,
    data: JSON.stringify({
      email_address: body.email,
      status_if_new: "pending"
    }),
    auth: {
      username: 'key',
      password: mailChimpAPI
    }
  }
  try {
    const response = await axios(config);
    const { email_address, status } = response.data;

    return {
      statusCode: response.status || 200,
      body: JSON.stringify({
        ok: true,
        data: {
          email: email_address,
          status,
        }
      })
    }

  } catch (error) {

    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      console.log(error.response.status, 'out of range');
      return {
        statusCode: 400,
        body: JSON.stringify({ ok: true, data: error?.response?.data })
      }
    } else if (error.request) {
      // The request was made but no response was received
      console.log(error.request, 'error.request');
      return {
        statusCode: 400,
        body: JSON.stringify({ ok: true, data: error?.response?.data })
      }
    } else {
      return {
        statusCode: 500,
        body: JSON.stringify({
          ok: false,
          ...error
        })
      }
    }
  }
};