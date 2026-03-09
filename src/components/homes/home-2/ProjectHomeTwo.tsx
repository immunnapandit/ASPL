import { Link } from 'react-router-dom';
import VideoPopup from '../../../modal/VideoPopup';
import project_data from '../../../data/project-data';

interface Project {
  image: string;
  category: string;
  title: string;
  link?: string;
  animation: {
    duration: number;
    delay: number;
  };
  colClass: string;
}

const ProjectItem = ({ project }: { project: Project }) => {
  const { image, category, title, animation, colClass } = project;

  return (
    <div
      className={colClass}
      data-wow-duration={Number(animation.duration)}
      data-wow-delay={Number(animation.delay)}
    >
      <div
        className={`tv-single-project-item2 ${colClass.includes('col-12') ? '' : 'mb-30'}`}
      >
        <img src={image} alt={title} />
        <div className="project-content">
          <div>
            <p>{category}</p>
            <h6>
              <a href={project.link}>{title}</a>
            </h6>
          </div>
          <div>
            <span className="video-icon">
              <VideoPopup>
                <a
                  className="popup-video ripple-white"
                  style={{ cursor: 'pointer' }}
                >
                  <svg
                    width="15"
                    height="16"
                    viewBox="0 0 15 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M13.2457 6.26939C14.5763 7.03972 14.5763 8.96076 13.2457 9.73109L3.59037 15.321C2.25704 16.0929 0.588294 15.1308 0.588294 13.5902L0.588295 2.4103C0.588295 0.869635 2.25704 -0.0924798 3.59037 0.67945L13.2457 6.26939Z"
                      fill="white"
                    />
                  </svg>
                </a>
              </VideoPopup>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default function ProjectHomeTwo() {
  const firstFourProjects = project_data.slice(0, 4);
  const lastProject = project_data[4];

  return (
    <div className="tv-project-area2 pt-130 pb-130">
      <div className="container">
        <div className="row align-items-end mb-60">
          <div className="col-xl-5 col-lg-5">
            <div className="tv-section-title-box">
              <span className="tv-section-subtitle tv-spltv-text tv-spltv-in-right">
                Our Project
              </span>
              <h4 className="tv-section-title pb-20 tv-spltv-text tv-spltv-in-right">
                Our latest project triumphs
              </h4>
            </div>
          </div>
          <div className="col-xl-7 col-lg-7 text-end">
            <div
              className="tv-fade-anim button"
              data-fade-from="top"
              data-ease="bounce"
              data-delay=".5s"
            >
              <Link to="/project" className="tv-btn-primary p-relative">
                <span className="btn-wrap">
                  <span className="btn-text1">Know More</span>
                  <span className="btn-text2">Know More</span>
                </span>
              </Link>
            </div>
          </div>
        </div>

        <div className="row">
          {firstFourProjects.map((project) => (
            <ProjectItem key={project.id} project={project} />
          ))}
        </div>

        <div className="row">
          <ProjectItem project={lastProject} />
        </div>
      </div>
    </div>
  );
}
