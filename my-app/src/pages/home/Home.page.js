import { connect } from "react-redux";

import "./Home.styles.scss";

import Notes from "../../components/notes/notes.component";
import Searchbar from "../../components/search-bar/SearchBar.component";

function Home({ notes }) {
  return (
    <div className="home-page-container">
      <main className="hero-section">
        <img
          src="https://res.cloudinary.com/asingh/image/upload/v1643562491/brooke-cagle-JBwcenOuRCg-unsplash_suj1w1.jpg"
          alt="blonde woman"
          className="hero-image"
        />
        <div className="side-hero-section">
          <h1>Where A's turn into cash. And B's and C's turn into A's.</h1>
          <p>
            Do you have great grades and take great notes? Sell your notes and
            make money. Interested in improving your grades and saving time? Buy
            notes from fellow students who have done the work for you.
          </p>
          {/* <form action="submit" onSubmit={(e) => handleSearch(e)}>
            <Searchbar
              name="search"
              handleChange={handleChange}
              placeholder="&#x1F50D; Search by class subject"
              type="text"
              inputStyle="long-search-input"
              value={search}
            />
          </form> */}
        </div>
      </main>
      <section className="home-section-one">
        <h2>How does it work?</h2>
        <div className="home-section-two-cols">
          <div className="home-section-one-left">
            <h4>For Students Looking To Sell Notes:</h4>
            <ol>
              <li>1. Create an account</li>
              <li>2. Upload your notes</li>
              <li>3. Earn money</li>
            </ol>
          </div>
          <div className="home-section-one-right">
            <h4>For Students Looking To Buy Notes:</h4>
            <ol>
              <li>1. Create an account</li>
              <li>2. Find the notes your need</li>
              <li>3. Notes show up in your email</li>
            </ol>
          </div>
        </div>
      </section>
      <section className="home-section-two">
        <h2>Most Popular Notes</h2>
        <Notes notes={notes} notesStyle="notes-author" noteStyle="narrow" />
      </section>
      <section className="home-section-three">
        <h2>What Students Selling Notes Have To Say</h2>
        <div className="student-reviews-container">
          <div className="student-reviews">
            <img
              src="https://res.cloudinary.com/asingh/image/upload/v1643657945/jeswin-thomas-wRdYnqXtyYk-unsplash_zxb7lp.jpg"
              alt="Happy Student"
            />
            <p>
              “Better Note has allowed me to turn my notes and old assignments
              into cash. All I have to do is upload my documents and Better Note
              does the rest”
            </p>
            <span className="student-author">Jen Waters</span>
            <span className="student-school">
              Student at Devinhold High School
            </span>
          </div>
          <div className="student-reviews">
            <img
              src="https://res.cloudinary.com/asingh/image/upload/v1643657945/jeswin-thomas-oBz1K0YAq8Q-unsplash_xhpn2j.jpg"
              alt="Happy Student"
            />
            <p>
              “I am glad there is a platform like Better Note that allows
              hardworking students like me to sell my notes for cash. It's so
              simple and it's helping me save up for college! I highly recommend
              it!”
            </p>
            <span className="student-author">Tommy Smith</span>
            <span className="student-school">Student at Duke University</span>
          </div>
        </div>
      </section>
      <section className="home-section-four">
        <div className="side-hero-section">
          <h2>Save Time Studying by Working Smarter</h2>
          <p>
            Students that have previously taken these classes have done most of
            the work for you. Save time and energy on what is really important
            by studying what matters.
          </p>
        </div>
        <img
          src="https://res.cloudinary.com/asingh/image/upload/v1643732282/Group_160_n50lla.png"
          alt="student cartoon"
          className="cartoon-img"
        />
      </section>

      <section className="home-section-five">
        <h2>What Students Have to Say</h2>
        <div className="testimonials-section">
          <div className="testimonial">
            <p>
              “I Wish I had discovered Better Notes earlier. I have saved so
              much time and effort using these notes.“
            </p>
            <span className="student-author">Peter Vorkin</span>
            <span className="student-school">High School Student</span>
          </div>
          <div className="testimonial">
            <p>
              “My grades have improved so much by just studying these notes.”
            </p>
            <span className="student-author">Kate Thomson</span>
            <span className="student-school">UCLA</span>
          </div>
          <div className="testimonial">
            <p>
              “I am so glad I discovered Better Note. Studying notes from last
              years students has saved me a lot of time.”
            </p>
            <span className="student-author">Ken Jim</span>
            <span className="student-school">New York University</span>
          </div>
        </div>
      </section>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    notes: state.notes.notes && state.notes.notes.slice(0, 4),
  };
};

export default connect(mapStateToProps, {})(Home);
