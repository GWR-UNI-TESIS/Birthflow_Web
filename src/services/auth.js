import { plainAxios } from "./api";
import { getDeviceInfo } from "./device";

export const login = async (credentials) => {
  const response = await plainAxios.post("/api/auth/login", credentials, {
    headers: {
      "Device-Info": getDeviceInfo(),
    },
  });

  return response.data.response; // Retorna accessToken y refreshToken
};

export const refreshToken = async (accessToken, refreshToken) => {
  const response = await plainAxios.post(
    "/api/auth/refresh",
    { accessToken, refreshToken },
    {
      headers: {
        "Device-Info": getDeviceInfo(),
      },
    }
  );

  return response.data.response; // Retorna el nuevo accessToken
};
