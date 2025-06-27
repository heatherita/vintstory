export default function CommentForm({ value, onChange, onSubmit, onFileChange, item }) {

  return (
    <form onSubmit={onSubmit} enctype="multipart/form-data">
      <label htmlFor={`content-${item.id}`}>Add a Comments:</label>
      <textarea
        name="content"
        value={value}
        onChange={onChange}
        required
        rows={3} />
      <input type="file" name="file" onChange={onFileChange} />
      <br />
      <input type="submit" value="Upload" />
    </form>
  );
}