import React, {useEffect, useState} from 'react'
import { deleteBook, listBooks } from '../services/BookService'
import { useNavigate } from 'react-router-dom'

const ListBookComponent = () => {
    const [books, setBooks] = useState([])
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    const navigator = useNavigate();

    useEffect(()=>{
        getAllBooks();
    },[])

    // function getAllBooks(){
    //     listBooks().then((response)=>{
    //         setBooks(response.data);
    //     }).catch(error=>{
    //         console.error(error);
    //     })
    // }

    // Using async/await for fetching books
    const getAllBooks = async () => {
        try {
            setLoading(true);
            const response = await listBooks();
            setBooks(response.data);
            setError('');
        } catch (err) {
            console.error('Error fetching books:', err);
            setError('Failed to load books. Please try again later.');
        } finally {
            setLoading(false);
        }
    };

    function addNewBook(){
        navigator('/add-book')
    }

    function updateBook(id){
        navigator(`/edit-book/${id}`)
    }

    // function removeBook(id){
    //     console.log(id);

    //     deleteBook(id).then((response) => {
    //         getAllBooks(); 
    //     }).catch((error) => {
    //         console.error(error);
    //     })
    // }

    // Using async/await for delete operation
    const removeBook = async (id) => {
        try {
            await deleteBook(id);
            await getAllBooks(); // Refresh book list
        } catch (err) {
            console.error('Error deleting book:', err);
            alert('Failed to delete the book.');
        }
    };

    // Loading state
    if (loading) {
        return <div className="container mt-3">Loading books...</div>;
    }

    // Error state
    if (error) {
        return <div className="container mt-3 text-danger">{error}</div>;
    }

  return (
    <div className='container'>
        <h2 className='text-center'>List of Books:</h2>
        <button className='btn btn-primary mb-2' onClick={addNewBook}>Add Book</button>
        <table className='table table-striped table-bordered'>
            <thead>
                <tr>
                    <th>Book Id</th>
                    <th>Book Title</th>
                    <th>Book Author</th>
                    <th>Book ISBN</th>
                    <th>Book Price</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {
                    books.map(book =>
                        <tr key={book.id}>
                            <td>{book.id}</td>
                            <td>{book.title}</td>
                            <td>{book.author}</td>
                            <td>{book.isbn}</td>
                            <td>{book.price}</td>
                            <td>
                                <button className='btn btn-info' onClick={()=>updateBook(book.id)}>Update</button>
                                <button className='btn btn-danger' onClick={()=>removeBook(book.id)} style={{marginLeft:'10px'}}>Delete</button>
                            </td>
                        </tr>
                    )
                }
            </tbody>
        </table>
    </div>
    )
}

export default ListBookComponent