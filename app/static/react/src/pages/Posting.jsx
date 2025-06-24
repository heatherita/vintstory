import Comment from './Comment';
import CommentForm from './CommentForm';

export default function Posting({ item, ...props }) {
  return (
    <div className="posting" key={item.id}>
       <h2>{item.title}</h2>
            <img src={`/static/uploads/${item.image_url}`}
                 alt={item.title}
                 class="draggable-img random-size"
                 draggable={true}
                 onDragStart={e => drag(e, item)}
                data-img-src={`/static/uploads/${item.image_url}`}
            />
                <div id="descText" draggable={true} class="draggable-text" onDragStart={e => drag(e, item)}><strong>Description:</strong> {item.description} |</div>
                <div id="storyText" draggable={true} class="draggable-text" onDragStart={e => drag(e, item)}><strong>Story:</strong> {item.story} |</div>
                <div id="userText"><strong>User:</strong> <a href={`mailto:${item.user_contact}`}>{item.user_name}</a></div>
      <h4>Comments:</h4>
      {item.comments?.map(comment => <Comment key={comment.id} comment={comment} />)}
      <CommentForm {...props} />
    </div>
  );
}
