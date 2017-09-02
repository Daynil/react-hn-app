import moment from 'moment';

export const getAge = (unixTime) => {
  let createdOn = moment.unix(unixTime);
  return createdOn.fromNow();
};

export const getCommentCount = (comments) => {
  comments = comments.filter(comment => comment.text);
  return comments.length;
}