Your task is to create a Vue.js application that allows users to manage a list of books. The application should include the following key features:
Book Listing: Display a list of books with details like title, author, and description.
Add New Book: Provide a form where users can enter the title, author, and description to add a new book.
Edit Book: Allow users to select a book and update its information.
Filter Books: Allow users to view all books of a given user.
Delete Book: Enable users to remove a book from the list with a confirmation prompt.
Additional Features (Time Permitting):
Pagination: Implement pagination to handle large lists of books.
Form Validation: Ensure all required fields (e.g., title, author) are validated before submission.
API Details: Use the following mock API to perform CRUD operations:
API Base URL: https://jsonplaceholder.typicode.com/posts
Endpoints:
Get all books: GET https://jsonplaceholder.typicode.com/posts 
Get a single book: GET https://jsonplaceholder.typicode.com/posts/{id} 
Add a new book: POST https://jsonplaceholder.typicode.com/posts 
Edit a book: PUT https://jsonplaceholder.typicode.com/posts/{id} 
Filter books by a user: GET https://jsonplaceholder.typicode.com/posts?userId=1 
Delete a book: DELETE https://jsonplaceholder.typicode.com/posts/{id}
