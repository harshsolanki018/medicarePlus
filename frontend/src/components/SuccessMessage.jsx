function SuccessMessage({ message }) {
  if (!message) return null;

  return (
    <div className="success-box">
      {message}
    </div>
  );
}

export default SuccessMessage;
