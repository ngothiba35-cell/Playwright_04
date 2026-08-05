import { test, expect } from "../fixture/page_fixture";
import { searchBook } from "../test_data/searchBook";

test.describe('Book Store Search', () => {
    test('Search for a book and verify results', async ({ bookStorePage }) => {
        // Open the Book Store page
        await bookStorePage.open();
        await bookStorePage.searchBook(searchBook.searchkey);
        await bookStorePage.verifySearchResult(searchBook.searchkey);
        await bookStorePage.verifySearchResult(searchBook.searchkey);
    });
});
