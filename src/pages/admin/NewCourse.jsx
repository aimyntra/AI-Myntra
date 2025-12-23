import React, { useState } from 'react';
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
import { useNavigate, Link } from 'react-router-dom';
import AdminLayout from '../../components/admin/AdminLayout';

export default function NewCourse() {
    const navigate = useNavigate();
    const [step, setStep] = useState(1);
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
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

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));

        // Auto-generate slug from title
        if (name === 'title' && !formData.slug) {
            setFormData(prev => ({
                ...prev,
                slug: value.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '')
            }));
        }
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

    // Curriculum Handlers
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
            const response = await fetch('/api/admin/courses', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });
            const data = await response.json();
            if (data.success) {
                navigate('/admin/courses');
            }
        } catch (error) {
            console.error('Error creating course:', error);
        } finally {
            setLoading(false);
        }
    };

    const stepItems = [
        { id: 1, label: 'Basic Info', icon: Layout },
        { id: 2, label: 'Curriculum', icon: ListChecks },
        { id: 3, label: 'Outcomes', icon: Users },
    ];

    return (
        <AdminLayout>
            <div className="max-w-4xl mx-auto space-y-8">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <Link to="/admin/courses">
                            <button className="p-2 hover:bg-white/5 rounded-lg text-gray-400 transition-colors">
                                <ArrowLeft size={20} />
                            </button>
                        </Link>
                        <div>
                            <h1 className="text-3xl font-bold">Create New Course</h1>
                            <p className="text-gray-400 text-sm">Fill in the details to launch your program.</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-4">
                        <button
                            onClick={handleSubmit}
                            disabled={loading}
                            className="flex items-center gap-2 px-6 py-3 bg-[#00ff88] text-black font-bold rounded-xl hover:scale-105 transition-all shadow-[0_0_20px_rgba(0,255,136,0.3)] disabled:opacity-50"
                        >
                            <Save size={18} />
                            {loading ? 'Publishing...' : 'Publish Course'}
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

                <form className="space-y-8 pb-20">
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
                                        placeholder="e.g. AI Builder Bootcamp"
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
                                        placeholder="ai-builder-bootcamp"
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
                                    placeholder="Tell students what this course is about..."
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
                                        placeholder="1499"
                                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-[#00ff88] transition-colors"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-gray-400 ml-1">Original Price (Strike)</label>
                                    <input
                                        type="number"
                                        name="original_price"
                                        value={formData.original_price}
                                        onChange={handleChange}
                                        placeholder="4999"
                                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-[#00ff88] transition-colors"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-gray-400 ml-1">Difficulty Level</label>
                                    <select
                                        name="level"
                                        value={formData.level}
                                        onChange={handleChange}
                                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-[#00ff88] transition-colors appearance-none"
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
                                        className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-[#00ff88] transition-colors"
                                    />
                                    <div className="w-12 h-12 rounded-xl border border-white/10 overflow-hidden flex-shrink-0">
                                        <img src={formData.image_url} alt="Course Preview" className="w-full h-full object-cover" />
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    )}

                    {/* Step 2: Curriculum Editor */}
                    {step === 2 && (
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="space-y-6"
                        >
                            {formData.curriculum.map((week, wIndex) => (
                                <div key={wIndex} className="bg-[#0a0a0f] border border-white/5 p-6 rounded-3xl space-y-4">
                                    <div className="flex items-center justify-between border-b border-white/5 pb-4">
                                        <div className="flex-1 flex items-center gap-4">
                                            <span className="text-[#00ff88] font-bold">Week {wIndex + 1}:</span>
                                            <input
                                                type="text"
                                                value={week.title}
                                                onChange={(e) => handleCurriculumChange(wIndex, null, 'title', e.target.value)}
                                                placeholder="Week Topic (e.g. Foundations of AI)"
                                                className="bg-transparent border-none p-0 focus:ring-0 text-lg font-bold w-full"
                                            />
                                        </div>
                                    </div>

                                    <div className="space-y-3">
                                        {week.days.map((day, dIndex) => (
                                            <div key={dIndex} className="bg-white/5 border border-white/10 p-4 rounded-2xl flex flex-col gap-3">
                                                <div className="flex items-center justify-between">
                                                    <span className="text-sm font-medium text-gray-400">Day {dIndex + 1}</span>
                                                    <button className="text-gray-500 hover:text-red-400">
                                                        <Trash2 size={16} />
                                                    </button>
                                                </div>
                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                    <input
                                                        type="text"
                                                        value={day.title}
                                                        onChange={(e) => handleCurriculumChange(wIndex, dIndex, 'title', e.target.value)}
                                                        placeholder="Lesson Title"
                                                        className="bg-black/20 border border-white/10 rounded-xl px-4 py-2 text-sm focus:outline-none focus:border-[#00ff88]"
                                                    />
                                                    <input
                                                        type="text"
                                                        value={day.video_url}
                                                        onChange={(e) => handleCurriculumChange(wIndex, dIndex, 'video_url', e.target.value)}
                                                        placeholder="Quick Video URL"
                                                        className="bg-black/20 border border-white/10 rounded-xl px-4 py-2 text-sm focus:outline-none focus:border-[#00ff88]"
                                                    />
                                                </div>
                                            </div>
                                        ))}
                                        <button
                                            type="button"
                                            onClick={() => addDay(wIndex)}
                                            className="flex items-center gap-2 text-xs font-bold text-[#00ff88] hover:underline px-4"
                                        >
                                            <Plus size={14} /> Add Day
                                        </button>
                                    </div>
                                </div>
                            ))}
                            <button
                                type="button"
                                onClick={addWeek}
                                className="w-full py-4 border-2 border-dashed border-white/10 rounded-3xl text-gray-500 hover:border-[#00ff88]/50 hover:text-[#00ff88] transition-all flex items-center justify-center gap-2"
                            >
                                <Plus size={20} /> Add New Week
                            </button>
                        </motion.div>
                    )}

                    {/* Step 3: Outcomes & Audience */}
                    {step === 3 && (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            {/* Learning Outcomes */}
                            <motion.div
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="bg-[#0a0a0f] border border-white/5 p-8 rounded-3xl space-y-6"
                            >
                                <div className="flex items-center justify-between">
                                    <h3 className="font-bold text-lg">Learning Outcomes</h3>
                                    <button
                                        type="button"
                                        onClick={() => addArrayItem('learning_outcomes')}
                                        className="p-2 bg-[#00ff88]/10 text-[#00ff88] rounded-lg"
                                    >
                                        <Plus size={18} />
                                    </button>
                                </div>
                                <div className="space-y-4">
                                    {formData.learning_outcomes.map((outcome, idx) => (
                                        <div key={idx} className="flex gap-3">
                                            <input
                                                type="text"
                                                value={outcome}
                                                onChange={(e) => handleArrayChange(idx, e.target.value, 'learning_outcomes')}
                                                placeholder="Outcome..."
                                                className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-[#00ff88]"
                                            />
                                            <button
                                                type="button"
                                                onClick={() => removeArrayItem(idx, 'learning_outcomes')}
                                                className="p-3 bg-red-500/10 text-red-500 rounded-xl border border-red-500/20"
                                            >
                                                <X size={18} />
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            </motion.div>

                            {/* Target Audience */}
                            <motion.div
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: 0.1 }}
                                className="bg-[#0a0a0f] border border-white/5 p-8 rounded-3xl space-y-6"
                            >
                                <div className="flex items-center justify-between">
                                    <h3 className="font-bold text-lg">Target Audience</h3>
                                    <button
                                        type="button"
                                        onClick={() => addArrayItem('target_audience')}
                                        className="p-2 bg-[#00ff88]/10 text-[#00ff88] rounded-lg"
                                    >
                                        <Plus size={18} />
                                    </button>
                                </div>
                                <div className="space-y-4">
                                    {formData.target_audience.map((audience, idx) => (
                                        <div key={idx} className="flex gap-3">
                                            <input
                                                type="text"
                                                value={audience}
                                                onChange={(e) => handleArrayChange(idx, e.target.value, 'target_audience')}
                                                placeholder="Who is this for?"
                                                className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-[#00ff88]"
                                            />
                                            <button
                                                type="button"
                                                onClick={() => removeArrayItem(idx, 'target_audience')}
                                                className="p-3 bg-red-500/10 text-red-500 rounded-xl border border-red-500/20"
                                            >
                                                <X size={18} />
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            </motion.div>
                        </div>
                    )}
                </form>

                {/* Footer Controls */}
                <div className="sticky bottom-0 left-0 right-0 p-4 bg-[#050507]/90 backdrop-blur-xl border-t border-white/10 z-[100] mt-auto">
                    <div className="max-w-4xl mx-auto flex items-center justify-between">
                        <button
                            type="button"
                            onClick={() => setStep(s => Math.max(1, s - 1))}
                            className="px-6 py-2 text-gray-400 font-bold hover:text-white disabled:opacity-30"
                            disabled={step === 1}
                        >
                            Previous
                        </button>
                        <div className="flex gap-4">
                            {step < 3 ? (
                                <button
                                    type="button"
                                    onClick={() => setStep(s => Math.min(3, s + 1))}
                                    className="px-8 py-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl font-bold transition-all"
                                >
                                    Continue
                                </button>
                            ) : (
                                <button
                                    type="button"
                                    onClick={handleSubmit}
                                    disabled={loading}
                                    className="px-10 py-3 bg-[#00ff88] text-black font-bold rounded-xl shadow-[0_0_20px_rgba(0,255,136,0.3)] hover:scale-105 transition-all"
                                >
                                    {loading ? 'Saving...' : 'Finish & Publish'}
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}
