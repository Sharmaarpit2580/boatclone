import React, { useEffect, useMemo, useState } from 'react';
import styles from './Banner.module.css';

import slider1 from '../../assets/slider1.png';
import slider2 from '../../assets/slider2.png';
import slider3 from '../../assets/slider3.png';
import slider4 from '../../assets/slider4.png';

const slides = [
  { id: 1, img: slider1, alt: 'Boat slide 1' },
  { id: 2, img: slider2, alt: 'Boat slide 2' },
  { id: 3, img: slider3, alt: 'Boat slide 3' },
  { id: 4, img: slider4, alt: 'Boat slide 4' },
];

export default function Banner() {
  const [index, setIndex] = useState(0);
  const total = slides.length;
  const next = () => setIndex(i => (i + 1) % total);
  const prev = () => setIndex(i => (i - 1 + total) % total);

  // memoize to keep interval stable
  const delay = useMemo(() => 4000, []);
  useEffect(() => {
    const id = setInterval(next, delay);
    return () => clearInterval(id);
  }, [delay, total]);

  return (
    <section className={styles.hero}>
      <div className={styles.viewport}>
        <div
          className={styles.track}
          style={{ transform: `translateX(-${index * 100}%)` }}
        >
          {slides.map(slide => (
            <div className={styles.slide} key={slide.id}>
              <img src={slide.img} alt={slide.alt} className={styles.image} />
            </div>
          ))}
        </div>

        <button className={`${styles.arrow} ${styles.left}`} onClick={prev} aria-label="Previous slide">
          ‹
        </button>
        <button className={`${styles.arrow} ${styles.right}`} onClick={next} aria-label="Next slide">
          ›
        </button>

        <div className={styles.dots}>
          {slides.map((s, i) => (
            <button
              key={s.id}
              className={`${styles.dot} ${i === index ? styles.active : ''}`}
              onClick={() => setIndex(i)}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}