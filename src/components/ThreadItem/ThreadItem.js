import React from 'react';
import './ThreadItem.css';
import { Link } from 'react-router-dom';
import AuthService from '../../utils/auth-service';
import UserContext from '../../utils/context';
import moment from 'moment';


class ThreadItem extends React.Component {
  static contextType = UserContext;
  constructor(props) {
    super(props);
    this.state = {
    }
  }
  

  getComments = async (context,id) => {
    AuthService.getComments(context.category,id)
      .then(comments => {
        console.log('comments');
        console.log(comments);
        let final = comments[comments.length-1] || {}
        let date = moment(final.date_created).format('MMMM Do YYYY, h:mm:ss a')
        if (!this.state.lastComment) {
          this.setState({lastComment: date})
        }
      })
  }

  componentDidMount() {
    this.getComments(this.context,this.props.details.id)
  }
  render() {
    let commentInfo = this.state.lastComment || '';
    return (
      <div className='thread-item'>
        <Link to={`/${this.context.category}/${this.props.details.id}`}>
          <h3>{this.props.details.title}</h3>
          <img src='https://img01.mgo-images.com/image/thumbnail/v2/content/MMVAF76018A477C2826A4EC8747C40B7BE27.jpeg' alt='Movie poster image'/>
          <p>{this.props.details.date_created}</p>
          <p>Last comment {commentInfo}</p>
        </Link>
      </div>
    )
  }
}

export default ThreadItem;