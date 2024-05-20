import { BASE_CONFIGS } from './config';
import { handleCallback, handleLogin, handleLogout, handleRefreshToken, handlerBuilder } from './handler';
import handleGetSession from './handler/getSession';
import { AuthInstance, IAuthClient } from './interfaces';
import getAuthClient from './service/AuthClient';

let instance: AuthInstance;

function getInstance() {
  if (instance) return instance;
  instance = _initAuth();
  return instance;
}

function _initAuth() {
  const client: IAuthClient = getAuthClient(BASE_CONFIGS.issuer);

  return handlerBuilder({
    handleLogin: handleLogin(),
    handleLogout: handleLogout(),
    handleCallback: handleCallback(client),
    handleGetSession: handleGetSession(client),
    handleRefreshToken: handleRefreshToken(client),
  });
}

export const handleAuth = () => getInstance();
