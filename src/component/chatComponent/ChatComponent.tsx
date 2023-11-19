import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';

import { message, Input, Layout, Menu, theme } from "antd";
import {
  StyledSider as Sider,
  StyledHeader as Header,
  StyledFooter as Footer,
} from "./types";
import { apiSettingStore } from "../../store/api-store";
import { websocketStore } from "../../store/websocket-store";
import { ChatRouter } from "../../router/ChatRouter";
import CharacterDemonstration from "../characterDemonstration/characterDemo";
import MessageItem from "../message/message-item";
import { topMenu, bottomMenu } from "./types";
const { Content } = Layout;

const ChatComponent: React.FC = () => {
  const { openWindow, updateSelectedCharacter, character } = apiSettingStore();
  const { openConnection } = websocketStore();
  const [collapsed, setCollapsed] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();
  const navigate = useNavigate();

  const { token: { colorBgContainer } } = theme.useToken();

  const handleTopMenu = (key: string) => {
    updateSelectedCharacter(key)
    if (key === "jeffrey123") {
      navigate("/test")
    }
    if (key === "jeffrey") {
      navigate("/")
    }
  };

  const handleBottomMenu = (key: string) => {
    if (key === "Setting") {
      openWindow();
    }
    if (key === "Server") {
      openConnection(messageApi);
    }
  };

  return (
    <>
      <Layout style={{ height: "100%" }}>
        <Sider
          collapsible
          collapsed={collapsed}
          onCollapse={(value: any) => setCollapsed(value)}
        >
          {contextHolder}
          <div className="demo-logo-vertical" />
          <Menu
            items={topMenu(character)}
            theme="dark"
            defaultSelectedKeys={["1"]}
            mode="inline"
            onClick={({ key, keyPath, domEvent }) => handleTopMenu(key)}
          />
          <Menu
            items={bottomMenu()}
            style={{ position: "absolute", bottom: "55px", width: "100%" }}
            theme="dark"
            mode="inline"
            selectable={false}
            onClick={({ key, keyPath, domEvent }) => handleBottomMenu(key)}
          />
        </Sider>

        <Layout>
          <Header style={{ padding: 0, background: colorBgContainer }}>
            Prompt Tester
          </Header>

          <Content style={{ margin: "0 16px" }}>
            {/* <CharacterDemonstration /> */}
            {/* <MessageItem/> */}
            <ChatRouter/> 
          </Content>

          <Footer>
            <Input.TextArea
              className="chat-box"
              allowClear={true}
              rows={4}
              placeholder={"Please enter your Prompt"}
            />
          </Footer>
        </Layout>
      </Layout>
    </>
  );
};

export default ChatComponent;
