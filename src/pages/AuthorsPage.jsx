import { Box, Typography, Alert, Card, CardContent, Grid } from '@mui/material'
import { useSelector } from 'react-redux'
import PersonIcon from '@mui/icons-material/Person'
import BookIcon from '@mui/icons-material/Book'

function AuthorsPage() {
  const books = useSelector(state => state.books.books)

  // Group books by author
  const authorStats = books.reduce((acc, book) => {
    const author = book.author
    if (!acc[author]) {
      acc[author] = []
    }
    acc[author].push(book)
    return acc
  }, {})

  const authors = Object.entries(authorStats)
    .map(([name, books]) => ({
      name,
      bookCount: books.length,
      books: books,
    }))
    .sort((a, b) => b.bookCount - a.bookCount)

  return (
    <Box>
      <Typography variant="h3" sx={{ mb: 4, fontWeight: 'bold' }}>
        ✍️ Authors
      </Typography>

      {authors.length === 0 ? (
        <Alert severity="info">No authors found. Add some books first!</Alert>
      ) : (
        <Grid container spacing={3}>
          {authors.map(author => (
            <Grid item xs={12} md={6} lg={4} key={author.name}>
              <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                <CardContent sx={{ flexGrow: 1 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                    <PersonIcon sx={{ color: '#8b5cf6' }} />
                    <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                      {author.name}
                    </Typography>
                  </Box>

                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 1,
                      mb: 2,
                      backgroundColor: '#f3f4f6',
                      p: 1,
                      borderRadius: 1,
                    }}
                  >
                    <BookIcon sx={{ fontSize: 20, color: '#4f46e5' }} />
                    <Typography variant="body2">
                      {author.bookCount} {author.bookCount === 1 ? 'book' : 'books'}
                    </Typography>
                  </Box>

                  <Typography variant="body2" sx={{ fontWeight: 'bold', mb: 1 }}>
                    Titles:
                  </Typography>
                  <Box component="ul" sx={{ pl: 2, m: 0 }}>
                    {author.books.map(book => (
                      <Typography component="li" variant="caption" key={book.id}>
                        {book.title} ({book.yearPublished})
                      </Typography>
                    ))}
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  )
}

export default AuthorsPage
