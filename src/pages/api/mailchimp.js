import mailchimp from '@mailchimp/mailchimp_marketing';

const apiKey = import.meta.env.MAILCHIMP_API_KEY;
const server = import.meta.env.MAILCHIMP_SERVER;
const audienceID = "8fb942fda2";

mailchimp.setConfig({ 
    apiKey, 
    server
 });

export async function post({ request }) {
    // const _response = await mailchimp.ping.get();
    const { email } = await request.json();

    const response = await mailchimp.lists.addListMember("8fb942fda2", { 
        email_address: email,
     });

    console.log(response, 'response is here');

    return new Response(JSON.stringify({ ok: true, response }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      }
    });
  }