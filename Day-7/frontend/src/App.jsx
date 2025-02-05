import {BrowserRouter,Routes,Route} from 'react-router';
import Home from './pages/Home';
import ProductsPage from './pages/ProductsPage';
const App = () => {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home />} >
      <Route path="/products" element={<ProductsPage />} />
      </Route>
    </Routes>
  </BrowserRouter>
  )
}

export default App
