const blacklist = new Set();

export default {
    add: (token) => blacklist.add(token),
    has: (token) => blacklist.has(token),
};