import previous_assignment from './assignment-1';
;
async function listBooks(filters) {
    return await previous_assignment.listBooks(filters);
}
async function createOrUpdateBook(book) {
    // Update the fetch URL to use '/api' as base path
    const result = await fetch('/api/books', {
        method: 'POST',
        body: JSON.stringify(book),
        headers: {
            'Content-Type': 'application/json'
        }
    });
    if (result.ok) {
        const res = await result.json();
        return res.id;
    }
    else {
        throw new Error('Failed to create or update book');
    }
}
async function removeBook(book) {
    // Update the fetch URL to use '/api' as base path
    const result = await fetch(`/api/books/${book}`, { method: 'DELETE' });
    if (!result.ok) {
        throw new Error('Failed to remove book');
    }
}
const assignment = 'assignment-2';
export default {
    assignment,
    createOrUpdateBook,
    removeBook,
    listBooks
};
