import { FC, useEffect, useRef, useState } from "react";
import { FitAddon } from "xterm-addon-fit";
import { XTerm } from "xterm-for-react";
import { useTerminal } from "../../common/states";
import colors from "tailwindcss/colors";

const Terminal: FC = (): JSX.Element => {
  const xtermRef = useRef<any>(null);
  const fitAddon = new FitAddon();
  const [input, setInput] = useState("");
  const isOpen = useTerminal((state) => state.isOpen);

  useEffect(() => {
    fitAddon.fit();
    xtermRef.current.terminal.writeln("hlloeo");
    xtermRef.current.terminal.setOption("theme", {
      background: colors.gray[900],
    });
  }, []);
  useEffect(() => {
    fitAddon.fit();
  }, [isOpen]);

  return (
    <XTerm
      ref={xtermRef}
      addons={[fitAddon]}
      className=""
      onData={(data) => {
        const code = data.charCodeAt(0);
        // If the user hits empty and there is something typed echo it.
        if (code === 13 && input.length > 0) {
          xtermRef.current.terminal.write("\r\nYou typed: '" + input + "'\r\n");
          xtermRef.current.terminal.write("echo> ");
          setInput("");
        } else if (code < 32 || code === 127) {
          // Disable control Keys such as arrow keys
          return;
        } else {
          // Add general key press characters to the terminal
          xtermRef.current.terminal.write(data);
          setInput(input + data);
        }
      }}
    />
  );
};

export default Terminal;
