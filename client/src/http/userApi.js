import { $authHost, $host } from "./index"

export const registration = async (username, email, password, role) => {
    const {data} = await $host.post('api/user/registration', {username, email, password, role})
    return data
}

export const login = async (email, password) => {
    const {data} = await $host.post('api/user/login', {email, password})
    return data
}

export const checkAuth = async () => {
    const {data} = await $authHost.get('api/user/auth')
    return data
}

export const getProfile = async (userId) => {
    const { data } = await $authHost.get(`api/profile/${userId}`)
    return data
}

export const createProfile = async () => {
    const { data } = await $authHost.post('api/profile', {})
    return data
}

export const updateSkills = async (profileId, skills) => {
    const { data } = await $authHost.put(`api/profile/${profileId}`, { skills })
    return data
}

export const updateBio = async (profileId, bio) => {
    const { data } = await $authHost.put(`api/profile/${profileId}`, { bio })
    return data
}

export const updateProfileImg = async (profileId, imgFile) => {
    const formData = new FormData()
    formData.append('img', imgFile)
    const { data } = await $authHost.put(`api/profile/${profileId}`, formData)
    return data
}

export const getCategories = async () => {
    const { data } = await $host.get('api/category')
    return data
}

export const createProject = async (title, description, budget, categoryId, imgFile) => {
    const formData = new FormData()
    formData.append('title', title)
    formData.append('description', description)
    formData.append('budget', budget)
    formData.append('categoryId', categoryId)
    if (imgFile) formData.append('img', imgFile)
    const { data } = await $authHost.post('api/project', formData)
    return data
}

export const getProject = async(projectId) => {
    const { data } = await $host.get(`api/project/${projectId}`)
    return data
}

export const createBid = async(price, message, userId, projectId) => {
    const { data } = await $authHost.post('api/bid', {price, message, userId, projectId})
    return data
}

export const getBids = async(userId) => {
    const { data } = await $authHost.get(`api/bid/user/${userId}`)
    return  data 
}

export const getBid = async(bidId) => {
    const { data } = await $authHost.get(`api/bid/${bidId}`)
    return data
}

export const getClientBids = async(userId) => {
    const { data } = await $authHost.get(`api/bid/client/${userId}`)
    return data
}

export const createOrder = async(bidId) => {
    const { data } = await $authHost.post("api/order", { bidId })
    return data
}

export const getOrderMessage = async(orderID) => {
    const { data } = await $authHost.get(`api/message/${orderID}`)
    return data
}

export const postMessage = async (content, orderId, userId) => {
    const { data } = await $authHost.post('api/message', {content, orderId, userId})
    return data
}

export const getUserOrders = async(userId) => {
    const { data } = await $authHost.get(`api/order/user/${userId}`)
    return data
}

export const getOrder = async(orderId) => {
    const { data } = await $authHost.get(`api/order/${orderId}`)
    return data
}

export const updateOrderStatus = async(orderId, status) => {
    const { data } = await $authHost.put(`api/order/${orderId}`, { status })
    return data
}

export const createReview = async(rating, comment, orderId, reviewerId, targetUserId) => {
    const { data } = await $authHost.post('api/review', { rating, comment, orderId, reviewerId, targetUserId })
    return data
}

export const getUserReviews = async(userId) => {
    const { data } = await $authHost.get(`api/review/user/${userId}`)
    return data
}
