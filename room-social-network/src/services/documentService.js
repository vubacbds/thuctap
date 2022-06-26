import axiosClient from "./axiosClient";

const documentService = {
    getdocument: () => {
        const url = "/document";
        return axiosClient.get(url);
    },
    deletedocument: (id) => {
        const url = `/document/delete/${id}`;
        return axiosClient.delete(url);
    },
    adddocument: (params) => {
        const url = "/document";
        return axiosClient.post(url, params);
    },
    getdocumentIdParent: (id) => {
        const url = `/document/room/${id}`;
        return axiosClient.get(url);
    },
}
export default documentService;