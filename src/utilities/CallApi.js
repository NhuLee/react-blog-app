import { BlogAPI } from "./Constants";
import axios from "axios";

const callApi = (uri = "", method = "GET", body = null, headers = null) => {
    return axios({
        method: method,
        url: BlogAPI + "/" + uri,
        data: body,
        headers: headers,
    });
};

export default callApi;
