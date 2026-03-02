import React, { createContext, useContext, useState, useEffect } from 'react';

export const CMSContext = createContext(null);

// Sample CMS content structure
const sampleContent = {
  'welcome-post': {
    id: 'welcome-post',
    type: 'blog',
    title: 'Welcome to GES Life Feed',
    content: 'We are excited to launch our new GES Life Feed where you can stay updated with all the latest happenings across our educational institutions. From student achievements to campus events, this is your one-stop destination for all GES news.',
    metadata: {
      description: 'Introduction to GES Life Feed',
      keywords: ['ges', 'education', 'news', 'students'],
    },
    author: 'GES Administration',
    publishedAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z',
    status: 'published'
  },
  'academic-excellence': {
    id: 'academic-excellence',
    type: 'blog',
    title: 'Commitment to Academic Excellence',
    content: 'At GES, we maintain the highest standards of academic excellence. Our comprehensive curriculum, experienced faculty, and modern facilities ensure that every student receives quality education that prepares them for future success.',
    metadata: {
      description: 'GES commitment to quality education',
      keywords: ['academic', 'excellence', 'education', 'curriculum'],
    },
    author: 'Dr. Academic Dean',
    publishedAt: '2024-01-02T00:00:00Z',
    updatedAt: '2024-01-02T00:00:00Z',
    status: 'published'
  }
};

export const CMSProvider = ({ children }) => {
  const [content, setContent] = useState({});
  const [institutions, setInstitutions] = useState([
    {
      id: 'ghs',
      name: 'Gombe High School',
      subdomain: 'gombehighschool',
      type: 'high-school',
      location: 'Gombe District, Uganda',
      curriculum: ['National Curriculum', 'Sciences', 'Arts'],
      contact: {
        email: 'info@gombehighschool.ges.ac.ug',
        phone: '+256 700 123 456',
        address: 'Gombe District, Uganda'
      },
      features: ['Science Labs', 'Library', 'Sports Complex']
    },
    {
      id: 'gjs',
      name: 'Gombe Junior School',
      subdomain: 'gombejuniorschool',
      type: 'junior-school',
      location: 'Gombe District, Uganda',
      curriculum: ['Primary Education', 'Foundation Skills'],
      contact: {
        email: 'info@gombejuniorschool.ges.ac.ug',
        phone: '+256 700 123 457',
        address: 'Gombe District, Uganda'
      },
      features: ['Playground', 'Computer Lab', 'Art Studio']
    }
  ]);
  // Academic calendar events state
  const [calendarEvents, setCalendarEvents] = useState([]);

  // Catholic Patron Saint Feast Days
  const catholicSaintDays = [
    // January
    { date: '2026-01-01', title: 'Solemnity of Mary, Mother of God', category: 'cultural', description: 'Holy Day of Obligation celebrating Mary as the Mother of God', location: 'All Catholic Schools' },
    { date: '2026-01-17', title: 'St. Anthony the Great', category: 'cultural', description: 'Feast of St. Anthony, Father of Monasticism', location: 'Chapel' },
    { date: '2026-01-21', title: 'St. Agnes', category: 'cultural', description: 'Virgin and Martyr, Patron Saint of Young Girls', location: 'Chapel' },
    { date: '2026-01-24', title: 'St. Francis de Sales', category: 'cultural', description: 'Doctor of the Church, Patron of Writers and Journalists', location: 'Chapel' },
    { date: '2026-01-25', title: 'Conversion of St. Paul', category: 'cultural', description: 'Feast of St. Paul\'s conversion on the road to Damascus', location: 'Chapel' },
    { date: '2026-01-28', title: 'St. Thomas Aquinas', category: 'cultural', description: 'Doctor of the Church, Patron of Students and Universities', location: 'All Schools' },
    
    // February
    { date: '2026-02-02', title: 'Presentation of the Lord (Candlemas)', category: 'cultural', description: 'Feast commemorating the presentation of Jesus at the Temple', location: 'Chapel' },
    { date: '2026-02-03', title: 'St. Blaise', category: 'cultural', description: 'Bishop and Martyr, Blessing of Throats', location: 'Chapel' },
    { date: '2026-02-05', title: 'St. Agatha', category: 'cultural', description: 'Virgin and Martyr', location: 'Chapel' },
    { date: '2026-02-10', title: 'St. Scholastica', category: 'cultural', description: 'Sister of St. Benedict, Patron of Nuns', location: 'Chapel' },
    { date: '2026-02-14', title: 'St. Cyril and St. Methodius', category: 'cultural', description: 'Apostles to the Slavs, Patrons of Europe', location: 'Chapel' },
    { date: '2026-02-22', title: 'Chair of St. Peter', category: 'cultural', description: 'Feast celebrating the authority given to St. Peter', location: 'Chapel' },
    
    // March
    { date: '2026-03-07', title: 'Sts. Perpetua and Felicity', category: 'cultural', description: 'Martyrs of Carthage', location: 'Chapel' },
    { date: '2026-03-17', title: 'St. Patrick', category: 'cultural', description: 'Patron Saint of Ireland, Apostle who brought Christianity to Ireland', location: 'All Schools' },
    { date: '2026-03-19', title: 'St. Joseph, Spouse of Mary', category: 'cultural', description: 'Solemnity of St. Joseph, Patron of the Universal Church and Workers', location: 'All Catholic Schools' },
    { date: '2026-03-25', title: 'Annunciation of the Lord', category: 'cultural', description: 'Solemnity celebrating the Angel Gabriel\'s announcement to Mary', location: 'Chapel' },
    
    // April
    { date: '2026-04-04', title: 'St. Isidore of Seville', category: 'cultural', description: 'Doctor of the Church, Patron Saint of the Internet', location: 'Chapel' },
    { date: '2026-04-11', title: 'St. Stanislaus', category: 'cultural', description: 'Bishop and Martyr, Patron of Poland', location: 'Chapel' },
    { date: '2026-04-21', title: 'St. Anselm', category: 'cultural', description: 'Doctor of the Church, Father of Scholasticism', location: 'Chapel' },
    { date: '2026-04-23', title: 'St. George', category: 'cultural', description: 'Martyr, Patron Saint of England and Soldiers', location: 'Chapel' },
    { date: '2026-04-25', title: 'St. Mark the Evangelist', category: 'cultural', description: 'Author of the Gospel of Mark', location: 'Chapel' },
    { date: '2026-04-29', title: 'St. Catherine of Siena', category: 'cultural', description: 'Doctor of the Church, Co-Patron of Europe', location: 'Chapel' },
    
    // May
    { date: '2026-05-01', title: 'St. Joseph the Worker', category: 'cultural', description: 'Patron of Workers and Labor', location: 'All Schools' },
    { date: '2026-05-03', title: 'Sts. Philip and James', category: 'cultural', description: 'Apostles of Jesus Christ', location: 'Chapel' },
    { date: '2026-05-14', title: 'St. Matthias', category: 'cultural', description: 'Apostle chosen to replace Judas', location: 'Chapel' },
    { date: '2026-05-25', title: 'St. Bede the Venerable', category: 'cultural', description: 'Doctor of the Church, English monk and scholar', location: 'Chapel' },
    { date: '2026-05-26', title: 'St. Philip Neri', category: 'cultural', description: 'Apostle of Rome, founder of the Oratory', location: 'Chapel' },
    { date: '2026-05-31', title: 'Visitation of Mary', category: 'cultural', description: 'Mary visits her cousin Elizabeth', location: 'Chapel' },
    
    // June
    { date: '2026-06-01', title: 'St. Justin Martyr', category: 'cultural', description: 'Early Christian apologist and martyr', location: 'Chapel' },
    { date: '2026-06-03', title: 'St. Charles Lwanga and Companions (Uganda Martyrs)', category: 'cultural', description: 'Martyrs of Uganda - National Celebration', location: 'All Schools - Special Commemoration' },
    { date: '2026-06-05', title: 'St. Boniface', category: 'cultural', description: 'Bishop and Martyr, Apostle to Germany', location: 'Chapel' },
    { date: '2026-06-09', title: 'St. Ephrem', category: 'cultural', description: 'Deacon and Doctor of the Church', location: 'Chapel' },
    { date: '2026-06-11', title: 'St. Barnabas', category: 'cultural', description: 'Apostle and companion of St. Paul', location: 'Chapel' },
    { date: '2026-06-13', title: 'St. Anthony of Padua', category: 'cultural', description: 'Doctor of the Church, Patron of Lost Items', location: 'Chapel' },
    { date: '2026-06-21', title: 'St. Aloysius Gonzaga', category: 'cultural', description: 'Patron of Young Students', location: 'All Schools' },
    { date: '2026-06-24', title: 'Nativity of St. John the Baptist', category: 'cultural', description: 'Solemnity celebrating the birth of John the Baptist', location: 'Chapel' },
    { date: '2026-06-29', title: 'Sts. Peter and Paul', category: 'cultural', description: 'Solemnity of the Apostles Peter and Paul, Pillars of the Church', location: 'All Catholic Schools' },
    
    // July
    { date: '2026-07-03', title: 'St. Thomas the Apostle', category: 'cultural', description: 'Apostle known as "Doubting Thomas"', location: 'Chapel' },
    { date: '2026-07-11', title: 'St. Benedict', category: 'cultural', description: 'Father of Western Monasticism, Patron of Europe', location: 'Chapel' },
    { date: '2026-07-22', title: 'St. Mary Magdalene', category: 'cultural', description: 'Apostle to the Apostles, first witness of the Resurrection', location: 'Chapel' },
    { date: '2026-07-25', title: 'St. James the Greater', category: 'cultural', description: 'Apostle, Brother of John, Patron of Spain', location: 'Chapel' },
    { date: '2026-07-26', title: 'Sts. Joachim and Anne', category: 'cultural', description: 'Parents of the Blessed Virgin Mary', location: 'Chapel' },
    { date: '2026-07-29', title: 'St. Martha', category: 'cultural', description: 'Patron of Homemakers and Servers', location: 'Chapel' },
    { date: '2026-07-31', title: 'St. Ignatius of Loyola', category: 'cultural', description: 'Founder of the Society of Jesus (Jesuits)', location: 'Chapel' },
    
    // August
    { date: '2026-08-01', title: 'St. Alphonsus Liguori', category: 'cultural', description: 'Doctor of the Church, founder of the Redemptorists', location: 'Chapel' },
    { date: '2026-08-04', title: 'St. John Vianney', category: 'cultural', description: 'Patron of Parish Priests', location: 'Chapel' },
    { date: '2026-08-08', title: 'St. Dominic', category: 'cultural', description: 'Founder of the Order of Preachers (Dominicans)', location: 'Chapel' },
    { date: '2026-08-10', title: 'St. Lawrence', category: 'cultural', description: 'Deacon and Martyr of Rome', location: 'Chapel' },
    { date: '2026-08-11', title: 'St. Clare', category: 'cultural', description: 'Founder of the Poor Clares', location: 'Chapel' },
    { date: '2026-08-14', title: 'St. Maximilian Kolbe', category: 'cultural', description: 'Martyr of Charity at Auschwitz', location: 'Chapel' },
    { date: '2026-08-15', title: 'Assumption of Mary', category: 'cultural', description: 'Solemnity - Holy Day of Obligation celebrating Mary\'s Assumption into Heaven', location: 'All Catholic Schools' },
    { date: '2026-08-20', title: 'St. Bernard', category: 'cultural', description: 'Abbot and Doctor of the Church', location: 'Chapel' },
    { date: '2026-08-24', title: 'St. Bartholomew', category: 'cultural', description: 'Apostle of Jesus Christ', location: 'Chapel' },
    { date: '2026-08-27', title: 'St. Monica', category: 'cultural', description: 'Mother of St. Augustine, Patron of Mothers', location: 'Chapel' },
    { date: '2026-08-28', title: 'St. Augustine', category: 'cultural', description: 'Doctor of the Church, Bishop of Hippo', location: 'All Schools' },
    
    // September
    { date: '2026-09-03', title: 'St. Gregory the Great', category: 'cultural', description: 'Pope and Doctor of the Church', location: 'Chapel' },
    { date: '2026-09-08', title: 'Nativity of Mary', category: 'cultural', description: 'Feast celebrating the birth of the Blessed Virgin Mary', location: 'Chapel' },
    { date: '2026-09-14', title: 'Exaltation of the Holy Cross', category: 'cultural', description: 'Feast honoring the Cross on which Christ was crucified', location: 'All Schools' },
    { date: '2026-09-15', title: 'Our Lady of Sorrows', category: 'cultural', description: 'Memorial of Mary\'s sorrows during Jesus\' passion', location: 'Chapel' },
    { date: '2026-09-21', title: 'St. Matthew', category: 'cultural', description: 'Apostle and Evangelist, author of the Gospel', location: 'Chapel' },
    { date: '2026-09-27', title: 'St. Vincent de Paul', category: 'cultural', description: 'Patron of Charitable Societies', location: 'Chapel' },
    { date: '2026-09-29', title: 'Sts. Michael, Gabriel, and Raphael', category: 'cultural', description: 'Feast of the Archangels', location: 'All Schools' },
    { date: '2026-09-30', title: 'St. Jerome', category: 'cultural', description: 'Doctor of the Church, Translator of the Bible', location: 'Chapel' },
    
    // October
    { date: '2026-10-01', title: 'St. Thérèse of Lisieux', category: 'cultural', description: 'Doctor of the Church, "The Little Flower"', location: 'Chapel' },
    { date: '2026-10-02', title: 'Guardian Angels', category: 'cultural', description: 'Memorial of the Holy Guardian Angels', location: 'All Schools' },
    { date: '2026-10-04', title: 'St. Francis of Assisi', category: 'cultural', description: 'Patron of Animals and the Environment', location: 'All Schools' },
    { date: '2026-10-07', title: 'Our Lady of the Rosary', category: 'cultural', description: 'Memorial celebrating the Rosary devotion', location: 'Chapel' },
    { date: '2026-10-15', title: 'St. Teresa of Ávila', category: 'cultural', description: 'Doctor of the Church, Mystic and Reformer', location: 'Chapel' },
    { date: '2026-10-17', title: 'St. Ignatius of Antioch', category: 'cultural', description: 'Bishop and Martyr, Early Church Father', location: 'Chapel' },
    { date: '2026-10-18', title: 'St. Luke the Evangelist', category: 'cultural', description: 'Author of the Gospel of Luke and Acts', location: 'Chapel' },
    { date: '2026-10-28', title: 'Sts. Simon and Jude', category: 'cultural', description: 'Apostles of Jesus Christ', location: 'Chapel' },
    
    // November
    { date: '2026-11-01', title: 'All Saints\' Day', category: 'cultural', description: 'Holy Day of Obligation honoring all saints in heaven', location: 'All Catholic Schools' },
    { date: '2026-11-02', title: 'All Souls\' Day', category: 'cultural', description: 'Commemoration of all the Faithful Departed', location: 'All Schools' },
    { date: '2026-11-09', title: 'Dedication of the Lateran Basilica', category: 'cultural', description: 'Feast of the Cathedral Church of Rome', location: 'Chapel' },
    { date: '2026-11-10', title: 'St. Leo the Great', category: 'cultural', description: 'Pope and Doctor of the Church', location: 'Chapel' },
    { date: '2026-11-11', title: 'St. Martin of Tours', category: 'cultural', description: 'Bishop, Patron of Soldiers', location: 'Chapel' },
    { date: '2026-11-15', title: 'St. Albert the Great', category: 'cultural', description: 'Doctor of the Church, Patron of Scientists', location: 'Chapel' },
    { date: '2026-11-16', title: 'St. Margaret of Scotland', category: 'cultural', description: 'Queen and Patron of Scotland', location: 'Chapel' },
    { date: '2026-11-17', title: 'St. Elizabeth of Hungary', category: 'cultural', description: 'Patron of Bakers and the Homeless', location: 'Chapel' },
    { date: '2026-11-21', title: 'Presentation of Mary', category: 'cultural', description: 'Memorial of Mary\'s presentation at the Temple', location: 'Chapel' },
    { date: '2026-11-22', title: 'St. Cecilia', category: 'cultural', description: 'Virgin and Martyr, Patroness of Musicians', location: 'Chapel' },
    { date: '2026-11-30', title: 'St. Andrew the Apostle', category: 'cultural', description: 'Patron of Scotland and Fishermen, Brother of St. Peter', location: 'Chapel' },
    
    // December
    { date: '2026-12-03', title: 'St. Francis Xavier', category: 'cultural', description: 'Patron of Missionaries', location: 'Chapel' },
    { date: '2026-12-06', title: 'St. Nicholas', category: 'cultural', description: 'Bishop of Myra, Patron of Children', location: 'All Schools' },
    { date: '2026-12-07', title: 'St. Ambrose', category: 'cultural', description: 'Bishop and Doctor of the Church', location: 'Chapel' },
    { date: '2026-12-08', title: 'Immaculate Conception', category: 'cultural', description: 'Solemnity - Holy Day of Obligation celebrating Mary conceived without sin', location: 'All Catholic Schools' },
    { date: '2026-12-12', title: 'Our Lady of Guadalupe', category: 'cultural', description: 'Patroness of the Americas', location: 'Chapel' },
    { date: '2026-12-13', title: 'St. Lucy', category: 'cultural', description: 'Virgin and Martyr, Patron of the Blind', location: 'Chapel' },
    { date: '2026-12-21', title: 'St. Peter Canisius', category: 'cultural', description: 'Doctor of the Church', location: 'Chapel' },
    { date: '2026-12-25', title: 'Nativity of Our Lord (Christmas)', category: 'cultural', description: 'Solemnity celebrating the birth of Jesus Christ', location: 'All Catholic Schools' },
    { date: '2026-12-26', title: 'St. Stephen', category: 'cultural', description: 'First Christian Martyr', location: 'Chapel' },
    { date: '2026-12-27', title: 'St. John the Evangelist', category: 'cultural', description: 'Apostle and author of the Gospel of John', location: 'Chapel' },
    { date: '2026-12-28', title: 'Holy Innocents', category: 'cultural', description: 'Martyrs - Children killed by Herod', location: 'Chapel' },
  ];

  // Load calendar events from localStorage and merge with saint days
  useEffect(() => {
    const storedEvents = localStorage.getItem('ges-calendar-events');
    let existingEvents = [];
    
    if (storedEvents) {
      try {
        existingEvents = JSON.parse(storedEvents);
      } catch (error) {
        existingEvents = [];
      }
    }

    // Check if saint days are already added
    const hasSaintDays = existingEvents.some(event => 
      catholicSaintDays.some(saint => saint.title === event.title)
    );

    if (!hasSaintDays) {
      // Add IDs to saint days and merge with existing events
      const saintDaysWithIds = catholicSaintDays.map((saint, index) => ({
        ...saint,
        id: `saint-${index}-${Date.now()}`,
        time: '9:00 AM',
      }));
      
      const allEvents = [...existingEvents, ...saintDaysWithIds];
      setCalendarEvents(allEvents);
      localStorage.setItem('ges-calendar-events', JSON.stringify(allEvents));
    } else {
      setCalendarEvents(existingEvents);
    }
  }, []);

  // Save calendar events to localStorage
  const saveCalendarEvents = (events) => {
    setCalendarEvents(events);
    localStorage.setItem('ges-calendar-events', JSON.stringify(events));
  };

  // Fetch events (for API, here just reloads from localStorage)
  const fetchCalendarEvents = () => {
    const storedEvents = localStorage.getItem('ges-calendar-events');
    if (storedEvents) {
      setCalendarEvents(JSON.parse(storedEvents));
    }
  };

  // Add event
  const addCalendarEvent = (event) => {
    const newEvent = { ...event, id: `event-${Date.now()}` };
    const updated = [...calendarEvents, newEvent];
    saveCalendarEvents(updated);
  };

  // Update event
  const updateCalendarEvent = (id, updates) => {
    const updated = calendarEvents.map(ev => ev.id === id ? { ...ev, ...updates } : ev);
    saveCalendarEvents(updated);
  };

  // Delete event
  const deleteCalendarEvent = (id) => {
    const updated = calendarEvents.filter(ev => ev.id !== id);
    saveCalendarEvents(updated);
  };
// Removed leftover invalid object literals

  useEffect(() => {
    // Load content from localStorage or initialize with sample content
    const storedContent = localStorage.getItem('ges-cms-content');
    if (storedContent) {
      try {
        setContent(JSON.parse(storedContent));
      } catch (error) {
        console.error('Error loading CMS content:', error);
        setContent(sampleContent);
      }
    } else {
      setContent(sampleContent);
      localStorage.setItem('ges-cms-content', JSON.stringify(sampleContent));
    }
  }, []);

  const saveContent = async (newContent) => {
    const updated = { ...content, [newContent.id]: newContent };
    setContent(updated);
    localStorage.setItem('ges-cms-content', JSON.stringify(updated));
    return newContent;
  };

  const deleteContent = async (id) => {
    const { [id]: deleted, ...remaining } = content;
    setContent(remaining);
    localStorage.setItem('ges-cms-content', JSON.stringify(remaining));
    return deleted;
  };

  const publishContent = async (id) => {
    const item = content[id];
    if (item) {
      const published = { ...item, status: 'published', publishedAt: new Date().toISOString() };
      await saveContent(published);
      return published;
    }
    return null;
  };

  const getContentByType = (type) => {
    return Object.values(content).filter(item => item.type === type);
  };

  const getPublishedContent = () => {
    return Object.values(content).filter(item => item.status === 'published');
  };

  const contextValue = {
    content,
    institutions,
    saveContent,
    deleteContent,
    publishContent,
    getContentByType,
    getPublishedContent,
    // Academic calendar methods
    calendarEvents,
    addCalendarEvent,
    updateCalendarEvent,
    deleteCalendarEvent,
    fetchCalendarEvents,
    // Helper methods
    createContent: (type, data) => {
      const newContent = {
        id: `${type}-${Date.now()}`,
        type,
        ...data,
        publishedAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        status: 'draft'
      };
      return saveContent(newContent);
    },
    updateContent: (id, updates) => {
      const existing = content[id];
      if (existing) {
        const updated = {
          ...existing,
          ...updates,
          updatedAt: new Date().toISOString()
        };
        return saveContent(updated);
      }
      return null;
    }
  };

  return (
    <CMSContext.Provider value={contextValue}>
      {children}
    </CMSContext.Provider>
  );
};

export const useCMS = () => {
  const context = useContext(CMSContext);
  if (!context) {
    throw new Error('useCMS must be used within CMSProvider');
  }
  return context;
};

export default CMSProvider;