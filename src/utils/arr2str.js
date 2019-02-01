const arr2str = (trans_result) => {
    trans_result = trans_result.reduce((result={}, cur) => {
        result.src + cur.src + '\n';
        result.dst + cur.dst + '\n';
    })

    trans_result.src.trim()
    trans_result.dst.trim()

    return trans_result
}

export default arr2str
