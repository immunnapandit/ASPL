import { useEffect, useState, type CSSProperties } from 'react';

const globalLocations = [
  {
    id: 'india',
    title: 'India, Noida',
    address: 'A-522, Tower-A, Logix Technova, Sec-132, Noida',
    phone: '(+91) 82-9915-6511, (+91) 80-8181-0673',
    thumbClassName: 'is-ahmedabad',
    thumbSrc: '/assets/img/slider/India.jpg',
    mapSrc: 'https://www.google.com/maps?q=AtiSunya%20Private%20Limited%2C%20LOGIX%20TECHNOVA%2C%20A522%2C%20Block%20B%2C%20Sector%20132%2C%20Noida%2C%20Uttar%20Pradesh%20201304&z=17&output=embed',
    mapCountry: 'India',
    mapLabel: 'Noida',
    flagSrc: 'https://flagcdn.com/w160/in.png',
    markerPosition: { x: '57%', y: '52%' }
  },
  {
    id: 'Aus',
    title: 'Australia, Melbourne',
    address: 'Level 40/140 William St, Melbourne VIC 300',
    phone: 'AUS: (+61) 478006757',
    thumbClassName: 'is-leeds',
    thumbSrc: '/assets/img/slider/Australia.jpg',
    mapSrc: 'https://www.google.com/maps?q=Melbourne%2C%20Australia&z=10&output=embed',
    mapCountry: 'Australia',
    mapLabel: 'Melbourne',
    flagSrc: 'https://flagcdn.com/w160/au.png',
    markerPosition: { x: '61%', y: '63%' }
  },
  {
    id: 'anz',
    title: 'ANZ',
    address:
      'NZ: S & A Solutions, 2/2 Crescent Road, Auckland, New Zealand | AUS: Level 40/140 William St, Melbourne VIC 300',
    phone: 'NZ: (+64) 220937158',
    thumbClassName: 'is-leeds',
    thumbSrc: '/assets/img/slider/ANZ.png',
    mapSrc: 'https://www.google.com/maps?q=Auckland%2C%20New%20Zealand&z=10&output=embed',
    mapCountry: 'New Zealand',
    mapLabel: 'Auckland',
    flagSrc: 'https://flagcdn.com/w160/nz.png',
    markerPosition: { x: '64%', y: '54%' }
  },
  {
    id: 'germany',
    title: 'Germany, Berlin',
    address: 'Heidestrasse 17 Mitte, 10557 Berlin, Germany',
    phone: '(+49) 17890 84425',
    thumbClassName: 'is-new-jersey',
    thumbSrc: '/assets/img/slider/Germany.jpg',
    mapSrc: 'https://www.google.com/maps?q=Berlin%2C%20Germany&z=10&output=embed',
    mapCountry: 'Germany',
    mapLabel: 'Berlin',
    flagSrc: 'https://flagcdn.com/w160/de.png',
    markerPosition: { x: '54%', y: '47%' }
  }
];

export default function GlobalFootprints({ className = '' }: { className?: string }) {
  const [activeLocationId, setActiveLocationId] = useState(globalLocations[0].id);
  const [previousLocationId, setPreviousLocationId] = useState<string | null>(null);
  const [slideDirection, setSlideDirection] = useState<'forward' | 'backward'>('forward');
  const [loadedMapIds, setLoadedMapIds] = useState<string[]>([]);

  const activeLocation =
    globalLocations.find((location) => location.id === activeLocationId) ??
    globalLocations[0];
  const isActiveMapLoaded = loadedMapIds.includes(activeLocation.id);

  useEffect(() => {
    if (!previousLocationId) {
      return;
    }

    const timer = window.setTimeout(() => {
      setPreviousLocationId(null);
    }, 900);

    return () => window.clearTimeout(timer);
  }, [previousLocationId]);

  return (
    <div className={`tv-about2-footprints ${className}`.trim()}>
      <div className="tv-section-title-box text-center mb-50">
        <h4 className="tv-section-title">Our Global Presence</h4>
      </div>

      <div className="row g-4 align-items-stretch">
        <div className="col-xl-5 col-lg-6">
          <div className="tv-about2-footprints-list tv-about2-footprints-list--compact">
            {globalLocations.map((location) => {
              const isActive = location.id === activeLocation.id;

              return (
                <button
                  key={location.id}
                  type="button"
                  className={`tv-about2-location-card ${isActive ? 'is-active' : ''}`}
                  onClick={() => {
                    if (location.id !== activeLocationId) {
                      const currentIndex = globalLocations.findIndex(
                        (item) => item.id === activeLocationId
                      );
                      const nextIndex = globalLocations.findIndex(
                        (item) => item.id === location.id
                      );
                      setSlideDirection(nextIndex > currentIndex ? 'forward' : 'backward');
                      setPreviousLocationId(activeLocationId);
                      setActiveLocationId(location.id);
                    }
                  }}
                >
                  <div className={`tv-about2-location-thumb ${location.thumbClassName}`}>
                    <img src={location.thumbSrc} alt={location.title} />
                  </div>
                  <div className="tv-about2-location-content">
                    <h5>{location.title}</h5>
                    <ul>
                      <li>
                        <span className="tv-about2-location-icon">
                          <i className="fa-solid fa-location-dot"></i>
                        </span>
                        <span className="tv-about2-location-text tv-about2-location-text--address">
                          {location.address}
                        </span>
                      </li>
                      <li>
                        <span className="tv-about2-location-icon">
                          <i className="fa-solid fa-phone"></i>
                        </span>
                        <span className="tv-about2-location-text tv-about2-location-text--phone">
                          {location.phone}
                        </span>
                      </li>
                    </ul>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        <div className="col-xl-7 col-lg-6">
          <div
            className="tv-about2-map-wrap tv-about2-map-wrap--compact"
            style={
              {
                '--tv-badge-x': activeLocation.markerPosition.x,
                '--tv-badge-y': activeLocation.markerPosition.y
              } as CSSProperties
            }
          >
            {globalLocations.map((location) => {
              const isActiveMap = location.id === activeLocation.id;
              const isPreviousMap = location.id === previousLocationId;
              const isLoaded = loadedMapIds.includes(location.id);

              return (
                <div
                  key={location.id}
                  className={`tv-about2-map-frame ${isActiveMap ? 'is-active' : ''} ${isPreviousMap ? 'is-previous' : ''} ${isLoaded ? 'is-loaded' : ''} ${slideDirection === 'forward' ? 'is-forward' : 'is-backward'}`}
                >
                  <iframe
                    title={`${location.title} map`}
                    src={location.mapSrc}
                    allowFullScreen={true}
                    loading="eager"
                    referrerPolicy="no-referrer-when-downgrade"
                    onLoad={() => {
                      setLoadedMapIds((prev) =>
                        prev.includes(location.id) ? prev : [...prev, location.id]
                      );
                    }}
                  ></iframe>
                </div>
              );
            })}

            <div className={`tv-about2-map-overlay ${isActiveMapLoaded ? 'is-hidden' : ''}`}></div>
            <div className="tv-about2-map-flight">
              <i className="fa-solid fa-location-arrow"></i>
            </div>

            <div className="tv-about2-map-badge">
              <div className="tv-about2-map-flag">
                <img
                  src={activeLocation.flagSrc}
                  alt={`${activeLocation.mapCountry} flag`}
                />
              </div>
              <span className="tv-about2-map-country">{activeLocation.mapCountry}</span>
              <small className="tv-about2-map-city">{activeLocation.mapLabel}</small>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
