const axios = require('axios');

const audiencefulKey = process.env.AUDIENCEFUL_KEY;

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

  const url = `https://app.audienceful.com/api/people`;
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