export type ProgressEntry = {
    _id: string,
    userId: string,
    weight_progress: {
        date: Date,
        weight: number
    }[],
    water_progress: {
        date: Date,
        water: number
    }[]
}