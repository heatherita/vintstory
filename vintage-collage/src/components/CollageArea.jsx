import React, { useRef, useState, useEffect } from 'react';


export default function CollageArea() {
  const collageRef = useRef(null);
  const [images, setImages] = useState([]);
  const [tooltipVisible, setTooltipVisible] = useState(false);
  const [draggingId, setDraggingId] = useState(null);
const [dragOffset, setDragOffset] = useState({x: 0, y: 0});

  useEffect(() => {
    const handleDrop = (e) => {
      e.preventDefault();
      const imgSrc = e.dataTransfer.getData('text');
      const newImage = {
        src: imgSrc,
        left: Math.floor(Math.random() * 70) + '%',
        top: Math.floor(Math.random() * 70) + '%',
        id: Date.now()
      };
      setImages(prev => [...prev, newImage]);
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
      setImages(currentImages =>
        currentImages.map(img =>
          img.id === draggingId
            ? {
                ...img,
                left: `${e.clientX - dragOffset.x - collageRef.current.getBoundingClientRect().left}px`,
                top: `${e.clientY - dragOffset.y - collageRef.current.getBoundingClientRect().top}px`,
              }
            : img
        )
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
      <p>Drag images here to make your collage.</p>
      {images.map((img) => (
        <img
          key={img.id}
          src={img.src}
          className="collage-img"
          style={{
            position: 'absolute',
            maxWidth: '150px',
            left: img.left,
            top: img.top,
            zIndex: img.id,
            cursor: draggingId === img.id ? 'grabbing' : 'grab'
          }}
          draggable={false}
          onMouseDown={e => {
  setDraggingId(img.id);
  const rect = e.target.getBoundingClientRect();
  setDragOffset({
    x: e.clientX - rect.left,
    y: e.clientY - rect.top,
  });
}}
// {texts.map((text) => (
//   <div
//     key={text.id}
//     style={{
//       border: "1px solid #ccc",
//       position: 'absolute',
//             maxWidth: '150px',
//             left: img.left,
//             top: img.top,
//             zIndex: img.id,
//             cursor: draggingId === img.id ? 'grabbing' : 'grab'
//     }}
// draggable={false}
//           onMouseDown={e => {
//   setDraggingId(img.id);
//   const rect = e.target.getBoundingClientRect();
//   setDragOffset({
//     x: e.clientX - rect.left,
//     y: e.clientY - rect.top,
//   });
//   >
//     {text.content}
//   </div>
// ))}

        />
      ))}
      {tooltipVisible && (
        <div
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
        </div>
      )}
    </div>
  );
}
