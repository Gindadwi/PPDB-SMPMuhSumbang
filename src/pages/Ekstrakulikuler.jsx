import axios from "axios";
import React, { useEffect, useState } from "react";
import { Dialog } from "@headlessui/react";

const Ekstrakulikuler = () => {
  const [imgCard, setImgCard] = useState([]);
  const [selectedEkskul, setSelectedEkskul] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://smpmuhsumbang-9fa3a-default-rtdb.firebaseio.com/eksul.json"
        );
        const data = response.data;
        const imagecard = Object.keys(data).map((key) => data[key]);
        setImgCard(imagecard);
      } catch (error) {
        console.log("Error fetching data", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="flex justify-center bg-gray-100">
      <div className="p-6 max-w-[1080px] 2xl:mt-16">
        <div className="text-center mt-12">
          <h1 className="text-2xl font-semibold font-outfit">
            Ekstrakurikuler
          </h1>
          <p className="text-lg font-poppins">SMP Muhammadiyah Sumbang</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mt-6">
          {imgCard.map((card, index) => (
            <div key={index} className="bg-white border rounded-lg shadow-lg">
              <img
                className="rounded-t-lg w-full h-48 object-cover"
                src={card.Image}
                alt={card.Title}
              />
              <div className="p-4">
                <h5 className="text-xl font-bold text-gray-900">
                  {card.Title}
                </h5>
                <p className="text-gray-700 line-clamp-2">{card.deskripsi}</p>
                <button
                  onClick={() => setSelectedEkskul(card)}
                  className="mt-3 px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700"
                >
                  Read more
                </button>
              </div>
            </div>
          ))}
        </div>

        {selectedEkskul && (
          <Dialog
            open={true}
            onClose={() => setSelectedEkskul(null)}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
          >
            <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
              <img
                className="w-full h-56 object-cover rounded-lg"
                src={selectedEkskul.Image}
                alt={selectedEkskul.Title}
              />
              <h2 className="text-2xl font-semibold mt-4">
                {selectedEkskul.Title}
              </h2>
              <p className="text-gray-700 mt-2">{selectedEkskul.deskripsi}</p>
              <button
                onClick={() => setSelectedEkskul(null)}
                className="mt-4 w-full py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
              >
                Close
              </button>
            </div>
          </Dialog>
        )}
      </div>
    </div>
  );
};

export default Ekstrakulikuler;
