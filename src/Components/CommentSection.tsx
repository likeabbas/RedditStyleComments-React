import React, {useReducer} from 'react';
import Button from '@material-ui/core/Button';
import CommentObject from '../Interfaces/CommentObject';
import {TextareaAutosize} from "react-autosize-textarea/lib/TextareaAutosize";
import Comment from './Comment';

interface State {
  comments: CommentObject[];
  textarea: HTMLTextAreaElement;
}

interface Action {
  type    : string
  textarea: HTMLTextAreaElement;
}

const reducer = (state: State, action: Action) => {
  switch (action.type) {
    case 'setTextarea':
      return {comments: state.comments, textarea: action.textarea};

    case 'addComment':

      if (state.textarea.value.length > 0) {

        const comment: CommentObject = {commentText: state.textarea.value, children: []};
        state.textarea.value = "";
        return {comments: state.comments.concat([comment]), textarea: state.textarea};

      } else {
        return state;
      }

    case 'updateText':
      return state;
    default:
      return state;
  }
};

let textarea: HTMLTextAreaElement = document.createElement('textarea');

let comment3: CommentObject = {commentText: "tres", children: []        };
let comment2: CommentObject = {commentText: "dos" , children: [comment3]};
let comment1: CommentObject = {commentText: "uno" , children: [comment2]};

const initialState : State = {comments: [comment1], textarea: textarea};

const CommentSection = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const addComment = () => {
    dispatch({type: 'addComment', textarea: state.textarea});
  };

  return (
    <React.Fragment>

      <TextareaAutosize
        rows={10}
        style={{ maxHeight: 100, boxSizing: 'border-box', minWidth: '80%' }}
        innerRef={ref => dispatch({type: 'setTextarea', textarea: ref})}
        defaultValue={''}
      />

      <div onClick={addComment}>
        <Button variant="contained" color="primary">
          Add Comment
        </Button>
      </div>

      <div style={{minWidth: '80%'}}>
        {state.comments.map(comment => {
          return <Comment style={{minWidth: '100%'}} commentText={comment.commentText} children={comment.children} />
        })}
      </div>

    </React.Fragment>
  );
};

export default CommentSection;
