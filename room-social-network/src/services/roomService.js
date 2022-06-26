import axiosClient from "./axiosClient";

const roomService = {
    addroom: (params) => {
        const url = "/room";
        return axiosClient.post(url, params);
    },
    getroom: () => {
        const url = "/room/info";
        return axiosClient.get(url);
    },
    getroomid: (id) => {
        const url = `/room/${id}`;
        return axiosClient.get(url);
    },
    deleteroom: (id) => {
        const url = `/room/${id}`;
        return axiosClient.delete(url);
    },
    updateroom: (id, params) => {
        const url = `/room/${id}`;
        return axiosClient.put(url, params);
    },
    getroominfoid: (id) => {
        const url = `/room/info/${id}`;
        return axiosClient.get(url);
    },
    searchroom: (params) => {
        const url = "/room/search";
        return axiosClient.post(url, params);
    },

}
export default roomService;