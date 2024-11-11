import axios from "axios";
import { axiosJWT } from "./userServices";

export const createCart = async (id, access_token, data) => {
  const res = await axiosJWT.post(
    `${process.env.REACT_APP_API_URL}/cart/create/${id}`,
    data,
    {
      headers: {
        token: `Bearer ${access_token}`,
      },
    }
  );
  return res.data;
};

export const updateCart = async (id, access_token, data) => {
  const res = await axiosJWT.put(
    `${process.env.REACT_APP_API_URL}/cart/update/${id}`,
    data,
    {
      headers: {
        token: `Bearer ${access_token}`,
      },
    }
  );
  return res.data;
};

export const getCartByUserId = async (id, access_token) => {
  const res = await axiosJWT.get(
    `${process.env.REACT_APP_API_URL}/cart/get-all-cart/${id}`,
    {
      headers: {
        token: `Bearer ${access_token}`,
      },
    }
  );
  return res.data;
};

export const deleteCartDetails = async (userId, cartId, access_token) => {
  const res = await axiosJWT.delete(
    `${process.env.REACT_APP_API_URL}/cart/delete-cart-details/${userId}/${cartId}`,
    {
      headers: {
        token: `Bearer ${access_token}`,
      },
    }
  );
  return res.data;
};

export const deleteUpdateCart = async (data, access_token) => {
  const res = await axiosJWT.post(
    `${process.env.REACT_APP_API_URL}/cart/delete-update-cart`,
    data,
    {
      headers: {
        token: `Bearer ${access_token}`,
      },
    }
  );
  return res.data;
};

export const deleteManyCart = async (userId, ids, access_token) => {
  const res = await axiosJWT.post(
    `${process.env.REACT_APP_API_URL}/cart/delete-many-cart/${userId}`,
    ids,
    {
      headers: {
        token: `Bearer ${access_token}`,
      },
    }
  );
  return res.data;
};
