function codeConnectedParser(text = "") {
    const result = text.split(";")
    return result
}
function reverseString(str: string): string {
    return str.split("").reverse().join("");
}


export { codeConnectedParser, reverseString }