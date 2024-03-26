function getTimestamp(createdAt) {
    return new Date(createdAt)
}

export function getCreatedDate(createdAt) {
    return new Intl.DateTimeFormat("ru", {dateStyle: "long"}).format(getTimestamp(createdAt))
}

export function getCreatedTime(createdAt) {
    return new Intl.DateTimeFormat("ru", {timeStyle: "short"}).format(getTimestamp(createdAt));
}

export function getFullCreatedAt(createdAt) {
    return `${getCreatedDate(createdAt)} в ${getCreatedTime(createdAt)}`
}