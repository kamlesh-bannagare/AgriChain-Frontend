import Dashboard from '../components/admin/Dashboard';
import { Container } from '@mui/material';

const AdminPage = () => {
  return (
    <Container maxWidth="xl" sx={{ py: 3 }}>
      <Dashboard />
    </Container>
  );
};

export default AdminPage;