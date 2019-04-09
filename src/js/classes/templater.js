export function templater(template, replacement) {
    //const regex = /{{(\w*(?:\.\w+)*)}}/g;
    const regex = /{{(\w*(?:(?::|\.)(?:\$|\w)+)*)}}/g;
    let m, result = template;
    while ((m = regex.exec(template)) !== null) {
        if (m.index === regex.lastIndex) {
            regex.lastIndex++;
        }
        var repl = m[1].split('.').reduce((obj, property) => obj[property], replacement);
        if (repl) {
            result = result.replace(m[0], repl);
        }
    }
    return result;
}