import Modal from "@/component/modal/page";
import React from "react";
import { Mail, User, Shield } from "lucide-react";

const StudentModal = ({ student, onClose }) => {
    if (!student) return null;

    return (
        <Modal onClose={onClose} modalBgColor="bg-gray-100">
            {/* Header */}
            <div className="flex flex-col items-center text-center">
                <div className="relative">
                    <img
                        src={student.imageUrl || "/default-avatar.png"}
                        alt={student.name}
                        className="w-28 h-28 rounded-full border-4 border-blue-500 shadow-lg object-cover bg-white"
                        onError={(e) => (e.currentTarget.src = "https://ui-avatars.com/api/?name=Student&background=random")}
                    />
                </div>
                <h2 className="mt-4 text-2xl font-bold text-gray-800">
                    {student.name}
                </h2>
                <p className="text-sm text-blue-600 font-medium uppercase tracking-wide">
                    {student.role || "Student"}
                </p>
            </div>

            {/* Info Section */}
            <div className="mt-6 divide-y divide-gray-300 rounded-lg bg-white shadow-sm">
                <div className="flex justify-between items-center p-3">
                    <span className="text-gray-600 font-medium flex items-center gap-2">
                        <Mail className="w-4 h-4 text-blue-500" />
                        Email
                    </span>
                    <span className="text-gray-800 text-sm md:text-base">{student.email}</span>
                </div>
                <div className="flex justify-between items-center p-3">
                    <span className="text-gray-600 font-medium flex items-center gap-2">
                        <User className="w-4 h-4 text-blue-500" />
                        User ID
                    </span>
                    <span className="text-gray-500 text-sm font-mono truncate max-w-[150px]">{student.id}</span>
                </div>
                <div className="flex justify-between items-center p-3">
                    <span className="text-gray-600 font-medium flex items-center gap-2">
                        <Shield className="w-4 h-4 text-blue-500" />
                        Account Status
                    </span>
                    <span className="px-2 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-800">
                        Active
                    </span>
                </div>
            </div>

            {/* Footer Buttons */}
            <div className="flex justify-end gap-3 pt-6">
                <button
                    onClick={onClose}
                    className="px-4 py-2 border rounded-lg bg-white text-gray-700 hover:bg-gray-50 transition shadow-sm font-medium"
                >
                    Close
                </button>
            </div>
        </Modal>
    );
};

export default StudentModal;
