import { useSelector, useDispatch } from 'react-redux';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Box,
  Typography,
  CircularProgress,
} from '@mui/material';
import { deleteBook } from '../store/bookSlice';
import { bookAPI } from '../services/bookAPI';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { useState } from 'react';

function BookList({ onEdit }) {
  const books = useSelector(state => state.books.books);
  const dispatch = useDispatch();
  const [deleting, setDeleting] = useState(null);

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this book?')) {
      try {
        setDeleting(id);
        await bookAPI.deleteBook(id);
        dispatch(deleteBook(id));
      } catch (error) {
        console.error('Error deleting book:', error);
        alert('Error deleting book: ' + error.message);
      } finally {
        setDeleting(null);
      }
    }
  };

  if (books.length === 0) {
    return (
      <Typography variant="body1" sx={{ textAlign: 'center', py: 4 }}>
        No books found. Add one to get started!
      </Typography>
    );
  }

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }}>
        <TableHead sx={{ backgroundColor: '#f5f5f5' }}>
          <TableRow>
            <TableCell sx={{ fontWeight: 'bold' }}>ID</TableCell>
            <TableCell sx={{ fontWeight: 'bold' }}>Title</TableCell>
            <TableCell sx={{ fontWeight: 'bold' }}>Author</TableCell>
            <TableCell sx={{ fontWeight: 'bold' }} align="right">
              Year Published
            </TableCell>
            <TableCell sx={{ fontWeight: 'bold' }} align="center">
              Actions
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {books.map(book => (
            <TableRow key={book.id} hover>
              <TableCell>{book.id}</TableCell>
              <TableCell>{book.title}</TableCell>
              <TableCell>{book.author}</TableCell>
              <TableCell align="right">{book.yearPublished}</TableCell>
              <TableCell align="center">
                <Box sx={{ display: 'flex', gap: 1, justifyContent: 'center' }}>
                  <Button
                    size="small"
                    variant="outlined"
                    startIcon={<EditIcon />}
                    onClick={() => onEdit(book)}
                    disabled={deleting === book.id}
                  >
                    Edit
                  </Button>
                  <Button
                    size="small"
                    variant="outlined"
                    color="error"
                    startIcon={deleting === book.id ? <CircularProgress size={16} /> : <DeleteIcon />}
                    onClick={() => handleDelete(book.id)}
                    disabled={deleting === book.id}
                  >
                    Delete
                  </Button>
                </Box>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default BookList;
