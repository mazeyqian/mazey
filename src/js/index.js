function mRenderTable (tbID = null, data = [], property = []) {
    const TBODY = $(`#${tbID} tbody`)
    let content = ''
    TBODY.html('')
    // 无数据
    if (!data.length) {
        content = `<tr><td colspan="${property.length}">无数据</td></tr>`
    } else {
        for (let [i, max] = [0, data.length]; i < max; ++i) {
            let item = data[i]
            content += `<tr>`
            for (let [i, max] = [0, property.length]; i < max; ++i) {
                content += `<td>${mNullToNA(item[property[i]])}</td>`
            }
            content += `</tr>`
        }
    }
    TBODY.html(content)
}
function mNullToNA (str) {
    return str === null ? 'N.A.' : str
}