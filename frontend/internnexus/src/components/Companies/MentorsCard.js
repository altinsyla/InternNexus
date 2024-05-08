import Card from 'react-bootstrap/Card';
import './MentorsCard.scss';
import '../../styles/_globals.scss';
import "bootstrap/dist/css/bootstrap.min.css";
import blerandstavileci from '../Companies/blerandstavileci.jpg';

function MentorsCard() {
  return (
    <Card style={{ width: '18rem'}} className='mentors-card'>
      <Card.Img variant="top" src={blerandstavileci} />
      <Card.Body>
        <Card.Title className='fontmedium'>Blerand Stavileci</Card.Title>
        <Card.Text className='mentors-card-text fontthin'>
        Minister of Economic Development        </Card.Text>
      </Card.Body>
    </Card>
  );
}

export default MentorsCard;