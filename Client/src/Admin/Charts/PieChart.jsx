import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { Pie } from '@ant-design/plots';

const PieChart = () => {
  const data = [
    {
      type: 'Cotton',
      value: 27,
    },
    {
      type: 'Wool',
      value: 25,
    },
    {
      type: 'Nylon',
      value: 18,
    },
    {
      type: 'Polyster',
      value: 15,
    },
    
  ];
  const config = {
    appendPadding: 10,
    data,
    angleField: 'value',
    colorField: 'type',
    radius: 0.9,
    label: {
      type: 'inner',
      offset: '-30%',
      content: ({ percent }) => `${(percent * 100).toFixed(0)}%`,
      style: {
        fontSize: 14,
        textAlign: 'center',
      },
    },
    interactions: [
      {
        type: 'element-active',
      },
    ],
  };
  return <Pie {...config} />;
};
export default PieChart;