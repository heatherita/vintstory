import Comment from './Comment';
import CommentForm from './CommentForm';

export default function Posting({
  item,
  commentValue,
  onCommentChange,
  onCommentSubmit,
  onDragStart,
  // ...any other props (like drag handlers)
}) {
  //   console.log('Rendering comments for', item.id, item.comments);
  return (
    <div className="posting" key={item.id}>
      <h2>{item.title}</h2>
      <img src={`/static/uploads/${item.image_url}`}
        alt={item.title}
        class="draggable-img random-size"
        draggable={true}
        onDragStart={onDragStart}
        data-img-src={`/static/uploads/${item.image_url}`}
      />
      <div id="descText" draggable={true} class="draggable-text" onDragStart={onDragStart}><strong>Description:</strong> {item.description} |</div>
      <div id="storyText" draggable={true} class="draggable-text" onDragStart={onDragStart}><strong>Story:</strong> {item.story} |</div>
      <div id="userText"><strong>User:</strong> <a href={`mailto:${item.user_contact}`}>{item.user_name}</a></div>
      <h4>Comments:</h4>
      {item.comments?.map(comment => <Comment key={comment.id} comment={comment} onDragStart={onDragStart} />)}
      <CommentForm value={commentValue}
        onChange={onCommentChange}
        onSubmit={onCommentSubmit}
        item={item} />
    </div>
  );
}
