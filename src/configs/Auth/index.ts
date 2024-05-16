/* eslint-disable no-unused-vars */
import {
  handleLogin,
  handleLogout,
  handleRefreshToken,
  handlerBuilder,
  handleLoginWith3rdParty,
  handleCallback,
} from './handler';
import AuthClient from './service/AuthClient';
import { AuthInstance } from './interfaces';
import handleGetSession from './handler/getSession';
import { getConfig } from './config';

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
