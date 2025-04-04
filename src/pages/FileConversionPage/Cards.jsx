import './Cards.css'; // Import your CSS file
import React from 'react';
import { Link } from 'react-router-dom'; // Assuming you're using React Router for navigation

function Cards() {
  const cardList = [
    {
      title: 'Image Converter ',
      link: '/ImageConverter',
      id: 1,
    },
    {
      title: 'Image To PDF Converter ',
      link: '/image-to-pdf',
      id: 2,
    },
    {
      title: 'Passport Size Photo Converter',
      link: '/PassportSizePhotoConverter',
      id: 3,
    },
    {
      title: 'Video To MP3 Converter',
      link: '/video-to-mp3',
      id: 4,
    },
    {
      title: 'PDF To Word Converter',
      link: '/pdf-to-word',
      id: 5,
    },
    // {
    //   title: "Front-end development",
    //   link: "/front-end-development",
    //   id: 6
    // },
    // {
    //   title: "Digital Marketing",
    //   link: "/digital-marketing",
    //   id: 7
    // },
    // {
    //   title: "Interior Design ",
    //   link: "/interior-design",
    //   id: 8
    // }
    {
      title: 'PDF Merger',
      link: '/pdf-merger',
      id: 9,
    },
    {
      title: 'PDF Extractor',
      link: '/pdf-extractor',
      id: 10,
    },
  ];

  return (
    <div style={{ margin: '50px' }}>
      <h2>File Converter</h2>
      <div className="ag-format-container">
        <div className="ag-courses_box">
          {cardList.map((card) => (
            <div key={card.id} className="ag-courses_item">
              <Link to={card.link} className="ag-courses-item_link">
                <div className="ag-courses-item_bg"></div>
                <div className="ag-courses-item_title">{card.title}</div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Cards;
