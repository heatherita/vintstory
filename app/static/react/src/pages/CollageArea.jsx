import React, { useRef, useState, useEffect } from 'react';


export default function CollageArea() {
 const collageRef = useRef(null);
  const [tooltipVisible, setTooltipVisible] = useState(false);
  const [items, setItems] = useState([]); // Unified array for img and text
  const [commentInputs, setCommentInputs] = useState([]); // Unified array for img and text
  const [movedItems, setMovedItems] = useState([]); // Unified array for img and text
  const [draggingId, setDraggingId] = useState(null);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });


useEffect(() => {
    fetch('/api/postings')
      .then(res => res.json())
      .then(data => setItems(data))
  }, []);

  useEffect(() => {
       if (items.length === 0) return;
  const sizes = ['100px', '150px', '200px', '250px', '300px'];
      document.querySelectorAll('.random-size').forEach(img => {
        const randomSize = sizes[Math.floor(Math.random() * sizes.length)];
        img.style.maxWidth = randomSize;
    });
}, [items]);

  console.log('creating collage area');
  useEffect(() => {
    const handleDrop = (e) => {
      e.preventDefault();
      const data = e.dataTransfer.getData('application/json');
      if (!data) return;
      const parsed = JSON.parse(data);
      const newItem = {
        ...parsed,
        left: Math.floor(Math.random() * 70) + '%',
        top: Math.floor(Math.random() * 70) + '%',
        id: Date.now() + Math.random()
      };
      setMovedItems(prev => [...prev, newItem]);
      //collageItems.map(newItem);
      //return collageItems;
    };

    const handleDragOver = (e) => {
      e.preventDefault();
    };

    const collage = collageRef.current;
    collage.addEventListener('drop', handleDrop);
    collage.addEventListener('dragover', handleDragOver);

    return () => {
      collage.removeEventListener('drop', handleDrop);
      collage.removeEventListener('dragover', handleDragOver);
    };
  }, []);

  // Add global event listeners in useEffect:
 useEffect(() => {

function handleMouseMove(e) {
  if (draggingId !== null) {
    setMovedItems(currentItems => {
      // Define a function that closes over e, dragOffset, etc.
      const updateItemPosition = (item) =>
        item.id === draggingId
          ? {
              ...item,
              left: `${e.clientX - dragOffset.x - collageRef.current.getBoundingClientRect().left}px`,
              top: `${e.clientY - dragOffset.y - collageRef.current.getBoundingClientRect().top}px`,
            }
          : item;

      const newItems = movedItems.map(updateItemPosition);
      //console.log('Updated items:', newItems);
      return newItems;
    });
  }
}

  function handleMouseUp() {
    setDraggingId(null);
  }
  if (draggingId !== null) {
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
  }
  return () => {
    window.removeEventListener('mousemove', handleMouseMove);
    window.removeEventListener('mouseup', handleMouseUp);
  };
}, [draggingId, dragOffset]);

function drag(e, item) {
  let data = {};
  if (e.target.classList.contains('draggable-img')) {
    data = { type: 'image', src: e.target.src };
   } else if (e.target.classList.contains('draggable-text')) {
    data = { type: 'text', src: e.target.outerText };
  }
   //console.log('dragging data', item, ' event is ', e);
  e.dataTransfer.setData('application/json', JSON.stringify(data));
}

const handleChange = (event) => {
  setName(event.target.value);
};


function handleSubmit(event, item){
   event.preventDefault();
   const content = commentInputs[item.id];
   if(!content) return;

   fetch('/api/add_comment/', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ item_id: item.id, content })
  })
  .then(res => res.json())
  .then(newComment => {
      setItems(items =>
          items.map(it =>
              it.id == item.id
                ? { ...it, comments: [...(it.comments || []), newComment] }
                : it
       )
      );
      setCommentInputs(inputs => ({ ...inputs, [item.id]: '' })); // Clear input
    });
}

  const showTooltip = () => {
    setTooltipVisible(true);
    setTimeout(() => setTooltipVisible(false), 1500);
  };

  const renderItem = (item) => (
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
            {item.comments && item.comments.map(comment => (
            <div className="comment" key={comment.id}>
                <img src={`/static/uploads/${comment.image_url}`}
                     alt={comment.title}
                     className="draggable-img random-size"
                     draggable={true}
                     onDragStart={e => drag(e, item)}
                     data-img-src={`/static/uploads/${comment.image_url}`}/>
                <br/>
                <div
                class="draggable-text random-size"
                draggable={true}
                onDragStart={e => drag(e, item)}>
                {comment.content}
                {comment.created_at && (
  <small>
    <strong>
      Posted on {new Date(comment.created_at).toISOString().slice(0, 16).replace('T', ' ')}
    </strong>
  </small>
  )}
</div>
</div>
))}

            <form onSubmit={e => handleSubmit(e, item)}>
                <label htmlFor={`content-${item.id}`} for="content">Add a Comment:</label><br/>
                <textarea
                name="content"
                rows="3"
                required={true}
                value={commentInputs[item.id] || ''}
                onChange={e =>
                    setCommentInputs({...commentInputs, [item.id]: e.target.value})
                    }
                ></textarea><br/>
                <input type="submit" value="Upload"/>
            </form>

      </div>
      );
  console.log('renderItem:', renderItem);

  const renderedItems = items.map(renderItem);
    console.log('renderedItems:', renderedItems);

 const collageItem = (item) => (
        item.type === 'image' ? (
          <img
            type={item.type}
            key={item.id}
            src={item.src}
            className="collage-img"
            style={{
              position: 'absolute',
              maxWidth: '150px',
              left: item.left,
              top: item.top,
              zIndex: item.id,
              cursor: draggingId === item.id ? 'grabbing' : 'grab'
            }}
            draggable={false}
            onMouseDown={e => {
              setDraggingId(item.id);
              const rect = e.target.getBoundingClientRect();
              setDragOffset({
                x: e.clientX - rect.left,
                y: e.clientY - rect.top,
              });
            }}
          />
        ) :
    (
          <div
            key={item.id}
             type={item.type}
            className="collage-img collage-text"
            style={{
              position: 'absolute',
              left: item.left,
              top: item.top,
              zIndex: item.id,
              cursor: draggingId === item.id ? 'grabbing' : 'grab',
              background: '#fffbe9',
              minWidth: '60px',
              minHeight: '30px',
              padding: '6px 10px'
            }}
            draggable={false}
            onMouseDown={e => {
              setDraggingId(item.id);
              const rect = e.target.getBoundingClientRect();
              setDragOffset({
                x: e.clientX - rect.left,
                y: e.clientY - rect.top,
              });
            }}
          >
            {item.src}
          </div>
        )
      );

  const toolTipItem = <div
          style={{
            position: 'absolute',
            right: '10px',
            bottom: '10px',
            backgroundColor: '#ffc',
            padding: '6px 12px',
            fontSize: '12px',
            border: '1px solid #ccc',
            boxShadow: '2px 2px 5px rgba(0,0,0,0.2)'
          }}
        >
          Resizing collage...
        </div>;

    const collageItems = movedItems.map(collageItem);

  return (
      <div style={{display: 'inline-flex'}}>
      <div style={{flex: '1'}}>
        <p>Rendered Items.</p>
      {renderedItems}
    </div>
    <div
      id="collage-area"
      ref={collageRef}
      style={{
        position: 'fixed',
        right: '100px',
        top: '20px',
        minHeight: '500px',
        border: '2px dashed #ccc',
        padding: '10px',
        resize: 'both',
        overflow: 'auto',
        width: '400px'
      }}
      onMouseDown={showTooltip} // simulate resize trigger
    >
      <h3>🎨 Collage Area</h3>
      <p>Drag images or text here to make your collage.</p>
      {tooltipVisible && toolTipItem}
      {collageItems}
    </div>
    </div>
  );
}
