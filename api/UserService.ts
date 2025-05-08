import axios from "axios"
import ApiResponse from "@/types/ApiResponse"

const API_URL = process.env.EXPO_PUBLIC_API_URL || "";

const URL = API_URL + "/user/"

const CONFIG = {
    headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS"
    }
};

async function getUser(
    code: string
) {
    const data: ApiResponse = { message: "", code: 200, content: {} }, error: ApiResponse = { message: "", code: 500, content: {} }
    try {
        const response = await axios.get(URL + code, CONFIG)
        data.message = response.data?.message
        data.content = response.data?.content
        data.code = response.data?.code
    }
    catch (e: any) {
        error.message = e?.message
        error.content = e
        error.code = e?.code
    }
    finally {
        return { data, error }
    }
}

async function postUser(
    userData = {
        type: "",
        code: "",
        code_connected: "",
        region: "",
    }) {
    const data: ApiResponse = { message: "", code: 200, content: {} }, error: ApiResponse = { message: "", code: 500, content: {} }
    try {
        const response = await axios.post(URL+userData.code, userData, CONFIG)
        data.message = response.data?.message
        data.content = response.data?.content
        data.code = response.data?.code
    }
    catch (e: any) {
        error.message = e?.message
        error.content = e
        error.code = e?.code
    }
    finally {
        return { data, error }
    }
}

async function uploadUser(
    userData = {
        code: "",
        type: "",
        code_connected: "",
        region: "",
    }) {
    const data: ApiResponse = { message: "", code: 200, content: {} }, error: ApiResponse = { message: "", code: 500, content: {} }
    try {
        const response = await axios.put(URL, userData, CONFIG)
        data.message = response.data?.message
        data.content = response.data?.content
        data.code = response.data?.code
    }
    catch (e: any) {
        error.message = e?.message
        error.content = e
        error.code = e?.code
    }
    finally {
        return { data, error }
    }
}

async function deleteUser(
    userData = {
        code: ""
    }) {
    const data: ApiResponse = { message: "", code: 200, content: {} }, error: ApiResponse = { message: "", code: 500, content: {} }
    try {
        const response = await axios.delete(URL+userData.code, { ...CONFIG, data: userData })
        data.message = response.data?.message
        data.content = response.data?.content
        data.code = response.data?.code
    }
    catch (e: any) {
        error.message = e?.message
        error.content = e
        error.code = e?.code
    }
    finally {
        return { data, error }
    }
}

export { getUser, postUser, uploadUser, deleteUser }