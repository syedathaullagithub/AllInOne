import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import {
  TextField,
  Button,
  Box,
} from '@mui/material';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setError as setGlobalError } from '../store/errorSlice';
import { bookAPI } from '../services/bookAPI';
import { useState, useEffect } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';


const validationSchema = yup.object().shape({
  title: yup.string().required('Title is required').min(1),
  author: yup.string().required('Author is required').min(1),
  yearPublished: yup
    .number()
    .required('Year Published is required')
    .min(1000, 'Must be a valid year')
    .max(new Date().getFullYear(), 'Year cannot be in the future'),
});

function BookForm({ book = null, onCancel, onSuccess, onClose, onOpen, open }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

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

      if (book) {
        // Update existing book
        await bookAPI.updateBook(book.id, data);
      } else {
        // Add new book
        await bookAPI.createBook(data);
      }
      reset();
      setTimeout(() => {
        onCancel?.();
        // Refetch books after successful add/update
        onSuccess?.();
                onClose?.();
                reset();
      }, 1);
    } catch (err) {
      const errorMessage = err.message || 'Error saving book';
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
        <Dialog
          onClose={onClose}
          aria-labelledby="customized-dialog-title"
          open={open}
        >
          <form onSubmit={handleSubmit(onSubmit)}>
            <DialogTitle sx={{ m: 0, p: 2 ,color: 'primary.main' }} id="customized-dialog-title">
              {book ? 'Edit Book' : open ? 'Add New Book' : ''}
            </DialogTitle>
            <IconButton
              aria-label="close"
              onClick={onClose}
              sx={(theme) => ({
                position: 'absolute',
                right: 8,
                top: 8,
                color: theme.palette.grey[500],
              })}
            >
              <CloseIcon />
            </IconButton>
            <DialogContent dividers>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
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
              </Box>
            </DialogContent>
            <DialogActions>
              <Box sx={{ display: 'flex', gap: 1 }}>
                <Button type="submit" variant="contained" color="primary" disabled={loading}>
                  {loading ? 'Saving...' : book ? 'Update Book' : 'Add Book'}
                </Button>
              </Box>
            </DialogActions>
          </form>
        </Dialog>
  );
}

export default BookForm;
