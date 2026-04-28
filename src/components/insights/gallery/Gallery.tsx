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

const galleryImages: GalleryImage[] = [
  {
    localSrc: '/assets/img/slider/Businees.jpg',
    publicId: 'aspl/gallery/business-consulting',
    alt: 'AtiSunya business consulting'
  },
  {
    localSrc: '/assets/img/slider/financilabuilding.jpg',
    publicId: 'aspl/gallery/corporate-office-building',
    alt: 'Corporate office building'
  },
  {
    localSrc: '/assets/img/slider/Cloud1.jpg',
    publicId: 'aspl/gallery/cloud-consulting-workspace',
    alt: 'Cloud consulting workspace'
  },
  {
    localSrc: '/assets/img/slider/Cloud2.jpg',
    publicId: 'aspl/gallery/cloud-infrastructure-planning',
    alt: 'Cloud infrastructure planning'
  },
  {
    localSrc: '/assets/img/service/Consulting.png',
    publicId: 'aspl/gallery/professional-consulting-team',
    alt: 'Professional consulting team'
  },
  {
    localSrc: '/assets/img/service/App-development.png',
    publicId: 'aspl/gallery/application-development-workspace',
    alt: 'Application development workspace'
  },
  {
    localSrc: '/assets/img/service/analytics.png',
    publicId: 'aspl/gallery/business-analytics-dashboard',
    alt: 'Business analytics dashboard'
  },
  {
    localSrc: '/assets/img/service/Support-management.png',
    publicId: 'aspl/gallery/support-managed-services',
    alt: 'Support and managed services'
  },
  {
    localSrc: '/assets/img/service/MicrosoftD365.jpg',
    publicId: 'aspl/gallery/microsoft-dynamics-365-workspace',
    alt: 'Microsoft Dynamics 365 workspace'
  },
  {
    localSrc: '/assets/img/service/Training.png',
    publicId: 'aspl/gallery/professional-training-program',
    alt: 'Professional training program'
  },
  {
    localSrc: '/assets/img/slider/slider-1-1.jpg',
    publicId: 'aspl/gallery/business-transformation-session',
    alt: 'Business transformation session'
  },
  {
    localSrc: '/assets/img/slider/slider-1-2.jpg',
    publicId: 'aspl/gallery/technology-consulting-discussion',
    alt: 'Technology consulting discussion'
  },
  {
    localSrc: '/assets/img/project/project-4-1.png',
    publicId: 'aspl/gallery/project-showcase',
    alt: 'Project showcase'
  },
  {
    localSrc: '/assets/img/project/project-4-2.png',
    publicId: 'aspl/gallery/project-delivery-showcase',
    alt: 'Project delivery showcase'
  },
  {
    localSrc: '/assets/img/project/project-4-3.png',
    publicId: 'aspl/gallery/digital-project-showcase',
    alt: 'Digital project showcase'
  }
];

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
