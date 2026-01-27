import { api } from '../api'

export const listMarketTrends = async () => {
    try {
        const response = await api.get('/market/')   
        return response.data     
    } catch (error) {
        throw new Error("Error retrieving Market Trends")
    }
}

export const getMarketTrendById = async (marketTrendId: string) => {
    try {
        const response = await api.get(`/market/${marketTrendId}`)
        return response.data
    } catch (error) {
        throw new Error("Error retrieving Market Trend by ID")
    }
}