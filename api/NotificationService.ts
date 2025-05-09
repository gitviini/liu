import axios from "axios"
import ApiResponse from "@/types/ApiResponse"

const API_URL = process.env.EXPO_PUBLIC_API_URL || "";

const URL = API_URL + "/notification/"

const CONFIG = {
    headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS"
    }
};

async function getNotifications(authorCode: string) {
    const data: ApiResponse = { message: "", code: 200, content: {} }, error: ApiResponse = { message: "", code: 500, content: {} }
    try {
        console.log(URL + authorCode)
        const response = await axios.get(URL + authorCode, CONFIG)
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

async function postNotification(
    notificationData = {
        title: "",
        description: "",
        date: "",
        time: "",
        type: "",
        occurred: false,
        author_code: ""
    }) {
    const data: ApiResponse = { message: "", code: 200, content: {} }, error: ApiResponse = { message: "", code: 500, content: {} }
    try {
        const response = await axios.post(URL + notificationData.author_code, notificationData, CONFIG)
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

async function uploadNotification(
    notificationData = {
        id: String,
        title: String,
        description: String,
        date: String,
        time: String,
        type: "",
        occurred: Boolean,
        author_code: String
    }) {
    const data: ApiResponse = { message: "", code: 200, content: {} }, error: ApiResponse = { message: "", code: 500, content: {} }
    try {
        const response = await axios.put(URL, notificationData, CONFIG)
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

async function deleteNotification(
    notificationData = {
        id: Number,
        author_code: String
    }) {
    const data: ApiResponse = { message: "", code: 200, content: {} }, error: ApiResponse = { message: "", code: 500, content: {} }
    try {
        const response = await axios.delete(URL + notificationData.author_code, { ...CONFIG, data: notificationData })
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

export { getNotifications, postNotification, uploadNotification, deleteNotification }