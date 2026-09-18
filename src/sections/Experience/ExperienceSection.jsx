import React, { useState, useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import styles from './experienceStyles.module.css'
import deepCytesLogo from '../../assets/deepcytes.jpg'
import stallionLogo from '../../assets/TSP.jpg'
import noxAlgologo from '../../assets/noxalgo.jpg'
import smowCodelogo from '../../assets/smowcode.jpeg'
import { FaChevronDown } from 'react-icons/fa'

gsap.registerPlugin(ScrollTrigger)

const CountdownTimer = ({ targetDate }) => {
  const calculateDaysLeft = () => {
    const target = new Date(targetDate).getTime()
    const now = new Date().getTime()
    const diff = target - now

    if (diff <= 0) {
      return { isExpired: true, days: 0 }
    }
    return {
      isExpired: false,
      days: Math.ceil(diff / (1000 * 60 * 60 * 24)),
    }
  }

  const [status, setStatus] = useState(calculateDaysLeft)

  useEffect(() => {
    const timer = setInterval(() => {
      setStatus(calculateDaysLeft())
    }, 60000)
    return () => clearInterval(timer)
  }, [targetDate])

  return (
    <div className={styles.subtleTimer}>
      <span className={status.isExpired ? styles.activeDot : styles.pulseDot} />
      <span className={styles.timerText}>
        {status.isExpired ? 'Internship in Progress' : `${status.days} days remaining`}
      </span>
      <span className={styles.timerTarget}>
        {status.isExpired ? '// Pune, India' : 'most prolly'}
      </span>
    </div>
  )
}

const ExperienceCard = ({ exp, index, isExpanded, onToggle }) => {
  const cardRef = useRef(null)
  const hasPoints = exp.desc && exp.desc.length > 0
  
  // Sync state changes to CSS variables immediately (even without mouse movement)
  useEffect(() => {
    if (!cardRef.current) return;
    
    if (isExpanded && hasPoints) {
        // Reset tilt and scale up
        cardRef.current.style.setProperty('--x-rot', '0deg');
        cardRef.current.style.setProperty('--y-rot', '0deg');
        cardRef.current.style.setProperty('--scale', '1.02');
    } else {
        // Reset to neutral if not hovering, or handleMouseMove will pick up
        // We set scale back to 1.
        cardRef.current.style.setProperty('--scale', '1');
        cardRef.current.style.setProperty('--x-rot', '0deg');
        cardRef.current.style.setProperty('--y-rot', '0deg');
    }
  }, [isExpanded, hasPoints]);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    // Calculate percentage position
    const xPct = x / rect.width;
    const yPct = y / rect.height;
    
    // Calculate rotation (max +/- 5 degrees)
    const xRot = (0.5 - yPct) * 10;
    const yRot = (xPct - 0.5) * 10;
    
    if (isExpanded && hasPoints) {
        cardRef.current.style.setProperty('--x-rot', '0deg');
        cardRef.current.style.setProperty('--y-rot', '0deg');
        cardRef.current.style.setProperty('--scale', '1.02');
    } else {
        cardRef.current.style.setProperty('--x-rot', `${xRot}deg`);
        cardRef.current.style.setProperty('--y-rot', `${yRot}deg`);
        cardRef.current.style.setProperty('--scale', '1');
    }

    cardRef.current.style.setProperty('--mouse-x', `${x}px`);
    cardRef.current.style.setProperty('--mouse-y', `${y}px`);
  };

  const handleMouseLeave = () => {
    if (!cardRef.current) return;
    
    // Reset rotation smoothly on leave
    cardRef.current.style.setProperty('--x-rot', `0deg`);
    cardRef.current.style.setProperty('--y-rot', `0deg`);
    // Scale follows expanded state
    cardRef.current.style.setProperty('--scale', isExpanded && hasPoints ? '1.02' : '1');
  };

  return (
    <div
      ref={cardRef}
      className={styles.cardWrapper}
      style={{
        zIndex: isExpanded ? 50 : index + 1, // Ensure expanded cards pop above others
        top: `calc(130px + ${index * 50}px)`, 
      }}
      data-aos="fade-up"
      data-aos-delay={index * 100}
    >
      <div 
        className={`${styles.card} ${exp.isUpcoming ? styles.mysteryCard : ''}`}
        data-expanded={isExpanded && hasPoints}
        data-expandable={hasPoints}
        onClick={hasPoints ? onToggle : undefined}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        <div className={styles.spotlight} />
        <div className={styles.barcode} />
        <div className={styles.watermark}>
          {exp.watermark ? exp.watermark : (exp.company === 'The Stallion Project' ? 'Stallion' : exp.company.split(' ')[0])}
        </div>

        <div className={styles.header}>
          {exp.isMystery ? (
            <div className={styles.mysteryLogo} aria-label="Confidential Company">
              <span className={styles.mysteryQuestionMark}>?</span>
            </div>
          ) : (
            <img src={exp.logo} alt={`${exp.company} Logo`} className={styles.logo} />
          )}
          <div className={styles.titleArea}>
            <h3 className={styles.company}>{exp.company}</h3>
            <h4 className={styles.role}>{exp.role}</h4>
          </div>
          {hasPoints && <FaChevronDown className={styles.arrowIcon} />}
        </div>

        {exp.isUpcoming && (
          <CountdownTimer targetDate={exp.targetDate} />
        )}

        <div className={styles.metaInfo}>
           <span className={styles.idBadge}>ID: {exp.idBadge}</span>
           <span className={styles.internshipType}>{exp.internshipType}</span>
           <span className={styles.duration}>{exp.date}</span>
        </div>

        {hasPoints && (
          <div className={`${styles.content} ${isExpanded ? styles.expandedContent : ''}`}>
            <ul className={styles.bulletList}>
              {exp.desc.map((point, i) => (
                <li key={i} className={styles.bulletItem}>
                  {point}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  )
}

function Experience() {
  const [expandedId, setExpandedId] = useState(null)
  const containerRef = useRef(null)

  const toggleExpand = (id) => {
    setExpandedId(expandedId === id ? null : id)
  }

  const experiences = [
    {
      id: 0,
      company: 'MNC @ Pune',
      role: 'Upcoming Full Time Intern',
      date: 'Starting Jan 2027',
      logo: null,
      isMystery: true,
      isUpcoming: true,
      targetDate: '2027-01-01T00:00:00',
      idBadge: 'CLASSIFIED',
      watermark: 'CLASSIFIED',
      internshipType: 'Upcoming Full-time Internship',
      desc: [],
    },
    {
      id: 1,
      company: 'SmowCode',
      role: 'Software Developer',
      date: 'Jun 2025 - Jul 2025',
      logo: smowCodelogo,
      idBadge: 'DEV-AI1',
      internshipType: 'Full-time Summer Internship',
      desc: [
        'Engineered on-device object detection deployment pipelines for ESP32-CAM boards, enabling local edge inference for industrial IoT automation without cloud dependency.',
        'Applied post-training int8 quantization and memory optimizations on Edge Impulse models, compressing neural network footprints to fit tight microcontroller RAM/Flash constraints.',
        'Ported trained architectures into optimized C/C++ inference libraries and deployed firmware to physical hardware using the Smow IDE platform for real-time defect verification.',
      ],
    },
    {
      id: 2,
      company: 'NOXALGO',
      role: 'Lead NextJS Developer',
      date: 'Dec 2024 - Feb 2025',
      logo: noxAlgologo,
      idBadge: 'DEV-TL1',
      internshipType: 'Part-time Internship',
      desc: [
        'Led a 7-developer engineering team delivering 3+ responsive client web applications in parallel within a 2-month delivery cycle using Next.js, React, and TypeScript.',
        'Architected modular frontend standards and enforced strict Git workflows (PR reviews, linting, type-safety contracts) to ensure zero merge conflicts across parallel workstreams.',
        'Implemented SSR/SSG rendering strategies and conducted on-page performance audits to optimize Core Web Vitals, reduce TTFB, and boost organic search discoverability.',
        'Spearheaded technical hiring by conducting 8+ technical interviews, assessing architectural thinking, code quality, and problem-solving skills for incoming team members.',
      ],
    },
    {
      id: 3,
      company: 'DeepCytes Cyber Labs',
      role: 'Cybersecurity Analyst/Fellow',
      date: 'Jun 2024 - Dec 2024',
      logo: deepCytesLogo,
      idBadge: 'SEC-OPS',
      internshipType: 'Part-time Sem-long Internship',
      desc: [
        'Developed the DeepCytes OSINT Toolkit using React, Flask, and Django, creating an investigator-facing search and aggregation engine indexing multi-source intelligence feeds.',
        'Directed threat investigation units of up to 22 members, driving end-to-end intelligence gathering and forensic analysis across active cybercrime cases.',
        'Conducted comprehensive digital security posture audits for a national school chain, identifying auth misconfigurations in parent/student portals, mobile token leaks, and exposed PII.',
        'Investigated syndicates running financial pump-and-dump scams, de-anonymizing operators through cross-platform handle correlation, UPI payment trail tracing, and infrastructure fingerprinting.',
        'Authored organizational Standard Operating Procedures (SOPs) for cyber investigations, standardizing digital evidence preservation and audit-ready reporting protocols across teams.',
      ],
    },
    {
      id: 4,
      company: 'The Stallion Project',
      role: 'Frontend Developer',
      date: 'Feb 2024 - April 2024',
      logo: stallionLogo,
      idBadge: 'DEV-FE1',
      internshipType: 'Part-time Internship',
      desc: [
        'Translated Figma design specifications into pixel-perfect, responsive web interfaces using React.js and CSS component architectures.',
        'Built reusable, modular UI components ensuring design system consistency, token alignment, and clean separation of concerns.',
        'Optimized viewport layouts across mobile, tablet, and desktop breakpoints, ensuring seamless multi-device responsiveness and UX flow.',
      ],
    },
  ]

  return (
    <section className={styles.section} id="internships" ref={containerRef}>
      <h2 className="sectionTitle">Experience</h2>

      <div className={styles.cardsContainer}>
        {experiences.map((exp, index) => (
            <ExperienceCard 
                key={exp.id} 
                exp={exp} 
                index={index} 
                isExpanded={expandedId === exp.id}
                onToggle={() => toggleExpand(exp.id)}
            />
        ))}
      </div>
    </section>
  )
}

export default Experience
