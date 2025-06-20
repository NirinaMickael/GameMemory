import { AppProvider } from './app/providers';
import { AppRoutes } from './app/routes/AppRoute';
import { Header } from '@/components/layout/Header';

function App() {
  return (
    <AppProvider>
      <Header />
      <AppRoutes />
    </AppProvider>
  );
}

export default App;
