import type { MenuProps } from "antd";


export interface openAiConfig {
    model: string,
    Temperature: number,
    ApiKey: string,
    character: characterSetting
}


export interface characterSetting {
    character_id: number,
    character_name: string,
    character_description: string,
    character_prompt: string
}

export interface characterChat {
    character: characterSetting,
    activeChat: []
}

export interface apiSetting {
    id: number;
    openAi: openAiConfig
    openAiTemporary: openAiConfig
    character: characterSetting[],
    selected_character: characterSetting,
    isOpen: boolean,
    activeChatList: characterChat[],
    updateOpenAi: (config : openAiConfig) => void,
    updateOpenAiTemporary: (config : openAiConfig) => void,
    resetOpenAiConfig: () => void,
    openWindow: () => void,
    closeWindow: () => void,
    createCharacter: () => boolean,
    deleteCharacter: (character_name : string) => boolean,
    updateSelectedCharacter: (character_name : string) => void,
    updateActiveChatList: (character_name : string) => void
}

type MenuItem = Required<MenuProps>["items"][number];
export const getMenuItem = 
    (
    label: React.ReactNode,
    key: React.Key,
    icon?: React.ReactNode,
    children?: MenuItem[]
    ): MenuItem =>
    ({
        key,
        icon,
        children,
        label,
    })