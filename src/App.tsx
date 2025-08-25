import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import RootLayout from './layouts/RootLayout'
import Home from './pages/Home'
import Index from './pages/Index'
import Create from './pages/Create'
import Edit from './pages/Edit'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ThemeContextProvider } from './context/ThemeContext'

function App() {
  const queryClient = new QueryClient();
  return (
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <ThemeContextProvider>
          <Routes>
            <Route path='/' element={<RootLayout />}>
              <Route index element={<Home />} />
              <Route path='users' element={<Index />} />
              <Route path='users/create' element={<Create />} />
              <Route path='users/edit/:id' element={<Edit />} />
            </Route>
          </Routes>
        </ThemeContextProvider>

      </QueryClientProvider>

    </BrowserRouter>)
}

export default App
