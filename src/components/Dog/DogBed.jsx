import React from 'react';
import { useSelector} from "react-redux";
import ProductItem from '../Product reusable comp/ProductItem';
import DogBedOffer from '../Carousel/DogBedOffer';

const DogBed = () => {
    const products = useSelector((state) => state.pro.products);
    const filtered = products.filter((item) => item.catogory === "dog-beds");
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-8">
             
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {filtered.map((bed) => (
                   <ProductItem key={bed.id} product={bed} />
                ))}
            </div>
            <DogBedOffer/>
        </div>
    );
};

export default DogBed;
