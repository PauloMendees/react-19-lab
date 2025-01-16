import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { AppLayout } from './components/app-layout';
import { Suspense } from 'react';
import { UsePage } from './pages/use';
import { UseTransitionPage } from './pages/useTransition';

function App() {
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <BrowserRouter>
        <AppLayout>
          <Routes>
            <Route path="/*" element={<UsePage />} />
            <Route path="/use-transition" element={<UseTransitionPage />} />
          </Routes>
        </AppLayout>
      </BrowserRouter>
    </Suspense>
  );
}

export default App;
