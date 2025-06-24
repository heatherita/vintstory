export default function CommentForm({ value, onChange, onSubmit, item }) {

  return (
    <form onSubmit={onSubmit}>
      <label htmlFor={`content-${item.id}`}>Add a Comment:</label>
      <textarea
      value={value}
      onChange={onChange}
      required
      rows={3} />
      <input type="submit" value="Upload" />
    </form>
  );
}