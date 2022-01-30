import "./Home.styles.scss";

import Searchbar from "../../components/search-bar/SearchBar.component";

export default function Home() {
  return (
    <div className="home-page-container">
      <main className="hero-section">
        <img
          src="https://res.cloudinary.com/asingh/image/upload/v1643562491/brooke-cagle-JBwcenOuRCg-unsplash_suj1w1.jpg"
          alt="blonde woman"
          className="hero-image"
        />
        <div className="right-hero-section">
          <h1>Where A's turn into cash. And B's and C's turn into A's.</h1>
          <p>
            Do you have great grades and take great notes? Sell your notes and
            make money. Interested in improving your grades and saving time? Buy
            notes from fellow students who have done the work for you.
          </p>
          <Searchbar inputStyle="long-search-input" />
        </div>
      </main>
    </div>
  );
}
