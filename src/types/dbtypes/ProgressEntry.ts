export type ProgressEntry = {
    _id: string,
    userId: string,
    weightProgress: {
        date: Date,
        weight: number
    }[],
    waterProgress: {
        date: Date,
        water: number
    }[]
}