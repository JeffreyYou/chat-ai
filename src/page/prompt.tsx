import React from "react";

import { PromptWrapper, PromptWindow } from "./style";
import OpenAiConfig from "../component/openAiConfig/OpenAiConfig";
import ChatComponent from "../component/chatComponent/ChatComponent";

const PromptTester = () => {

  return (
      <PromptWrapper>
        <PromptWindow>
          <ChatComponent />
        </PromptWindow>
        <OpenAiConfig />
      </PromptWrapper>
  );
};

export default PromptTester;
