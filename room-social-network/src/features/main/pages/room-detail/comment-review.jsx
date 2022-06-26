import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import { Comment, Avatar, Form, Button, List, Input } from 'antd';
import moment from 'moment';
import userService from "../../../../services/userService";
import evaluationService from "../../../../services/evaluationService";

const { TextArea } = Input;

const CommentList = ({ comments }) => (
  <List
    dataSource={comments}
    header={`${comments.length} ${comments.length > 1 ? 'replies' : 'reply'}`}
    itemLayout="horizontal"
    renderItem={(props) => <Comment {...props} />}
  />
);

const Editor = ({ onChange, onSubmit, submitting, value }) => (
  <div>
    <Form.Item>
      <TextArea rows={4} onChange={onChange} value={value} />
    </Form.Item>
    <Form.Item>
      <Button
        htmlType="submit"
        loading={submitting}
        onClick={onSubmit}
        type="primary"
      >
        Gửi bình luận
      </Button>
    </Form.Item>
  </div>
);

function CommentReview({dataComment, roomid}) {
  const [oldComment, setOldComment] = useState([])
  useEffect(() => {
    dataComment.forEach(e => {
      userService.getid(e.userId)
          .then(function (response) {
            const data = {
                "actions": [<span key="comment-list-reply-to-0">Reply to</span>],
                "author": response.fullName,
                "avatar": response.avatarUrl,
                "content": e.commentRate,
                "datetime": e.timeRate,
            }

            setOldComment(pre => [...pre, data])
          })
          .catch(function (error) {
            console.log(error);
          })
    });
  }, [])
  const comment = [
    {
      actions: [<span key="comment-list-reply-to-0">Reply to</span>],
      author: 'Han Solo',
      avatar:
        'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
      content: <p>'okokok'</p>,
      datetime: moment().fromNow(),
    },
  ]
  const [comments, setComments] = useState()
  useEffect(() => {
    if(oldComment) setComments(oldComment)
  },[oldComment])
  const [submitting, setSubmitting] = useState(false)
  const [value, setValue] = useState('')


  const handleSubmit = () => {
    // if (value) {
    //   return;
    // }

    setSubmitting(true)

    setTimeout(() => {
      setSubmitting(false)
      setValue('')
      setComments(pre =>
        [
          {
            author: localStorage.getItem("fullName"),
            avatar: localStorage.getItem("avatarUrl"),
            content: value,
            datetime: moment().fromNow(),
          },
          ...pre,
        ]
      )

      var today = new Date();
      var todayString = (today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate()).replace(/(^|\D)(\d)(?!\d)/g, '$10$2')
      console.log(todayString)
      const newComment = {
        "userId": localStorage.getItem("id"),
        "roomId": roomid,
        "rate": 5,
        "commentRate": value,
        "timeRate": `${todayString}`
      }
      evaluationService.setevaluation(newComment)
          .then(function (response) {
            console.log(response);
          })
          .catch(function (error) {
            console.log(error);
          })
    }, 1000);
  };

  const handleChange = (e) => {
    setValue(e.target.value);
  };

    return comments && (
      <div>
        {comments.length > 0 && <CommentList comments={comments} />}
        <Comment
          avatar={
            <Avatar
              src={localStorage.getItem("avatarUrl")}
              alt="Han Solo"
            />
          }
          content={
            <Editor
              onChange={handleChange}
              onSubmit={handleSubmit}
              submitting={submitting}
              value={value}

            />
          }
        />
      </div>
    );
  }
export default CommentReview;



// const { TextArea } = Input;

// const CommentList = ({ comments }) => (
//   <List
//     dataSource={comments}
//     header={`${comments.length} ${comments.length > 1 ? 'replies' : 'reply'}`}
//     itemLayout="horizontal"
//     renderItem={(props) => <Comment {...props} />}
//   />
// );

// const Editor = ({ onChange, onSubmit, submitting, value }) => (
//   <div>
//     <Form.Item>
//       <TextArea rows={4} onChange={onChange} value={value}  />
//     </Form.Item>
//     <Form.Item>
//       <Button
//         htmlType="submit"
//         loading={submitting}
//         onClick={onSubmit}
//         type="primary"
//       >
//         Gửi bình luận
//       </Button>
//     </Form.Item>
//   </div>
// );

// class CommentReview extends React.Component {
//   state = {
//     comments: [
//       {
//         actions: [<span key="comment-list-reply-to-0">Reply to</span>],
//         author: 'Han Solo',
//         avatar:
//           'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
//         content: <p>'okokok'</p>,
//         datetime: moment().fromNow(),
//       },
//     ],
//     submitting: false,
//     value: '',
//   };

//   handleSubmit = () => {
//     if (!this.state.value) {
//       return;
//     }

//     this.setState({
//       submitting: true,
//     });

//     setTimeout(() => {
//       this.setState({
//         submitting: false,
//         value: '',
//         comments: [
//           {
//             author: 'Han Solo',
//             avatar:
//               'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
//             content: <p>{this.state.value}</p>,
//             datetime: moment().fromNow(),
//           },
//           ...this.state.comments,
//         ],
//       });
//     }, 1000);
//   };

//   handleChange = (e) => {
//     this.setState({
//       value: e.target.value,
//     });
//   };

//   render() {
//     const { comments, submitting, value } = this.state;

//     return (
//       <div>
//         {comments.length > 0 && <CommentList comments={comments} />}
//         <Comment
//           avatar={
//             <Avatar
//               src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
//               alt="Han Solo"
//             />
//           }
//           content={
//             <Editor
//               onChange={this.handleChange}
//               onSubmit={this.handleSubmit}
//               submitting={submitting}
//               value={value}

//             />
//           }
//         />
//       </div>
//     );
//   }
// }
// export default CommentReview;
