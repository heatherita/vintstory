import React, { useRef, useState, useEffect } from 'react';


export default function CollageArea() {
 const collageRef = useRef(null);
  const [items, setItems] = useState([]); // Unified array for img and text
  const [tooltipVisible, setTooltipVisible] = useState(false);
  const [draggingId, setDraggingId] = useState(null);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });


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
           console.log('Dragging:', draggingId, 'Mouse:', e.clientX, e.clientY, 'Offset:', dragOffset);

          var currentItems =
          currentItems.map(item =>
            item.id === draggingId
              ? {
                  ...item,
                  left: `${e.clientX - dragOffset.x - collageRef.current.getBoundingClientRect().left}px`,
                  top: `${e.clientY - dragOffset.y - collageRef.current.getBoundingClientRect().top}px`,
                }
              : item
          );
        console.log('Updated items:', currentItems);
        setItems(currentItems
        );
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

  const showTooltip = () => {
    setTooltipVisible(true);
    setTimeout(() => setTooltipVisible(false), 1500);
  };

 const renderItem = (item) => (
        item.type === 'image' ? (
          <img
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
        ) : (
          <div
            key={item.id}
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
  console.log('renderItem:', renderItem);

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

   const renderedItems = items.map(renderItem);
    console.log('renderedItems:', renderedItems);
    //console.log('items:', items);

  return (
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
      {renderedItems}
      {tooltipVisible && toolTipItem}
    </div>
  );
}
