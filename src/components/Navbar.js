import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <div className='home'>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
            <Link to={"/"} className="navbar-brand"><i className="bi bi-house"></i> Home</Link>
            {/* <Link to={"/crud"} className="navbar-brand"><i className="bi bi-house"></i> Products</Link> */}
            {/* <a className="navbar-brand" href="#"><i className="bi bi-house"></i> Home</a> */}
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item">
                    <Link to="/crud" className='nav-link active' aria-current="page">Products</Link>
                    {/* <a className="nav-link active" aria-current="page" href="#">Products</a> */}
                </li>
                <li className="nav-item">
                    <Link to="/categories" className='nav-link active' aria-current="page">Categories</Link>
                    {/* <a className="nav-link active" aria-current="page" href="#">Products</a> */}
                </li>
                <li className="nav-item">
                  {/* <Link to="/products/modal" className='nav-link active' aria-current="page">Modal</Link> */}
                </li>
                <li className="nav-item dropdown">
                    <a className="nav-link dropdown-toggle active" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                    Dropdown
                    </a>
                    <ul className="dropdown-menu active" aria-labelledby="navbarDropdown">
                    <li><a className="dropdown-item" href="#">Action</a></li>
                    <li><a className="dropdown-item" href="#">Another action</a></li>
                    <li><hr className="dropdown-divider"/></li>
                    <li><a className="dropdown-item" href="#">Something else here</a></li>
                    </ul>
                </li>              
                </ul>
                <form className="d-flex">
                <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search"/>
                <button className="btn btn-outline-success" type="submit">Search</button>
                </form>
            </div>
        </div>
      </nav>
    </div>
  )
}

export default Navbar