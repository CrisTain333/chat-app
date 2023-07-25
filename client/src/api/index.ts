/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-return */

import axiosInstance from "../utils/axios";

export const getUserProfile = async (token: string) => {
  try {
    const response = await axiosInstance.get(`/user/me`, {
      headers: { authorization: `${token}` },
    });
    return response?.data;
  } catch (e: any) {
    throw new Error(e?.response?.data?.message);
    // return e;
  }
};
export const searchUser = async (
  token: string,
  serachQuery: string
) => {
  try {
    const response = await axiosInstance.get(
      `/user?search=${serachQuery}`,
      {
        headers: { authorization: `${token}` },
      }
    );
    return response?.data;
  } catch (e: any) {
    throw new Error(e?.response?.data?.message);
    // return e;
  }
};
