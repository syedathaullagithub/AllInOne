import { Box, Typography, Alert, Card, CardContent, Grid } from '@mui/material'
import { useSelector } from 'react-redux'
import BookIcon from '@mui/icons-material/Book'
import PersonIcon from '@mui/icons-material/Person'
import CalendarTodayIcon from '@mui/icons-material/CalendarToday'

function DashboardPage() {
  const books = useSelector(state => state.books.books)

  const latestBooks = books.slice(-3).reverse()
  const totalAuthors = new Set(books.map(b => b.author)).size
  const averageYear = Math.round(books.reduce((sum, b) => sum + b.yearPublished, 0) / books.length) || 0

  const StatCard = ({ icon: Icon, title, value, color }) => (
    <Card sx={{ backgroundColor: color, color: 'white' }}>
      <CardContent>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Icon sx={{ fontSize: 40 }} />
          <Box>
            <Typography variant="body2" sx={{ opacity: 0.8 }}>
              {title}
            </Typography>
            <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
              {value}
            </Typography>
          </Box>
        </Box>
      </CardContent>
    </Card>
  )

  return (
    <Box>
      <Typography variant="h3" sx={{ mb: 4, fontWeight: 'bold' }}>
        📊 Dashboard
      </Typography>

      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard icon={BookIcon} title="Total Books" value={books.length} color="#4f46e5" />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard icon={PersonIcon} title="Authors" value={totalAuthors} color="#8b5cf6" />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard icon={CalendarTodayIcon} title="Avg Year" value={averageYear} color="#ec4899" />
        </Grid>
      </Grid>

      <Typography variant="h5" sx={{ mb: 2, fontWeight: 'bold' }}>
        Latest Books
      </Typography>
      {latestBooks.length === 0 ? (
        <Alert severity="info">No books added yet</Alert>
      ) : (
        <Grid container spacing={2}>
          {latestBooks.map(book => (
            <Grid item xs={12} md={6} key={book.id}>
              <Card>
                <CardContent>
                  <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                    {book.title}
                  </Typography>
                  <Typography color="textSecondary">by {book.author}</Typography>
                  <Typography variant="body2" sx={{ mt: 1 }}>
                    Published: {book.yearPublished}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  )
}

export default DashboardPage
