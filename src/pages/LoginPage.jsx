import React, { useContext, useState } from 'react'
import { GoogleOutlined, GithubOutlined } from "@ant-design/icons"
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
  Form
} from 'antd';
import { AuthContext } from '../../context/AuthContext';
const { Title, Text, Link } = Typography;


const formheaderStyle = {
  margin: 0,
  width: "49%",
  textAlign: "center",
  cursor: "pointer",
}

const LoginPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [isloading, setIsloading] = useState(false);
  const [showBioStep, setShowBioStep] = useState(false);
  const [formData, setFormData] = useState({});


  const {login} = useContext(AuthContext)
  
  function handleLogin(val) {
    setIsloading(true)
    console.log("LOGIN", val)
    login("login",val)
    setIsloading(false)
  }
  
  const handleCreateAccount = (values) => {
    if (!showBioStep) {
      setFormData(values);
      setShowBioStep(true);
    } else {
      const completeData = { ...formData, ...values };
      handleSignup(completeData);
    }
  };

  function handleSignup(val) {
    setIsloading(true)
    console.log("SIGNUP", val)
    login("signup",val)
    setIsloading(false)
  }
  return (
    <div className='min-h-[100dvh] flex justify-center items-center bg-white/8'>
      <Card className='w-[100vw] h-[100vh] md:h-auto md:max-w-[400px] shadow-2xl flex flex-col justify-around bg-white/8' style={{ backgroundColor: "rgba(255, 255, 255, 0.08)" }}>

        <div className='flex justify-between '>
          <Title
            onClick={() => setIsLogin(true)}
            level={5}
            style={{
              borderBottom: isLogin ? "2px solid #1890ff" : "2px solid transparent",
              color: isLogin ? "#ffffff" : "#6B7280",
              ...formheaderStyle
            }}
          >
            LOGIN
          </Title>
          <Title
            onClick={() => setIsLogin(false)}
            level={5}
            style={{
              borderBottom: !isLogin ? "3px solid #1890ff" : "3px solid transparent",
              color: !isLogin ? "#ffffff" : "#6B7280",
              ...formheaderStyle
            }}
          >
            SIGNUP
          </Title>
        </div>

        {isLogin
          ?
          <Form
            // autoComplete="off"
            key={"Login"}
            onFinish={handleLogin}
            layout="vertical"
            requiredMark={false}
            style={{
              paddingTop: "22px",
            }}
          >
            <Form.Item
                  label={null}
                  name="email"
                  rules={[{ required: true, message: 'Please input your Email!' }]}
                >
                  <Input
                    prefix={<span className='text-gray-800 text-sm  tracking-wider pr-14'>EMAIL</span>}
                    style={{
                      padding: "8px 8px",
                      borderRadius: "2px",
                      border: "none",
                      borderBottom: "2px solid #ccc",
                      backgroundColor: "rgba(255, 255, 255, 0.30)",
                      color: "black"
                    }}
                  />
                </Form.Item>

            <Form.Item
              label={null}
              name="password"
              rules={[{ required: true, message: 'Please input your password!' }]}
            >
              <Input.Password
                prefix={<span className='text-gray-800 text-sm  tracking-wider pr-5'>PASSWORD</span>}
                style={{
                  padding: "8px 8px",
                  borderRadius: "2px",
                  border: "none",
                  borderBottom: "2px solid #ffffff",
                  backgroundColor: "rgba(255, 255, 255, 0.30)",
                  color: "black"
                }}
              />
            </Form.Item>

            <Form.Item
              name="remember"
              valuePropName="checked"
              style={{ marginBottom: "16px" }}
              label={null}>
              <Checkbox><span className='text-gray-300 text-sm'>Remember me</span></Checkbox>
            </Form.Item>

            <Form.Item label={null}>
              <Button
                type={"primary"}
                htmlType="submit"
                loading={isloading}
                style={{
                  height: "38px",
                  fontSize: "16px",
                  borderRadius: "2px"
                }}
                block
              >Sign In</Button>
            </Form.Item>
            <Divider style={{
              marginBottom: "14px",
            }}>
              <Text type="secondary"><span className='text-xs font-light text-gray-200'>ACCESS QUICKLY</span></Text>
            </Divider>

            <Form.Item label={null} style={{ marginBottom: "16px" }}>
              <div className="flex items-center justify-between gap-4">
                <Form.Item label={null}
                  style={{
                    width: "48%"
                  }}
                >
                  <Button
                    type={"primary"}
                    htmlType="button"
                    loading={isloading}
                    style={{
                      height: "38px",
                      fontSize: "16px",
                      borderRadius: "2px",
                      color: "white",
                      border: "1px solid white"
                    }}
                    ghost
                    block
                    icon={<GoogleOutlined />}
                  >Google</Button>
                </Form.Item>

                <Form.Item label={null}
                  style={{
                    width: "48%"
                  }}
                >
                  <Button
                    type={"primary"}
                    htmlType="button"
                    loading={isloading}
                    style={{
                      height: "38px",
                      fontSize: "16px",
                      borderRadius: "2px",
                      color: "white",
                      border: "1px solid white"
                    }}
                    block
                    ghost
                    icon={<GithubOutlined />}
                  >GitHub</Button>
                </Form.Item>
              </div>
            </Form.Item>
          </Form>
          :
          <Form
            key={"Signup"}
            onFinish={handleCreateAccount}
            layout="vertical"
            requiredMark={false}
            style={{
              paddingTop: "22px"
            }}
          >
            {!showBioStep ?
              (<>
                <Form.Item
                  label={null}
                  name="fullName"
                  rules={[{ required: true, message: 'Please input your username!' }]}
                >
                  <Input
                    prefix={<span className='text-gray-800 text-sm pr-10 tracking-wider'>NAME</span>}
                    style={{
                      padding: "8px 8px",
                      borderRadius: "2px",
                      border: "none",
                      borderBottom: "2px solid #ccc",
                      backgroundColor: "rgba(255, 255, 255, 0.30)",
                      color: "black"
                    }}
                  />
                </Form.Item>

                <Form.Item
                  label={null}
                  name="email"
                  rules={[{ required: true, message: 'Please input your Email!' }]}
                >
                  <Input
                    prefix={<span className='text-gray-800 text-sm  tracking-wider pr-10'>EMAIL</span>}
                    style={{
                      padding: "8px 8px",
                      borderRadius: "2px",
                      border: "none",
                      borderBottom: "2px solid #ccc",
                      backgroundColor: "rgba(255, 255, 255, 0.30)",
                      color: "black"
                    }}
                  />
                </Form.Item>

                <Form.Item
                  label={null}
                  name="password"
                  rules={[{ required: true, message: 'Please input your password!' }]}
                >
                  <Input.Password
                    prefix={<span className='text-gray-800 text-sm  tracking-wider'>PASSWORD</span>}
                    style={{
                      padding: "8px 8px",
                      borderRadius: "2px",
                      border: "none",
                      borderBottom: "2px solid #ccc",
                      backgroundColor: "rgba(255, 255, 255, 0.30)",
                      color: "black"
                    }}
                  />
                </Form.Item>

                <Form.Item label={null} style={{ marginBottom: "16px" }}>
                  <div className="flex items-center justify-between gap-4 flex-wrap">
                    <Form.Item
                      name="termsconditions"
                      valuePropName="checked"
                      noStyle
                      rules={[{ required: true, message: "Accept T&C" }]}
                    >
                      <Checkbox>
                        <span className="text-gray-300 text-sm">Terms and Conditions</span>
                      </Checkbox>
                    </Form.Item>

                    <Form.Item name="remember" valuePropName="checked" noStyle>
                      <Checkbox>
                        <span className="text-gray-300 text-sm">Remember me</span>
                      </Checkbox>
                    </Form.Item>
                  </div>
                </Form.Item>
              </>)
              : (
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
                      border: "none",
                      borderBottom: "2px solid #ccc",
                      backgroundColor: "rgba(255, 255, 255, 0.30)",
                      color: "black",
                      height: 120, 
                      resize : "none",
                    }}
                  />
                </Form.Item>
              )
            }


            <Form.Item label={null} style={{ marginBottom: "14px" }}>
              <Button
                type={"primary"}
                htmlType="submit"
                loading={isloading}
                style={{
                  height: "38px",
                  fontSize: "16px",
                  borderRadius: "0px"
                }}
                block
              >Create Account</Button>
            </Form.Item>

            <Divider style={{
              marginBottom: "14px",
            }}>
              <Text type="secondary"><span className='text-xs font-light text-gray-200'>ACCESS QUICKLY</span></Text>
            </Divider>

            <Form.Item label={null} style={{ marginBottom: "16px" }}>
              <div className="flex items-center justify-between gap-4">
                <Form.Item label={null}
                  style={{
                    width: "48%"
                  }}
                >
                  <Button
                    type={"primary"}
                    htmlType="button"
                    loading={isloading}
                    style={{
                      height: "38px",
                      fontSize: "16px",
                      borderRadius: "2px",
                      color: "white",
                      border: "1px solid white"
                    }}
                    ghost
                    block
                    icon={<GoogleOutlined />}
                  >Google</Button>
                </Form.Item>

                <Form.Item label={null}
                  style={{
                    width: "48%"
                  }}
                >
                  <Button
                    type={"primary"}
                    htmlType="button"
                    loading={isloading}
                    style={{
                      height: "38px",
                      fontSize: "16px",
                      borderRadius: "2px",
                      color: "white",
                      border: "1px solid white"
                    }}
                    block
                    ghost
                    icon={<GithubOutlined />}
                  >GitHub</Button>
                </Form.Item>
              </div>
            </Form.Item>
          </Form>
        }

      </Card>
    </div>
  )
}

export default LoginPage

