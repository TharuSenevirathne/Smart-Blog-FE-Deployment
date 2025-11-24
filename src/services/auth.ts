import api from "./api";

type registerDataTypes = {
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    role: string
}

export const register = async (data: registerDataTypes) => {
    const response = await api.post('/auth/register', data);
    return response.data
}

export const login = async (email: string, password: string) => {
    const response = await api.post('/auth/login', {email, password});
    return response.data
}

export const getMyDetails = async () => {
    const response = await api.get('/auth/me');
    return response.data
}

export const refreshTokens = async (refreshToken: string) => {
    const response = await api.post('/auth/refresh', {token : refreshToken});
    return response.data
}