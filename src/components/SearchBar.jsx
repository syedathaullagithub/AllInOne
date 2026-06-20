import { useState } from "react";
import { bookAPI } from "../services/bookAPI";
import { useDispatch } from 'react-redux'
import TextField from '@mui/material/TextField';
import { setBooks } from '../store/bookSlice'

export default function SearchBar() {
    const dispatch = useDispatch()
    const [query, setQuery] = useState("");

    // const Search = async () => {
    //     try {
    //         if(!query.trim()) {
    //             // If the query is empty, fetch all books
    //             const allBooks = await bookAPI.getBooks();
    //             dispatch(setBooks(allBooks));
    //             return;
    //         }
    //         const results = await bookAPI.fetchSearch(query); // call API
    //         dispatch(setBooks(results)); // update Redux store with search results
    //     } catch (error) {
    //         console.error("Search failed:", error);
    //     }
    // };

    const handleChange = async (e) => {
        const query = e.target.value;
        setQuery(query);
         try {
            if(!query.trim()) {
                // If the query is empty, fetch all books
                const allBooks = await bookAPI.getBooks();
                dispatch(setBooks(allBooks));
                return;
            }
            const results = await bookAPI.fetchSearch(query); // call API
            dispatch(setBooks(results)); // update Redux store with search results
        } catch (error) {
            console.error("Search failed:", error);
        }
    }

    return (
        <div style={{marginTop: '20px'}}>
            <TextField fullWidth label="Search by title, author" variant="outlined" value={query} onChange={handleChange} />
        </div>
    );
}
