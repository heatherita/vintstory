import React, { useRef, useState, useEffect } from 'react';
import Posting from './Posting';


export default function CollageArea() {
  const collageRef = useRef(null);
  const [files, setFiles] = useState({}); // Array to hold multiple files
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

  const handleDrag = (item, e) => {
    let data = {};
    if (e.target.classList.contains('draggable-img')) {
      data = { type: 'image', src: e.target.src };
    } else if (e.target.classList.contains('draggable-text')) {
      data = { type: 'text', src: e.target.outerText };
    }
    //console.log('dragging data', item, ' event is ', e);
    e.dataTransfer.setData('application/json', JSON.stringify(data));
  };

  const handleCommentChange = (itemId, e) => {
    setCommentInputs({ ...commentInputs, [itemId]: e.target.value });
  };

const handleFileChange = (item) =>(e) => {
    const file = e.target.files[0];
    setFiles(prevFiles => ({ ...prevFiles, [item.id]: file }));
    console.log('Selected file:', files[item]);
  };

  
  // returns only new comment then merges in
  const handleCommentSubmit = (item) => (e) => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    const file = files[item.id]; // Get the file for this item
    
    // Append item_id and content to formData
    console.log('item id:', item.id);
    console.log('file:', file.name);
    formData.append('item_id', item.id);
    if(file){
    formData.append('file', file, file.name); // Append the file with its name
    }

    const content = commentInputs[item.id];
    if (!content) return;
    formData.append('content',content);
   

    fetch(`/api/add_image/${item.id}`, {
      method: 'POST',
      body: formData,
    })
      .then(res => res.json())
      .then(newComment => {
        setItems(items =>
          items.map(it =>
            it.id == item.id
              ? newComment // Replace the item with the new comment
              : it
          )
        );
        setCommentInputs(inputs => ({ ...inputs, [item.id]: '' })); // Clear input
      });
  };

  // returns all postings
  const handleCommentSubmitAllPosts = (item) => (e) => {
    e.preventDefault();
    const content = commentInputs[item.id];
    if (!content) return;
    fetch(`/api/add_comment_list/${item.id}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ item_id: item.id, content })
    })
      .then(res => res.json())
      .then(newItems => {
        setItems(newItems);              // Just set the new items array
        setCommentInputs(inputs => ({ ...inputs, [item.id]: '' })); // Clear input
      });
  }

  const showTooltip = () => {
    setTooltipVisible(true);
    setTimeout(() => setTooltipVisible(false), 1500);
  };

  const renderItem = (item) => (
    <Posting key={item.id}
      item={item}
      commentValue={commentInputs[item.id] || ""}
      onCommentChange={(e) => handleCommentChange(item.id, e)}
      onCommentSubmit={handleCommentSubmit(item)}
      onFileChange={handleFileChange(item)}
      onDragStart={(e) => handleDrag(item, e)} />
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
    <div style={{ display: 'inline-flex' }}>
      <div style={{ flex: '1' }}>
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
