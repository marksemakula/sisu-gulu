import React, { useState, useEffect, useContext } from 'react';
import { motion } from 'framer-motion';
import { CMSContext } from './CMSProvider';
import { LuPlus, LuPencil, LuTrash2, LuSave, LuX } from 'react-icons/lu';

const AdminCalendar = () => {
  const { calendarEvents, addCalendarEvent, updateCalendarEvent, deleteCalendarEvent, fetchCalendarEvents } = useContext(CMSContext);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ date: '', title: '', description: '', time: '', location: '' });
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    fetchCalendarEvents && fetchCalendarEvents();
  }, [fetchCalendarEvents]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingId) {
      updateCalendarEvent && updateCalendarEvent(editingId, form);
    } else {
      addCalendarEvent && addCalendarEvent(form);
    }
    setShowForm(false);
    setForm({ date: '', title: '', description: '', time: '', location: '' });
    setEditingId(null);
  };

  const handleEdit = (event) => {
    setForm({
      date: event.date || '',
      title: event.title || '',
      description: event.description || '',
      time: event.time || '',
      location: event.location || ''
    });
    setEditingId(event.id);
    setShowForm(true);
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this event?')) {
      deleteCalendarEvent && deleteCalendarEvent(id);
    }
  };

  const handleCancel = () => {
    setShowForm(false);
    setForm({ date: '', title: '', description: '', time: '', location: '' });
    setEditingId(null);
  };

  const sortedEvents = calendarEvents ? [...calendarEvents].sort((a, b) => new Date(a.date) - new Date(b.date)) : [];

  return (
    <div className="space-y-6">
      {/* Add Event Button */}
      <div className="flex justify-between items-center">
        <h3 className="text-2xl font-bold text-ges-navy">Manage GES Calendar</h3>
        <button
          onClick={() => setShowForm(true)}
          className="bg-ges-gold text-ges-navy px-6 py-3 rounded-lg font-semibold hover:bg-ges-teal hover:text-white transition-all duration-300 flex items-center"
        >
          <LuPlus className="w-5 h-5 mr-2" /> Add Event
        </button>
      </div>

      {/* Event Form Modal */}
      {showForm && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white rounded-2xl p-8 w-full max-w-2xl"
          >
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-bold text-ges-navy">
                {editingId ? 'Edit Event' : 'Add New Event'}
              </h3>
              <button onClick={handleCancel} className="text-ges-slate hover:text-ges-navy">
                <LuX className="w-6 h-6" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-ges-navy mb-2">
                    Date *
                  </label>
                  <input
                    name="date"
                    type="date"
                    value={form.date}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-ges-gold"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-ges-navy mb-2">
                    Time
                  </label>
                  <input
                    name="time"
                    type="time"
                    value={form.time}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-ges-gold"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-ges-navy mb-2">
                  Event Title *
                </label>
                <input
                  name="title"
                  value={form.title}
                  onChange={handleChange}
                  placeholder="e.g., Parent-Teacher Conference"
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-ges-gold"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-ges-navy mb-2">
                  Location
                </label>
                <input
                  name="location"
                  value={form.location}
                  onChange={handleChange}
                  placeholder="e.g., Main Hall, Gombe High School"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-ges-gold"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-ges-navy mb-2">
                  Description
                </label>
                <textarea
                  name="description"
                  value={form.description}
                  onChange={handleChange}
                  rows={4}
                  placeholder="Add event details, instructions, or additional information..."
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-ges-gold"
                />
              </div>

              <div className="flex justify-end space-x-4">
                <button
                  type="button"
                  onClick={handleCancel}
                  className="px-6 py-3 border border-gray-300 text-ges-slate rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-ges-gold text-ges-navy px-6 py-3 rounded-lg font-semibold hover:bg-ges-teal hover:text-white transition-all duration-300 flex items-center"
                >
                  <LuSave className="w-5 h-5 mr-2" /> {editingId ? 'Update' : 'Add'} Event
                </button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}

      {/* Events List */}
      <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
        {sortedEvents.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-ges-navy text-white">
                <tr>
                  <th className="px-6 py-4 text-left">Date</th>
                  <th className="px-6 py-4 text-left">Time</th>
                  <th className="px-6 py-4 text-left">Event</th>
                  <th className="px-6 py-4 text-left">Location</th>
                  <th className="px-6 py-4 text-left">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {sortedEvents.map((event) => (
                  <tr key={event.id} className="hover:bg-ges-cream/50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="font-semibold text-ges-navy">
                        {new Date(event.date).toLocaleDateString('default', { 
                          month: 'short', 
                          day: 'numeric', 
                          year: 'numeric' 
                        })}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-ges-slate">{event.time || '-'}</td>
                    <td className="px-6 py-4">
                      <div className="font-semibold text-ges-navy">{event.title}</div>
                      {event.description && (
                        <div className="text-sm text-ges-slate truncate max-w-xs">
                          {event.description.substring(0, 60)}...
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4 text-ges-slate">{event.location || '-'}</td>
                    <td className="px-6 py-4">
                      <div className="flex space-x-2">
                        <button
                          onClick={() => handleEdit(event)}
                          className="p-2 text-ges-blue hover:bg-ges-blue/10 rounded-lg transition-colors"
                        >
                          <LuPencil className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(event.id)}
                          className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                        >
                          <LuTrash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="text-center py-12 text-ges-slate">
            <p className="text-lg">No events yet. Click "Add Event" to get started.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminCalendar;
