import React, { useContext, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CMSContext } from '../cms/CMSProvider';
import { 
  LuChevronLeft, 
  LuChevronRight, 
  LuCalendar, 
  LuClock, 
  LuMapPin,
  LuSearch,
  LuDownload,
  LuShare2,
  LuFilter,
  LuLayoutGrid,
  LuList,
  LuCalendarDays,
  LuX
} from 'react-icons/lu';
import { format, startOfMonth, endOfMonth, startOfWeek, endOfWeek, addDays, isSameDay, isSameMonth, isToday as isTodayFn, addMonths, subMonths } from 'date-fns';

// Types
interface CalendarEvent {
  id: string;
  date: string;
  title: string;
  description?: string;
  time?: string;
  location?: string;
  category?: 'academic' | 'sports' | 'cultural' | 'administrative' | 'other';
}

interface DayInfo {
  date: Date;
  isCurrentMonth: boolean;
}

type ViewMode = 'month' | 'week' | 'list';

// Get all days in a month with proper padding for calendar grid
function getCalendarDays(year: number, month: number): DayInfo[] {
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  const daysInMonth = lastDay.getDate();
  const startingDayOfWeek = firstDay.getDay();
  
  const days: DayInfo[] = [];
  
  // Add padding days from previous month
  const prevMonthLastDay = new Date(year, month, 0).getDate();
  for (let i = startingDayOfWeek - 1; i >= 0; i--) {
    days.push({
      date: new Date(year, month - 1, prevMonthLastDay - i),
      isCurrentMonth: false
    });
  }
  
  // Add current month days
  for (let i = 1; i <= daysInMonth; i++) {
    days.push({
      date: new Date(year, month, i),
      isCurrentMonth: true
    });
  }
  
  // Add padding days from next month
  const remainingDays = 42 - days.length; // 6 rows * 7 days
  for (let i = 1; i <= remainingDays; i++) {
    days.push({
      date: new Date(year, month + 1, i),
      isCurrentMonth: false
    });
  }
  
  return days;
}

// Get week view days
function getWeekDays(date: Date): DayInfo[] {
  const start = startOfWeek(date);
  const days: DayInfo[] = [];
  
  for (let i = 0; i < 7; i++) {
    const currentDay = addDays(start, i);
    days.push({
      date: currentDay,
      isCurrentMonth: isSameMonth(currentDay, date)
    });
  }
  
  return days;
}

// Event category colors
const categoryColors: Record<string, { bg: string; text: string; badge: string }> = {
  academic: { bg: 'bg-blue-100', text: 'text-blue-800', badge: 'bg-blue-500' },
  sports: { bg: 'bg-green-100', text: 'text-green-800', badge: 'bg-green-500' },
  cultural: { bg: 'bg-purple-100', text: 'text-purple-800', badge: 'bg-purple-500' },
  administrative: { bg: 'bg-orange-100', text: 'text-orange-800', badge: 'bg-orange-500' },
  other: { bg: 'bg-ges-cream', text: 'text-ges-navy', badge: 'bg-ges-teal' },
};

export default function AcademicCalendar() {
  const context = useContext(CMSContext) as any;
  const calendarEvents: CalendarEvent[] = context?.calendarEvents || [];
  const fetchCalendarEvents = context?.fetchCalendarEvents;
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedEvent, setSelectedEvent] = useState<CalendarEvent | null>(null);
  const [viewMode, setViewMode] = useState<ViewMode>('month');
  const [searchQuery, setSearchQuery] = useState('');
  const [filterCategory, setFilterCategory] = useState<string>('all');
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    fetchCalendarEvents && fetchCalendarEvents();
  }, [fetchCalendarEvents]);

  const days = viewMode === 'week' ? getWeekDays(currentMonth) : getCalendarDays(currentMonth.getFullYear(), currentMonth.getMonth());
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const handleDayClick = (dayInfo: DayInfo) => {
    setSelectedDate(dayInfo.date);
    const events = eventsForDay(dayInfo.date);
    if (events.length > 0) {
      setSelectedEvent(events[0]);
    } else {
      setSelectedEvent(null);
    }
  };

  const eventsForDay = (date: Date): CalendarEvent[] => {
    if (!calendarEvents) return [];
    const dateStr = format(date, 'yyyy-MM-dd');
    return calendarEvents.filter((ev: CalendarEvent) => ev.date === dateStr);
  };

  const getEventsForMonth = (): CalendarEvent[] => {
    if (!calendarEvents) return [];
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    return calendarEvents.filter((ev: CalendarEvent) => {
      const eventDate = new Date(ev.date);
      return eventDate.getFullYear() === year && eventDate.getMonth() === month;
    }).sort((a: CalendarEvent, b: CalendarEvent) => new Date(a.date).getTime() - new Date(b.date).getTime());
  };

  const getFilteredEvents = (): CalendarEvent[] => {
    let events = getEventsForMonth();
    
    // Apply category filter
    if (filterCategory !== 'all') {
      events = events.filter(ev => ev.category === filterCategory);
    }
    
    // Apply search filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      events = events.filter(ev => 
        ev.title.toLowerCase().includes(query) ||
        ev.description?.toLowerCase().includes(query) ||
        ev.location?.toLowerCase().includes(query)
      );
    }
    
    return events;
  };

  const monthEvents = getFilteredEvents();

  const isSelected = (date: Date): boolean => {
    return selectedDate ? isSameDay(date, selectedDate) : false;
  };

  const navigatePrevious = () => {
    if (viewMode === 'week') {
      setCurrentMonth(addDays(currentMonth, -7));
    } else {
      setCurrentMonth(subMonths(currentMonth, 1));
    }
  };

  const navigateNext = () => {
    if (viewMode === 'week') {
      setCurrentMonth(addDays(currentMonth, 7));
    } else {
      setCurrentMonth(addMonths(currentMonth, 1));
    }
  };

  const goToToday = () => {
    setCurrentMonth(new Date());
    setSelectedDate(new Date());
  };

  const exportToICS = (event: CalendarEvent) => {
    const icsContent = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//GES Calendar//EN
BEGIN:VEVENT
UID:${event.id}@ges.edu
DTSTAMP:${format(new Date(), "yyyyMMdd'T'HHmmss'Z'")}
DTSTART:${event.date.replace(/-/g, '')}
SUMMARY:${event.title}
DESCRIPTION:${event.description || ''}
LOCATION:${event.location || ''}
END:VEVENT
END:VCALENDAR`;

    const blob = new Blob([icsContent], { type: 'text/calendar' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${event.title.replace(/\s+/g, '_')}.ics`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const shareEvent = async (event: CalendarEvent) => {
    const shareData = {
      title: event.title,
      text: `${event.title}\n${event.description || ''}\n${format(new Date(event.date), 'MMMM dd, yyyy')}`,
      url: window.location.href
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        // Fallback: copy to clipboard
        await navigator.clipboard.writeText(`${shareData.title}\n${shareData.text}`);
        alert('Event details copied to clipboard!');
      }
    } catch (err) {
      console.error('Error sharing:', err);
    }
  };

  const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-50 pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-6xl font-bold bg-gradient-to-r from-ges-navy via-ges-teal to-ges-gold bg-clip-text text-transparent mb-4">
            GES Calendar
          </h1>
          <p className="text-ges-slate text-lg">Stay updated with all important events and dates</p>
        </motion.div>

        {/* Toolbar */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-6 flex flex-col md:flex-row gap-4 items-center justify-between bg-white/80 backdrop-blur-md rounded-2xl p-4 shadow-lg"
        >
          {/* View Mode Toggles */}
          <div className="flex gap-2 bg-gray-100 rounded-xl p-1">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setViewMode('month')}
              className={`px-4 py-2 rounded-lg font-medium transition-all ${
                viewMode === 'month' 
                  ? 'bg-ges-navy text-white shadow-md' 
                  : 'text-ges-slate hover:text-ges-navy'
              }`}
            >
              <LuLayoutGrid className="inline w-4 h-4 mr-1" /> Month
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setViewMode('week')}
              className={`px-4 py-2 rounded-lg font-medium transition-all ${
                viewMode === 'week' 
                  ? 'bg-ges-navy text-white shadow-md' 
                  : 'text-ges-slate hover:text-ges-navy'
              }`}
            >
              <LuCalendarDays className="inline w-4 h-4 mr-1" /> Week
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setViewMode('list')}
              className={`px-4 py-2 rounded-lg font-medium transition-all ${
                viewMode === 'list' 
                  ? 'bg-ges-navy text-white shadow-md' 
                  : 'text-ges-slate hover:text-ges-navy'
              }`}
            >
              <LuList className="inline w-4 h-4 mr-1" /> List
            </motion.button>
          </div>

          {/* Search and Filter */}
          <div className="flex gap-2 flex-1 max-w-md">
            <div className="relative flex-1">
              <LuSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-ges-slate w-5 h-5" />
              <input
                type="text"
                placeholder="Search events..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-ges-gold"
              />
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowFilters(!showFilters)}
              className={`px-4 py-2 rounded-xl font-medium transition-all ${
                showFilters 
                  ? 'bg-ges-teal text-white' 
                  : 'bg-gray-100 text-ges-navy hover:bg-gray-200'
              }`}
            >
              <LuFilter className="w-5 h-5" />
            </motion.button>
          </div>

          {/* Today Button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={goToToday}
            className="px-6 py-2 bg-[#670C07] text-white rounded-xl font-semibold shadow-md hover:shadow-lg hover:bg-[#7f1009] transition-all"
          >
            Today
          </motion.button>
        </motion.div>

        {/* Filter Panel */}
        <AnimatePresence>
          {showFilters && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="mb-6 bg-white/80 backdrop-blur-md rounded-2xl p-6 shadow-lg overflow-hidden"
            >
              <h3 className="text-lg font-semibold text-ges-navy mb-4">Filter by Category</h3>
              <div className="flex flex-wrap gap-3">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setFilterCategory('all')}
                  className={`px-4 py-2 rounded-lg font-medium transition-all ${
                    filterCategory === 'all'
                      ? 'bg-ges-navy text-white'
                      : 'bg-gray-100 text-ges-slate hover:bg-gray-200'
                  }`}
                >
                  All Events
                </motion.button>
                {Object.keys(categoryColors).map((cat) => (
                  <motion.button
                    key={cat}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setFilterCategory(cat)}
                    className={`px-4 py-2 rounded-lg font-medium transition-all capitalize ${
                      filterCategory === cat
                        ? `${categoryColors[cat].bg} ${categoryColors[cat].text}`
                        : 'bg-gray-100 text-ges-slate hover:bg-gray-200'
                    }`}
                  >
                    {cat}
                  </motion.button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {viewMode === 'list' ? (
          // List View
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-4"
          >
            {monthEvents.length > 0 ? (
              monthEvents.map((event, idx) => {
                const category = event.category || 'other';
                const colors = categoryColors[category];
                
                return (
                  <motion.div
                    key={event.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.05 }}
                    className={`${colors.bg} rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all cursor-pointer`}
                    onClick={() => setSelectedEvent(event)}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <div className={`w-3 h-3 rounded-full ${colors.badge}`} />
                          <h3 className={`text-xl font-bold ${colors.text}`}>{event.title}</h3>
                        </div>
                        <div className="flex flex-wrap gap-4 text-sm text-gray-600 mb-3">
                          <div className="flex items-center">
                            <LuCalendar className="w-4 h-4 mr-1" />
                            {format(new Date(event.date), 'MMMM dd, yyyy')}
                          </div>
                          {event.time && (
                            <div className="flex items-center">
                              <LuClock className="w-4 h-4 mr-1" />
                              {event.time}
                            </div>
                          )}
                          {event.location && (
                            <div className="flex items-center">
                              <LuMapPin className="w-4 h-4 mr-1" />
                              {event.location}
                            </div>
                          )}
                        </div>
                        {event.description && (
                          <p className="text-gray-700">{event.description}</p>
                        )}
                      </div>
                      <div className="flex gap-2 ml-4">
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={(e) => {
                            e.stopPropagation();
                            exportToICS(event);
                          }}
                          className="p-2 bg-white rounded-lg hover:bg-gray-50 transition-colors"
                          title="Export to calendar"
                        >
                          <LuDownload className="w-5 h-5 text-ges-navy" />
                        </motion.button>
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={(e) => {
                            e.stopPropagation();
                            shareEvent(event);
                          }}
                          className="p-2 bg-white rounded-lg hover:bg-gray-50 transition-colors"
                          title="Share event"
                        >
                          <LuShare2 className="w-5 h-5 text-ges-navy" />
                        </motion.button>
                      </div>
                    </div>
                  </motion.div>
                );
              })
            ) : (
              <div className="text-center py-16 bg-white/60 backdrop-blur-sm rounded-2xl">
                <LuCalendar className="w-16 h-16 mx-auto mb-4 text-ges-slate opacity-50" />
                <p className="text-ges-slate text-lg">No events found</p>
              </div>
            )}
          </motion.div>
        ) : (
          // Calendar Grid View
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Main Calendar */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="lg:col-span-3"
            >
              <div className="bg-white/80 backdrop-blur-md rounded-3xl shadow-2xl overflow-hidden">
                {/* Calendar Header */}
                <div className="bg-[#670C07] p-6">
                  <div className="flex items-center justify-between">
                    <motion.button
                      whileHover={{ scale: 1.1, rotate: -10 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={navigatePrevious}
                      className="text-white hover:text-ges-gold transition-colors p-2 bg-white/10 rounded-xl backdrop-blur-sm"
                    >
                      <LuChevronLeft className="w-8 h-8" />
                    </motion.button>
                    
                    <div className="text-center">
                      <motion.h2
                        key={currentMonth.toISOString()}
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-3xl font-bold text-white"
                      >
                        {viewMode === 'week' 
                          ? `Week of ${format(startOfWeek(currentMonth), 'MMM dd, yyyy')}`
                          : format(currentMonth, 'MMMM yyyy')}
                      </motion.h2>
                      <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.1 }}
                        className="text-ges-gold mt-1 font-medium"
                      >
                        {monthEvents.length} {monthEvents.length === 1 ? 'event' : 'events'} {viewMode === 'week' ? 'this week' : 'this month'}
                      </motion.p>
                    </div>
                    
                    <motion.button
                      whileHover={{ scale: 1.1, rotate: 10 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={navigateNext}
                      className="text-white hover:text-ges-gold transition-colors p-2 bg-white/10 rounded-xl backdrop-blur-sm"
                    >
                      <LuChevronRight className="w-8 h-8" />
                    </motion.button>
                  </div>
                </div>

                {/* Week Days Header */}
                <div className="grid grid-cols-7 bg-gradient-to-r from-ges-cream to-blue-50 border-b-2 border-ges-gold">
                  {weekDays.map((day, idx) => (
                    <motion.div
                      key={day}
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: idx * 0.05 }}
                      className="p-4 text-center font-bold text-ges-navy"
                    >
                      <span className="hidden sm:inline">{day}</span>
                      <span className="sm:hidden">{day.charAt(0)}</span>
                    </motion.div>
                  ))}
                </div>

                {/* Calendar Grid */}
                <div className="grid grid-cols-7">
                  <AnimatePresence mode="wait">
                    {days.map((dayInfo, index) => {
                      const events = eventsForDay(dayInfo.date);
                      const hasEvents = events.length > 0;
                      const isTodayDate = isTodayFn(dayInfo.date);
                      const isSelectedDate = isSelected(dayInfo.date);

                      return (
                        <motion.div
                          key={`${dayInfo.date.toISOString()}-${index}`}
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.8 }}
                          transition={{ delay: index * 0.01 }}
                          onClick={() => dayInfo.isCurrentMonth && handleDayClick(dayInfo)}
                          className={`
                            min-h-[100px] p-3 border border-gray-100 cursor-pointer transition-all duration-300
                            ${!dayInfo.isCurrentMonth ? 'bg-gray-50/50 text-gray-400' : 'bg-white hover:bg-gradient-to-br hover:from-blue-50 hover:to-indigo-50'}
                            ${isTodayDate ? 'ring-2 ring-ges-gold shadow-lg' : ''}
                            ${isSelectedDate ? 'bg-gradient-to-br from-ges-teal/20 to-blue-100/50 ring-2 ring-ges-teal' : ''}
                            ${hasEvents && dayInfo.isCurrentMonth ? 'font-semibold' : ''}
                          `}
                        >
                          <div className="flex flex-col h-full">
                            <motion.div
                              whileHover={{ scale: 1.1 }}
                              className={`
                                text-sm font-bold mb-2 w-8 h-8 flex items-center justify-center rounded-full
                                ${isTodayDate ? 'bg-gradient-to-br from-ges-gold to-yellow-500 text-white shadow-md' : ''}
                                ${!dayInfo.isCurrentMonth ? 'text-gray-400' : isTodayDate ? '' : 'text-ges-navy'}
                              `}
                            >
                              {dayInfo.date.getDate()}
                            </motion.div>
                            
                            <div className="flex-1 space-y-1">
                              {events.slice(0, 2).map((event, idx) => {
                                const category = event.category || 'other';
                                const colors = categoryColors[category];
                                
                                return (
                                  <motion.div
                                    key={event.id}
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: idx * 0.1 }}
                                    whileHover={{ scale: 1.05, x: 2 }}
                                    className={`text-xs ${colors.bg} ${colors.text} rounded px-2 py-1 truncate font-medium shadow-sm`}
                                  >
                                    {event.title}
                                  </motion.div>
                                );
                              })}
                              {events.length > 2 && (
                                <motion.div
                                  whileHover={{ scale: 1.05 }}
                                  className="text-xs text-ges-teal font-semibold"
                                >
                                  +{events.length - 2} more
                                </motion.div>
                              )}
                            </div>
                          </div>
                        </motion.div>
                      );
                    })}
                  </AnimatePresence>
                </div>
              </div>
            </motion.div>

            {/* Sidebar - Upcoming Events */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="lg:col-span-1"
            >
              <div className="bg-white/80 backdrop-blur-md rounded-3xl shadow-2xl p-6 sticky top-24">
                <h3 className="text-2xl font-bold text-ges-navy mb-4 flex items-center">
                  <div className="w-1 h-8 bg-gradient-to-b from-ges-gold to-ges-teal rounded-full mr-3" />
                  Upcoming Events
                </h3>
                
                <div className="space-y-3 max-h-[600px] overflow-y-auto custom-scrollbar">
                  {monthEvents.length > 0 ? (
                    monthEvents.map((event, idx) => {
                      const category = event.category || 'other';
                      const colors = categoryColors[category];
                      
                      return (
                        <motion.div
                          key={event.id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: idx * 0.05 }}
                          whileHover={{ scale: 1.02, x: 4 }}
                          onClick={() => {
                            setSelectedEvent(event);
                            setSelectedDate(new Date(event.date));
                          }}
                          className={`
                            p-4 rounded-xl cursor-pointer transition-all duration-300 shadow-md hover:shadow-lg
                            ${selectedEvent?.id === event.id 
                              ? 'bg-gradient-to-br from-ges-teal to-blue-600 text-white ring-2 ring-ges-gold' 
                              : `${colors.bg} hover:ring-2 hover:ring-${colors.badge}`}
                          `}
                        >
                          <div className="flex items-start space-x-3">
                            <div className={`
                              flex-shrink-0 w-12 h-12 rounded-xl flex flex-col items-center justify-center shadow-md
                              ${selectedEvent?.id === event.id ? 'bg-white/20 text-white' : 'bg-white ' + colors.text}
                            `}>
                              <div className="text-xs font-bold">
                                {format(new Date(event.date), 'MMM').toUpperCase()}
                              </div>
                              <div className="text-lg font-bold">
                                {format(new Date(event.date), 'dd')}
                              </div>
                            </div>
                            <div className="flex-1 min-w-0">
                              <h4 className={`font-bold text-sm mb-1 ${selectedEvent?.id === event.id ? 'text-white' : colors.text}`}>
                                {event.title}
                              </h4>
                              {event.description && (
                                <p className={`text-xs ${selectedEvent?.id === event.id ? 'text-white/80' : 'text-gray-600'} line-clamp-2`}>
                                  {event.description}
                                </p>
                              )}
                              {event.time && (
                                <div className={`flex items-center text-xs mt-1 ${selectedEvent?.id === event.id ? 'text-white/90' : 'text-gray-500'}`}>
                                  <LuClock className="w-3 h-3 mr-1" />
                                  {event.time}
                                </div>
                              )}
                            </div>
                          </div>
                        </motion.div>
                      );
                    })
                  ) : (
                    <div className="text-center py-8 text-ges-slate">
                      <LuCalendar className="w-12 h-12 mx-auto mb-3 opacity-30" />
                      <p className="text-sm">No events scheduled</p>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          </div>
        )}

        {/* Event Details Modal */}
        <AnimatePresence>
          {selectedEvent && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
              onClick={() => setSelectedEvent(null)}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0, y: 20 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.9, opacity: 0, y: 20 }}
                onClick={(e) => e.stopPropagation()}
                className="bg-white rounded-3xl shadow-2xl overflow-hidden max-w-2xl w-full"
              >
                <div className={`bg-[#670C07] p-8`}>
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      {selectedEvent.category && (
                        <span className="inline-block px-3 py-1 bg-white/20 text-white text-xs font-semibold rounded-full mb-2 capitalize backdrop-blur-sm">
                          {selectedEvent.category}
                        </span>
                      )}
                      <h2 className="text-4xl font-bold text-white mb-2">{selectedEvent.title}</h2>
                    </div>
                    <motion.button
                      whileHover={{ scale: 1.1, rotate: 90 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => setSelectedEvent(null)}
                      className="text-white hover:text-ges-gold p-2 bg-white/10 rounded-full backdrop-blur-sm"
                    >
                      <LuX className="w-6 h-6" />
                    </motion.button>
                  </div>
                  
                  <div className="flex flex-wrap gap-4 text-white/90">
                    <div className="flex items-center bg-white/10 px-3 py-2 rounded-xl backdrop-blur-sm">
                      <LuCalendar className="w-5 h-5 mr-2" />
                      <span>{format(new Date(selectedEvent.date), 'EEEE, MMMM dd, yyyy')}</span>
                    </div>
                    {selectedEvent.time && (
                      <div className="flex items-center bg-white/10 px-3 py-2 rounded-xl backdrop-blur-sm">
                        <LuClock className="w-5 h-5 mr-2" />
                        <span>{selectedEvent.time}</span>
                      </div>
                    )}
                    {selectedEvent.location && (
                      <div className="flex items-center bg-white/10 px-3 py-2 rounded-xl backdrop-blur-sm">
                        <LuMapPin className="w-5 h-5 mr-2" />
                        <span>{selectedEvent.location}</span>
                      </div>
                    )}
                  </div>
                </div>
                
                <div className="p-8">
                  {selectedEvent.description && (
                    <div className="mb-6">
                      <h3 className="text-xl font-bold text-ges-navy mb-3">Event Details</h3>
                      <p className="text-ges-slate leading-relaxed">{selectedEvent.description}</p>
                    </div>
                  )}
                  
                  <div className="flex gap-3">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => exportToICS(selectedEvent)}
                      className="flex-1 bg-[#670C07] text-white px-6 py-3 rounded-xl font-semibold flex items-center justify-center shadow-md hover:shadow-lg hover:bg-[#7f1009] transition-all"
                    >
                      <LuDownload className="w-5 h-5 mr-2" />
                      Export to Calendar
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => shareEvent(selectedEvent)}
                      className="flex-1 bg-[#670C07] text-white px-6 py-3 rounded-xl font-semibold flex items-center justify-center shadow-md hover:shadow-lg hover:bg-[#7f1009] transition-all"
                    >
                      <LuShare2 className="w-5 h-5 mr-2" />
                      Share Event
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #f1f1f1;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: linear-gradient(to bottom, #00838F, #0097A7);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(to bottom, #006064, #00838F);
        }
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </div>
  );
}
