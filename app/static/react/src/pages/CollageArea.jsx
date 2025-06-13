import React, { useRef, useState, useEffect } from 'react';


export default function CollageArea() {
 const collageRef = useRef(null);
  const [items, setItems] = useState([]); // Unified array for img and text
  const [tooltipVisible, setTooltipVisible] = useState(false);
  const [draggingId, setDraggingId] = useState(null);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });


useEffect(() => {
    fetch('/api/postings')
      .then(res => res.json())
      .then(data => setItems(data))
  }, []);

  console.log('creating collage area');
//   useEffect(() => {
//     const handleDrop = (e) => {
//       e.preventDefault();
//       const imgSrc = e.dataTransfer.getData('text');
//       const newImage = {
//         src: imgSrc,
//         left: Math.floor(Math.random() * 70) + '%',
//         top: Math.floor(Math.random() * 70) + '%',
//         id: Date.now()
//       };
//       setImages(prev => [...prev, newImage]);
//     };
  useEffect(() => {
    const handleDrop = (e) => {
      e.preventDefault();
      const data = e.dataTransfer.getData('application/json');
      //const data = e.dataTransfer.getData('text');
      console.log('dropped data is', data);
      console.log('dropped data type is', data.img);
      if (!data) return;
      const parsed = JSON.parse(data);
      const newItem = {
        ...parsed,
        left: Math.floor(Math.random() * 70) + '%',
        top: Math.floor(Math.random() * 70) + '%',
        id: Date.now() + Math.random()
      };
      setItems(prev => [...prev, newItem]);
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
    setItems(currentItems => {
      // Define a function that closes over e, dragOffset, etc.
      const updateItemPosition = (item) =>
        item.id === draggingId
          ? {
              ...item,
              left: `${e.clientX - dragOffset.x - collageRef.current.getBoundingClientRect().left}px`,
              top: `${e.clientY - dragOffset.y - collageRef.current.getBoundingClientRect().top}px`,
            }
          : item;

      const newItems = currentItems.map(updateItemPosition);
      console.log('Updated items:', newItems);
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
    data = { type: 'image', src: item.src };
   } else if (e.target.classList.contains('draggable-text')) {
    data = { type: 'text', content: item.content };
  }
  e.dataTransfer.setData('application/json', JSON.stringify(data));
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
                <div id="descText" draggable={true} onDragStart={e => drag(e, item)}><strong>Description:</strong> {item.description} |</div>
                <div id="storyText" draggable={true} onDragStart={e => drag(e, item)}><strong>Story:</strong> {item.story} |</div>
                <div id="userText" draggable={true} onDragStart={e => drag(e, item)}><strong>User:</strong> <a href={`mailto:${item.user_contact}`}>{item.user_name}</a></div>
      </div>
      );
  console.log('renderItem:', renderItem);
  //console.log('item type:', item.type);

  const renderedItems = items.map(renderItem);
    console.log('renderedItems:', renderedItems);
    //console.log('items:', items);

 const collageItem = (item) => (
        item.type === 'image' ? (
          <img
            type={item.type}
            key={item.id}
            src={`/static/uploads/${item.image_url}`}
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
        ) : (
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
            {item.content}
          </div>
        )
      );
  console.log('collageItem:', collageItem);

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

   const collageItems = items.map(collageItem);
    console.log('collageItems:', collageItems);
    //console.log('items:', items);

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
      {collageItems}
      {tooltipVisible && toolTipItem}
      {items.map(item => (
      <div>item type is {item.type}</div>
       ))}
    </div>
    </div>
  );
}
