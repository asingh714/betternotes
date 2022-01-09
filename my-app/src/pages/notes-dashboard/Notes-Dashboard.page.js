import React, { Component } from "react";

import { connect } from "react-redux";

import Notes from "../../components/notes/notes.component";
import Dropdown from "../../components/dropdown/dropdown.component";
import FilterMenu from "../../components/filterMenu/filterMenu.component";

import { fetchNotes } from "../../redux/actions/note.actions";

import "./NotesDashboard.styles.scss";

class NotesDashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      notes: [],
      filteredNotes: [],
      sortBy: "Newest",
      school: "",
      subject: "",
      grade_level: "",
    };
  }

  componentDidMount() {
    this.props.fetchNotes();
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.notes !== this.props.notes) {
      this.setState({ notes: this.props.notes });
    }
    if (prevState.sortBy !== this.state.sortBy) {
      if (this.state.sortBy === "Newest") {
        this.setState({
          notes: this.props.notes.sort(
            (a, b) => b["created_date"] - a["created_date"]
          ),
        });
      } else if (this.state.sortBy === "Oldest") {
        this.setState({
          notes: this.props.notes.sort(
            (a, b) => a["created_date"] - b["created_date"]
          ),
        });
      }
    }
  }

  filterNoteChanges = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  sortByChange = (event) => {
    this.setState({ sortBy: event.target.value });
  };

  filterMenuSubmit = (event) => {
    event.preventDefault();
    let notes = this.state.notes;

    if (this.state.school !== "") {
      this.setState({
        filteredNotes: notes.filter(
          (note) => note.school === this.state.school
        ),
      });
    }
    // this.setState({ notes });
  };

  render() {
    return (
      <div className="notesDashboardContainer">
        <FilterMenu
          schools={this.props.schools}
          subjects={this.props.subjects}
          gradeLevels={this.props.gradeLevels}
          years={this.props.years}
          schoolName="school"
          subjectName="subject"
          gradeLevelName="grade_level"
          filterNoteChanges={this.filterNoteChanges}
          filterMenuSubmit={this.filterMenuSubmit}
        />
        <div>
          <Dropdown
            dropdownStyle=""
            hasLabel={true}
            label="Sort by"
            onChange={this.sortByChange}
            options={["Newest", "Oldest"]}
            value={this.state.sortBy}
          />
          {this.state.filteredNotes.length > 0 ? (
            <Notes notes={this.state.filteredNotes} />
          ) : (
            <Notes notes={this.state.notes} />
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    notes: state.notes.notes,
    schools: [...new Set(state.notes.notes.map((note) => note.school))],
    subjects: [...new Set(state.notes.notes.map((note) => note.subject))],
    gradeLevels: [
      ...new Set(state.notes.notes.map((note) => note.grade_level)),
    ],
    years: [...new Set(state.notes.notes.map((note) => note.year))],
  };
};

export default connect(mapStateToProps, { fetchNotes })(NotesDashboard);
