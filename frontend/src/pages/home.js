import React, { useState, useEffect } from 'react';
import '../static/css/home.css';
import '../static/css/card.css';
import HeaderUser from '../components/header-user';
import Card  from '../components/card';
import Cart from '../components/cart';
import Modal from '../components/modal';
import ReceiptModal from '../components/checkoutmodal';


const Home = () => {
  const [images, setImages] = useState([]);
  const [products, setProducts] = useState([]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    // Fetch images from the server
    fetch('/api/images')
      .then((response) => response.json())
      .then((data) => {
        setImages(data);
      })
      .catch((error) => console.error('Error fetching images:', error));
  }, []); // This effect runs only once to fetch images

  useEffect(() => {
    // Fetch product data from the server
    fetch('/api/product')
      .then((response) => response.json())
      .then((data) => {
        setProducts(data);
      })
      .catch((error) => console.error('Error fetching products:', error));
  }, []); // This effect runs only once to fetch products

  useEffect(() => {
    // Rotate the images every 5 seconds
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000);

    return () => {
      clearInterval(interval);
    };
  }, [images]); // This effect is triggered whenever images change

  useEffect(() => {
    async function filterProducts() {
      const filteredProducts = await Promise.all(
        products.map(async (product) => {
          const imageUrl = `/api/images/name/${product.name}`;
          const imageExists = await imageExistsAsync(imageUrl);
          return { ...product, imageExists };
        })
      );
      setFilteredProducts(filteredProducts);
    }
    filterProducts();
  }, [products]);

  async function imageExistsAsync(url) {
    return new Promise((resolve) => {
      const img = new Image();
      img.onload = () => resolve(true);
      img.onerror = () => resolve(false);
      img.src = url;
    });
  }

 
  // Call the async function

  

  const [cartItems, setCartItems] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [delivery, setDelivery] = useState(false);
  const [address, setAddress] = useState('');
  const [isReceiptOpen, setIsReceiptOpen] = useState(false);
  const [hasCheckedOut, setHasCheckedOut] = useState(false);


  const openReceipt = () => {
    setIsReceiptOpen(true);
  };

  const closeReceipt = () => {
    setIsReceiptOpen(false);
  };

  const openCart = () => {
    setIsCartOpen(true);
  };

  const closeCart = () => {
    console.log("Closing cart");
    setIsCartOpen(false);
  };

  const removeFromCart = (index) => {
    // Remove the item at the specified index from the cart
    const updatedCart = [...cartItems];
    updatedCart.splice(index, 1);
    setCartItems(updatedCart);
  };
  const addToCart = (product) => {
    // Check if the product is already in the cart
    const existingProduct = cartItems.find((item) => item.name === product.title);
  
    if (existingProduct) {
      // If the product is already in the cart, update the count
      setCartItems((prevCartItems) =>
        prevCartItems.map((item) =>
          item.name === product.title
            ? { ...item, count: item.count + 1 }
            : item
        )
      );
    } else {
      // If the product is not in the cart, add it with count 1
      setCartItems((prevCartItems) => [
        ...prevCartItems,
        { name: product.title, count: 1, price: product.price } // Use product.title instead of product.name
      ]);
    }
  };

  const checkout = () => {
    // Calculate total cost
    const totalCost = cartItems.reduce(
      (total, item) => total + item.price * item.count,
      0
    );

    // Log the receipt to the console
    console.log("Receipt:");
    console.log("---------------------");
    cartItems.forEach((item) => {
      console.log(`${item.name} - Count: ${item.count} - Price: $${item.price}`);
    });
    console.log("---------------------");
    console.log(`Total: $${totalCost.toFixed(2)}`);
    console.log(`Delivery: ${delivery ? 'Yes' : 'No'}`);
    console.log(`Address: ${address}`);


    const receiptData = {
      items: cartItems,
      totalCost,
      delivery,
      address,
    };
  
   
  
    // Open the receipt modal
    openReceipt();

    sendReceiptData(receiptData);

    setHasCheckedOut(false);
    // Clear the cart
  };

  const clearCheckoutStatus = () => {
    // Reset the checkout status
    setHasCheckedOut(true);
  };

  useEffect(() => {
    if (hasCheckedOut) {
      setCartItems([]); // Clear the cart when hasCheckedOut changes
      clearCheckoutStatus(); // Reset the checkout status
    }
  }, [hasCheckedOut]);

   async function sendReceiptData(receiptData) {
    try {
      const response = await fetch('http://localhost:3000/api/receipts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(receiptData),
      });
  
      if (response.ok) {
        console.log('Receipt data sent successfully');
      } else {
        console.error('Failed to send receipt data:', response.statusText);
      }
    } catch (error) {
      console.error('Error sending receipt data:', error);
    }
  }
  


  return (
    <div>
      <HeaderUser />
      <div className="home-view">
        <div className="picture-gallery">
          <div className="gallery-item">
            {images.length > 0 && (
              <img
                src={images[currentImageIndex].data}
                alt={`Image ${currentImageIndex + 1}`}
                className="image-frame"
              />
            )}
          </div>
        </div>
        <div className="home-welcome">
          <h2>Welcome to our Cafe</h2>
          <p>
            Discover the aroma of freshly brewed coffee and the delight of
            delectable pastries at our cozy cafe. Whether you're here for a
            quick pick-me-up or a leisurely breakfast, we have something to
            satisfy your cravings.
          </p>
          <p>
            Explore our menu, relax in our comfortable seating, and let our
            baristas craft the perfect cup of coffee for you. We're dedicated
            to providing you with a warm and inviting cafe experience that
            keeps you coming back for more.
          </p>
          <p>
            Feel free to browse our gallery of delectable treats and see what's
            brewing today. We look forward to serving you!
          </p>
          <a href="/catalogue" className="view-catalogue-button">
            View Catalogue
          </a>
        </div>
      </div>
      <div className="content">
        <div className='cart-holder'>
          <button className='cart-button' onClick={() => {
              openCart(); // Open the new cart
            }}>Open Cart</button>
         </div>
        <div className='catalog'> 
       
       
             {filteredProducts
          .filter((product) => product.imageExists)
          .map((product) => (
            <Card
              key={product.name}
              title={product.name}
              imageUrl={`/api/images/name/${product.name}`}
              description={product.description}
              price={product.price}
              category={product.category}
              addToCart={addToCart} // Pass the addToCart function as a prop
            />
          ))}
        </div>
         <ReceiptModal
          isOpen={isReceiptOpen}
          closeReceipt={() => {
            closeReceipt();
            clearCheckoutStatus();
          }}
          cartItems={cartItems}
          totalCost={cartItems.reduce((total, item) => total + item.price * item.count, 0)}
          delivery={delivery}
          address={address}
        />
        <Modal isOpen={isCartOpen} closeCart={closeCart}>
          <Cart
            cartItems={cartItems}
            removeFromCart={removeFromCart} // Pass the removeFromCart function as a prop
            closeCart={closeCart}
            checkout={checkout}
            delivery={delivery}
            setDelivery={setDelivery}
            address={address}
            setAddress={setAddress}
          />
        </Modal>

      </div>
    </div>
  );
};
export default Home;


