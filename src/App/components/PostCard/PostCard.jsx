import React, { Component, PropTypes } from 'react';
import { Card, CardBlock, Glyphicon } from 'reactstrap';
import css from 'importcss';
import moment from 'moment';
import Avatar from '../Avatar';
import Link from 'lsk-general/General/Link';
import Github from 'react-icons/lib/fa/github';

function PostCard(props) {
  return (
    <Card>
      <CardBlock>
        {props.children}
      </CardBlock>
    </Card>
  );
}

PostCard.propTypes = {
  children: PropTypes.any.isRequired,
};

@css(require('./PostCard.scss'))
class Head extends Component {
  static defaultProps = {
    surname: '',
    avatar: '',
  }
  static propTypes = {
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    name: PropTypes.string,
    surname: PropTypes.string,
    date: PropTypes.any,
    avatar: PropTypes.string,
    git: PropTypes.string
  }
  render() {
    const { _id, name, surname, date, avatar, git } = this.props;
    return (
      <div styleName="card-head">
        <Avatar alt={`${name} ${surname}`} src={avatar} />
        <div styleName="card-head-info">
          <Link href={`/user/${_id}`}>{`${name} ${surname}`}</Link>
          <small>{moment(date, 'YYYYMMDD').locale('ru').fromNow()}</small>
           <div><Github /> <a href={git}>{git}</a></div>
        </div>
      </div>
    );
  }
}

PostCard.Head = Head;

export default PostCard;
