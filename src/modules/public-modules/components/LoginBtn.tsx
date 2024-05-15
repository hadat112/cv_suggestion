import { Button } from 'antd';
import classNames from 'classnames';
import React from 'react';

const LoginBtn = ({ className = '', text = '', ...props }) => (
  <Button
    htmlType="submit"
    type="primary"
    className={classNames('rounded-lg w-full h-12 bg-th-primary dark:text-th-gray-500', className)}
    {...props}
  >
    {text}
  </Button>
);

export default LoginBtn;
