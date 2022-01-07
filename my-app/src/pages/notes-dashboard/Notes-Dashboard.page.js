import React, { Component } from "react";
import { connect } from "react-redux";

import Notes from "../../components/notes/notes.component";
import Dropdown from "../../components/dropdown/dropdown.component";

import { fetchNotes } from "../../redux/actions/note.actions";

class NotesDashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      notes: [],
      sortBy: "newest",
    };
  }

  componentDidMount() {
    this.props.fetchNotes();
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.sortBy !== this.state.sortBy) {
        if (this.state.sortBy === "newest") {
          this.setState({
            notes: this.props.notes.sort(
              (a, b) => a["created_date"] - b["created_date"]
            ),
          });
        } else if (this.state.sortBy === "oldest") {
          this.setState({
            notes: this.props.notes.sort(
              (a, b) => b["created_date"] - a["created_date"]
            ),
          });
        }
    }
  }

  handleChange = (event) => {
    this.setState({ sortBy: event.target.value });
  };

  render() {
    return (
      <>
        <Dropdown
          notes={this.props.notes}
          onChange={this.handleChange}
          value={this.state.sortBy}
        />
        <Notes notes={this.props.notes} />
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    notes: state.notes.notes,
  };
};

export default connect(mapStateToProps, { fetchNotes })(NotesDashboard);
