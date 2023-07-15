import Banner from "../Banner/Bnner";
import BooksCard from "../Books/BooksCard";
import HomeBooks from "../Books/HomeBooks";
import Footer from "../Footer/Footer";

const Home = () => {
  return (
    <div>
      <Banner />
      <HomeBooks />
      <div className="pt-16">
        <Footer />
      </div>
    </div>
  );
};

export default Home;
