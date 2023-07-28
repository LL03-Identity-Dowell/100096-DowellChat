export const Message = ({ message, color }) => {
  return (
    <div className={`block h-fit max-w-sm rounded-md ${color} p-4`}>
      <p className="break-words">{message}</p>
    </div>
  );
};
