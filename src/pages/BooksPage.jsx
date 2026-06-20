import { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { Box, Typography, CircularProgress, Alert } from '@mui/material'
import { useApi } from '../hooks/useApi'
import { setBooks, setError, setLoading } from '../store/bookSlice'
import BookForm from '../components/BookForm'
import BookList from '../components/BookList'

function BooksPage() {
  const dispatch = useDispatch()
  const { data: books, loading, error } = useApi('/api/books')
  const [editingBook, setEditingBook] = useState(null)

  useEffect(() => {
    if (books) {
      dispatch(setBooks(books))
    }
  }, [books, dispatch])

  useEffect(() => {
    if (error) {
      dispatch(setError(error.message))
    }
  }, [error, dispatch])

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
      {!loading && (
        <>
          <BookForm book={editingBook} onCancel={handleCancelEdit} />
          <BookList onEdit={handleEdit} />
        </>
      )}
    </Box>
  )
}

export default BooksPage
