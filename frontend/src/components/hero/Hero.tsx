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
    <div className="my-36 flex items-center justify-center">
      <div className="w-full">
        <div className="relative z-10 flex w-full justify-center gap-8">
          {data.map((node, idx) => (
            <NodeCard key={idx} {...node} />
          ))}
        </div>
        <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
          <Lottie
            loop
            animationData={kube4Json}
            play
            speed={0.3}
            className="scale-[250%] sm:scale-[120%]"
          />
        </div>
      </div>
    </div>
  );
};

export default Hero;
