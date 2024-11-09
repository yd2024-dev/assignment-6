;
async function listBooks(filters) {
    // We want to generate the query string to match the format expected by qs: https://www.npmjs.com/package/qs
    const query = filters?.map(({ from, to }, index) => {
        let result = '';
        if (typeof from === 'number') {
            result += `&filters[${index}][from]=${from}`;
        }
        if (typeof to === 'number') {
            result += `&filters[${index}][to]=${to}`;
        }
        return result;
    }).join('&') ?? '';
    // Update the fetch URL to use '/api' as the base path
    const result = await fetch(`/api/books?${query}`);
    if (result.ok) {
        // And if it is valid, we parse the JSON result and return it.
        return await result.json();
    }
    else {
        throw new Error('Failed to fetch books');
    }
}
const assignment = 'assignment-1';
export default {
    assignment,
    listBooks
};
