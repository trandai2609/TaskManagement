import React from 'react';
import { AuthProvider } from './context/AuthContext';
import { TaskProvider } from './context/TaskContext';
import AppRouter from './routes';
import Layout from './components/Layout';
import 'bootstrap/dist/css/bootstrap.min.css';

const App: React.FC = () => (
  <AuthProvider>
    <TaskProvider>
      <Layout>
        <AppRouter />
      </Layout>
    </TaskProvider>
  </AuthProvider>
);

export default App;
