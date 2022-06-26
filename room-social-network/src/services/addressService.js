import axiosClient from "./axiosClient";

const addressService = {
    getProvince: () => {
        const url = "/province";
        return axiosClient.get(url);
    },
    getDistrict: () => {
        const url = "/district";
        return axiosClient.get(url);
    },
    getWard: () => {
        const url = "/ward";
        return axiosClient.get(url);
    },
};

export default addressService;