import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { AppLayout } from './components/app-layout';
import { Suspense } from 'react';
import { UsePage } from './pages/use';
import { UseTransitionPage } from './pages/use-transition';
import { UseFormStatusPage } from './pages/use-form-status';
import { UseOptimisticPage } from './pages/use-optimistic';
import { ReactPlayerPage } from './pages/react-player';
import { RecorderPage } from './pages/recorder';

function App() {
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <BrowserRouter>
        <AppLayout>
          <Routes>
            <Route path="/*" element={<UsePage />} />
            <Route path="/use-transition" element={<UseTransitionPage />} />
            <Route path="/use-form-status" element={<UseFormStatusPage />} />
            <Route path="/use-optimistic" element={<UseOptimisticPage />} />
            <Route path="/player" element={<ReactPlayerPage />} />
            <Route path="/recorder" element={<RecorderPage />} />
          </Routes>
        </AppLayout>
      </BrowserRouter>
    </Suspense>
  );
}

export default App;
