import React from "react";

const Prompt: React.FC<{
  handleDelete: () => void;
  closeModal: () => void;
}> = ({ handleDelete, closeModal }) => {
  return (
    <div className="modal-overlay">
      <div className="w-96 h-32 shadow-xl rounded-md bg-[#c9c9c9]">
        <h3 className="text-center font-semibold mt-5">
          Are you sure you want to delete this post?
        </h3>
        <div className="flex justify-between mx-14 my-8">
          <button
            onClick={handleDelete}
            className="py-1 px-5 bg-[#2980b9] hover:bg-[#3498db] rounded-md text-white"
          >
            Yes
          </button>
          <button
            onClick={closeModal}
            className="py-1 px-6 bg-[#2980b9] hover:bg-[#3498db] rounded-md text-white"
          >
            No
          </button>
        </div>
      </div>
    </div>
  );
};

export default Prompt;
