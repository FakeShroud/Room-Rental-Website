import React from 'react'
import { Link } from 'react-router-dom';

function Landingscreen() {
  return (
    <div className='row landing'>
        <div className='col-md-12 text-center'>
            <h2 style={{color:'white', fontSize:'130px'}}>GHARBHADA</h2>
            <h1 style={{color:'white'}}>Find Your Home Away From Home - Effortless Room Rentals Made Simple!</h1>
            <Link to="/home">
                <button className='btn landingbtn'>Let's Rent</button>
            </Link>
        </div>
    </div>
  )
}

export default Landingscreen