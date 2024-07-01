import React from 'react'
import './Footer.css';

function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <p>&copy; {new Date().getFullYear()} ClimeAlert. All rights reserved.</p>
        <ul className="footer-links">
          <li><a href="/privacy-policy">Privacy Policy</a></li>
          <li><a href="/terms-of-service">Terms of Service</a></li>
          <li><a href="/contactus">Contact</a></li>
        </ul>
      </div>
    </footer>
  )
}

export default Footer