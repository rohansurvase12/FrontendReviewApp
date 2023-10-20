import Hero from '../hero/Hero';

const Home = ({movies}) => {

  console.log("Started");
  return (
    
    <Hero movies = {movies} />
  )
}

export default Home
