interface AuthorizationRequest {
  responseType: string;
  clientId: string;
  redirectUri: string;
}

interface TokenRequest {
  grantType: string;
  code: string;
  clientId: string;
  redirectUri: string;
}

const VALID_CLIENT_ID = 'upfirst';
const VALID_REDIRECT_URI = 'http://localhost:8081/process';

export function validateAuthorizationRequest(req: AuthorizationRequest): string | null {
  if (req.responseType !== 'code') {
    return 'invalid_request: response_type must be code';
  }

  if (req.clientId !== VALID_CLIENT_ID) {
    return 'invalid_client: client_id is invalid';
  }

  if (req.redirectUri !== VALID_REDIRECT_URI) {
    return 'invalid_request: redirect_uri is invalid';
  }

  return null;
}

export function validateTokenRequest(req: TokenRequest): string | null {
  if (req.grantType !== 'authorization_code') {
    return 'invalid_grant: grant_type must be authorization_code';
  }

  if (req.clientId !== VALID_CLIENT_ID) {
    return 'invalid_client: client_id is invalid';
  }

  if (req.redirectUri !== VALID_REDIRECT_URI) {
    return 'invalid_request: redirect_uri is invalid';
  }

  if (!req.code) {
    return 'invalid_request: code is required';
  }

  return null;
} 