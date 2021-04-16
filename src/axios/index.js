import { Modal } from "antd";
import axios from "axios"

//eslint-disable-next-line
export default {
    ajax(options) {
        let baseApi = "https://mock.mengxuegu.com/mock/606ef997b43557571f72695b/mockAPI";
        return new Promise((resolve, reject) => {
            let ajaxLoading = document.getElementById("ajaxLoading")
            ajaxLoading.style.display = "block";
            axios({
                url: options.url,
                method: options.method,
                baseURL: baseApi,
                params: (options.data && options.data.params) || "",
            }).then(res => {
                if (res.status === 200) {
                    if (res.data.success === "ok") {
                        ajaxLoading.style.display = "none";
                        resolve(res);
                    } else {
                        Modal.info({
                            title: "提示",
                            content: res.data.msg
                        })
                    }
                } else {
                    reject(res);
                }
            })
        })
    }
}