import { Row, Col, Card } from 'react-bootstrap';

const movieData = [
  {
    title: '28 Weeks Later',
    director: 'Juan Carlos Fresnadillo',
    description:
      'Six months after the rage virus outbreak, the US Army helps to secure a small area of London for survivors to repopulate and start again. But not everything goes according to plan.',
    year: 2007,
    genre: 'Horror, Sci-Fi, Thriller',
    image: 'https://ntvb.tmsimg.com/assets/p164903_v_h10_bd.jpg?w=960&h=540',
  },
  {
    title: 'A Walk to Remember',
    director: 'Adam Shankman',
    description:
      'The story of two North Carolina teens, Landon Carter and Jamie Sullivan, who are thrown together after Landon gets into trouble and is made to do community service.',
    year: 2002,
    genre: 'Drama, Romance',
    image:
      'https://m.media-amazon.com/images/M/MV5BMjAxODk0MDg1OF5BMl5BanBnXkFtZTcwMDg1MjYyNw@@._V1_.jpg',
  },
  {
    title: 'Kingdom of Heaven',
    director: 'Ridley Scott',
    description:
      'Balian of Ibelin travels to Jerusalem during the Crusades of the 12th century, and there he finds himself as the defender of the city and its people.',
    year: 2005,
    genre: 'Action, Adventure, Drama',
    image:
      'https://images.justwatch.com/backdrop/175662137/s640/kingdom-of-heaven',
  },
];

export default function Home() {
  return (
    <div className="home-page text-center">
      <div className="mt-3 mt-md-5">
        <h1>Welcome to Yuppy!</h1>
        <p>Explore your favorite movies</p>
      </div>

      <Row className="g-4 mt-5 justify-content-center mb-5">
        {movieData.map((movie, index) => (
          <Col md={4} key={index}>
            <Card className="bg-dark text-white rounded">
              <Card.Img
                variant="top"
                src={movie.image}
                alt={movie.title}
                style={{ height: '200px', width: 'auto' }}
              />
              <Card.Body>
                <h2 className="text-center">{movie.title}</h2>

                <div>
                  <Card.Text>{movie.director}</Card.Text>

                  <Card.Text
                    style={{ height: '150px', overflow: 'auto' }}
                    className="card-body-custom"
                  >
                    {movie.description}
                  </Card.Text>

                  <Card.Text>{movie.year}</Card.Text>

                  <Card.Text className="span fw-light">{movie.genre}</Card.Text>
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
}
