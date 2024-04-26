export default function Preview({ edit, setEdit }) {
  return (
    <>
      <h1>Editing</h1>
      <button onClick={() => setEdit(false)}>Preview?</button>
    </>
  );
}
