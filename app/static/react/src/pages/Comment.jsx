export default function Comment({ comment, onDragStart }) {
  return (
    <div className="comment" key={comment.id}>
      <img src={`/static/uploads/${comment.image_url}`}
        alt={comment.title}
        className="draggable-img random-size"
        draggable
        onDragStart={onDragStart}
        data-img-src={`/static/uploads/${comment.image_url}`} />
      <br />
      <div
        class="draggable-text random-size"
        draggable
        onDragStart={onDragStart}>
        {comment.content}
        {comment.created_at && (
          <small>
            <strong>Posted on {new Date(comment.created_at).toISOString().slice(0, 16).replace('T', ' ')}</strong>
          </small>
        )}
      </div>
    </div>
  );
}