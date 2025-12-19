import React from 'react';
import { motion } from 'framer-motion';
import { Download, Share2, Award, ExternalLink } from 'lucide-react';
import { jsPDF } from 'jspdf';

export default function CertificateCard({ certificate, courseData }) {
    const generatePDF = () => {
        const doc = new jsPDF({
            orientation: 'landscape',
            unit: 'mm',
            format: 'a4'
        });

        // Certificate background
        doc.setFillColor(10, 10, 15);
        doc.rect(0, 0, 297, 210, 'F');

        // Border
        doc.setDrawColor(0, 255, 136);
        doc.setLineWidth(2);
        doc.rect(10, 10, 277, 190);

        // Inner border
        doc.setLineWidth(0.5);
        doc.rect(15, 15, 267, 180);

        // Title
        doc.setFontSize(36);
        doc.setTextColor(0, 255, 136);
        doc.text('CERTIFICATE OF COMPLETION', 148.5, 50, { align: 'center' });

        // Subtitle
        doc.setFontSize(14);
        doc.setTextColor(200, 200, 200);
        doc.text('This is to certify that', 148.5, 70, { align: 'center' });

        // Student Name (would come from user data)
        doc.setFontSize(28);
        doc.setTextColor(255, 255, 255);
        doc.text('[Student Name]', 148.5, 90, { align: 'center' });

        // Course info
        doc.setFontSize(14);
        doc.setTextColor(200, 200, 200);
        doc.text('has successfully completed', 148.5, 105, { align: 'center' });

        doc.setFontSize(20);
        doc.setTextColor(0, 255, 136);
        doc.text(courseData?.title || 'Course Title', 148.5, 120, { align: 'center' });

        // Date
        doc.setFontSize(12);
        doc.setTextColor(150, 150, 150);
        const date = new Date(certificate.issued_at).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
        doc.text(`Issued on: ${date}`, 148.5, 140, { align: 'center' });

        // Verification code
        doc.setFontSize(10);
        doc.text(`Verification Code: ${certificate.verification_code}`, 148.5, 155, { align: 'center' });

        // Platform name
        doc.setFontSize(16);
        doc.setTextColor(0, 255, 136);
        doc.text('AI MYNTRA', 148.5, 175, { align: 'center' });

        // Save
        doc.save(`certificate-${certificate.verification_code}.pdf`);
    };

    const shareOnLinkedIn = () => {
        const url = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(window.location.origin)}/certificates/${certificate.id}`;
        window.open(url, '_blank');
    };

    return (
        <motion.div
            whileHover={{ scale: 1.02, translateY: -5 }}
            className="bg-gradient-to-br from-[#121216] to-[#0a0a0f] border border-[#00ff88]/20 rounded-2xl overflow-hidden shadow-xl hover:shadow-[0_0_30px_rgba(0,255,136,0.15)] transition-all"
        >
            {/* Certificate Preview */}
            <div className="relative h-48 bg-gradient-to-br from-[#00ff88]/10 to-transparent flex items-center justify-center border-b border-[#00ff88]/20">
                <div className="text-center">
                    <div className="w-20 h-20 rounded-full bg-[#00ff88]/20 flex items-center justify-center mx-auto mb-4 border-2 border-[#00ff88]/30">
                        <Award size={40} className="text-[#00ff88]" />
                    </div>
                    <p className="text-sm text-gray-400">Certificate of Completion</p>
                </div>
            </div>

            {/* Content */}
            <div className="p-6">
                <h3 className="text-xl font-bold text-white mb-2 line-clamp-2">
                    {courseData?.title || 'Course Title'}
                </h3>
                <p className="text-sm text-gray-400 mb-4">
                    Issued: {new Date(certificate.issued_at).toLocaleDateString()}
                </p>

                <div className="flex items-center gap-2 text-xs text-gray-500 mb-4">
                    <span className="font-mono bg-white/5 px-2 py-1 rounded">
                        {certificate.verification_code}
                    </span>
                </div>

                {/* Actions */}
                <div className="flex gap-2">
                    <button
                        onClick={generatePDF}
                        className="flex-1 py-2 bg-[#00ff88] text-black font-semibold rounded-xl hover:scale-105 transition-all flex items-center justify-center gap-2"
                    >
                        <Download size={16} />
                        Download
                    </button>
                    <button
                        onClick={shareOnLinkedIn}
                        className="px-4 py-2 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 transition-all"
                        title="Share on LinkedIn"
                    >
                        <Share2 size={16} />
                    </button>
                </div>
            </div>
        </motion.div>
    );
}
