import React from 'react'
import { useNavigate } from 'react-router-dom'
import styles from './ProductList.module.css'
import { useCart } from '../cart/CartContext'
import { useAuth } from '../auth/AuthContext'
// Shared product catalog
export const productsData = [
  { id: 1, name: 'Rockerz 255 Pro+', price: '₹1,299', rating: 4.5, tag: 'Bestseller', category: 'earbuds', image: 'https://www.boat-lifestyle.com/cdn/shop/files/Scene_05_Brown_1400x.png?v=1717817077' },
  { id: 2, name: 'Airdopes 181', price: '₹1,499', rating: 4.3, tag: 'New', category: 'earbuds', image: 'https://www.boat-lifestyle.com/cdn/shop/files/Artboard1copy_1_700x.jpg?v=1742463712' },
  { id: 3, name: 'Wave Call 2', price: '₹1,999', rating: 4.4, tag: 'Hot', category: 'smartwatch', image: 'https://images.fonearena.com/blog/wp-content/uploads/2023/07/boAt-Wave-Call-2.jpeg' },
  { id: 4, name: 'Immortal 131', price: '₹1,299', rating: 4.2, tag: 'Gaming', category: 'earbuds', image: 'https://www.boat-lifestyle.com/cdn/shop/files/Artboard11_9aa02dfc-4a85-4d1b-8d1d-e77efc33244c_1400x.png?v=1736244182' },
  { id: 5, name: 'Nirvana Ion ANC', price: '₹2,999', rating: 4.6, tag: 'ANC', category: 'earbuds', image: 'https://cdn.pixelbin.io/v2/catalog-cloud/ccprod/original/products/assets/item/free/original/cF4rKva82I-boAt-TWS-ANC-Nirvana-Ion-20.jpg' },
  { id: 6, name: 'Aavante Bar 3200D', price: '₹8,999', rating: 4.7, tag: 'Soundbar', category: 'speaker', image: 'https://rukminim2.flixcart.com/image/480/640/kg15ocw0-0/speaker/soundbar/q/j/j/aavante-bar-1550-aavante-bar-1500-boat-original-imafwcpenhbfpgyy.jpeg?q=90' },
  { id: 7, name: 'Rockerz 450 Pro', price: '₹1,799', rating: 4.5, tag: 'Bestseller', category: 'headphones', image: 'https://dailydeals365.in/wp-content/uploads/2025/03/611BUCXQROL._SY450_1500x.jpg' },
  { id: 8, name: 'Airdopes 141', price: '₹1,299', rating: 4.4, tag: 'New', category: 'earbuds', image: 'https://www.boat-lifestyle.com/cdn/shop/files/Artboard2_6e01a0c6-18c1-48c0-9ad1-3ca99461c116_1500x.jpg?v=1745907531' },
  { id: 9, name: 'Wave Call Pro', price: '₹2,499', rating: 4.6, tag: 'Hot', category: 'smartwatch', image: 'https://i.ytimg.com/vi/uqtOMa86_B4/maxresdefault.jpg' },
  { id: 10, name: 'Bassheads 242', price: '₹599', rating: 4.1, tag: 'Budget', category: 'earbuds', image: 'https://img.thecdn.in/329756/boat-bassheads-110-1697708123964_SKU-1091_0.jpeg?width=600&format=webp' },
  { id: 11, name: 'Rockerz 510', price: '₹1,999', rating: 4.5, tag: 'Bestseller', category: 'headphones', image: 'https://m.media-amazon.com/images/S/aplus-media-library-service-media/6b025de4-3243-456f-8f6a-6c059ed52426.__CR0,0,970,600_PT0_SX970_V1___.jpg' },
  { id: 12, name: 'Airdopes 131', price: '₹1,199', rating: 4.3, tag: 'New', category: 'earbuds', image: 'https://www.boat-lifestyle.com/cdn/shop/files/8_40ea1ac8-2cff-4bc0-b7f8-5fac414a6f63_1080x.jpg?v=1726625743' },
  { id: 13, name: 'Wave Electra', price: '₹1,499', rating: 4.4, tag: 'Hot', category: 'smartwatch', image: 'https://s3b.cashify.in/gpro/uploads/2022/12/26011100/boAt-Wave-Electra-Launch-1_Techn.jpg' },
  { id: 14, name: 'Stone 352', price: '₹1,299', rating: 4.2, tag: 'Speaker', category: 'speaker', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRjPB2hHOSsMpH4MZLix-2uQCtCZJc2Rg-Tog&s' },
  { id: 15, name: 'Rockerz 518', price: '₹1,499', rating: 4.4, tag: 'Bestseller', category: 'headphones', image: 'https://m.media-amazon.com/images/I/618RQymSQYL.jpg' },
  { id: 16, name: 'Airdopes 161', price: '₹1,399', rating: 4.5, tag: 'New', category: 'earbuds', image: 'https://rukminim2.flixcart.com/image/704/844/xif0q/headphone/l/k/i/-original-imah3zvdp7ucukjr.jpeg?q=90&crop=false' },
  { id: 17, name: 'Wave Connect', price: '₹1,799', rating: 4.3, tag: 'Hot', category: 'smartwatch', image: 'https://akm-img-a-in.tosshub.com/indiatoday/images/story/202206/boAt_Smartwatch_Wave_Connect.png?VersionId=Wa0qZpIPj96cZTqoNU2mOgOk1DMh_Ezv' },
  { id: 18, name: 'Nirvana 751 ANC', price: '₹3,999', rating: 4.7, tag: 'Premium', category: 'headphones', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTPJToOTZX4fyJMGhVAyAeiZkaoV6nokCRdSg&s' },
  { id: 19, name: 'Aavante Bar 1800', price: '₹4,999', rating: 4.6, tag: 'Soundbar', category: 'speaker', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTQ-BTnaHio59g1XRBmXGNGzB3pdUSBiLm_Zg&s' },
  { id: 20, name: 'Rockerz 235 V2', price: '₹899', rating: 4.2, tag: 'Budget', category: 'earbuds', image: 'https://assets.myntassets.com/f_auto,q_auto:eco,dpr_1.3,w_412,c_limit,fl_progressive/assets/images/2022/9/15/d220e186-7aae-4799-95db-4c0062cb98de1663230104412-1.jpg' },
  { id: 21, name: 'Wave Call 3', price: '₹2,299', rating: 4.5, tag: 'New', category: 'smartwatch', image: 'https://www.boat-lifestyle.com/cdn/shop/files/Screen_d9c98abc-c66d-46b6-9473-5b4df8f75744_1800x.png?v=17586261033' },
  { id: 22, name: 'Immortal 200', price: '₹1,499', rating: 4.4, tag: 'Gaming', category: 'earbuds', image: 'https://d3jbu7vaxvlagf.cloudfront.net/small/v2/category_media/16445703518643_Daily_40_Mansur-Ali_Boat_Headphone_File_11222_square.jpg' },
  { id: 23, name: 'Bassheads 100', price: '₹399', rating: 4.0, tag: 'Budget', category: 'earbuds', image: 'https://cdn.zeptonow.com/production/tr:w-640,ar-1280-525,pr-true,f-auto,q-40/cms/l4_attribute_value/5d948dee-4971-4fff-869c-0fb1bc24ffdb.jpg' },
  { id: 24, name: 'Rockerz 550', price: '₹2,299', rating: 4.6, tag: 'Bestseller', category: 'headphones', image: 'https://rukminim2.flixcart.com/image/480/640/xif0q/headphone/d/8/o/-original-imagz5qagzek7tjz.jpeg?q=90' },
  { id: 25, name: 'Airdopes 201', price: '₹1,699', rating: 4.5, tag: 'New', category: 'earbuds', image: 'https://www.bajaao.com/cdn/shop/files/boat-true-wireless-in-ear-headphones-combo-pack-of-boat-airdopes-201-true-wireless-in-ear-bluetooth-headphone-with-boat-stone-260-portable-bluetooth-speaker-29192950612147.jpg?v=1688609196&width=1000' },
  { id: 26, name: 'Stone 1200', price: '₹2,999', rating: 4.5, tag: 'Speaker', category: 'speaker', image: 'https://images.hindustantimes.com/tech/img/2021/09/01/1600x900/boat_1630511510363_1630511517541.JPG' },
  { id: 27, name: 'Wave Edge', price: '₹1,999', rating: 4.4, tag: 'Hot', category: 'smartwatch', image: 'https://m.media-amazon.com/images/S/aplus-media-library-service-media/30733fef-d24a-430a-a667-4658376f44fb.__CR0,0,600,450_PT0_SX600_V1___.png' },
  { id: 28, name: 'Nirvana 751', price: '₹2,499', rating: 4.6, tag: 'Premium', category: 'headphones', image: 'https://www.gizmochina.com/wp-content/uploads/2022/02/boAt-Nirvana-751-ANC.jpg?x70461' },
]
function getCartButtonState({ user, inCart, added, ctaLabel }) {
  if (!user) {
    return {
      label: 'Sign in to buy',
      disabled: false,
      variant: 'needAuth',
    };
  }

  if (added) {
    return {
      label: '✓ Added!',
      disabled: true,
      variant: 'justAdded',
    };
  }
  return {
    label: ctaLabel || 'Add to cart',
    disabled: false,
    variant: 'default',
  };
}
export default function ProductList({
  products,
  addedItems = {},
  isInCart = () => false,
  onAddToCart = () => {},
  onProductClick,
  ctaLabel = 'Add to Cart',
  onViewAll,
}) {
  const navigate = useNavigate();
  const { user } = useAuth();
  const handleProductClick = (product) => {
    if (onProductClick) {
      onProductClick(product)
    } else {
      navigate('/products')
    }
  }

  return (
    
    <div className={styles.grid}>
      {products.map(item => {
        const added = addedItems[item.id]
        const inCart = isInCart(item.id)
        const { label, disabled, variant } = getCartButtonState({
          user,
          inCart,
          added,
          ctaLabel,
        });
        return (
          <article key={item.id} className={styles.card}>
            <div className={styles.badge}>{item.tag}</div>
            <div className={styles.imageWrap} onClick={() => handleProductClick(item)}>
              <img src={item.image} alt={item.name} className={styles.image} />
            </div>
            <div className={styles.body}>
              <h3 className={styles.name} onClick={() => handleProductClick(item)}>{item.name}</h3>
              <p className={styles.price}>{item.price}</p>
              <p className={styles.rating}>⭐ {item.rating.toFixed(1)}</p>
              <button
                className={`${styles.cta} ${added ? styles.added : ''} ${inCart ? styles.inCart : ''}`}
                onClick={() => onAddToCart(item)}
                disabled={added}
              >
                {added ? '✓ Added!' : inCart ? 'Added to Cart' : ctaLabel}
              </button>
            </div>
          </article>
        )
      })}
    </div>
    
  )
}
