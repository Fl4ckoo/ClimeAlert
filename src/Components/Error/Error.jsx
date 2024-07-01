import React from 'react'
import './Error.css'

function Error() {
  return (
    <div className='error-container'>
        <h1>Error 404</h1>
        <p>Error 404 occurred, this page may not exist</p><br/><br/>
        <a href="/">← Go back to main page</a>
    </div>
  )
}

export default Error