export default async function listBooks(books, filters) {
    const { books: bookCollection } = books;
    const validFilters = filters?.filter(({ from, to, name, author }) => typeof from === 'number' ||
        typeof to === 'number' ||
        (typeof name === 'string' && name.trim().length > 0) ||
        (typeof author === 'string' && author.trim().length > 0)) ?? [];
    const query = validFilters.length > 0
        ? {
            $or: validFilters.map(({ from, to, name, author }) => {
                const filter = {};
                if (typeof from === 'number') {
                    filter.price = { $gte: from };
                }
                if (typeof to === 'number') {
                    filter.price = { ...(filter.price ?? {}), $lte: to };
                }
                if (typeof name === 'string') {
                    filter.name = { $regex: name.toLowerCase(), $options: 'ix' };
                }
                if (typeof author === 'string') {
                    filter.author = { $regex: author.toLowerCase(), $options: 'ix' };
                }
                return filter;
            })
        }
        : {};
    const bookList = await bookCollection.find(query).map(document => {
        const book = {
            id: document._id.toHexString(),
            name: document.name,
            image: document.image,
            price: document.price,
            author: document.author,
            description: document.description
        };
        return book;
    }).toArray();
    return bookList;
}
