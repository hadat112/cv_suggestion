import { Input } from 'antd';
import classNames from 'classnames';
import React from 'react';

const LoginPasswordInput = ({ className = '', ...props }) => (
  <Input.Password
    {...props}
    className={classNames(
      'rounded-lg h-12 px-4 py-3 border-th-border placeholder:text-th-text-strock placeholder:text-sm',
      className,
    )}
  />
);

export default LoginPasswordInput;
