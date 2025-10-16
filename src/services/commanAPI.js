import axios from "axios"

const commanAPI = async (httpmethod, url, reqBody) => {
    const reqconfig = {
        method: httpmethod,
        url,
        data: reqBody
    }

    return await axios(reqconfig).then(res => {
        return res
    }).catch(err => {
        return err
    })
}

export default commanAPI

