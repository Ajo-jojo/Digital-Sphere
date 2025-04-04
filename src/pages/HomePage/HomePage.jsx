import { NavigationComponent } from '../../components/HomePageComponents';

import React, { useState, useEffect } from 'react';
import './HomePage.css';
import MainCard from '../../components/MainCard/MainCard';
import Nav1 from '../../components/HomePageComponents/Nav1';

const HomePage = () => {
  // State for managing slideshow index
  const [myIndex, setMyIndex] = useState(0);

  // Effect for automatic slideshow
  useEffect(() => {
    const interval = setInterval(() => {
      setMyIndex((prevIndex) => (prevIndex + 1) % 3);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  // Function to toggle the small screen navigation
  const toggleNav = () => {
    const navDemo = document.getElementById('navDemo');
    if (navDemo) {
      navDemo.classList.toggle('w3-show');
    }
  };

  // Function to handle the ticket modal
  const handleTicketModal = () => {
    const ticketModal = document.getElementById('ticketModal');
    if (ticketModal) {
      ticketModal.style.display = 'block';
    }
  };

  // Function to close the ticket modal when clicking outside of it
  const closeModal = (event) => {
    const ticketModal = document.getElementById('ticketModal');
    if (ticketModal && event.target === ticketModal) {
      ticketModal.style.display = 'none';
    }
  };
  return (
    <div>
      {/* Navbar */}
      <Nav1 />

      {/* Page content */}
      <div className="w3-content" style={{ maxWidth: '2000px', marginTop: '46px' }}>
        {/* wallpaper Images */}

        <div className="board-img" style={{ marginTop: '-5%' }}>
          <img src="computer-screen-6977452.jpg"></img>
        </div>

        {/* The Band Section */}
        <div
          className="w3-container w3-content w3-center w3-padding-64"
          style={{ maxWidth: '100%' }}
          id="band"
        >
          <h2 className="w3-wide">DIGITAL SPHERE</h2>
          {/* <p className="w3-opacity"><i>We love music</i></p> */}
          <p className="w3-justify" style={{ paddingLeft: '10%', paddingRight: '10%' }}>
            Welcome to Digital Sphere, the cutting-edge solution revolutionizing the landscape of
            digital content management. Our platform is meticulously crafted to address the
            limitations of existing systems, providing users with a seamless and versatile
            environment for organizing, editing, and manipulating diverse types of digital assets.
            At the heart of Digital Sphere is a commitment to simplicity and enhancement, offering
            consolidated features such as user authentication, file and folder management, media and
            document conversion, and image processing. With a user-centric focus, our intuitive
            interface caters to individuals with varying levels of technical expertise, ensuring an
            inclusive experience. Security is paramount, and Digital Sphere implements robust
            measures to safeguard user data, creating a secure digital content management ecosystem.
            The open-source nature of the platform fosters collaboration, inviting developers to
            contribute and innovate, enriching the project's capabilities. As Digital Sphere
            evolves, it is poised to redefine digital content management, providing a dynamic
            solution that adapts to the ever-evolving demands of the digital landscape. Welcome to
            the future of digital organization and efficiency – welcome to Digital Sphere.
          </p>
        </div>

        {/* The Tour Section */}
        <div className="w3-black" id="tour">
          <div className="w3-container w3-content w3-padding-64" style={{ maxWidth: '800px' }}>
            <h2 className="w3-wide w3-center">Features</h2>
            <p className="w3-opacity w3-center">
              <i></i>
            </p>
            <br />

            <MainCard />
          </div>
        </div>

        {/* The Contact Section */}
        <div
          className="w3-container w3-content w3-padding-64"
          style={{ maxWidth: '100%', maxHeight: '100%' }}
          id="contact"
        >
          <h2 className="w3-wide w3-center">CONTACT</h2>
          <p className="w3-opacity w3-center">
            <i></i>
          </p>
          <div className="w3-row w3-padding-32">
            <div className="w3-col m6 w3-large w3-margin-bottom" style={{ marginLeft: '40%' }}>
              <i className="fa fa-map-marker" style={{ width: '30px' }}></i> Ajo Jojo
              <br />
              <i className="fa fa-phone" style={{ width: '30px' }}></i> Phone: +91 8848755282
              <br />
              <i className="fa fa-envelope" style={{ width: '30px' }}>
                {' '}
              </i>{' '}
              Email: iama3jo@gmail.com
              <br />
            </div>
          </div>
        </div>
      </div>

      {/* Image of location/map */}
      <div className="vid" style={{ marginTop: '-1%', width: '100%' }}>
        {/* <video autoPlay loop muted className="video1" width="100%" height="1%" controls>
                    <source src="/premam.mp4" type="video/mp4" style={{width:"100%"}} />

                </video> */}
      </div>

      {/* Footer */}
      {/* <footer className="w3-container w3-padding-64 w3-center w3-opacity w3-light-grey w3-xlarge">
      
      <p className="w3-medium">Digital Sphere <a href="https://www.w3schools.com/w3css/default.asp" target="_blank" rel="noopener noreferrer"></a></p>
    </footer> */}

      {/* Script Section */}
      <script>{/* JavaScript logic */}</script>
    </div>
  );
};

export default HomePage;
