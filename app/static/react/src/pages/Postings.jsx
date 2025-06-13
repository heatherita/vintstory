import { useEffect, useState } from 'react'

export default function Postings() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetch('/api/postings')
      .then(res => res.json())
      .then(data => setItems(data))
  }, []);

  const renderItem = (item) => (
          <div className="posting" key={item.id}>
            <h2>{item.title}</h2>
            <img src={`/static/uploads/${item.image_url}`}
                 alt={item.title}
                 class="draggable-img random-size"
                 draggable={true}
                 ondragstart={e => {
              setDraggingId(item.id);
              const rect = e.target.getBoundingClientRect();
              setDragOffset({
                x: e.clientX - rect.left,
                y: e.clientY - rect.top,
              });
            }}
            />
                <div id="descText"><strong>Description:</strong> {item.description} |</div>
                <div id="storyText"><strong>Story:</strong> {item.story} |</div>
                <div id="userText"><strong>User:</strong> <a href={`mailto:${item.user_contact}`}>{item.user_name}</a></div>
      </div>
      );
  console.log('renderItem:', renderItem);

  const renderedItems = items.map(renderItem);
    console.log('renderedItems:', renderedItems);
    //console.log('items:', items);


  return (
    <div>
        <p>Rendered Items.</p>
      {renderedItems}
    </div>
  );
}
