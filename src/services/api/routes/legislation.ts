import { api } from '../api'

export const listLegislation = async () => {
    try {
        const response = await api.get('/legislation/')
        return response.data
    } catch (error) {
        throw new Error("Error retrieving Legislation")
    }
}

export const getLegislationById = async (legislationId: string) => {
    try {
        const response = await api.get(`/legislation/${legislationId}`)
        return response.data
    } catch (error) {
        throw new Error("Error retrieving Legislation by ID")
    }
}