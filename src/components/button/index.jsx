export const Button = ({ title, setProductTitle, color, selectedProduct }) => {
  return (
    <button
      disabled={selectedProduct === title}
      onClick={() => {
        setProductTitle(title);
      }}
      className={`flex justify-center items-center h-fit py-3 mb-2 min-w-max px-4 ${
        selectedProduct === title && "opacity-50 border-4 border-blue-600"
      } text-white rounded-md`}
      style={{ backgroundColor: `${color}` }}
    >
      {title}
    </button>
  );
};
