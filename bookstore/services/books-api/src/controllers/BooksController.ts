import { Get, Route, Tags } from 'tsoa';
import { Book } from '../models/Book';

@Route('books')
@Tags('Books')
export class BooksController {

  @Get('/')
  public async getBooks(): Promise<Book[]> {
    return [
      { id: '1', name: 'The Great Gatsby', author: 'F. Scott Fitzgerald', price: 10, description: 'A novel set in the Roaring Twenties.', image: 'gatsby.jpg' },
      { id: '2', name: '1984', author: 'George Orwell', price: 15, description: 'A dystopian novel set in a totalitarian society.', image: '1984.jpg' }
    ];
  }
}
