import React, { useState } from 'react'
import { useNavigate } from "react-router-dom"
import {
  Button,
  Card,
  Typography,
  Divider,
  Space,
  Checkbox,
  Row,
  Col,
  Input,
  Form,
  Upload,
  Avatar
} from 'antd'
import assets from '../assets/assets';
const { Title, Text, Link } = Typography;

const ProfilePage = () => {
  const [data, setdata] = useState({ name: "Arun", bio: "I’m a software developer passionate about building user-focused applications.", profilePic: null })
  const navigate = useNavigate()

  const handleUpdate = (file) => {
    console.log(file)
    navigate("/")
  }
  const handleUpload = async (info) => {
    const file = info.file;
    if (file) {
      setdata((prev) => ({
        ...prev,
        profilePic: file,
      }));
    }
  };

  return (
    <div className='min-h-screen bg-cover bg-no-repeat flex items-center justify-center'>
      <div className='w-5/6 max-w-2xl backdrop-blur-2xl text-gray-300 border-2 border-gray-400 flex items-center justify-between max-sm:flex-col-reverse rounded-lg'>
        <Form
          onFinish={(e) => { handleUpdate({ ...e, profilePic: data.profilePic }) }}
          layout="vertical"
          requiredMark={false}
          className='flex flex-col gap-5 flex-1'
          style={{
            width: "300px",
            padding: "25px",
            gap:"10px"
          }}
          initialValues={{
            fullName: data.name,
            bio: data.bio,
          }}
        >

          <Title
            level={4}
            style={{
              color: "#D1D5DB",
              marginBottom: "0px"
            }}>Profile Details</Title>

          <Upload
            showUploadList={false}
            accept=".png,.jpg,.jpeg"
            beforeUpload={() => false}
            onChange={handleUpload}
          >
            <label className="flex items-center gap-3 cursor-pointer text-gray-300">
              <Avatar
                src={
                  data.profilePic
                    ? URL.createObjectURL(data.profilePic)
                    : assets.avatar_icon // make sure this is valid!
                }
                size={44}
              />
              Upload Profile Image
            </label>
          </Upload>


          <Form.Item
            label={null}
            name="fullName"
            rules={[{ required: true, message: 'Please input your username!' }]}
          >
            <Input
              placeholder="NAME..."
              style={{
                padding: "8px 8px",
                borderRadius: "2px",
                border: "1px solid #ccc",
                backgroundColor: "rgba(255, 255, 255, 0.00)",
                color: "#D1D5DB"
              }}
            />
          </Form.Item>
          <Form.Item
            label={null}
            name="bio"
          >
            <Input.TextArea
              placeholder="TELL US ABOUT YOURSELF..."
              rows={4}
              showCount
              maxLength={200}
              style={{
                padding: "8px 8px",
                borderRadius: "2px",
                border: "1px solid #ccc",
                backgroundColor: "rgba(255, 255, 255, 0.00)",
                color: "#D1D5DB",
                height: 120,
                resize: "none",
              }}
            />
          </Form.Item>
          <Form.Item label={null} style={{ marginBottom: "5px",marginTop:"20px" }}>
            <Button
              type="primary"
              htmlType="submit"
              style={{
                height:"40px",
                position: "absolute",
                bottom: "1.25rem",
                left: "50%",
                transform: "translateX(-50%)",
                backgroundImage: "linear-gradient(to right, #ccc, #7c3aed)",
                color: "white",
                border: "none",
                fontSize: "0.875rem",
                fontWeight: "300",
                padding: "0.5rem 5rem",
                borderRadius: "9999px",
                cursor: "pointer",
              }}
              block
            >
              Save
            </Button>
          </Form.Item>
        </Form>
        <img className='max-w-36 aspect-square  mx-12 max-md:mt-10' src={assets.logo_icon} alt="" />
      </div>
    </div >
  )
}

export default ProfilePage
