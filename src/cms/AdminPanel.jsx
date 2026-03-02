import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { LuPlus, LuPencil, LuTrash2, LuEye, LuSave, LuX } from 'react-icons/lu';
import { useCMS } from './CMSProvider';
import AdminCalendar from './AdminCalendar';

const AdminPanel = () => {
  const [activeTab, setActiveTab] = useState('content');
  const [isEditing, setIsEditing] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    type: 'blog',
    author: '',
    status: 'draft'
  });

  const { 
    content, 
    institutions, 
    saveContent, 
    deleteContent, 
    publishContent,
    createContent,
    updateContent 
  } = useCMS();

  // ... existing handlers (handleEdit, handleSave, handleDelete, etc.)
  const handleEdit = (item) => {
    setEditingItem(item);
    setFormData(item);
    setIsEditing(true);
  };

  const handleSave = async () => {
    try {
      if (editingItem) {
        await updateContent(editingItem.id, formData);
      } else {
        await createContent(formData.type, formData);
      }
      setIsEditing(false);
      setEditingItem(null);
      setFormData({
        title: '',
        content: '',
        type: 'blog',
        author: '',
        status: 'draft'
      });
    } catch (error) {
      console.error('Error saving content:', error);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this content?')) {
      await deleteContent(id);
    }
  };

  const handlePublish = async (id) => {
    await publishContent(id);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditingItem(null);
    setFormData({
      title: '',
      content: '',
      type: 'blog',
      author: '',
      status: 'draft'
    });
  };

  return (
    <div className="min-h-screen bg-ges-cream pt-24"> {/* Added pt-24 for fixed header */}
      {/* Header */}
      <div className="bg-ges-navy text-white rounded-b-3xl shadow-lg -mt-4 pb-8 pt-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold">GES CMS Admin Panel</h1>
          <p className="text-ges-gold mt-2">Manage content across all GES institutions</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Tabs */}
        <div className="flex space-x-1 bg-white rounded-xl p-1 mb-8 shadow-lg">
          {[
            { key: 'content', label: 'Content Management' },
            { key: 'calendar', label: 'GES Calendar' },
            { key: 'institutions', label: 'Institutions' },
            { key: 'analytics', label: 'Analytics' }
          ].map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`flex-1 px-6 py-3 rounded-lg font-medium transition-all duration-300 ${
                activeTab === tab.key
                  ? 'bg-ges-gold text-ges-navy shadow-md'
                  : 'text-ges-slate hover:text-ges-navy'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* GES Calendar Tab */}
        {activeTab === 'calendar' && (
          <div className="space-y-6">
            <AdminCalendar />
          </div>
        )}

        {/* Content Management Tab */}
        {activeTab === 'content' && (
          <div className="space-y-6">
            {/* Add New Content Button */}
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-ges-navy">Content Management</h2>
              <button
                onClick={() => setIsEditing(true)}
                className="bg-ges-gold text-ges-navy px-6 py-3 rounded-lg font-semibold hover:bg-ges-teal hover:text-white transition-all duration-300 flex items-center"
              >
                <LuPlus className="w-5 h-5 mr-2" /> Add New Content
              </button>
            </div>

            {/* Content Editor Modal */}
            {isEditing && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
              >
                <motion.div
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="bg-white rounded-2xl p-8 w-full max-w-4xl max-h-[90vh] overflow-y-auto"
                >
                  <div className="flex justify-between items-center mb-6">
                    <h3 className="text-2xl font-bold text-ges-navy">
                      {editingItem ? 'Edit Content' : 'Create New Content'}
                    </h3>
                    <button onClick={handleCancel} className="text-ges-slate hover:text-ges-navy">
                      <LuX className="w-6 h-6" />
                    </button>
                  </div>

                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-ges-navy mb-2">
                          Title
                        </label>
                        <input
                          type="text"
                          value={formData.title}
                          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-ges-gold"
                          placeholder="Enter content title"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-ges-navy mb-2">
                          Type
                        </label>
                        <select
                          value={formData.type}
                          onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-ges-gold"
                        >
                          <option value="blog">Blog Post</option>
                          <option value="news">News</option>
                          <option value="event">Event</option>
                          <option value="announcement">Announcement</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-ges-navy mb-2">
                          Author
                        </label>
                        <input
                          type="text"
                          value={formData.author}
                          onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-ges-gold"
                          placeholder="Author name"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-ges-navy mb-2">
                          Status
                        </label>
                        <select
                          value={formData.status}
                          onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-ges-gold"
                        >
                          <option value="draft">Draft</option>
                          <option value="published">Published</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-ges-navy mb-2">
                        Content
                      </label>
                      <textarea
                        value={formData.content}
                        onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                        rows={10}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-ges-gold"
                        placeholder="Enter your content here..."
                      />
                    </div>

                    <div className="flex justify-end space-x-4">
                      <button
                        onClick={handleCancel}
                        className="px-6 py-3 border border-gray-300 text-ges-slate rounded-lg hover:bg-gray-50 transition-colors"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={handleSave}
                        className="bg-ges-gold text-ges-navy px-6 py-3 rounded-lg font-semibold hover:bg-ges-teal hover:text-white transition-all duration-300 flex items-center"
                      >
                        <LuSave className="w-5 h-5 mr-2" /> Save Content
                      </button>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            )}

            {/* Content List */}
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-ges-navy text-white">
                    <tr>
                      <th className="px-6 py-4 text-left">Title</th>
                      <th className="px-6 py-4 text-left">Type</th>
                      <th className="px-6 py-4 text-left">Author</th>
                      <th className="px-6 py-4 text-left">Status</th>
                      <th className="px-6 py-4 text-left">Date</th>
                      <th className="px-6 py-4 text-left">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {Object.values(content).map((item) => (
                      <tr key={item.id} className="hover:bg-ges-cream/50 transition-colors">
                        <td className="px-6 py-4">
                          <div className="font-semibold text-ges-navy">{item.title}</div>
                          <div className="text-sm text-ges-slate truncate max-w-xs">
                            {item.content?.substring(0, 100)}...
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <span className="inline-flex px-3 py-1 rounded-full text-xs font-medium bg-ges-teal/10 text-ges-teal capitalize">
                            {item.type}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-ges-slate">{item.author}</td>
                        <td className="px-6 py-4">
                          <span className={`inline-flex px-3 py-1 rounded-full text-xs font-medium ${
                            item.status === 'published' 
                              ? 'bg-green-100 text-green-800' 
                              : 'bg-yellow-100 text-yellow-800'
                          }`}>
                            {item.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-ges-slate">
                          {new Date(item.updatedAt).toLocaleDateString()}
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex space-x-2">
                            <button 
                              onClick={() => handleEdit(item)}
                              className="p-2 text-ges-blue hover:bg-ges-blue/10 rounded-lg transition-colors"
                            >
                              <LuPencil className="w-4 h-4" />
                            </button>
                            {item.status === 'draft' && (
                              <button 
                                onClick={() => handlePublish(item.id)}
                                className="p-2 text-ges-green hover:bg-ges-green/10 rounded-lg transition-colors"
                              >
                                <LuEye className="w-4 h-4" />
                              </button>
                            )}
                            <button 
                              onClick={() => handleDelete(item.id)}
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
            </div>
          </div>
        )}
        
        {/* Institutions and Analytics Tabs Content (simulated for brevity, logic same as before) */}
        {activeTab === 'institutions' && (
           <div className="space-y-6">
            <h2 className="text-2xl font-bold text-ges-navy">Institution Management</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {institutions.map((institution) => (
                <div key={institution.id} className="bg-white rounded-2xl p-6 shadow-lg">
                  <h3 className="text-xl font-bold text-ges-navy mb-2">{institution.name}</h3>
                  <p className="text-ges-slate mb-4">{institution.type}</p>
                  <p className="text-sm text-ges-slate mb-4">{institution.location}</p>
                  <div className="mt-4 flex space-x-2">
                    <button className="flex-1 bg-ges-gold text-ges-navy py-2 rounded-lg font-medium hover:bg-ges-teal hover:text-white transition-colors">
                      Edit
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        
        {activeTab === 'analytics' && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-ges-navy">Analytics Dashboard</h2>
            <div className="bg-white rounded-2xl p-6 shadow-lg">
               <p className="text-ges-slate">Analytics content here...</p>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default AdminPanel;