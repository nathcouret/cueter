export function isEmpty(data?: string | null): boolean {
    return data === undefined || data === null || data === "";
}

export function isNil<T = any>(data?: T | null): boolean {
    return data === undefined || data === null;
}

export function deepCopy<T = any>(data?: T | null): T | null {
    if (isNil(data)) {
        return null;
    }
    return JSON.parse(JSON.stringify(data));
}