import { Fragment } from "react";
import LoginModal from "./components/auth/LoginModal";
import CreateModal from "./components/common/CreateModal";
import FloatingButtons from "./components/common/FloatingButtons";
import Title from "./components/common/Title";
import Namespace from "./components/namespaces/Namespace";
import NavigationBar from "./components/navbar/NavigationBar";
import { navigationData } from "./components/navbar/navigationData";

function App() {
  return (
    <div className="bg-gray-50">
      <LoginModal />
      <NavigationBar />
      <div className="container mx-auto px-5">
        <div className="h-32"></div>
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
