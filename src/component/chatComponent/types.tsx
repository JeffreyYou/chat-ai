import type { MenuProps } from "antd";
import {
  TeamOutlined,
  UserOutlined,
  CloudServerOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import styled from "styled-components";
import { Layout } from "antd";
const { Sider, Header, Footer } = Layout;

export const StyledSider = styled(Sider)`
  .ant-layout-sider-trigger {
    position: relative;
  }
  .demo-logo-vertical {
    height: 32px;
    margin: 16px;
    background: rgba(255,255,255,.2);
    border-radius: 6px;
  }
`
export const StyledHeader = styled(Header)`
    font-size: 24px;
    text-align: center;
    font-family: "play-google";
`

export const StyledFooter = styled(Footer)`
    text-align: center;
    height: 20%;
    padding: 16px;
    .chat-box {
        font-family: "play-google";
        width: 100%;
        height: 100%;
    }
`

type MenuItem = Required<MenuProps>["items"][number];
export const getMenuItem = (
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[]
): MenuItem => ({
  key,
  icon,
  children,
  label,
});


export const topMenu = (character : any): MenuItem[] => {
    const characterList = character.map((character : any, index : any) =>
        getMenuItem(character.character_name, character.character_name)
    )
    return [
        getMenuItem("Character", "sub1", <TeamOutlined />, characterList),
        // getItem("Isabel Day1", "sub2", <UserOutlined />, [
        //   getItem("Chat1", "sub2-1"),
        // ]),
    ]
};

export const bottomMenu = (): MenuItem[] => [
  getMenuItem("API Setting", "Setting", <SettingOutlined />),
  getMenuItem("Connect to Server", "Server", <CloudServerOutlined />),
];
