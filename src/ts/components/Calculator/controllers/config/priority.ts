interface IPriority {
    [priority: string]: number
}

export const Priority: IPriority = {
    Constant: 3,
    Hight: 2,
    Medium: 1,
    Low: 0,
}
