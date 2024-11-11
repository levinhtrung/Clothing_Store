import axios from "axios";

export const axiosJWT = axios.create(); //khi gọi đến getDetails nó sẽ chạy vào axios app.js

export const createrOTP = async (data) => {
  console.log(data);
  const res = await axios.post(
    `${process.env.REACT_APP_API_URL}/otp/create-otp`,
    data
  );
  return res.data;
};

export const createrOTPPassword = async (data) => {
  console.log(data);
  const res = await axios.post(
    `${process.env.REACT_APP_API_URL}/otp/create-otp-password`,
    data
  );
  return res.data;
};

export const deleteOTP = async (email) => {
  const res = await axios.delete(
    `${process.env.REACT_APP_API_URL}/otp/delete-otp/${email}`,
  );
  return res.data;
};
