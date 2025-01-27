import React, { useState, useEffect } from 'react';
import CardGrid from '../../components/cardGrid';
import ProductCard from '../../components/productCard';
import ProductEditPopup from '../../components/ProductEditPopup';
import axiosClient from '../../axios-client';
import Header from '../../components/header';

export default function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [userRole, setUserRole] = useState('user'); // Здесь роль пользователя

  // Загрузка продуктов
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await axiosClient.get('/products');
        setProducts(response.data);
      } catch (err) {
        console.error('Ошибка при загрузке продуктов:', err);
        setError('Не удалось загрузить продукты');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Управление ProductEditPopup
  const handleIconClick = (product) => {
    setSelectedProduct(product); // Устанавливаем данные карточки
    setIsPopupOpen(true); // Открываем Popup
  };

  const closePopup = () => {
    setIsPopupOpen(false);
    setSelectedProduct(null); // Сбрасываем данные после закрытия
  };

  if (loading) return <p>Загрузка...</p>;
  if (error) return <p>{error}</p>;

  return (
    <>
      <Header />
      <CardGrid>
        {products.map((product) => (
          <ProductCard
            key={product.id}
            title={product.name}
            img={product.img}
            onIconClick={() => handleIconClick(product)} // Передаем обработчик
          />
        ))}
      </CardGrid>
      {isPopupOpen && (
        <ProductEditPopup
          onClose={closePopup}
          productData={selectedProduct}
          userRole={userRole} // Передаем роль пользователя
        />
      )}
    </>
  );
}
