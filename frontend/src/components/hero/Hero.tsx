import { FC, useEffect } from "react";
import Lottie from "react-lottie-player";
import shallow from "zustand/shallow";
import animData from "../../assets/kube4.json";
import { useListNode } from "../../states/nodes";
import NodeCard from "./NodeCard";
import { useInView } from "react-intersection-observer";

const Hero: FC = (): JSX.Element => {
  const { ref, inView } = useInView();
  const { isLoading, list, data } = useListNode((state) => state, shallow);

  useEffect(() => {
    list();
  }, []);

  return (
    <div className="mb-36 mt-20 flex items-center justify-center sm:my-36">
      <div className="w-full">
        <div className="relative z-10 flex h-[488px] w-full justify-center gap-8">
          {data.map((node, idx) => (
            <NodeCard key={idx} {...node} />
          ))}
        </div>
        <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
          <div ref={ref} className="">
            <Lottie
              loop
              play={inView}
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
