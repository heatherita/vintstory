export default function CommentForm({ value, onChange, onSubmit }) {
  return (
    <form onSubmit={onSubmit}>
      <label>Add a Comment:</label>
      <textarea value={value} onChange={onChange} required rows={3} />
      <input type="submit" value="Upload" />
    </form>
  );
}