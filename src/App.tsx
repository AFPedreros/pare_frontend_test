import { BrowserRouter, Routes, Route } from 'react-router-dom';
import RecoveryProvider from '@/context/RecoveryContext';
import Login from '@/components/auth/Login';
import { useToken } from '@/hooks/useToken';

function App() {
  const { token, setToken } = useToken();
  if (!token) {
    return (
      <RecoveryProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Login setToken={setToken} />} />
            {/* <Route path="/recovery/:tmp" element={<RecoveryPass />} />
            <Route path="*" element={<NotFound />} /> */}
          </Routes>
        </BrowserRouter>
      </RecoveryProvider>
    );
  }

  return (
    <div>
      <p>Hello world</p>
    </div>
  );
}

export default App;
