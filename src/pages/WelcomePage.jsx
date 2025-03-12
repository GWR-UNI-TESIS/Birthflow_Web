import { useEffect } from "react";
import { Button, Space, Spin } from "antd";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/auth-context";

const Welcome = () => {
  const {
    validateAccessToken,
    refreshAccessToken,
    loading,
    tokenCheckRunning,
    setTokenCheckRunning,
  } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const checkToken = async () => {
      setTokenCheckRunning(true);
      const isValid = await validateAccessToken();
      if (isValid) {
        navigate("/");
      } else {
        const refreshed = await refreshAccessToken();
        if (refreshed) {
          navigate("/");
        }
      }
      setTokenCheckRunning(false);
    };

    if (!tokenCheckRunning && localStorage.getItem("accessToken")) {
      checkToken();
    }
  }, [
    navigate,
    validateAccessToken,
    refreshAccessToken,
    tokenCheckRunning,
    setTokenCheckRunning,
  ]);

  return (
    <div style={{ textAlign: "center", marginTop: "20%" }}>
      <Spin spinning={loading} fullscreen></Spin>
      <h1>Welcome to Birthflow</h1>
      <Space direction="vertical" size="large">
        <Button type="primary" onClick={() => navigate("/login")}>
          Login
        </Button>
        <Button onClick={() => navigate("/register")}>Register</Button>
      </Space>
    </div>
  );
};
export default Welcome;
