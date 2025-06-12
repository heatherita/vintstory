import { useEffect, useState } from 'react'

export default function Postings() {
  const [items, setItems] = useState([])

  useEffect(() => {
    fetch('/api/postings')
      .then(res => res.json())
      .then(data => setItems(data))
  }, [])

  return (
    <div>
      {items.map(item => (
        <div className="posting" key={item.id}>
          <h2>{item.title}</h2>
          <img
            src={`/static/uploads/${item.image_url}`}
            alt={item.title}
            className="draggable-img random-size"
          />
        </div>
      ))}
    </div>
  )
}
