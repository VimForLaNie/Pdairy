const postData = (url: string, data: any) => {
    return fetch(url, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(async (res) => {
        const result = await res.json()
        console.log(`Result : `,result)
        return result
    })
    .catch(err => console.log(err));
}

export { postData }