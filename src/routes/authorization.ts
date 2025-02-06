import { Router } from 'express';
import { validateAuthorizationRequest } from '../utils/validators';
import { generateAuthorizationCode } from '../utils/auth';

const router = Router();

router.get('/authorize', (req, res) => {
  const { response_type, client_id, redirect_uri, state } = req.query;

  console.log('Authorization Request:', {
    response_type,
    client_id,
    redirect_uri,
    state
  });

  // Validate the request
  const validationError = validateAuthorizationRequest({
    responseType: response_type as string,
    clientId: client_id as string,
    redirectUri: redirect_uri as string
  });

  if (validationError) {
    return res.status(400).json({ error: validationError });
  }

  // Generate authorization code
  const code = generateAuthorizationCode();

  // Construct redirect URL
  const redirectUrl = new URL(redirect_uri as string);
  redirectUrl.searchParams.append('code', code);

  if (state) {
    redirectUrl.searchParams.append('state', state as string);
  }

  console.log('Redirecting to:', redirectUrl.toString());

  // For testing: if request comes from Postman or curl, return JSON
  const userAgent = req.get('User-Agent') || '';
  const isTestClient = userAgent.includes('Postman') || userAgent.includes('curl');

  if (isTestClient) {
    return res.status(302).json({
      Location: redirectUrl.toString(),
      status: 302,
      statusText: 'Found'
    });
  }

  // Normal flow: Set status to 302 Found and include Location header
  res.status(302).set('Location', redirectUrl.toString()).end();
});

export const authorizationRouter = router; 