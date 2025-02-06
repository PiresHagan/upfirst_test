import { Router } from 'express';
import { validateTokenRequest } from '../utils/validators';
import { generateTokens } from '../utils/auth';

const router = Router();

router.post('/token', async (req, res) => {
  const { grant_type, code, client_id, redirect_uri } = req.body;
  console.log(req.body);

  // Validate the token request
  const validationError = validateTokenRequest({
    grantType: grant_type,
    code,
    clientId: client_id,
    redirectUri: redirect_uri
  });

  if (validationError) {
    return res.status(400).json({ error: validationError });
  }

  try {
    // Generate access token and refresh token
    const tokens = await generateTokens();

    res.json({
      access_token: tokens.accessToken,
      token_type: 'bearer',
      expires_in: 3600, // 1 hour
      refresh_token: tokens.refreshToken
    });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

export const tokenRouter = router; 