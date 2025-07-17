import React from 'react'
import { Form, Input, Button, Typography } from 'antd'
import { ArrowLeftOutlined } from '@ant-design/icons'
import { useNavigate } from 'react-router-dom'
import assets from '../assets/assets'

const { Title } = Typography

const ContactMe = () => {
    const navigate = useNavigate()

    return (
        <div className='min-h-[100dvh] flex items-center justify-center bg-white/8'>
            <div className='w-5/6 max-w-[850px] bg-black/60 text-gray-300 border-2 border-gray-400 flex items-center justify-between max-sm:flex-col-reverse rounded-lg relative p-6'>

                {/* Back Arrow */}
                <div
                    className="absolute top-4 right-4 cursor-pointer text-gray-300 hover:text-blue-400"
                    onClick={() => navigate('/')}
                >
                    <ArrowLeftOutlined style={{ fontSize: '20px', fontWeight: "bold" }} />
                </div>

                {/* Left: Form */}
                <Form
                    onFinish={() => { }}
                    layout="vertical"
                    requiredMark={false}
                    className='flex flex-col gap-5 flex-1'
                    style={{
                        maxWidth: "500px",
                    }}
                    initialValues={{
                        fullName: 'ARUN',
                        bio: "I’m a B.Tech 2nd-year student majoring in Computer Science with a specialization in Artificial Intelligence. I’m passionate about full-stack development and skilled in technologies like Node.js, Express.js, React, and Next.js. I enjoy building efficient and scalable web applications, and I'm constantly exploring ways to integrate AI into real-world projects. With a strong foundation in backend and frontend development, I aim to create meaningful tech solutions and grow as a developer. I’m also keen on learning system design, contributing to open-source, and collaborating with fellow developers to solve complex problems and create impactful digital experiences.",
                    }}
                >
                    <Title level={4} style={{ color: "#D1D5DB" }}>About Me</Title>

                    <Form.Item name="fullName">
                        <Input
                            disabled
                            style={{
                                padding: "8px",
                                borderRadius: "2px",
                                border: "1px solid #ccc",
                                backgroundColor: "black",
                                color: "white",
                                fontWeight: "bold"
                            }}
                        />
                    </Form.Item>

                    <Form.Item name="bio">
                        <Input.TextArea
                        disabled
                            style={{
                                padding: "8px",
                                borderRadius: "2px",
                                border: "1px solid #ccc",
                                backgroundColor: "black",
                                color: "white",
                                height: 250,
                                resize: "none",
                                fontWeight: "bold"
                            }}
                        />
                    </Form.Item>
                </Form>

                {/* Right: Image + Save button */}
                <div className="flex flex-col items-center gap-4 p-6">
                    <img
                        className="w-60 h-60 object-cover rounded-full"
                        src={assets.profileimage}
                        alt="Profile"
                    />
                    <div className='flex items-center gap-4 justify-between w-full'>
                    <Button
                        type="primary"
                        htmlType="submit"
                        disabled
                        style={{
                            height: "40px",
                            backgroundColor: "#2563EB",
                            color: "white",
                            border: "none",
                            fontSize: "0.875rem",
                            fontWeight: "500",
                            padding: "0 2rem",
                            borderRadius: "9999px",
                            cursor: "pointer",
                        }}
                    >
                        Profile
                    </Button>
                    <Button
                        type="primary"
                        htmlType="submit"
                        onClick={() => window.open('https://github.com/Arunjangir8', '_blank')}
                        style={{
                            height: "40px",
                            backgroundColor: "#2563EB",
                            color: "white",
                            border: "none",
                            fontSize: "0.875rem",
                            fontWeight: "500",
                            padding: "0 2rem",
                            borderRadius: "9999px",
                            cursor: "pointer",
                        }}
                    >
                        GitHub
                    </Button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ContactMe
