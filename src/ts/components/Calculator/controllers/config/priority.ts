interface IPriority {
    [priority: string]: number
}

export const Priority: IPriority = {
    Hight: 2,
    Medium: 1,
    Low: 0,
}

export const weightOfPriority = Object.keys(Priority).sort((a, b) => Priority[b] - Priority[a])