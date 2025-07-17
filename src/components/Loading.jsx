import React from 'react';
import { Spin } from 'antd';

const Loading = () => 
    (
    <div className='w-[100%] h-screen flex justify-center items-center bg-null'>
        <Spin/>
    </div>
);

export default Loading;