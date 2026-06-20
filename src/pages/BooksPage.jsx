import { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { Box, Typography, CircularProgress, Alert, Button } from '@mui/material'
import { useApi } from '../hooks/useApi'
import { setBooks, setError, setLoading } from '../store/bookSlice'
import { setError as setGlobalError } from '../store/errorSlice'
import BookForm from '../components/BookForm'
import BookList from '../components/BookList'
import SearchBar from '../components/SearchBar'

function BooksPage() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { data: books, loading, error, refetch } = useApi('/api/books')
  const [editingBook, setEditingBook] = useState(null)
  const [open, setOpen] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);


  useEffect(() => {
    if (books) {
      dispatch(setBooks(books))
    }
  }, [books, dispatch])

  // Refresh books after add/update/delete
  const refreshBooks = async () => {
    await refetch()
  }

  useEffect(() => {
    if (error) {
      dispatch(setError(error.message))
      dispatch(setGlobalError({
        message: error.message,
        statusCode: error.status || 500
      }))
      navigate('/error')
    }
  }, [error, dispatch, navigate])

  useEffect(() => {
    dispatch(setLoading(loading))
  }, [loading, dispatch])

  const handleEdit = (book) => {
    setEditingBook(book)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleCancelEdit = () => {
    setEditingBook(null)
  }

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setEditingBook(null);
    setOpen(false);
  };

  const handleAlertClickOpen = () => {
    setOpenDialog(true);
  };

  const handleAlertClose = () => {
    setOpenDialog(false);
  };

  return (
    <Box>
      <Typography variant="h3" sx={{ mb: 4, fontWeight: 'bold' }}>
        📚 Book Management
      </Typography>
      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}
      {loading && (
        <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
          <CircularProgress />
        </Box>
      )}

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      {/* {success && (
          <Alert severity="success" sx={{ mb: 2 }}>
            Book saved successfully!
          </Alert>
        )} */}

      {!open && (
        <Button variant="contained" color="primary" disabled={loading} onClick={handleClickOpen}>
          Add Book
        </Button>
      )}
      {!loading && (
        <>
          <BookForm book={editingBook} onCancel={handleCancelEdit} onSuccess={refreshBooks} onClose={handleClose} onOpen={handleClickOpen} open={open} />
          <SearchBar/>
          <BookList onEdit={handleEdit} onDeleteSuccess={refreshBooks} onClose={handleClose} onOpen={handleClickOpen} onAlertClickOpen={handleAlertClickOpen} onAlertClose={handleAlertClose} openDialog={openDialog} />
        </>
      )}
    </Box>
  )
}

export default BooksPage
