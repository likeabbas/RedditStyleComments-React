import React, {useReducer, useState} from 'react';
import CommentObject from "../Interfaces/CommentObject";
import Button from '@material-ui/core/Button';
import ReplyModal from "./ReplyModal";

interface Style {
  minWidth: string
}

interface CommentProps {
  commentText: string;
  children   : CommentObject[];
  style      : Style
}

interface State {
  commentText: string;
  children   : CommentObject[];
}

interface Action {
  type : string
  text : string
}

const reducer = (state: State, action: Action) => {
  switch (action.type) {
    case 'addComment':

      let comment : CommentObject = {commentText: action.text, children: []};
      let children                = state.children;
      children.push(comment);
      return {children: children, commentText: state.commentText};

    default:
      return state;
  }
};

const Comment = (props: CommentProps) => {
  const [state       , dispatch     ] = useReducer(reducer, {commentText: props.commentText, children: props.children});
  const [modalState  , setModalState] = useState({isOpen: false});
  const [visibleState, setVisibility] = useState({visible: true});

  const addComment = (text: string) => {
    dispatch({type: 'addComment', text: text});
  };

  let modal;
  if (modalState.isOpen) {
    modal = <ReplyModal addComment={addComment} modalState={modalState} setModalState={setModalState}/>;
  }

  if (visibleState.visible) {
    return (
      <React.Fragment>

        {modal}

        <div style={{width: props.style.minWidth}}>
        <div style={{width: props.style.minWidth, borderColor: 'yellow', borderStyle: 'solid', textAlign: 'left'}}>
          <p style={{marginTop: 0}}>{state.commentText}</p>

          <div style={{display: 'flex', flexDirection: 'row'}}>
            <div onClick={() => setModalState({isOpen: true})} >
              <Button variant={"contained"} color={"primary"}>Reply</Button>
            </div>
            <div onClick={() => setVisibility({visible: false})} >
              <Button variant={"contained"} color={"primary"}>Collapse</Button>
            </div>
          </div>
        </div>

        <div>
        {
          state.children.map(comment => {
            return (
              <div style={{display:'flex', flexDirection:'row', margin: 0, padding: 0}}>
                <div style={{width:'1%'}} />
                <Comment style={props.style} commentText={comment.commentText} children={comment.children} />
              </div>
            )
          })
        }
        </div>
        </div>
      </React.Fragment>

    );
  } else {
    return (
      <div onClick={() => setVisibility({visible: true})} >
        <Button variant={"contained"} color={"primary"}>Show Comment</Button>
      </div>
    );
  }
};

export default Comment;
