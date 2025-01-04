import React from 'react'
import { Link } from 'react-router-dom'

const Home = () => {
  return (
    <div className='container mt-5'>
        <Link to={"/crud"} className='btn btn-primary'>go to crud</Link>        
        <Link to={"/categories"} className='btn btn-primary'>go to categories</Link>        
    </div>
  )
}

export default Home