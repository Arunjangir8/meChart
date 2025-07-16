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
import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import toast from 'react-hot-toast';
import { ArrowLeftOutlined } from '@ant-design/icons';
const { Title, Text, Link } = Typography;

const ProfilePage = () => {
  const {updateProfile, authUser} = useContext(AuthContext)
  const [tempProfilePicPreview, setTempProfilePicPreview] = useState(null);
  const [uploadedFile, setUploadedFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [data, setdata] = useState({ 
    fullName: authUser.fullName, 
    bio: authUser.bio, 
    profilePic: authUser.profilePic 
  })
  const navigate = useNavigate()

  const handleUpdate = async (formData) => {
    try {
      setLoading(true);
      let updateData = { ...formData };
      const file = uploadedFile;
      if (file instanceof Blob) {
        const reader = new FileReader();

        reader.onload = async () => {
          const base64Image = reader.result;
          updateData.profilePic = base64Image;
          await updateProfile(updateData);
          setdata({
          ...updateData,
          profilePic: base64Image
          });
          setTempProfilePicPreview(null);
          setLoading(false);
          navigate("/");
        };
        reader.readAsDataURL(file);
      } else {
        await updateProfile(updateData);
        setdata(updateData);
        setTempProfilePicPreview(null); 
        setLoading(false);
        navigate("/");
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error("Failed to update profile");
      setLoading(false);
    }
  }

  const handleUpload = async (info) => {
    const file = info.file;
    if (file) {
      const previewUrl = URL.createObjectURL(file);
      setTempProfilePicPreview(previewUrl);
      setUploadedFile(file)
    }
  };

  return (
    <div className='min-h-[100dvh] flex items-center justify-center bg-white/8'>
      <div className='w-5/6 max-w-2xl bg-black/60 text-gray-300 border-2 border-gray-400 flex items-center justify-between max-sm:flex-col-reverse rounded-lg relative'>
        <div
          className="absolute top-4 right-4 cursor-pointer text-gray-300 hover:text-blue-400"
          onClick={() => navigate('/')}
        >
          <ArrowLeftOutlined style={{ fontSize: '20px', fontWeight:"bold" }} />
        </div>
        <Form
          onFinish={handleUpdate}
          layout="vertical"
          requiredMark={false}
          className='flex flex-col gap-5 flex-1'
          style={{
            width: "300px",
            padding: "25px",
            gap:"10px"
          }}
          initialValues={{
            fullName: data.fullName,
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
                  tempProfilePicPreview ||
                   assets.avatar_icon
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
                backgroundColor: "white/50",
                color: "#2563EB",
                fontWeight: "bold"
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
                backgroundColor: "white",
                color: "#2563EB",
                height: 120,
                resize: "none",
                fontWeight: "bold"
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
                backgroundImage: "linear-gradient(to right, #ccc, #2563EB)",
                color: "white",
                border: "none",
                fontSize: "0.875rem",
                fontWeight: "300",
                padding: "0.5rem 5rem",
                borderRadius: "9999px",
                cursor: "pointer",
              }}
              block
              loading={loading}
            >
              Save
            </Button>
          </Form.Item>
        </Form>
        <img
        className='w-36 aspect-square object-cover rounded-full mx-12 max-md:mt-10'
        src={ data?.profilePic || assets.logo_icon}
        alt="Profile"
      />
      </div>
    </div >
  )
}

export default ProfilePage