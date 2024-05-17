import { getConfig } from './config';
/* eslint-disable no-unused-vars */
import {
  handleCallback,
  handleLogin,
  handleLoginWith3rdParty,
  handleLogout,
  handleRefreshToken,
  handlerBuilder,
} from './handler';
import handleGetSession from './handler/getSession';
import { AuthInstance } from './interfaces';
import AuthClient from './service/AuthClient';

let instance: AuthInstance;

function getInstance() {
  if (instance) return instance;
  instance = _initAuth();
  return instance;
}

function _initAuth() {
  const baseConfig = getConfig();
  const { getClient } = AuthClient(`${baseConfig.issuer}/iam/api/v1`);
  const defaultParams = { baseConfig, getClient };

  const handleAuth = handlerBuilder({
    handleLogin: handleLogin(defaultParams),
    handleCallback: handleCallback(defaultParams),
    handleLoginWith3rdParty: handleLoginWith3rdParty(defaultParams),
    handleLogout: handleLogout(defaultParams),
    handleRefreshToken: handleRefreshToken(defaultParams),
    handleGetSession: handleGetSession(defaultParams),
  });

  return {
    handleAuth,
  };
}

export const handleAuth = () => getInstance().handleAuth;
