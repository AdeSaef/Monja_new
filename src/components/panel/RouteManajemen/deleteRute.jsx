const DeleteRute = ({confirmDelete, closeDelete}) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-700 bg-opacity-30 z-50">
      <div className="bg-white w-1/4 h-1/4 rounded-lg border-2 border-gray-700 flex flex-col justify-center p-6">
        <p className="text-xl text-center">Anda yakin ingin menghapus daftar rute ini?</p>
        <div className="flex justify-center px-2 mt-4">
            <button className="bg-green-400 hover:bg-green-600 text-white select-none w-1/2 mx-2 rounded-lg" onClick={confirmDelete}>Ya</button>
            <button className="bg-red-400 hover:bg-red-600 text-white select-none w-1/2 mx-2 rounded-lg" onClick={closeDelete}>Tidak</button>
        </div>
      </div>
    </div>
  );
};

export default DeleteRute;
