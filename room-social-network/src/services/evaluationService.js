import axiosClient from "./axiosClient";

const evaluationService = {
    setevaluation: (params) => {
        const url = "/evaluation";
        return axiosClient.post(url, params);
    }
};

export default evaluationService;