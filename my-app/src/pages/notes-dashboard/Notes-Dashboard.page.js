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
      sortBy: "Newest",
    };
  }

  componentDidMount() {
    this.props.fetchNotes();
    console.log("History:", this.props.history);
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.sortBy !== this.state.sortBy) {
      if (this.state.sortBy === "Newest") {
        this.setState({
          notes: this.props.notes.sort(
            (a, b) => a["created_date"] - b["created_date"]
          ),
        });
      } else if (this.state.sortBy === "Oldest") {
        this.setState({
          notes: this.props.notes.sort(
            (a, b) => b["created_date"] - a["created_date"]
          ),
        });
      }
    }
  }

  sortByChange = (event) => {
    this.setState({ sortBy: event.target.value });
  };

  render() {
    return (
      <div className="notesDashboardContainer">
        <FilterMenu
          schools={this.props.schools}
          subjects={this.props.subjects}
          gradeLevels={this.props.gradeLevels}
          years={this.props.years}
        />
        <div>
          <Dropdown
            label="Sort by"
            onChange={this.sortByChange}
            value={this.state.sortBy}
            options={["Newest", "Oldest"]}
            hasLabel={true}
          />
          <Notes notes={this.props.notes} />
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
