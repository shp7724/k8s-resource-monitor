import { useEffect } from "react";
import { k8sConnectionErrorToast } from "./common/utils";
import LoginModal from "./components/auth/LoginModal";
import CreateModal from "./components/common/CreateModal";
import FloatingButtons from "./components/common/FloatingButtons";
import Title from "./components/common/Title";
import Hero from "./components/hero/Hero";
import Namespace from "./components/namespaces/Namespace";
import NavigationBar from "./components/navbar/NavigationBar";
import { navigationData } from "./components/navbar/navigationData";
import { useMetrics } from "./states/metrics";

function App() {
  const fetchPodUsage = useMetrics((state) => state.fetch);
  console.log("dummy");

  useEffect(() => {
    fetchPodUsage();
    const timerId = setInterval(() => {
      fetchPodUsage().catch((err) => {
        k8sConnectionErrorToast(err);
      });
    }, 5000);
    return () => clearInterval(timerId);
  }, []);

  return (
    <div className="bg-gray-50">
      <LoginModal />
      <NavigationBar />
      <div className="container mx-auto px-5">
        <div className="h-16"></div>
        <Hero />

        <Namespace />

        {navigationData.map((item, idx) => {
          return (
            <div id={item.title} key={idx}>
              <Title className={item.titleClass} text={item.title} />
              <item.item />
            </div>
          );
        })}

        <div className="h-96"></div>

        <FloatingButtons />
        <CreateModal />
      </div>
    </div>
  );
}

export default App;
