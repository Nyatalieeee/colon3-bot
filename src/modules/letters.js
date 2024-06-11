const letters = [ // 26 total
    "a","s","d","f","g","h","j","k","l",";","a","s","d","f","g",
    "h","j","k","l",";","a","s","d","f","g","h","j","k","l",
];

function keysmash() {
    const letterArr = [];
    for (i = 0; i < 13; i++) {
        let letterNum = Math.floor(Math.random() * letters.length);
        letterArr.push(letters[letterNum]);
    }
    let ksmsh = letterArr.join('');
    return ksmsh;
}

module.exports = {
    letters,
    keysmash: keysmash // wtf is this shit (no seriously)
};