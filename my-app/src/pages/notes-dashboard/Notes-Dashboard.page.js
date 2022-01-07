import React, { Component } from "react";
import { connect } from "react-redux";

import Notes from "../../components/notes/notes.component";
import Dropdown from "../../components/dropdown/dropdown.component";
import FilterMenu from "../../components/filterMenu/filterMenu.component";

import { fetchNotes } from "../../redux/actions/note.actions";

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
      <>
        <FilterMenu schools={this.props.schools} subjects={this.props.school} />
        <Dropdown
          label="Sort by"
          onChange={this.sortByChange}
          value={this.state.sortBy}
          options={["Newest", "Oldest"]}
        />
        <Notes notes={this.props.notes} />
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    notes: state.notes.notes,
    schools: [...new Set(state.notes.notes.map((note) => note.school))],
    subjects: [...new Set(state.notes.notes.map((note) => note.subject))],
  };
};

export default connect(mapStateToProps, { fetchNotes })(NotesDashboard);
