import { Avatar, Upload, Modal, Slider } from "antd";
import { useState, useEffect } from "react";
import AvatarEditor from "react-avatar-editor";
import { UserOutlined } from "@ant-design/icons";

interface Props {
  previewUrl: string;
  setPreviewUrl: (url: string) => void;
}

const AvatarUpdate = ({ previewUrl, setPreviewUrl }: Props) => {
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [visible, setVisible] = useState(false);
  const editorRef = useState<AvatarEditor | null>(null);
  const [scale, setScale] = useState(1);

  const handleBeforeUpload = (file: File) => {
    setImageFile(file);
    setVisible(true);
    return false;
  };

  const handleCrop = () => {
    const canvas = editorRef[0]?.getImageScaledToCanvas();
    if (canvas) {
      canvas.toBlob((blob) => {
        if (blob) {
          const previewUrl = URL.createObjectURL(blob);
          setPreviewUrl(previewUrl);
        }
        setVisible(false);
      }, "image/png");
    }

    // if (canvas) {
    //   const url = canvas.toDataURL();
    //   setPreviewUrl(url);
    //   setVisible(false);
    // }
  };

  return (
    <>
      <Upload
        showUploadList={false}
        beforeUpload={handleBeforeUpload}
        accept="image/*"
      >
        <Avatar
          size={150}
          src={previewUrl}
          style={{ cursor: "pointer" }}
          icon={<UserOutlined />}
        ></Avatar>
      </Upload>

      <Modal
        open={visible}
        title="Crop Avatar"
        onOk={handleCrop}
        onCancel={() => setVisible(false)}
        okText="save"
        cancelText="cancel"
      >
        {imageFile && (
          <>
            <AvatarEditor
              ref={(ref) => (editorRef[0] = ref)}
              image={imageFile}
              width={200}
              height={200}
              border={40}
              borderRadius={100}
              scale={scale}
            />
            <Slider
              min={1}
              max={3}
              step={0.01}
              value={scale}
              onChange={setScale}
              style={{ marginTop: 16 }}
            />
          </>
        )}
      </Modal>
    </>
  );
};

export default AvatarUpdate;
