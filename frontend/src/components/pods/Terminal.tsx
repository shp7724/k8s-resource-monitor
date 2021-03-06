import { FC, useEffect, useRef } from "react";
import useWebSocket, { ReadyState } from "react-use-websocket";
import colors from "tailwindcss/colors";
import { FitAddon } from "xterm-addon-fit";
import { XTerm } from "xterm-for-react";
import shallow from "zustand/shallow";
import { endpoint, isProduction } from "../../common/axios";
import { useAuth } from "../../states/auth";
import { useTerminal } from "../../states/pods";

const Terminal: FC = (): JSX.Element => {
  const xtermRef = useRef<any>(null);
  const fitAddon = new FitAddon();
  const { isAuthenticated, token } = useAuth(
    (state) => ({
      isAuthenticated: state.isAuthenticated,
      token: state.accessToken,
    }),
    shallow
  );
  const { isOpen, containerName, podName, namespace } = useTerminal(
    (state) => state,
    shallow
  );

  const { sendMessage, lastMessage, readyState } = useWebSocket(
    `${
      isProduction ? "wss" : "ws"
    }://${endpoint}/ws/ssh/pod/${namespace}/${podName}/${containerName}/`,
    { protocols: ["Bearer", token || "fake-token"] }
  );

  useEffect(() => {
    switch (readyState) {
      case ReadyState.CONNECTING:
        xtermRef.current.terminal.writeln(
          `Connecting to ${containerName}...\n`
        );
        break;
      case ReadyState.CLOSING:
        xtermRef.current.terminal.writeln(`Closing connection...`);
        break;
      case ReadyState.CLOSED:
        if (!isAuthenticated) {
          xtermRef.current.terminal.writeln(
            `Permission denied. Please sign in first.`
          );
          break;
        }
        xtermRef.current.terminal.writeln(
          `An error occurred while establishing connection.`
        );
        xtermRef.current.terminal.writeln(
          `It may be because this container does not support ssh connections.`
        );
        break;
      default:
        break;
    }
  }, [readyState]);

  useEffect(() => {
    if (lastMessage !== null) {
      xtermRef.current.terminal.write(lastMessage.data);
    }
  }, [lastMessage]);

  useEffect(() => {
    fitAddon.fit();
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
        sendMessage(data);
      }}
    />
  );
};

export default Terminal;
