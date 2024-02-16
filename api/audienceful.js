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

  const apiUrl = `https://app.audienceful.com/api/people/`;
  const headers = {
    'Content-Type': 'application/json',
    'X-Api-Key': audiencefulKey,
  }
  const postData = {
    email: body.email,
    tags: "website"
  }

  try {
    const response = await axios.post(apiUrl, postData, { headers });
    console.log(response);
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