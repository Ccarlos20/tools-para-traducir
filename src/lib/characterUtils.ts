export function esCaracterJapones(
    char: string
): boolean {
    return /[\u3000-\u303F\u3040-\u30FF\u3400-\u4DBF\u4E00-\u9FFF\uF900-\uFAFF\uFF65-\uFF9F]/u
        .test(char)
}