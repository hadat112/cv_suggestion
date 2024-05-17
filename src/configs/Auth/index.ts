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
    handleCallback: handleCallback(client),
    handleLogout: handleLogout(),
    handleRefreshToken: handleRefreshToken(client),
    handleGetSession: handleGetSession(client),
  });
}

export const handleAuth = () => getInstance();
