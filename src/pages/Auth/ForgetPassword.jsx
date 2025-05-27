import { useState } from "react";
import { Steps, Form, Input, Button, message, Typography, Breadcrumb, Layout } from "antd";
import { requestResetCode, validateOtp, resetPassword } from "../../services/reset-password-services/reset-password-service";
import BackButton from "../../components/ReturnButton";
import PATH from "../../routes/path";
import { NavLink } from "react-router-dom";

const { Step } = Steps;
const { Title } = Typography;

//Pantalla para la funcionalidad de restablecer contraseña
const ForgetPassword = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [userId, setUserId] = useState(null);

  const [form] = Form.useForm();

  //Metodo para seguir con el formulario paso 1 al pas 3
  const next = async () => {
    try {
      setLoading(true);
      const values = await form.validateFields();

      if (currentStep === 0) {
        const response = await requestResetCode(values.email);
        setUserId(response.id);
        message.success("Código enviado a tu correo electrónico");
        setCurrentStep(1);
      } else if (currentStep === 1) {
        await validateOtp({ userId, otpCode: values.otp });
        message.success("Código verificado correctamente");
        setCurrentStep(2);
      } else if (currentStep === 2) {
        if (values.newPassword !== values.confirmPassword) {
          message.error("Las contraseñas no coinciden");
          return;
        }
        await resetPassword({
          userId,
          otpCode: values.otp,
          newPassword: values.newPassword,
        });
        message.success("Contraseña actualizada exitosamente");
        setCurrentStep(0);
        form.resetFields();
      }
    } catch (error) {
      message.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const prev = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 0));
  };

  //Pantalla principal
  return (
    <>
      <Layout.Content style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div style={{ background: "#fff", padding: 24, borderRadius: "8px", width: "100%", maxWidth: 600, minHeight:400 }}>

          <div style={{marginBottom:40}}>

            <div style={{ marginLeft: "1rem", display: "flex", gap: "1rem", alignItems: "center" }}>
              <BackButton to={PATH.LOGIN} />
              <Breadcrumb
                items={[
                  { title: <NavLink to={PATH.HOME}>Login</NavLink> },
                  { title: "Recuperar contraseña" },
                ]}
              />
            </div>
          </div>

          <div style={{ maxWidth: 500, margin: "auto" }}>
            <Title level={3} style={{ textAlign: "center" }}>Recuperar Contraseña</Title>
            <Steps current={currentStep} style={{ marginBottom: 40 }}>
              <Step title="Correo Electrónico" />
              <Step title="Código OTP" />
              <Step title="Nueva Contraseña" />
            </Steps>

            <Form form={form} layout="vertical">
              {currentStep === 0 && (
                <Form.Item
                  label="Correo electrónico"
                  name="email"
                  rules={[{ required: true, message: "Por favor ingrese su correo" }]}
                >
                  <Input placeholder="usuario@ejemplo.com" />
                </Form.Item>
              )}

              {currentStep === 1 && (
                <Form.Item
                  label="Código OTP"
                  name="otp"
                  rules={[{ required: true, message: "Ingrese el código OTP" }]}
                >
                  <Input placeholder="123456" />
                </Form.Item>
              )}

              {currentStep === 2 && (
                <>
                  <Form.Item
                    label="Nueva contraseña"
                    name="newPassword"
                    rules={[{
                      required: true,
                      message: "Ingrese su nueva contraseña",
                    }, {
                      pattern: /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$&*~]).{8,}$/,
                      message: "Debe tener al menos 8 caracteres, mayúsculas, minúsculas, número y símbolo"
                    }]}
                  >
                    <Input.Password placeholder="••••••••" />
                  </Form.Item>

                  <Form.Item
                    label="Confirmar contraseña"
                    name="confirmPassword"
                    dependencies={["newPassword"]}
                    rules={[{
                      required: true,
                      message: "Confirme su nueva contraseña",
                    }, ({ getFieldValue }) => ({
                      validator(_, value) {
                        if (!value || getFieldValue("newPassword") === value) {
                          return Promise.resolve();
                        }
                        return Promise.reject(new Error("Las contraseñas no coinciden"));
                      },
                    })]}
                  >
                    <Input.Password placeholder="••••••••" />
                  </Form.Item>
                </>
              )}

              <Form.Item>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  {currentStep > 0 && (
                    <Button onClick={prev} disabled={loading}>
                      Anterior
                    </Button>
                  )}
                  <Button type="primary" onClick={next} loading={loading}>
                    {currentStep === 2 ? "Cambiar contraseña" : "Siguiente"}
                  </Button>
                </div>
              </Form.Item>
            </Form>
          </div>
        </div>
      </Layout.Content>
    </>
  );
};

export default ForgetPassword;
