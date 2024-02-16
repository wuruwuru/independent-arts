const axios = require('axios');

const audiencefulKey = process.env.AUDIENCEFUL_KEY;
const audiencefulServer = process.env.AUDIENCEFUL_SERVER;

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

  if (!audiencefulKey) {
    console.log('missing audiencefulKey')
    return {
      statusCode: 400,
      body: JSON.stringify({
        error: 'missing audiencefulKey'
      })
    }
  }

  const url = `https://${audiencefulServer}/people`;
  const config = {
    method: 'post',
    url,
    data: JSON.stringify({
      email: body.email,
      tags: "website"
    }),
    headers: {
      'Content-Type': 'application/json',
      'X-Api-Key': audiencefulKey,
    }
  }
  try {
    const response = await axios(config);
    const { email } = response.data;

    return {
      statusCode: response.status || 200,
      body: JSON.stringify({
        ok: true,
        data: {
          email
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