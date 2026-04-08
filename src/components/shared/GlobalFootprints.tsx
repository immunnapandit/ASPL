import { useEffect, useState, type CSSProperties } from 'react';

const globalLocations = [
  {
    id: 'india',
    title: 'India',
    address: 'Logix Technova, A-522, Tower-A',
    email: 'info@atisunya.co',
    phone: '(+91) 82-9915-6511',
    thumbClassName: 'is-ahmedabad',
    thumbSrc: '/assets/img/slider/India.jpg',
    mapSrc: 'https://www.google.com/maps?q=Logix%20Technova%20A-522%20Tower-A%20India&z=12&output=embed',
    mapLabel: 'India',
    flagClassName: 'is-india',
    flagText: 'IND',
    markerPosition: { x: '76%', y: '53%' }
  },
  {
    id: 'Aus',
    title: 'Australia',
    address:
      'Level 40/140 William St, Melbourne VIC 300',
    email: 'info@atisunya.co',
    phone: 'AUS: (+61) 478006757',
    thumbClassName: 'is-leeds',
    thumbSrc: '/assets/img/slider/Australia.jpg',
    mapSrc:
      'https://www.google.com/maps?q=2%2F2%20Crescent%20Road%20Auckland%20New%20Zealand&z=10&output=embed',
    mapLabel: 'Auckland / Melbourne',
    flagClassName: 'is-anz',
    flagText: 'ANZ',
    markerPosition: { x: '89%', y: '80%' }
  },
  {
    id: 'anz',
    title: 'ANZ',
    address:
      'NZ: S & A Solutions, 2/2 Crescent Road, Auckland, New Zealand | AUS: Level 40/140 William St, Melbourne VIC 300',
    email: 'info@atisunya.co',
    phone: 'NZ: (+64) 220937158',
    thumbClassName: 'is-leeds',
    thumbSrc: '/assets/img/slider/ANZ.png',
    mapSrc:
      'https://www.google.com/maps?q=2%2F2%20Crescent%20Road%20Auckland%20New%20Zealand&z=10&output=embed',
    mapLabel: 'Auckland / Melbourne',
    flagClassName: 'is-anz',
    flagText: 'ANZ',
    markerPosition: { x: '89%', y: '80%' }
  },
  {
    id: 'germany',
    title: 'Germany',
    address: 'Heidestrasse 17 Mitte, 10557 Berlin, Germany',
    email: 'info@atisunya.co',
    phone: '(+49) 17890 84425',
    thumbClassName: 'is-new-jersey',
    thumbSrc: '/assets/img/slider/Germany.jpg',
    mapSrc: 'https://www.google.com/maps?q=Heidestra%C3%9Fe%2017%20Mitte%2010557%20Berlin%20Germany&z=12&output=embed',
    mapLabel: 'Berlin',
    flagClassName: 'is-germany',
    flagText: 'DE',
    markerPosition: { x: '59%', y: '37%' }
  }
];

export default function GlobalFootprints({ className = '' }: { className?: string }) {
  const [activeLocationId, setActiveLocationId] = useState(globalLocations[0].id);
  const [displayedLocationId, setDisplayedLocationId] = useState(globalLocations[0].id);
  const [isMapLoaded, setIsMapLoaded] = useState(false);

  const activeLocation =
    globalLocations.find((location) => location.id === activeLocationId) ??
    globalLocations[0];
  const displayedLocation =
    globalLocations.find((location) => location.id === displayedLocationId) ??
    globalLocations[0];

  useEffect(() => {
    if (activeLocationId === displayedLocationId) {
      return;
    }

    const timer = window.setTimeout(() => {
      setDisplayedLocationId(activeLocationId);
      setIsMapLoaded(false);
    }, 420);

    return () => window.clearTimeout(timer);
  }, [activeLocationId, displayedLocationId]);

  return (
    <div className={`tv-about2-footprints ${className}`.trim()}>
      <div className="tv-section-title-box text-center mb-50">
        <h4 className="tv-section-title">Our Global Footprints</h4>
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
                          <i className="fa-solid fa-envelope"></i>
                        </span>
                        <span className="tv-about2-location-text">{location.email}</span>
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
            <div className={`tv-about2-map-frame ${isMapLoaded ? 'is-loaded' : ''}`}>
              <iframe
                key={displayedLocation.id}
                title={`${displayedLocation.title} map`}
                src={displayedLocation.mapSrc}
                allowFullScreen={true}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                onLoad={() => setIsMapLoaded(true)}
              ></iframe>
            </div>

            <div className={`tv-about2-map-overlay ${isMapLoaded ? 'is-hidden' : ''}`}></div>
            <div className="tv-about2-map-flight">
              <i className="fa-solid fa-location-arrow"></i>
            </div>

            <div className="tv-about2-map-badge">
              <div className={`tv-about2-map-flag ${activeLocation.flagClassName}`}>
                {activeLocation.flagText}
              </div>
              <span>{activeLocation.mapLabel}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
