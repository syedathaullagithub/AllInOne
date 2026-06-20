import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import {
  TextField,
  Button,
  Box,
  Card,
  CardContent,
  Typography,
  Alert,
} from '@mui/material';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { addBook, updateBook } from '../store/bookSlice';
import { setError as setGlobalError } from '../store/errorSlice';
import { bookAPI } from '../services/bookAPI';
import { useState, useEffect } from 'react';

const validationSchema = yup.object().shape({
  title: yup.string().required('Title is required').min(1),
  author: yup.string().required('Author is required').min(1),
  yearPublished: yup
    .number()
    .required('Year Published is required')
    .min(1000, 'Must be a valid year')
    .max(new Date().getFullYear(), 'Year cannot be in the future'),
});

function BookForm({ book = null, onCancel }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      title: book?.title || '',
      author: book?.author || '',
      yearPublished: book?.yearPublished || new Date().getFullYear(),
    },
  });

  // Reset form when book changes (for editing)
  useEffect(() => {
    if (book) {
      reset({
        title: book.title || '',
        author: book.author || '',
        yearPublished: book.yearPublished || new Date().getFullYear(),
      });
    } else {
      reset({
        title: '',
        author: '',
        yearPublished: new Date().getFullYear(),
      });
    }
  }, [book, reset]);

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      setError(null);
      
      if (book) {
        // Update existing book
        const updated = await bookAPI.updateBook(book.id, data);
        dispatch(updateBook(updated));
      } else {
        // Add new book
        const newBook = await bookAPI.createBook(data);
        dispatch(addBook(newBook));
      }
      
      setSuccess(true);
      reset();
      setTimeout(() => {
        setSuccess(false);
        onCancel?.();
      }, 2000);
    } catch (err) {
      const errorMessage = err.message || 'Error saving book';
      setError(errorMessage);
      console.error('Error saving book:', err);
      
      // Check if it's a server error (5xx)
      if (errorMessage.includes('500') || errorMessage.includes('502') || errorMessage.includes('503') || errorMessage.includes('504')) {
        dispatch(setGlobalError({
          message: `Server error while saving book: ${errorMessage}`,
          statusCode: parseInt(errorMessage.match(/\d+/)?.[0]) || 500
        }));
        navigate('/error');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card sx={{ mb: 3, p: 2 }}>
      <CardContent>
        <Typography variant="h6" sx={{ mb: 2 }}>
          {book ? 'Edit Book' : 'Add New Book'}
        </Typography>
        
        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}
        
        {success && (
          <Alert severity="success" sx={{ mb: 2 }}>
            Book saved successfully!
          </Alert>
        )}
        
        <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <Controller
            name="title"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Title"
                error={!!errors.title}
                helperText={errors.title?.message}
                fullWidth
              />
            )}
          />

          <Controller
            name="author"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Author"
                error={!!errors.author}
                helperText={errors.author?.message}
                fullWidth
              />
            )}
          />

          <Controller
            name="yearPublished"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Year Published"
                type="number"
                error={!!errors.yearPublished}
                helperText={errors.yearPublished?.message}
                fullWidth
              />
            )}
          />

          <Box sx={{ display: 'flex', gap: 1 }}>
            <Button type="submit" variant="contained" color="primary" disabled={loading}>
              {loading ? 'Saving...' : book ? 'Update Book' : 'Add Book'}
            </Button>
            {book && (
              <Button variant="outlined" onClick={onCancel} disabled={loading}>
                Cancel
              </Button>
            )}
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
}

export default BookForm;
