const parseResponse = res => {
  if (res.ok) {
    return res.json()
  }

  return res.json().then(json => {
    throw Error(json.error.message)
  })
}

export default parseResponse
