export interface User {
    id: number,
    name: string
}

export interface Building {
    id: number,
    name: string,
    userId: string,
    locationId: string
}