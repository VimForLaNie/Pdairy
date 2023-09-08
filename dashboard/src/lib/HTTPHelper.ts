const postData = async (url: string, data: any, apiKey: string) => {
    console.log('postData', url, data, apiKey);
    return fetch(url, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json',
            // 'x-api-key' : apiKey
        }
    })
    .then(async (res) => {
        const result = await res.json()
        console.log(`Result : `,result)
        return result
    })
    .catch(err => console.log(err));
}

const getData = async (url: string, apiKey: string) => {
    console.log('getData', url, apiKey);
    return fetch(url, {
        method: 'GET',
        // body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json',
            // 'x-api-key' : apiKey
        }
    })
    .then(async (res) => {
        const result = await res.json()
        console.log(`Result : `,result)
        return result
    })
    .catch(err => console.log(err));
}

export { postData, getData }