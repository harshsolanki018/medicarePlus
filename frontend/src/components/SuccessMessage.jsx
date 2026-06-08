function SuccessMessage({ message }) {
  if (!message) return null;

  return (
    <div className="rounded-lg border border-sky-200 bg-sky-100 px-4 py-3 text-sm font-medium text-sky-900">
      {message}
    </div>
  );
}

export default SuccessMessage;
