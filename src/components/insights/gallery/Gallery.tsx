import { useState } from 'react';
import Lightbox from 'yet-another-react-lightbox';
import 'yet-another-react-lightbox/styles.css';

interface GalleryImage {
  src: string;
  alt: string;
  size?: 'featured' | 'wide' | 'tall' | 'medium';
}

const galleryImages: GalleryImage[] = [
  {
    src: '/assets/img/slider/Businees.jpg',
    alt: 'AtiSunya business consulting',
    size: 'featured'
  },
  {
    src: '/assets/img/slider/financilabuilding.jpg',
    alt: 'Corporate office building',
    size: 'tall'
  },
  {
    src: '/assets/img/slider/Cloud1.jpg',
    alt: 'Cloud consulting workspace'
  },
  {
    src: '/assets/img/slider/Cloud2.jpg',
    alt: 'Cloud infrastructure planning'
  },
  {
    src: '/assets/img/service/Consulting.png',
    alt: 'Professional consulting team',
    size: 'wide'
  },
  {
    src: '/assets/img/service/App-development.png',
    alt: 'Application development workspace',
    size: 'medium'
  },
  {
    src: '/assets/img/service/analytics.png',
    alt: 'Business analytics dashboard',
    size: 'medium'
  },
  {
    src: '/assets/img/service/Support-management.png',
    alt: 'Support and managed services',
    size: 'wide'
  },
  {
    src: '/assets/img/service/MicrosoftD365.jpg',
    alt: 'Microsoft Dynamics 365 workspace'
  },
  {
    src: '/assets/img/service/Training.png',
    alt: 'Professional training program'
  },
  {
    src: '/assets/img/slider/slider-1-1.jpg',
    alt: 'Business transformation session',
    size: 'medium'
  },
  {
    src: '/assets/img/slider/slider-1-2.jpg',
    alt: 'Technology consulting discussion',
    size: 'medium'
  },
  {
    src: '/assets/img/project/project-4-1.png',
    alt: 'Project showcase'
  },
  {
    src: '/assets/img/project/project-4-2.png',
    alt: 'Project delivery showcase',
    size: 'wide'
  },
  {
    src: '/assets/img/project/project-4-3.png',
    alt: 'Digital project showcase',
    size: 'tall'
  }
];

export default function Gallery() {
  const [activeImage, setActiveImage] = useState(-1);
  const slides = galleryImages.map((image) => ({ src: image.src, alt: image.alt }));

  return (
    <section className="tv-insights-page tv-gallery-page" aria-label="Company gallery">
      <div className="container">
        <div className="tv-gallery-grid">
          {galleryImages.map((image, index) => (
            <button
              key={image.src}
              type="button"
              className={`tv-gallery-image ${image.size ? `is-${image.size}` : ''}`}
              aria-label={`Open gallery image ${index + 1}`}
              onClick={() => setActiveImage(index)}
            >
              <img
                src={image.src}
                alt={image.alt}
                loading={index < 3 ? 'eager' : 'lazy'}
                decoding="async"
              />
            </button>
          ))}
        </div>
      </div>

      <Lightbox
        open={activeImage >= 0}
        close={() => setActiveImage(-1)}
        index={activeImage}
        slides={slides}
      />
    </section>
  );
}
