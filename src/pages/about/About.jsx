import React from 'react';
import styles from './About.module.css';

const About = () => {
  const teamMembers = [
    { 
      name: 'Aman Gupta', 
      role: 'Co-Founder & CEO', 
      image: '/images/aman-gupta.jpg',
      bio: 'Visionary behind India\'s #1 audio brand'
    },
    { 
      name: 'Sameer Mehta', 
      role: 'Co-Founder & COO', 
      image: '/images/sameer-mehta.jpg',
      bio: 'Scaling operations across 10M+ customers'
    },
    { 
      name: 'Your Name', 
      role: 'Lead Developer', 
      image: '/images/developer.jpg',
      bio: 'Building the next generation audio experiences'
    }
  ];

  const achievements = [
    'India\'s No.1 Audio Brand (2020-2024)',
    'World\'s #2 Wearable Brand by shipments',
    'IPL Official Audio Partner',
    '10M+ Happy Customers',
    '₹5000+ Cr Revenue Milestone'
  ];

  return (
    <div className={styles.aboutPage}>
      {/* Hero Section */}
      <section className={styles.heroSection}>
        <div className={styles.heroOverlay}>
          <div className={styles.heroContent}>
            <h1 className={styles.heroTitle}>We Set Sail in 2016</h1>
            <p className={styles.heroSubtitle}>
              Creating audio products that make Indians groove louder than ever before
            </p>
            <button className={styles.ctaButton}>
              Explore Our Journey
            </button>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className={styles.storySection}>
        <div className={styles.container}>
          <div className={styles.storyHeader}>
            <h2 className={styles.sectionTitle}>Our Voyage</h2>
            <p className={styles.sectionSubtitle}>
              From a simple idea in a Mumbai garage to India's favorite audio lifestyle brand [web:1]
            </p>
          </div>
          
          <div className={styles.storyContent}>
            <div>
              <h3 className={styles.storyTitle}>The boAthead Tribe</h3>
              <p className={styles.storyText}>
                boAtheads are free-spirited Indians who love to groove, stay on the move, 
                and chase their goals relentlessly. Music is our fuel, ambition is our compass.
              </p>
              <p className={styles.storyText}>
                We're not just building products - we're creating a lifestyle that resonates 
                with the youth of India [web:1]
              </p>
              
              <div className={styles.achievementsGrid}>
                {achievements.map((achievement, index) => (
                  <div key={index} className={styles.achievementCard}>
                    <span className={styles.achievementIcon}>🎯</span>
                    <p className={styles.achievementText}>{achievement}</p>
                  </div>
                ))}
              </div>
            </div>
            
            <div className={styles.storyImage}>
              <div className={styles.floatingWave}>🌊</div>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className={styles.teamSection}>
        <div className={styles.container}>
          <div className={styles.teamHeader}>
            <h2 className={styles.sectionTitle}>Meet the Crew</h2>
            <p className={styles.sectionSubtitle}>
              The passionate team steering the boAt ship
            </p>
          </div>
          
          <div className={styles.teamGrid}>
            {teamMembers.map((member, index) => (
              <div key={index} className={styles.teamCard}>
                <div className={styles.teamAvatar}>
                  <img 
                    src={member.image} 
                    alt={member.name}
                    loading="lazy"
                  />
                </div>
                <h4 className={styles.teamName}>{member.name}</h4>
                <p className={styles.teamRole}>{member.role}</p>
                <p className={styles.storyText}>{member.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className={styles.ctaSection}>
        <div className={styles.container}>
          <div className={styles.ctaContent}>
            <h2 className={styles.ctaTitle}>Ready to Join the Voyage?</h2>
            <p className={styles.ctaSubtitle}>
              Be part of the boAthead tribe and experience sound like never before.
              Your groove starts here.
            </p>
            <div className={styles.ctaButtons}>
              <button className={styles.btnPrimary}>
                Shop Now
              </button>
              <button className={styles.btnSecondary}>
                Our Full Story
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
