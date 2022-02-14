import { FC, Fragment, useEffect, useState } from "react";
import Lottie from "react-lottie-player";
import shallow from "zustand/shallow";
import animData from "../../assets/kube4.json";
import { useListNode } from "../../states/nodes";
import NodeCard from "./NodeCard";

const Hero: FC = (): JSX.Element => {
  const { isLoading, list, data } = useListNode((state) => state, shallow);

  useEffect(() => {
    list();
  }, []);

  return (
    <div className="my-36 flex items-center justify-center">
      <div className="w-full">
        <div className="relative z-10 flex h-[488px] w-full justify-center gap-8">
          {data.map((node, idx) => (
            <NodeCard key={idx} {...node} />
          ))}
        </div>
        <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
          <div className="">
            <Lottie
              loop
              play
              animationData={animData}
              speed={0.3}
              className="svg-wrapper h-[1000px] w-[1000px]"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
