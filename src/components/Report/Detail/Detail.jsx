import { useState } from 'react';

export const Detail = ({ data, onUpdate }) => {
  const [formData, setFormData] = useState({
    surveyor: data.surveyor,
    tanggal_survey: data.tanggal_survey,
    uploader: data.uploader,
    tanggal_upload: data.tanggal_upload,
    station: data.station,
    kilometer: data.kilometer,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = () => {
    onUpdate(formData);
  };

  return (
    <>
      <div className="border-t-2 w-full h-full flex p-2">
        <div className="w-1/2 h-full font-semibold">Surveyor</div>
        <input
          className="border-2 w-full h-auto p-2"
          name="surveyor"
          value={formData.surveyor}
          onChange={handleChange}
        />
      </div>
      <div className="border-t-2 w-full h-full flex p-2">
        <div className="w-1/2 h-full font-semibold">Tanggal Survey</div>
        <input
          className="border-2 w-full h-auto p-2"
          name="tanggal_survey"
          value={formData.tanggal_survey}
          onChange={handleChange}
        />
      </div>
      <div className="border-t-2 w-full h-full flex p-2">
        <div className="w-1/2 h-full font-semibold">Uploader</div>
        <input
          className="border-2 w-full h-auto p-2"
          name="uploader"
          value={formData.uploader}
          onChange={handleChange}
        />
      </div>
      <div className="border-t-2 w-full h-full flex p-2">
        <div className="w-1/2 h-full font-semibold">Tanggal Upload</div>
        <input
          className="border-2 w-full h-auto p-2"
          name="tanggal_upload"
          value={formData.tanggal_upload}
          onChange={handleChange}
        />
      </div>
      <div className="border-t-2 w-full h-full flex p-2">
        <div className="w-1/2 h-full font-semibold">Station</div>
        <input
          className="border-2 w-full h-auto p-2"
          name="station"
          value={formData.station}
          onChange={handleChange}
        />
      </div>
      <div className="border-y-2 w-full h-full flex p-2">
        <div className="w-1/2 h-full font-semibold">Kilometer</div>
        <input
          className="border-2 w-full h-auto p-2"
          name="kilometer"
          value={formData.kilometer}
          onChange={handleChange}
        />
      </div>
      <div className="w-full h-full flex justify-center p-2">
        <button
          className="bg-green-500 text-white font-semibold py-2 px-8 rounded-md hover:bg-green-600"
          onClick={handleSubmit}
        >
          Update
        </button>
      </div>
    </>
  );
};
