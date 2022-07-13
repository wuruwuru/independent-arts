import mailchimp from '@mailchimp/mailchimp_marketing';
import crypto from 'crypto'

const apiKey = import.meta.env.MAILCHIMP_API_KEY;
const server = import.meta.env.MAILCHIMP_SERVER;
const audienceID = import.meta.env.MAILCHIMP_AUDIENCE_ID;


mailchimp.setConfig({ 
    apiKey, 
    server
 });

export async function post({ request }) {
	const { email } = await request.json();
	const emailHash = crypto.createHash('md5').update(email).digest('hex');

	const { id, email_address, tags } = await mailchimp.lists.setListMember(audienceID, emailHash, { 
			email_address: email,
			status_if_new: 'subscribed',
			marketing_permissions: {
					enabled: true,
			}
	});

	const data = { id, email_address, tags }

	return new Response(JSON.stringify({ ok: true, data }), {
		status: 200,
		headers: {
			'Content-Type': 'application/json',
		}
	});
}