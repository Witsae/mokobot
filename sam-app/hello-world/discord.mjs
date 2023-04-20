import { default as nacl } from 'tweetnacl';

export const lambdaHandler = async (event, context) => {

    const PUBLIC_KEY = 'd8b2ce2ce0e06eb3fc8140c3b26209442344b54115513db088d2bb4e41a41fc0';
    const signature = event.headers['x-signature-ed25519'];
    const timestamp = event.headers['x-signature-timestamp'];
    const strBody = event.body;

    const isVerified = nacl.sign.detached.verify(
      Buffer.from(timestamp + strBody),
      Buffer.from(signature, 'hex'),
      Buffer.from(PUBLIC_KEY, 'hex')
    );

    if (!isVerified) {
        return {
            statusCode: 401,
            body: JSON.stringify('invalid request signature'),
        };
    }

    // Replying to ping (requirement 2.)
    const body = JSON.parse(strBody)
    if (body.type === 1) {
        return {
            statusCode: 200,
            body: JSON.stringify({ "type": 1 }),
        }
    }

    // Handle /foo Command
    if (body.data.name === 'foo') {
        return JSON.stringify({  // Note the absence of statusCode
            "type": 4,  // This type stands for answer with invocation shown
            "data": { "content": "bar" }
        })
    }

    return {
        statusCode: 404  // If no handler implemented for Discord's request
    }
};
