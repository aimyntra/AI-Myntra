import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
    Plus,
    Trash2,
    Save,
    X,
    ChevronRight,
    Image as ImageIcon,
    CheckCircle,
    Layout,
    ListChecks,
    Users,
    ArrowLeft
} from 'lucide-react';
import { useNavigate, Link, useParams } from 'react-router-dom';
import AdminLayout from '../../components/admin/AdminLayout';

export default function EditCourse() {
    const { slug } = useParams();
    const navigate = useNavigate();
    const [step, setStep] = useState(1);
    const [loading, setLoading] = useState(false);
    const [fetching, setFetching] = useState(true);
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);

    const [formData, setFormData] = useState({
        id: '',
        title: '',
        slug: '',
        description: '',
        price: '',
        original_price: '',
        image_url: 'https://images.unsplash.com/photo-1677442136019-21780ecad995',
        level: 'Beginner',
        status: 'draft',
        learning_outcomes: [''],
        target_audience: [''],
        curriculum: [
            {
                week: 1,
                title: 'Introduction',
                days: [
                    { title: 'Getting Started', video_url: '', content: '' }
                ]
            }
        ]
    });

    useEffect(() => {
        fetchCourseData();
    }, [slug]);

    const fetchCourseData = async () => {
        try {
            const response = await fetch(`/api/admin/courses?slug=${slug}`);
            const data = await response.json();
            if (data.success && data.course) {
                const c = data.course;
                setFormData({
                    id: c.id,
                    title: c.title || '',
                    slug: c.slug || '',
                    description: c.description || '',
                    price: c.price || '',
                    original_price: c.original_price || '',
                    image_url: c.image_url || 'https://images.unsplash.com/photo-1677442136019-21780ecad995',
                    level: c.level || 'Beginner',
                    status: c.status || 'draft',
                    learning_outcomes: c.learning_outcomes || [''],
                    target_audience: c.target_audience || [''],
                    curriculum: c.curriculum || [
                        {
                            week: 1,
                            title: 'Introduction',
                            days: [{ title: 'Getting Started', video_url: '', content: '' }]
                        }
                    ]
                });
            }
        } catch (error) {
            console.error('Error fetching course:', error);
        } finally {
            setFetching(false);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleArrayChange = (index, value, type) => {
        const newArray = [...formData[type]];
        newArray[index] = value;
        setFormData(prev => ({ ...prev, [type]: newArray }));
    };

    const addArrayItem = (type) => {
        setFormData(prev => ({ ...prev, [type]: [...prev[type], ''] }));
    };

    const removeArrayItem = (index, type) => {
        if (formData[type].length > 1) {
            const newArray = formData[type].filter((_, i) => i !== index);
            setFormData(prev => ({ ...prev, [type]: newArray }));
        }
    };

    const addWeek = () => {
        setFormData(prev => ({
            ...prev,
            curriculum: [
                ...prev.curriculum,
                {
                    week: prev.curriculum.length + 1,
                    title: '',
                    days: [{ title: '', video_url: '', content: '' }]
                }
            ]
        }));
    };

    const addDay = (weekIndex) => {
        const newCurriculum = [...formData.curriculum];
        newCurriculum[weekIndex].days.push({ title: '', video_url: '', content: '' });
        setFormData(prev => ({ ...prev, curriculum: newCurriculum }));
    };

    const handleCurriculumChange = (weekIndex, dayIndex, field, value) => {
        const newCurriculum = [...formData.curriculum];
        if (dayIndex !== null) {
            newCurriculum[weekIndex].days[dayIndex][field] = value;
        } else {
            newCurriculum[weekIndex][field] = value;
        }
        setFormData(prev => ({ ...prev, curriculum: newCurriculum }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const response = await fetch(`/api/admin/courses?id=${formData.id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });
            const data = await response.json();
            if (data.success) {
                navigate('/admin/courses');
            }
        } catch (error) {
            console.error('Error updating course:', error);
        } finally {
            setLoading(false);
        }
    };

    const stepItems = [
        { id: 1, label: 'Basic Info', icon: Layout },
        { id: 2, label: 'Curriculum', icon: ListChecks },
        { id: 3, label: 'Outcomes', icon: Users },
    ];

    if (fetching) {
        return (
            <AdminLayout>
                <div className="flex items-center justify-center min-h-[400px]">
                    <div className="w-12 h-12 border-4 border-[#00ff88] border-t-transparent rounded-full animate-spin"></div>
                </div>
            </AdminLayout>
        );
    }

    return (
        <AdminLayout>
            <div className="max-w-4xl mx-auto space-y-8 pb-24">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <Link to="/admin/courses">
                            <button className="p-2 hover:bg-white/5 rounded-lg text-gray-400 transition-colors">
                                <ArrowLeft size={20} />
                            </button>
                        </Link>
                        <div>
                            <h1 className="text-3xl font-bold">Edit Course</h1>
                            <p className="text-gray-400 text-sm">Update "{formData.title}" details.</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-4">
                        <button
                            onClick={handleSubmit}
                            disabled={loading}
                            className="flex items-center gap-2 px-6 py-3 bg-[#00ff88] text-black font-bold rounded-xl hover:scale-105 transition-all shadow-[0_0_20px_rgba(0,255,136,0.3)] disabled:opacity-50"
                        >
                            <Save size={18} />
                            {loading ? 'Saving...' : 'Update Course'}
                        </button>
                    </div>
                </div>

                {/* Progress Steps */}
                <div className="flex items-center justify-between bg-[#0a0a0f] border border-white/5 p-4 rounded-2xl">
                    {stepItems.map((item, idx) => (
                        <React.Fragment key={item.id}>
                            <button
                                onClick={() => setStep(item.id)}
                                className={`flex items-center gap-3 px-4 py-2 rounded-xl transition-all ${step === item.id ? 'bg-[#00ff88]/10 text-[#00ff88]' : 'text-gray-500 hover:text-white'
                                    }`}
                            >
                                <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${step === item.id ? 'bg-[#00ff88] text-black' : 'bg-white/5'
                                    }`}>
                                    {item.id}
                                </div>
                                <span className="font-semibold">{item.label}</span>
                            </button>
                            {idx < stepItems.length - 1 && (
                                <ChevronRight className="text-white/10" size={20} />
                            )}
                        </React.Fragment>
                    ))}
                </div>

                <form className="space-y-8">
                    {/* Step 1: Basic Info */}
                    {step === 1 && (
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="bg-[#0a0a0f] border border-white/5 p-8 rounded-3xl space-y-6"
                        >
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-gray-400 ml-1">Course Title</label>
                                    <input
                                        type="text"
                                        name="title"
                                        value={formData.title}
                                        onChange={handleChange}
                                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-[#00ff88] transition-colors"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-gray-400 ml-1">URL Slug</label>
                                    <input
                                        type="text"
                                        name="slug"
                                        value={formData.slug}
                                        onChange={handleChange}
                                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-[#00ff88] transition-colors"
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-400 ml-1">Description</label>
                                <textarea
                                    name="description"
                                    rows={4}
                                    value={formData.description}
                                    onChange={handleChange}
                                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-[#00ff88] transition-colors resize-none"
                                />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-gray-400 ml-1">Price (INR)</label>
                                    <input
                                        type="number"
                                        name="price"
                                        value={formData.price}
                                        onChange={handleChange}
                                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-[#00ff88] transition-colors"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-gray-400 ml-1">Original Price</label>
                                    <input
                                        type="number"
                                        name="original_price"
                                        value={formData.original_price}
                                        onChange={handleChange}
                                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-[#00ff88] transition-colors"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-gray-400 ml-1">Level</label>
                                    <select
                                        name="level"
                                        value={formData.level}
                                        onChange={handleChange}
                                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-[#00ff88]"
                                    >
                                        <option value="Beginner">Beginner</option>
                                        <option value="Intermediate">Intermediate</option>
                                        <option value="Advanced">Advanced</option>
                                    </select>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-400 ml-1">Cover Image URL</label>
                                <div className="flex gap-4">
                                    <input
                                        type="text"
                                        name="image_url"
                                        value={formData.image_url}
                                        onChange={handleChange}
                                        className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-[#00ff88]"
                                    />
                                    <div className="w-12 h-12 rounded-xl border border-white/10 overflow-hidden shrink-0">
                                        <img src={formData.image_url} className="w-full h-full object-cover" />
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    )}

                    {/* Step 2: Curriculum (Similar to NewCourse) */}
                    {step === 2 && (
                        <div className="space-y-6">
                            {formData.curriculum.map((week, wIndex) => (
                                <div key={wIndex} className="bg-[#0a0a0f] border border-white/5 p-6 rounded-3xl space-y-4">
                                    <input
                                        type="text"
                                        value={week.title}
                                        onChange={(e) => handleCurriculumChange(wIndex, null, 'title', e.target.value)}
                                        className="bg-transparent border-none p-0 text-lg font-bold w-full focus:ring-0"
                                        placeholder="Week Title"
                                    />
                                    <div className="space-y-3">
                                        {week.days.map((day, dIndex) => (
                                            <div key={dIndex} className="bg-white/5 border border-white/10 p-4 rounded-2xl grid grid-cols-1 md:grid-cols-2 gap-4">
                                                <input
                                                    type="text"
                                                    value={day.title}
                                                    placeholder="Lesson Title"
                                                    onChange={(e) => handleCurriculumChange(wIndex, dIndex, 'title', e.target.value)}
                                                    className="bg-black/20 border border-white/10 rounded-xl px-4 py-2 text-sm"
                                                />
                                                <input
                                                    type="text"
                                                    value={day.video_url}
                                                    placeholder="Video URL"
                                                    onChange={(e) => handleCurriculumChange(wIndex, dIndex, 'video_url', e.target.value)}
                                                    className="bg-black/20 border border-white/10 rounded-xl px-4 py-2 text-sm"
                                                />
                                            </div>
                                        ))}
                                        <button type="button" onClick={() => addDay(wIndex)} className="text-[#00ff88] text-xs font-bold">+ Add Day</button>
                                    </div>
                                </div>
                            ))}
                            <button type="button" onClick={addWeek} className="w-full py-4 border-2 border-dashed border-white/10 rounded-3xl text-gray-500">+ Add Week</button>
                        </div>
                    )}

                    {/* Step 3: Outcomes */}
                    {step === 3 && (
                        <div className="space-y-8">
                            <div className="bg-[#0a0a0f] border border-white/5 p-8 rounded-3xl space-y-6">
                                <h3 className="font-bold">Learning Outcomes</h3>
                                {formData.learning_outcomes.map((item, idx) => (
                                    <div key={idx} className="flex gap-2">
                                        <input
                                            value={item}
                                            onChange={(e) => handleArrayChange(idx, e.target.value, 'learning_outcomes')}
                                            className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-2"
                                        />
                                        <button type="button" onClick={() => removeArrayItem(idx, 'learning_outcomes')} className="text-red-500"><X /></button>
                                    </div>
                                ))}
                                <button type="button" onClick={() => addArrayItem('learning_outcomes')} className="text-[#00ff88]">+ Add Outcome</button>
                            </div>
                        </div>
                    )}
                </form>

                {/* Sticky Footer */}
                <div className="fixed bottom-0 left-0 right-0 p-4 bg-[#050507]/90 backdrop-blur-xl border-t border-white/10 flex justify-center items-center z-[100] md:left-20">
                    <div className="max-w-4xl w-full flex justify-between">
                        <button onClick={() => setStep(s => Math.max(1, s - 1))} className="px-6 py-2 text-gray-400 font-bold" disabled={step === 1}>Previous</button>
                        {step < 3 ? (
                            <button onClick={() => setStep(s => s + 1)} className="px-8 py-3 bg-white/5 border border-white/10 rounded-xl font-bold">Continue</button>
                        ) : (
                            <button onClick={handleSubmit} className="px-10 py-3 bg-[#00ff88] text-black font-bold rounded-xl shadow-[0_0_20px_rgba(0,255,136,0.3)]">Update Course</button>
                        )}
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}
