
export const jsonplaceholder = async() => {
    const dt = await fetch('https://jsonplaceholder.typicode.com/posts')
    const data = await dt.json()
    return data
}

export default jsonplaceholder