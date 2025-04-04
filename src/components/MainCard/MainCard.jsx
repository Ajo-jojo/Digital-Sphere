import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import CardActionArea from '@mui/material/CardActionArea';

function CustomCard({ image, title }) {
  return (
    <Card style={{ maxWidth: 200, margin: '0 10px' }}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="100%"
          image={image}
          alt={title}
          style={{ padding: '0' }}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {title}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

function ActionAreaCard() {
  const cardsData = [
    { image: 'multimedia.png', title: 'Multimedia' },
    { image: '1216670.png', title: 'File Conversion' },
    { image: 'folder.png', title: 'Storage' },
  ];

  return (
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      {cardsData.map((data, index) => (
        <CustomCard key={index} {...data} />
      ))}
    </div>
  );
}

export default ActionAreaCard;
