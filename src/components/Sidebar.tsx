import React from 'react';
import { useSchool } from '../context/SchoolContext';
import {
  LayoutDashboard,
  UserPlus,
  Users,
  GraduationCap,
  CalendarCheck,
  Award,
  FileText,
  CalendarDays,
  CreditCard,
  BookOpen,
  Bus,
  Home,
  Briefcase,
  Package,
  DollarSign,
  MessageSquare,
  Sparkles,
  BarChart2,
  Settings,
  ChevronLeft,
  ChevronRight,
  ShieldAlert
} from 'lucide-react';
import { UserRole } from '../types';

export type NavTab =
  | 'dashboard'
  | 'admissions'
  | 'students'
  | 'teachers'
  | 'classes'
  | 'attendance'
  | 'exams'
  | 'homework'
  | 'timetable'
  | 'fees'
  | 'library'
  | 'transport'
  | 'hostel'
  | 'hr'
  | 'inventory'
  | 'accounts'
  | 'communication'
  | 'ai_copilot'
  | 'reports'
  | 'settings';

interface SidebarProps {
  activeTab: NavTab;
  setActiveTab: (tab: NavTab) => void;
  isCollapsed: boolean;
  setIsCollapsed: (collapsed: boolean) => void;
  isOpenMobile?: boolean;
  setIsOpenMobile?: (open: boolean) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  activeTab,
  setActiveTab,
  isCollapsed,
  setIsCollapsed,
  isOpenMobile,
  setIsOpenMobile
}) => {
  const { activeRole } = useSchool();

  interface MenuItem {
    id: NavTab;
    label: string;
    icon: React.ReactNode;
    roles: UserRole[];
    badge?: string;
  }

  const menuItems: MenuItem[] = [
    { id: 'dashboard', label: 'Dashboard', icon: <LayoutDashboard className="w-4 h-4" />, roles: ['super_admin', 'school_admin', 'teacher', 'student', 'parent'] },
    { id: 'admissions', label: 'Online Admissions', icon: <UserPlus className="w-4 h-4" />, roles: ['super_admin', 'school_admin'], badge: 'New' },
    { id: 'students', label: 'Students Directory', icon: <GraduationCap className="w-4 h-4" />, roles: ['super_admin', 'school_admin', 'teacher'] },
    { id: 'teachers', label: 'Teachers & Staff', icon: <Users className="w-4 h-4" />, roles: ['super_admin', 'school_admin', 'teacher', 'student', 'parent'] },
    { id: 'attendance', label: 'Attendance & QR', icon: <CalendarCheck className="w-4 h-4" />, roles: ['super_admin', 'school_admin', 'teacher', 'student', 'parent'] },
    { id: 'exams', label: 'Exams & Result Cards', icon: <Award className="w-4 h-4" />, roles: ['super_admin', 'school_admin', 'teacher', 'student', 'parent'] },
    { id: 'homework', label: 'Homework & Notes', icon: <FileText className="w-4 h-4" />, roles: ['super_admin', 'school_admin', 'teacher', 'student', 'parent'] },
    { id: 'timetable', label: 'Timetable & Generator', icon: <CalendarDays className="w-4 h-4" />, roles: ['super_admin', 'school_admin', 'teacher', 'student', 'parent'] },
    { id: 'fees', label: 'Fee & Online Pay', icon: <CreditCard className="w-4 h-4" />, roles: ['super_admin', 'school_admin', 'student', 'parent'] },
    { id: 'library', label: 'Library Catalog', icon: <BookOpen className="w-4 h-4" />, roles: ['super_admin', 'school_admin', 'teacher', 'student'] },
    { id: 'transport', label: 'Transport & GPS Bus', icon: <Bus className="w-4 h-4" />, roles: ['super_admin', 'school_admin', 'parent', 'student'] },
    { id: 'hostel', label: 'Hostel & Rooms', icon: <Home className="w-4 h-4" />, roles: ['super_admin', 'school_admin', 'student'] },
    { id: 'hr', label: 'HR & Payroll', icon: <Briefcase className="w-4 h-4" />, roles: ['super_admin', 'school_admin'] },
    { id: 'inventory', label: 'Inventory & Stock', icon: <Package className="w-4 h-4" />, roles: ['super_admin', 'school_admin'] },
    { id: 'accounts', label: 'Accounts & Ledger', icon: <DollarSign className="w-4 h-4" />, roles: ['super_admin', 'school_admin'] },
    { id: 'communication', label: 'SMS & WhatsApp Hub', icon: <MessageSquare className="w-4 h-4" />, roles: ['super_admin', 'school_admin', 'teacher'] },
    { id: 'ai_copilot', label: 'Gemini AI Co-Pilot', icon: <Sparkles className="w-4 h-4 text-amber-500" />, roles: ['super_admin', 'school_admin', 'teacher', 'student', 'parent'], badge: 'AI 2026' },
    { id: 'reports', label: 'Reports & Analytics', icon: <BarChart2 className="w-4 h-4" />, roles: ['super_admin', 'school_admin', 'teacher'] },
    { id: 'settings', label: 'System Settings', icon: <Settings className="w-4 h-4" />, roles: ['super_admin', 'school_admin'] },
  ];

  const filteredItems = menuItems.filter((item) => (item.roles || []).includes(activeRole));

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpenMobile && (
        <div
          onClick={() => setIsOpenMobile && setIsOpenMobile(false)}
          className="fixed inset-0 z-40 bg-slate-900/60 backdrop-blur-xs lg:hidden"
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={`fixed lg:sticky top-0 left-0 z-50 h-screen bg-[#007BA7] text-white border-r border-[#00688E] transition-all duration-300 flex flex-col justify-between shadow-lg ${
          isCollapsed ? 'w-20' : 'w-64'
        } ${isOpenMobile ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}
      >
        {/* Top Branding Header */}
        <div className="p-4 flex items-center justify-between border-b border-white/15">
          {!isCollapsed && (
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-white text-[#007BA7] flex items-center justify-center font-black text-base shadow-sm">
                E
              </div>
              <span className="font-extrabold text-white text-base tracking-tight">
                EduPulse <span className="text-cyan-200">AI</span>
              </span>
            </div>
          )}
          {isCollapsed && (
            <div className="w-10 h-10 mx-auto rounded-xl bg-white text-[#007BA7] flex items-center justify-center font-black text-lg shadow-sm">
              E
            </div>
          )}

          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="hidden lg:flex p-1.5 text-white/70 hover:text-white hover:bg-white/10 rounded-xl transition-colors cursor-pointer"
            title={isCollapsed ? 'Expand Sidebar' : 'Collapse Sidebar'}
          >
            {isCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
          </button>
        </div>

        {/* Navigation List */}
        <div className="flex-1 overflow-y-auto px-3 py-4 space-y-1 scrollbar-thin scrollbar-thumb-white/20">
          {!isCollapsed && (
            <p className="text-[10px] font-bold text-white/60 uppercase tracking-wider px-3 mb-2">Main Navigation</p>
          )}

          {filteredItems.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  setActiveTab(item.id);
                  if (setIsOpenMobile) setIsOpenMobile(false);
                }}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold transition-all relative cursor-pointer ${
                  isActive
                    ? 'bg-white text-[#007BA7] shadow-md font-bold'
                    : 'text-white/85 hover:text-white hover:bg-white/10'
                } ${isCollapsed ? 'justify-center px-0' : ''}`}
                title={item.label}
              >
                <div className={`${isActive ? 'text-[#007BA7]' : 'text-white/90'}`}>{item.icon}</div>

                {!isCollapsed && (
                  <div className="flex-1 flex items-center justify-between truncate">
                    <span className="truncate">{item.label}</span>
                    {item.badge && (
                      <span className={`ml-2 px-1.5 py-0.5 text-[9px] font-bold rounded-md ${
                        isActive
                          ? 'bg-[#007BA7]/10 text-[#007BA7] border border-[#007BA7]/20'
                          : 'bg-white/20 text-white border border-white/30'
                      }`}>
                        {item.badge}
                      </span>
                    )}
                  </div>
                )}
              </button>
            );
          })}
        </div>

        {/* Bottom AI Assistant Card in Sidebar */}
        <div className="p-3 mt-auto border-t border-white/15">
          {!isCollapsed ? (
            <div className="p-4 bg-[#005F82] border border-white/20 rounded-2xl text-white relative overflow-hidden shadow-md">
              <div className="relative z-10">
                <p className="text-[10px] font-bold uppercase tracking-wider text-cyan-200 mb-1 flex items-center gap-1">
                  <Sparkles className="w-3 h-3 text-amber-300" /> AI Assistant
                </p>
                <p className="text-xs font-medium leading-relaxed text-white">"Optimize Grade 10 timetable?"</p>
                <button
                  onClick={() => setActiveTab('ai_copilot')}
                  className="mt-3 w-full bg-white text-[#007BA7] hover:bg-cyan-50 py-1.5 rounded-xl text-xs font-bold transition-all shadow-xs cursor-pointer"
                >
                  Ask AI
                </button>
              </div>
              <div className="absolute -right-4 -bottom-4 w-16 h-16 bg-white/10 rounded-full blur-xl pointer-events-none" />
            </div>
          ) : (
            <button
              onClick={() => setActiveTab('ai_copilot')}
              className="w-10 h-10 mx-auto bg-white text-[#007BA7] hover:bg-cyan-50 rounded-xl flex items-center justify-center font-bold shadow-md cursor-pointer"
              title="Ask AI Assistant"
            >
              <Sparkles className="w-4 h-4 text-[#007BA7]" />
            </button>
          )}
        </div>
      </aside>
    </>
  );
};
