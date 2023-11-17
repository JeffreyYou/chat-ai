import React from "react";
import {
  Button,
  Modal,
  Input,
  Select,
  Space,
  InputNumber,
  Slider,
  Divider,
  notification
} from "antd";
import { apiSettingStore } from "../../store/api-store";
import {
  SettingOutlined,
} from "@ant-design/icons";
import type { NotificationPlacement } from 'antd/es/notification/interface';


const OpenAiConfig: React.FC = () => {
  const {
    openAi,
    openAiTemporary,
    updateOpenAi,
    updateOpenAiTemporary,
    isOpen,
    closeWindow,
    resetOpenAiConfig,
    createCharacter
  } = apiSettingStore();

  const changeTemperature = (value: any) => {
    if (isNaN(value)) {
      return;
    }
    updateOpenAiTemporary({ ...openAiTemporary, Temperature: value });
  };

  const handleSave = () => {
    updateOpenAi(openAiTemporary);
    closeWindow();
  };

  const handleCancel = () => {
    updateOpenAiTemporary({ ...openAi });
    closeWindow()
  }
  const handleClear = () => {
    resetOpenAiConfig()
  }
  const handleCharacter = (placement: NotificationPlacement) => {
    if (openAiTemporary.character.character_name === "") {
      notificationApi.warning({
        message:  <div style={{ fontWeight: 'bold' }}>Warning</div>,
        description: <span>Character name must not be empty!</span>,
        placement
      })
      return
    }
    updateOpenAi(openAiTemporary);
    const isSuccess = createCharacter()
    if (isSuccess) {
      notificationApi.success({
        message: <div style={{ fontWeight: 'bold' }}>Success</div>,
        description: <span>Character <span style={{ fontWeight: 'bold' }}>{openAiTemporary.character.character_name}</span> Created!</span>,
        placement,
      })
    } else {
      notificationApi.warning({
        message:  <div style={{ fontWeight: 'bold' }}>Warning</div>,
        description: <span>Character <span style={{ fontWeight: 'bold' }}>{openAiTemporary.character.character_name}</span> Already Exist!</span>,
        placement
      })
    }
  }

  const selectLLM = (
    <Select
      value={openAiTemporary.model}
      defaultValue="GPT-3.5"
      style={{ width: 150 }}
      onChange={(value) =>
        updateOpenAiTemporary({ ...openAiTemporary, model: value })
      }
      options={[
        { value: "GPT-3.5", label: "GPT-3.5" },
        { value: "GPT-3.5-turbo", label: "GPT-3.5-turbo" },
        { value: "GPT-4.0", label: "GPT-4.0" },
        { value: "GPT-4.0-turbo", label: "GPT-4.0-turbo" },
      ]}
    />
  );

  const [notificationApi, notificationContent] = notification.useNotification({maxCount: 3});

  return (
    <Modal
      open={isOpen}
      title={
        <div style={{ fontFamily: "play-google", fontSize: "24px" }}>
          <SettingOutlined /> API Setting
        </div>
      }
      onOk={handleSave}
      onCancel={handleCancel}
      width="70vw"
      footer={[
        <Button key="character" onClick={() => handleCharacter('bottomLeft')} style={{position: "absolute", left: "24px"}}>
          Create Character
        </Button>,
        <Button key="reset" onClick={handleClear}>
          Reset
        </Button>,
        <Button key="back" onClick={handleCancel}>
          Cancel
        </Button>,
        <Button key="submit" type="primary" onClick={handleSave}>
          Save
        </Button>,
      ]}
    >
      {notificationContent}
      <Divider orientation="left" orientationMargin="0">
        OpenAI
      </Divider>
      <Space.Compact block size="large" style={{ margin: "0 0 10px 0" }}>
        <Input
          addonBefore={selectLLM}
          addonAfter="Temperature"
          placeholder={"Please enter your API key"}
          value={openAiTemporary.ApiKey}
          onChange={(e) =>
            updateOpenAiTemporary({
              ...openAiTemporary,
              ApiKey: e.target.value,
            })
          }
          allowClear={true}
        />

        <Slider
          min={0}
          max={1}
          onChange={changeTemperature}
          value={openAiTemporary.Temperature}
          step={0.01}
          style={{ width: "10%", margin: "auto 16px" }}
        />

        <InputNumber
          min={0}
          max={1}
          style={{ width: "10%", margin: "0 2px" }}
          step={0.01}
          value={
            typeof openAiTemporary.Temperature === "number"
              ? openAiTemporary.Temperature
              : 0
          }
          onChange={changeTemperature}
        />
      </Space.Compact>

      <Divider orientation="left" orientationMargin="0">
        Character
      </Divider>
      <Space.Compact block size="large" style={{ margin: "0 0 10px 0" }}>
        <Input
          addonBefore="Character Name"
          addonAfter="Description"
          style={{ width: "50%", minWidth: "250px" }}
          value={openAiTemporary.character.character_name}
          onChange={(e) =>
            updateOpenAiTemporary({
              ...openAiTemporary,
              character: {
                ...openAiTemporary.character,
                character_name: e.target.value
              },
            })
          }
          allowClear={true}
        />
        <Input
          value={openAiTemporary.character.character_description}
          onChange={(e) =>
            updateOpenAiTemporary({
              ...openAiTemporary,
              character: {
                ...openAiTemporary.character,
                character_description: e.target.value
              },
            })
          }
          allowClear={true}
        />
      </Space.Compact>
      <Input.TextArea
        allowClear={true}
        style={{ height: "500px" }}
        placeholder={"Please enter your Character prompt"}
        rows={4}
        value={openAiTemporary.character.character_prompt}
        onChange={ (e) => {
          updateOpenAiTemporary({
            ...openAiTemporary,
            character: {
              ...openAiTemporary.character,
              character_prompt: e.target.value
            },
          })
        }}
      />
    </Modal>
  );
};

export default OpenAiConfig;
