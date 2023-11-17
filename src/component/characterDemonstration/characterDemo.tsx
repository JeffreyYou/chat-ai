
import { NoDataWrapper, DataWrapper, ButtonWrapper } from "./style";
import {
  message,
  Input,
  Layout,
  Breadcrumb,
  Menu,
  theme,
  Empty,
  Button,
  Badge,
  Descriptions,
  Divider,
} from "antd";
import { apiSettingStore } from "../../store/api-store";


const CharacterDemonstration: React.FC = () => {
  const {
    openWindow,
    deleteCharacter,
    character,
    selected_character,
  } = apiSettingStore();
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const handleDelete = () => {
    deleteCharacter(selected_character.character_name)
  }
  const handleEdit = () => {
    openWindow()
  }
  const item = [
    {
      key: "1",
      label: "Character Name",
      span: 1,
      children: selected_character.character_name,
    },
    {
      key: "2",
      label: "Character Info",
      span: 1,
      children: selected_character.character_description,
    },
    {
      key: "3",
      label: "Description",
      span: 1,
      children: selected_character.character_description,
    },
    {
      key: "4",
      label: "System Prompt",
      children: selected_character.character_prompt,
      span: 3,
    },
  ];

  return (
    <>
      <Breadcrumb
        style={{ margin: "16px 0" }}
        separator=">"
        items={[
          {
            title: "Character List",
          },
          ...(selected_character.character_name !== ""
            ? [{ title: selected_character.character_name }]
            : []),
        ]}
      />

      {character.length === 0 && (
        <NoDataWrapper>
          <Empty description={<span>Character List Empty</span>}>
            <Button type="primary" style={{ backgroundColor: "#246887" }} onClick = {() => openWindow()}>Create Now</Button>
          </Empty>
        </NoDataWrapper>
      )}

      {character.length !== 0 && (
        <DataWrapper>
          <Divider orientation="center" style={{height: "54px"}}>Character Information</Divider>

          <Descriptions
            column={3}
            style={{ overflow: "hidden", width: "80%", position: "relative", top: 0, height: "calc(100% - 158px)" }}
            layout="vertical"
            bordered={true}
            items={item}
          />
          <ButtonWrapper>
            <Button type="primary" >Chat</Button>
            <Button type="primary" style={{backgroundColor: "#246887"}} onClick = {() => openWindow()}>Edit</Button>
            <Button type="primary" danger={true} onClick={handleDelete}>Delete</Button>
          </ButtonWrapper>
        </DataWrapper>
      )}
    </>
  );
};

export default CharacterDemonstration;
