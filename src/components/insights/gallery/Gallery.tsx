import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Lightbox from 'yet-another-react-lightbox';
import 'yet-another-react-lightbox/styles.css';

interface GalleryImage {
  localSrc: string;
  publicId: string;
  alt: string;
}

const IMAGES_PER_PAGE = 9;
const CLOUDINARY_CLOUD_NAME = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME || '';

function getGalleryImageUrl(image: GalleryImage) {
  if (!CLOUDINARY_CLOUD_NAME) {
    return image.localSrc;
  }

  return `https://res.cloudinary.com/${CLOUDINARY_CLOUD_NAME}/image/upload/f_auto,q_auto,c_fill,w_900,h_760/${image.publicId}`;
}

const EVENT_PHOTO_COUNT = 27;

const galleryImages: GalleryImage[] = Array.from({ length: EVENT_PHOTO_COUNT }, (_, i) => {
  const index = i + 1;
  return {
    localSrc: `/assets/img/event/event-${index}.jpg`,
    publicId: `aspl/gallery/event-${index}_jpg`,
    alt: `AtiSunya company event photo ${index}`
  };
});

export default function Gallery() {
  const [activeImage, setActiveImage] = useState(-1);
  const [currentPage, setCurrentPage] = useState(0);
  const galleryItems = galleryImages.map((image) => ({
    ...image,
    src: getGalleryImageUrl(image)
  }));
  const slides = galleryItems.map((image) => ({ src: image.src, alt: image.alt }));
  const totalPages = Math.ceil(galleryImages.length / IMAGES_PER_PAGE);
  const pageStart = currentPage * IMAGES_PER_PAGE;
  const visibleImages = galleryItems.slice(pageStart, pageStart + IMAGES_PER_PAGE);
  const isFirstPage = currentPage === 0;
  const isLastPage = currentPage === totalPages - 1;

  const goToPreviousPage = () => {
    setCurrentPage((page) => Math.max(page - 1, 0));
  };

  const goToNextPage = () => {
    setCurrentPage((page) => Math.min(page + 1, totalPages - 1));
  };

  return (
    <section className="tv-insights-page tv-gallery-page" aria-label="Company gallery">
      <div className="container">
        <div className="tv-gallery-grid">
          {visibleImages.map((image, index) => (
            <button
              key={image.src}
              type="button"
              className="tv-gallery-image"
              aria-label={`Open gallery image ${pageStart + index + 1}`}
              onClick={() => setActiveImage(pageStart + index)}
            >
              <img
                src={image.src}
                alt={image.alt}
                loading={index < 3 ? 'eager' : 'lazy'}
                decoding="async"
                onError={(event) => {
                  event.currentTarget.src = image.localSrc;
                }}
              />
            </button>
          ))}
        </div>

        {totalPages > 1 ? (
          <div className="tv-gallery-pagination" aria-label="Gallery pagination">
            <button
              type="button"
              className="tv-gallery-page-button"
              onClick={goToPreviousPage}
              disabled={isFirstPage}
              aria-label="Show previous gallery images"
            >
              <ChevronLeft size={20} aria-hidden="true" />
              <span>Previous</span>
            </button>
            <span className="tv-gallery-page-count">
              Page {currentPage + 1} of {totalPages}
            </span>
            <button
              type="button"
              className="tv-gallery-page-button"
              onClick={goToNextPage}
              disabled={isLastPage}
              aria-label="Show next gallery images"
            >
              <span>Next</span>
              <ChevronRight size={20} aria-hidden="true" />
            </button>
          </div>
        ) : null}
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
