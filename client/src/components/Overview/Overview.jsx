import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

// Image Gallery
import ImageGallery from './Image Gallery/ImageGallery';

// Top-Level Details
import Details from './Details/Details';

// Style Selector
import StyleSelector from './Style Selector/StyleSelector';

// Add To Cart
import AddCart from './Add to Cart/AddCart';

// Description Information
import Information from './Information/Information';

const Context = React.createContext('lol');

const Overview = () => {
  const { id } = useParams();

  const [productInfo, setProductInfo] = useState({});
  const [styleInfo, setStyleInfo] = useState({});

  useEffect(() => {
    axios
      .get(`http://3.134.102.30/products/${id}`)
      .then(results => {
        console.log(results.data);
        setProductInfo(results.data);
      })
      .then(() => {
        axios.get(`http://3.134.102.30/products/${id}/styles`).then(results => {
          console.log(results.data.results);
          setStyleInfo(results.data.results);
        });
      });
  }, []);

  return (
    <div className="overview">
      <ImageGallery id={id} />
      <div className="right-hand-overview">
        <Details id={id} productInfo={productInfo} />
        <StyleSelector id={id} />
        <AddCart id={id} />
      </div>
      <Information id={id} productInfo={productInfo} />
    </div>
  );
};

export default Overview;