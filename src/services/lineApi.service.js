import config from "../config";
import axios from "axios";
import store from "../store/store";

export const getLineToken = async (code) => {
  try {
    const response = await axios.post(
      `${config.lineApiBaseUrl}/token`,
      new URLSearchParams({
        grant_type: "authorization_code",
        code,
        client_id: config.clientId,
        client_secret: config.channelSecret,
        redirect_uri: config.redirectUri,
      }).toString(),
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );
    return response.data;
  } catch (error) {
    throw new Error(error);
  }
};

export const verifyLineAccessToken = async (accessToken) => {
  try {
    // query parameters require access_token
    const response = await axios.get(
      `${config.lineApiBaseUrl}/verify?access_token=${accessToken}`
    );

    if (response.data.expires_in > 0) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    throw new Error(error);
  }
};

export const refreshLineAccessToken = async (refreshToken) => {
  try {
    const response = await axios.post(
      `${config.lineApiBaseUrl}/token`,
      new URLSearchParams({
        grant_type: "refresh_token",
        refresh_token: refreshToken,
        client_id: config.clientId,
        client_secret: config.channelSecret,
      }).toString(),
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );
    console.log("refresh token success");
    return response.data.access_token;
  } catch (error) {
    throw new Error(error);
  }
};

export const lineLogin = async (data) => {
  store.commit("line/setLineLoginData", null);
  /*
        line login state
        使用：直接丟入 Json data

        JSON 範例:
        {
            “page”: “/OnlineOrder”, #分頁名稱
            “store”: “store003”, #商家名稱 可為 null
            "data": { "table": "A15" } #桌號或是其他資訊 可為 null
        }
    */

  let params = Object.entries({
    response_type: "code",
    client_id: config.clientId,
    redirect_uri: "https://line-accounting--line-accounting-pngozd2o.web.app",
    scope: "openid profile",
    bot_prompt: "aggressive",
    // normal 為顯示在授權頁面加入好友按鈕, aggressive 為授權許可後強制跳轉至加入好友頁面
  });
  console.log("line login params", params);

  const url = new URLSearchParams(params);
  const authorizeUrl = `https://access.line.me/oauth2/v2.1/authorize?${url.toString()}`;
  console.log("start login", authorizeUrl);
  window.location.href = authorizeUrl;
};

export const checkLineFriendship = async (accessToken) => {
  try {
    // access token 需放在 header
    const response = await axios.get(config.lineCheckFreindShipApiUrl, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    console.log("check freindship success", response.data);
    return response.data.friendFlag;
  } catch (error) {
    throw new Error(error);
  }
};
