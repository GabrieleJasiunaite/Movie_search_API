export async function fetchData(url, apiKey) {
    const res = await fetch(url + apiKey);

    if (!res.ok) {
        throw Error('Could not fetch data');
    }
    const data = await res.json();
    return data;
}