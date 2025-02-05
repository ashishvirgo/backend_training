import {Link,Outlet} from 'react-router-dom'
import '../App.css'
const Navbar = () => {
  return (
    <div>
      <nav>
        <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/products">Products</Link></li>
        </ul>
        <Outlet/>
      </nav>
    </div>
  )
}

export default Navbar
