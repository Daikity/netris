import React from 'react';

import { MdOutlineForward30 } from "react-icons/md";

interface AddTimeProps {
  updateTime: () => void;
}

export const AddTime: React.FC<AddTimeProps> = ({ updateTime }) => {
  return <MdOutlineForward30 className='control' onClick={updateTime}  />;
};
