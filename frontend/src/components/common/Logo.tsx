import { FC } from "react";
import logo from "../../assets/logo.svg";

interface LogoProps {
  withText?: boolean;
  logoClassName?: string;
}

const Logo: FC<LogoProps> = ({ withText, logoClassName }): JSX.Element => {
  return (
    <div className="flex items-center justify-center">
      <img src={logo} className={logoClassName || "h-9 w-9"}></img>
      {withText && (
        <div className="ml-2 font-mono text-2xl font-medium text-gray-700">
          dashboard
        </div>
      )}
    </div>
  );
};

export default Logo;
