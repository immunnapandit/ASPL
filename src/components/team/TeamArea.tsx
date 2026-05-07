import { Link } from 'react-router-dom';

const teamMembers = [
  {
    name: 'Saroj Pandit',
    designation: 'Director & Founder',
    image: '/assets/img/team/Saroj.png',
    linkedin: 'https://in.linkedin.com/in/sarojpandit',
  },
  {
    name: 'Shalini Verma',
    designation: 'Director',
    image: '/assets/img/team/Shalini.png',
    linkedin: 'https://in.linkedin.com/in/shalinivermaaspl',
  },
  {
    name: 'Atul Verma',
    designation: 'Managing Director',
    image: '/assets/img/team/Atul.png',
    linkedin: 'https://in.linkedin.com/in/atulk-verma',
  },
  {
    name: 'Umesh Prajapati',
    designation: 'Solution Architect',
    image: '/assets/img/team/Umesh.png',
    linkedin: 'https://in.linkedin.com/in/umeshprajapatiaspl',
  },
  {
    name: 'Sangeeta Verma',
    designation: 'Senior Consultant',
    image: '/assets/img/team/Sangeeta.jpg',
    linkedin: 'https://in.linkedin.com/in/sangeetavermasingh',
  },
] as const;

export default function TeamArea() {
  return (
    <div className="tv-team-area pt-130 pb-130">
      <div className="container">
        <div className="row">
          {teamMembers.map((member, index) => (
            <div
              className="col-xl-3 col-lg-3 col-md-6 wow itfadeUp"
              data-wow-duration=".9s"
              data-wow-delay={`${0.3 + index * 0.2}s`}
              key={member.linkedin}
            >
              <div className="single-team-item style-2 mb-30">
                <img src={member.image} alt={member.name} />
                <div className="team-social">
                  <a
                    href={member.linkedin}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={`${member.name} LinkedIn profile`}
                  >
                    <i className="fa-brands fa-linkedin-in"></i>
                  </a>
                </div>
                <div className="team-content d-flex justify-content-between align-items-center">
                  <div>
                    <h2 className="team-name">
                      <Link to="/team-details">{member.name}</Link>
                    </h2>
                    <p className="designation">{member.designation}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
