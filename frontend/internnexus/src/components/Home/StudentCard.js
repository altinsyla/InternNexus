// import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import './StudentCard.scss';
import '../../styles/_globals.scss';



function Studentcard() {
  return (
    <Card style={{ width: '18rem'}} className='card'>
      <Card.Img variant="top" src={require('./img/HakifKadriu.jpg')} />
      <Card.Body>
        <Card.Title className='fontmedium'>Altin Syla</Card.Title>
        <Card.Text className='cardText fontthin'>
          Skills: React, ReactNative, SQL
        </Card.Text>
        <button className="button_details">Details</button>
      </Card.Body>
    </Card>
  );
}

export default Studentcard;