import axios from "axios";

export const http = async (path, config = {
    method: "GET",
    headers: {},
    body: {},
    params: {},
}) => {
    const json = {
        ...config.headers,
    };

    const req = axios({
        method: config.method,
        url: path,
        headers: json,
        data: config.body,
        params: config.params,
    });

    const data = await req;
    return data;
};