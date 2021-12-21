import React, { Component } from "react";
import { connect } from "react-redux";

import Notes from "../../components/notes/notes.component";
import { fetchNotes } from "../../redux/actions/note.actions";

class NotesDashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      notes: [],
    };
  }

  componentDidMount() {
    this.props.fetchNotes();
  }

  render() {
    return (
      <>
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
