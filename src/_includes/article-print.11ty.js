
exports.render = async function (data) {
    return `\\documentclass{memoir}
\\usepackage{markdown}
\\begin{document}
\\begin{markdown}
${data.content}
\\end{markdown}
\\end{document}`;
}
