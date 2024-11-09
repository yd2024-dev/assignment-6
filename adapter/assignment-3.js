import previous_assignment from './assignment-2';
;
;
async function listBooks(filters) {
    // Construct query string with filters
    const query = filters?.map(({ from, to, name, author }, index) => {
        let result = '';
        if (typeof from === 'number') {
            result += `&filters[${index}][from]=${from}`;
        }
        if (typeof to === 'number') {
            result += `&filters[${index}][to]=${to}`;
        }
        if (typeof name === 'string' && name.trim().length > 0) {
            result += `&filters[${index}][name]=${name.trim()}`;
        }
        if (typeof author === 'string' && author.trim().length > 0) {
            result += `&filters[${index}][author]=${author.trim()}`;
        }
        return result;
    }).join('&') ?? '';
    // Update the URL to include `/api`
    const result = await fetch(`/api/books?${query}`);
    if (result.ok) {
        return await result.json();
    }
    else {
        throw new Error('Failed to fetch books');
    }
}
async function createOrUpdateBook(book) {
    return await previous_assignment.createOrUpdateBook(book);
}
async function removeBook(book) {
    await previous_assignment.removeBook(book);
}
const assignment = 'assignment-3';
export default {
    assignment,
    createOrUpdateBook,
    removeBook,
    listBooks
};
