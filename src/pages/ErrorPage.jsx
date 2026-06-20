import { useSelector, useDispatch } from 'react-redux';
import { Box, Button, Container, Typography } from '@mui/material';
import ErrorIcon from '@mui/icons-material/Error';
import { useNavigate } from 'react-router-dom';
import { clearError } from '../store/errorSlice';

function ErrorPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { error, statusCode } = useSelector(state => state.error);

  const handleRetry = () => {
    dispatch(clearError());
    navigate('/books');
  };

  const handleHome = () => {
    dispatch(clearError());
    navigate('/dashboard');
  };

  return (
    <Container maxWidth="sm" sx={{ py: 8 }}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
          gap: 3,
        }}
      >
        <ErrorIcon sx={{ fontSize: 80, color: 'error.main' }} />
        
        <Typography variant="h2" component="h1" sx={{ fontWeight: 'bold', color: 'error.main' }}>
          {statusCode || '500'}
        </Typography>

        <Typography variant="h4" sx={{ mb: 2 }}>
          API Error
        </Typography>

        <Typography variant="body1" sx={{ color: 'text.secondary', mb: 3 }}>
          {error || 'An error occurred while fetching data from the server.'}
        </Typography>

        <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap' }}>
          <Button
            variant="contained"
            color="primary"
            size="large"
            onClick={handleRetry}
          >
            Retry
          </Button>
          <Button
            variant="outlined"
            color="primary"
            size="large"
            onClick={handleHome}
          >
            Go to Dashboard
          </Button>
        </Box>
      </Box>
    </Container>
  );
}

export default ErrorPage;
