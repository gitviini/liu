import axios from "axios"
import ApiResponse from "@/types/ApiResponse"

const API_URL = process.env.EXPO_PUBLIC_API_URL || "";

async function getNotifications(authorCode: string) {
    const data:ApiResponse = { message: "", code: 200, content: {} }, error:ApiResponse = { message: "", code: 500, content: {} }
    try {
        console.log(API_URL+"/notification/"+authorCode)
        const response = await axios.get(API_URL+"/notification/"+authorCode)
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
        title: String,
        description: String,
        date: String,
        time: String,
        occurred: Boolean,
        author_code: String
    }) {
        const data:ApiResponse = { message: "", code: 200, content: {} }, error:ApiResponse = { message: "", code: 500, content: {} }
    try {
        const response = await axios.post(API_URL, notificationData)
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
        occurred: Boolean,
        author_code: String
    }) {
        const data:ApiResponse = { message: "", code: 200, content: {} }, error:ApiResponse = { message: "", code: 500, content: {} }
    try {
        const response = await axios.put(API_URL, notificationData)
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
        const data:ApiResponse = { message: "", code: 200, content: {} }, error:ApiResponse = { message: "", code: 500, content: {} }
    try {
        const response = await axios.delete(API_URL, {data: notificationData})
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

export {getNotifications, postNotification, uploadNotification, deleteNotification}