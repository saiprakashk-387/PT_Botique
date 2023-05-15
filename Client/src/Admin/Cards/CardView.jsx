import React from "react";
import { RingProgress } from "@ant-design/plots";


export const LiquidCard = () => {
    const config = {
      height: 100,
      width: 100,
    
      autoFit: false,
      percent: 0.7,
      color: ["#F4664A", "#E8EDF3"],
    };
    return <RingProgress {...config} />;
  };


export const SquareCard = () => {
    const config = {
      height: 100,
      width: 100,
      autoFit: false,
      percent: 0.6,
      color: ["#E8EDF3","#F4664A",],
      innerRadius: 0.85,
      radius: 0.98,
      statistic: {
        title: {
          style: {
            color: "#363636",
            fontSize: "12px",
            lineHeight: "14px",
          },
          formatter: () => "进度",
        },
      },
    };
    return <RingProgress {...config} />;
  };
export const DiamondCard = () => {
    const config = {
      height: 100,
      width: 100,
      autoFit: false,
      percent: 0.5,
      color: [   "#E8EDF3","#5B8FF9",],
    };
    return <RingProgress {...config} />;
  };

export const RingProgressCard = () => {
  const config = {
    height: 100,
    width: 100,
    autoFit: false,
    percent: 0.2,
    color: ["#5B8FF9", "#E8EDF3"],
  };
  return <RingProgress {...config} />;
};


