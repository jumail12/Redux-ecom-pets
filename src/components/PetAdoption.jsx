import axios from 'axios';
import React, { useEffect, useState } from 'react';

const PetAdoption = () => {
    const [petsData, setPetsData] = useState([]);

    const fetchAd = async () => {
        try {
            const res = await axios.get(`http://localhost:5002/petsData`);
            setPetsData(res.data);
        } catch {
            console.log("error");
        }
    };

    useEffect(() => {
        fetchAd();
    }, []);

    return (
        <div className="pet-adoption container mx-auto p-4">
            <h1 className="text-4xl font-bold text-center my-6">Pets Available for Adoption</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {petsData.map((pet) => (
                    <div key={pet.id} className="pet-card border border-gray-200 shadow-lg rounded-lg overflow-hidden">
                        <img src={pet.imageUrl} alt={`${pet.type} - ${pet.name}`} className="pet-image w-full h-48 object-cover" />
                        <div className="pet-details p-4">
                            <h2 className="text-2xl font-semibold mb-2 ">{pet.name}</h2>
                            <p className="text-gray-700 font-semibold">Breed: {pet.breed}</p>
                            <p className="text-gray-700 font-semibold">Age: {pet.age}</p>
                            <button className="adopt-button mt-4 bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg w-full transition duration-200">Adopt {pet.name}</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default PetAdoption;
