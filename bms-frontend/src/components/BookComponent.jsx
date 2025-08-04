import React, {useEffect, useState} from 'react'
import { createBook, getBook, updateBook } from '../services/BookService'
import { useNavigate, useParams } from 'react-router-dom'

const BookComponent = () => {
    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')
    const [isbn, setIsbn] = useState('')
    const [price, setPrice] = useState('')

    const {id} = useParams()

    const [errors, setErrors] = useState({
        title:'',
        author:'',
        isbn:'',
        price:''
    })

    const navigator = useNavigate();

    useEffect(()=>{
        if(id){
            getBook(id).then((response)=>{
                setTitle(response.data.title);
                setAuthor(response.data.author);
                setIsbn(response.data.isbn);
                setPrice(response.data.price);
            }).catch(error => {
                console.error(error);
            })
        }
    },[id])

    function saveOrUpdateBook(e){
        e.preventDefault();

        if(validateForm()){
            const book = {title, author, isbn, price}
            console.log(book);

            if(id){
                updateBook(id, book).then((response) => {
                    console.log(response.data);
                    navigator('/books');
                }).catch((error) => {
                    console.error(error);
                })
            }else{
                createBook(book).then((response) => {
                    console.log(response.data);
                    navigator('/books');
                }).catch((error) => {
                    console.error(error);
                })
            }
        }  
    }

    function validateForm(){
        let valid = true;

        const errorCopy = {... errors} //???

        if(title.trim()){
            errorCopy.title = '';
        }else{
            errorCopy.title = 'Title is required';
            valid = false;
        }

        if(author.trim()){
            errorCopy.author = '';
        }else{
            errorCopy.author = 'Author is required';
            valid = false;
        }

        if(isbn.trim()){
            errorCopy.isbn = '';
        }else{
            errorCopy.isbn = 'ISBN is required';
            valid = false;
        }

        if(price.trim()){
            errorCopy.price = '';
        }else{
            errorCopy.price = 'Price is required';
            valid = false;
        }

        setErrors(errorCopy);

        return valid;
    }

    function pageTitle(){
        if(id){
            return <h2 className='text-center'>Update Book</h2>
        }else{
            return <h2 className='text-center'>Add Book</h2>
        }
    }

  return (
    <div className='container'>
        {/* <br/><br/> */}
        <div className='row'>
            <div className='card'>
            {/* <div className='card col-md-6 offset-md-3 offset-md-3'> */}
                {
                    pageTitle() //generate dynamic page title
                }
                <div className='card-body'>
                    <form>
                        <div className='form-group mb-2'>
                            <label className='form-label'>Title:</label>
                            <input 
                            type='text' 
                            placeholder='Enter Book Title' 
                            name='title' 
                            value={title} 
                            className={`form-control ${ errors.title ? 'is-invalid':''}`} //???
                            onChange={(e)=>setTitle(e.target.value)}>
                            </input>
                            { errors.title && <div className='invalid-feedback'>{ errors.title}</div>} 
                        </div>

                        <div className='form-group mb-2'>
                            <label className='form-label'>Author:</label>
                            <input 
                            type='text' 
                            placeholder='Enter Book Author' 
                            name='author' 
                            value={author} 
                            className={`form-control ${ errors.author ? 'is-invalid':''}`}
                            onChange={(e)=>setAuthor(e.target.value)}>
                            </input>
                            { errors.author && <div className='invalid-feedback'>{ errors.author}</div>} 
                        </div>

                        <div className='form-group mb-2'>
                            <label className='form-label'>ISBN:</label>
                            <input 
                            type='text' 
                            placeholder='Enter Book ISBN' 
                            name='isbn' 
                            value={isbn} 
                            className={`form-control ${ errors.isbn ? 'is-invalid':''}`}
                            onChange={(e)=>setIsbn(e.target.value)}>
                            </input>
                            { errors.isbn && <div className='invalid-feedback'>{ errors.isbn}</div>} 
                        </div>

                        <div className='form-group mb-2'>
                            <label className='form-label'>Price:</label>
                            <input 
                            type='text' 
                            placeholder='Enter Book Price' 
                            name='price' 
                            value={price} 
                            className={`form-control ${ errors.price ? 'is-invalid':''}`}
                            onChange={(e)=>setPrice(e.target.value)}>
                            </input>
                            { errors.price && <div className='invalid-feedback'>{ errors.price}</div>} 
                        </div>

                        <button className='btn btn-success' onClick={saveOrUpdateBook}>Submit</button>
                    </form>
                </div>
            </div>
        </div>

    </div>
  )
}

export default BookComponent