import { FC, Fragment, useEffect } from "react";
import Lottie from "react-lottie-player";
import shallow from "zustand/shallow";
import kube4Json from "../../assets/kube4.json";
import { useListNode } from "../../states/nodes";
import NodeCard from "./NodeCard";

const Hero: FC = (): JSX.Element => {
  const { isLoading, list, data } = useListNode((state) => state, shallow);

  useEffect(() => {
    list();
  }, []);

  return (
    <div className="flex items-center justify-center">
      <div className="relative">
        <Lottie
          loop
          animationData={kube4Json}
          play
          speed={0.3}
          className="w-full pt-36 sm:pt-24 md:pt-0"
        />
        <div className="absolute inset-x-0 top-[20%] flex justify-center gap-8">
          {data.map((node, idx) => (
            <NodeCard key={idx} {...node} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Hero;
