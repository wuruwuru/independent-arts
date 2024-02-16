const axios = require('axios');

const audiencefulKey = process.env.AUDIENCEFUL_KEY;
const audiencefulServer = process.env.AUDIENCEFUL_SERVER;

module.exports = async (req, res) => {
  let body = {}
  body = JSON.parse(req.body);

  if (!body.email) {
    console.log('missing email');
    res.status(400).json({
      error: 'missing email'
    })
  }

  if (!audiencefulKey) {
    console.log('missing audiencefulKey')
    res.status(400).json({
      error: 'missing audiencefulKey'
    })
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

    res.status(200).json({
      message: 'success',
      data: response.data
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: 'internal server error'
    });
  }
};