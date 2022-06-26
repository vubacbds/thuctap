import axiosClient from "./axiosClient";

const userService = {
    // api login
    authenticate: (params) => {
        const url = "/user/login";
        return axiosClient.post(url, params);
    },
    add: (params) => {
        const url = "/user/signup";
        return axiosClient.post(url, params);
    },
    delete: (id) => {
        const url = `/user/${id}`;
        return axiosClient.delete(url);
    },
    getall: () => {
        const url = "/user/all";
        return axiosClient.get(url);
    },
    getid: (id) => {
        const url = `/user/${id}`;
        return axiosClient.get(url);
    },
    update: (id, params) => {
        const url = `/user/${id}`;
        return axiosClient.put(url, params);
    }
};

export default userService;