const arr2str = (trans_result) => {
    let res = {
        src: '',
        dst: ''
    }

    trans_result.forEach((item) => {
        res.src += (item.src + '\n')
        res.dst += (item.dst + '\n')
    })

    res.src.trim()
    res.dst.trim()

    return res
}

export default arr2str
