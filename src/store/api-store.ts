import {create} from "zustand";
import {persist} from "zustand/middleware";
import {apiSetting} from "./interfaces";

const defaultCharacterConfig = {
    character_id: -1,
    character_name: "",
    character_description: "",
    character_prompt: ""
}
const openAiDefaultConfig = {
    model: "GPT-3.5",
    Temperature: 0,
    ApiKey: "",
    character: defaultCharacterConfig
}
export const apiSettingStore = create<apiSetting>()(
    persist( (set, get) => ({
            id: 0,
            openAi: openAiDefaultConfig,
            openAiTemporary: openAiDefaultConfig,
            character: [],
            selected_character: defaultCharacterConfig,
            isOpen: false,
            activeChatList: [],
            updateOpenAi: (config) => {
                set({openAi : config})
            },
            updateOpenAiTemporary: (config) => {
                set({openAiTemporary : config})
            },
            resetOpenAiConfig: () => {
                set({openAi: openAiDefaultConfig, openAiTemporary: openAiDefaultConfig})
            },
            openWindow: () => {
                set({isOpen: true})
            },
            closeWindow: () => {
                set({isOpen: false})
            },
            createCharacter: () => {
                const characters = get().character
                const setting = get().openAi.character
                const isExist = characters.some(char => char.character_name === setting.character_name)

                if (isExist) {
                    return false;
                } else {
                    set({character: [...get().character, setting]})
                    return true;
                }
                
            },
            deleteCharacter: (character_name : string) => {
                const characters = get().character
                const isExist = characters.some(char => char.character_name === character_name)
                if (isExist) {
                    const updatedCharacters = characters.filter(char => char.character_name !== character_name);
                    set({ character: updatedCharacters, selected_character: defaultCharacterConfig });
                    return true
                } else {
                    return false
                }
            },
            updateSelectedCharacter: (character_name : string) => {
                const characters = get().character
                const setting = characters.find(char => char.character_name === character_name)
                set({selected_character: setting})
            },
            updateActiveChatList: (character_name : string) => {
                // const chat = get().activeChatList
                // const isExist = chat.some(char => char.character.character_name === character_name)
                return
            }

        }),
        {
            name: "api_setting_store"
        }
    )
)