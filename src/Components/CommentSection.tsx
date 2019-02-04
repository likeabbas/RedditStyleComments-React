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
  type   : string
}

const reducer = (state: State, action: Action) => {
  switch (action.type) {
    case 'addComment':
      if (state.textarea.value.length > 0) {
        const comment: CommentObject = {commentText: state.textarea.value, children: []};
        let newComments = state.comments.concat([comment]);
        state.textarea.value = '';
        console.log(newComments);
        return {comments: newComments, textarea: state.textarea};
      }
    case 'updateText':
      return state;
    default:
      return state;
  }
};

const subComment: CommentObject = {commentText: 'sub', children: []};
const comment1 : CommentObject = {commentText: 'hey', children: [subComment] };
const comments :CommentObject[] = [comment1];

let textarea: HTMLTextAreaElement = document.createElement('textarea');
const initialState   : State = {comments: comments, textarea: textarea};

const CommentSection = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const addComment = () => {
    dispatch({type: 'addComment'});
  };

  return (
    <React.Fragment>
      <TextareaAutosize
        rows={10}
        style={{ maxHeight: 100, boxSizing: 'border-box', minWidth: '80%' }}
        innerRef={ref => initialState.textarea = ref}
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
