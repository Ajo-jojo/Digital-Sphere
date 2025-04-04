import './Cards.css'; // Import your CSS file
import React from 'react';
import { Link } from 'react-router-dom'; // Assuming you're using React Router for navigation

function Cards() {
  const cardList = [
    {
      title: 'File Conversion ',
      link: '/file-conversion',
      id: 1,
    },
    {
      title: 'Multimedia ',
      link: '/Multimedia',
      id: 2,
    },
    {
      title: 'Storage',
      link: '/dashboard',
      id: 3,
    },
    // {
    //   title: "Gradient Generator",
    //   link: "/GradientGenerator",
    //   id: 4
    // },
    // {
    //   title: "Image Size Reducer",
    //   link: "/ImageSizeReducer",
    //   id: 5
    // },
    // {
    //   title: "Black & White Converter",
    //   link: "/BlackNWhiteConverter",
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
  ];

  return (
    <div style={{ margin: '50px' }}>
      <h2>Main Pages</h2>
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
