import React from 'react';
import { Badge, Button } from 'antd';

const RightHeader = () => {
  return (
    <div className="flex items-center gap-6">
      <Badge className="cursor-pointer" count={1} size="small">
        <span className="flex items-center text-th-primary text-2xl"></span>
      </Badge>

      <Button id="menu-btn" type="text">
        <span className="flex items-center text-th-primary cursor-pointer"></span>
      </Button>
    </div>
  );
};

export default RightHeader;
