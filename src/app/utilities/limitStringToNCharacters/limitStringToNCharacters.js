function limitStringToNCharacters(input, n) {
    if (input.length > n) {
        return input.slice(0, n) + " ...";
    }
    return input;
}

export default limitStringToNCharacters;
