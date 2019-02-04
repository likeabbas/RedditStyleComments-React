import React from 'react';
import CommentObject from "../Interfaces/CommentObject";

interface Style {
  minWidth: string
}

interface CommentProps {
  commentText: string;
  children: CommentObject[];
  style: Style
}

const Comment = (props: CommentProps) => {
  return (
    <React.Fragment>
    <div style={{width: props.style.minWidth, borderColor: 'yellow', borderStyle: 'solid', textAlign: 'left'}}>{props.commentText}</div>
    <div style={{maxWidth: '100%'}}>{
      props.children.map(comment => {
        let style : Style = {minWidth: '100%'};
        return (
          <div style={{display:'flex', minWidth: '100%', margin: 0, padding: 0}}>
            <div style={{minWidth:'1%'}} />
            <Comment style={style} commentText={comment.commentText} children={comment.children} />
          </div>
        )
      })
    }</div>


    </React.Fragment>

  );
};

export default Comment;
