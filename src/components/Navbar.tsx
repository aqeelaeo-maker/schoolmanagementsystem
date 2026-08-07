import React, { useState } from 'react';
import { useSchool } from '../context/SchoolContext';
import {
  Search,
  Bell,
  Sparkles,
  ChevronDown,
  Building2,
  Shield,
  UserCheck,
  GraduationCap,
  Users,
  CheckCircle2,
  Menu,
  Sun,
  Moon
} from 'lucide-react';
import { UserRole } from '../types';

interface NavbarProps {
  onToggleSidebar?: () => void;
  onOpenAIChat?: () => void;
  onOpenCopilotModule?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onToggleSidebar,
  onOpenAIChat,
  onOpenCopilotModule
}) => {
  const {
    currentUser,
    activeRole,
    switchRole,
    activeSchool,
    setActiveSchool,
    schools,
    setIsSearchOpen,
    messages,
    theme,
    toggleTheme
  } = useSchool();

  const [isRoleMenuOpen, setIsRoleMenuOpen] = useState(false);
  const [isSchoolMenuOpen, setIsSchoolMenuOpen] = useState(false);
  const [isNotifyOpen, setIsNotifyOpen] = useState(false);

  const rolesConfig: { role: UserRole; label: string; icon: React.ReactNode; color: string }[] = [
    { role: 'super_admin', label: 'Super Admin Portal', icon: <Shield className="w-4 h-4" />, color: 'bg-purple-900/60 text-purple-200 border border-purple-700/50' },
    { role: 'school_admin', label: 'School Admin Portal', icon: <Building2 className="w-4 h-4" />, color: 'bg-indigo-900/60 text-indigo-200 border border-indigo-700/50' },
    { role: 'teacher', label: 'Teacher Portal', icon: <UserCheck className="w-4 h-4" />, color: 'bg-blue-900/60 text-blue-200 border border-blue-700/50' },
    { role: 'student', label: 'Student Portal', icon: <GraduationCap className="w-4 h-4" />, color: 'bg-emerald-900/60 text-emerald-200 border border-emerald-700/50' },
    { role: 'parent', label: 'Parent Portal', icon: <Users className="w-4 h-4" />, color: 'bg-amber-900/60 text-amber-200 border border-amber-700/50' },
  ];

  const currentRoleInfo = rolesConfig.find((r) => r.role === activeRole) || rolesConfig[1];

  return (
    <header className="sticky top-0 z-40 bg-slate-900 text-white border-b border-slate-800 px-4 lg:px-6 h-16 flex items-center justify-between gap-4 shadow-sm">
      {/* Left: Mobile Menu Toggle & Brand / School Selector */}
      <div className="flex items-center gap-3">
        <button
          onClick={onToggleSidebar}
          className="lg:hidden p-2 text-slate-300 hover:text-white hover:bg-slate-800 rounded-xl transition-colors"
          title="Toggle Sidebar"
        >
          <Menu className="w-5 h-5" />
        </button>

        {/* Brand Logo */}
        <div className="flex items-center gap-2.5 mr-2">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-600 via-blue-600 to-cyan-500 flex items-center justify-center text-white font-bold text-lg shadow-md shadow-indigo-500/20">
            E
          </div>
          <div className="hidden sm:block">
            <h1 className="font-bold text-white text-base tracking-tight leading-none flex items-center gap-1.5">
              EduPulse <span className="bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent">AI</span>
            </h1>
            <p className="text-[10px] text-slate-400 font-medium">Smart School Management 2026</p>
          </div>
        </div>

        {/* Active School Dropdown */}
        <div className="relative hidden md:block">
          <button
            onClick={() => setIsSchoolMenuOpen(!isSchoolMenuOpen)}
            className="flex items-center gap-2 px-3 py-1.5 bg-slate-800 hover:bg-slate-700/80 text-slate-200 rounded-xl text-xs font-semibold transition-all border border-slate-700/80"
          >
            <Building2 className="w-3.5 h-3.5 text-indigo-400" />
            <span className="max-w-[140px] truncate">{activeSchool.name}</span>
            <ChevronDown className="w-3 h-3 text-slate-400" />
          </button>

          {isSchoolMenuOpen && (
            <div className="absolute left-0 mt-2 w-64 bg-slate-800 border border-slate-700 rounded-2xl shadow-xl p-2 z-50 animate-in fade-in slide-in-from-top-1 text-slate-200">
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider px-2 py-1">Select Campus</p>
              {schools.map((sch) => (
                <button
                  key={sch.id}
                  onClick={() => {
                    setActiveSchool(sch);
                    setIsSchoolMenuOpen(false);
                  }}
                  className={`w-full flex items-center justify-between text-left px-2.5 py-2 rounded-xl text-xs font-medium transition-colors ${
                    activeSchool.id === sch.id
                      ? 'bg-indigo-950/80 text-indigo-300 font-semibold border border-indigo-800/50'
                      : 'hover:bg-slate-700/60 text-slate-200'
                  }`}
                >
                  <span className="truncate">{sch.name}</span>
                  {activeSchool.id === sch.id && <CheckCircle2 className="w-3.5 h-3.5 text-indigo-400" />}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Middle: Global Search Input */}
      <div className="flex-1 max-w-md mx-2">
        <button
          onClick={() => setIsSearchOpen(true)}
          className="w-full flex items-center justify-between gap-3 px-3.5 py-1.5 bg-slate-800/90 hover:bg-slate-800 text-slate-300 rounded-xl text-xs font-normal border border-slate-700/80 transition-all shadow-inner"
        >
          <div className="flex items-center gap-2 truncate">
            <Search className="w-3.5 h-3.5 text-slate-400" />
            <span className="truncate">Search students, teachers, invoices, books...</span>
          </div>
          <kbd className="hidden sm:inline-flex items-center gap-0.5 px-1.5 py-0.5 text-[10px] font-mono text-slate-400 bg-slate-900 rounded border border-slate-700 shadow-xs">
            ⌘K
          </kbd>
        </button>
      </div>

      {/* Right: AI Quick Action, Role Switcher, Notifications & User Avatar */}
      <div className="flex items-center gap-2 sm:gap-3">
        {/* AI Agent Active Badge */}
        <div className="hidden sm:flex items-center gap-2 bg-indigo-950/80 text-indigo-300 px-3 py-1.5 rounded-full text-[11px] font-bold border border-indigo-800/60">
          <div className="w-2 h-2 bg-indigo-400 rounded-full animate-pulse" />
          <span>AI AGENT ACTIVE</span>
        </div>

        {/* AI Studio Assistant Button */}
        <button
          onClick={onOpenCopilotModule || onOpenAIChat}
          className="flex items-center gap-1.5 px-3 py-1.5 bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-500 hover:to-blue-500 text-white rounded-xl text-xs font-semibold shadow-sm transition-all hover:shadow-indigo-500/25 active:scale-95"
          title="Open Gemini AI Co-Pilot"
        >
          <Sparkles className="w-3.5 h-3.5 text-amber-300 animate-pulse" />
          <span className="hidden sm:inline">AI Assistant</span>
        </button>

        {/* Role Portal Quick Switcher Dropdown */}
        <div className="relative">
          <button
            onClick={() => setIsRoleMenuOpen(!isRoleMenuOpen)}
            className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl text-xs font-semibold transition-all border border-slate-700 hover:bg-slate-800 ${currentRoleInfo.color}`}
          >
            {currentRoleInfo.icon}
            <span className="hidden md:inline">{currentRoleInfo.label.replace(' Portal', '')}</span>
            <ChevronDown className="w-3 h-3 opacity-70" />
          </button>

          {isRoleMenuOpen && (
            <div className="absolute right-0 mt-2 w-56 bg-slate-800 border border-slate-700 rounded-2xl shadow-2xl p-2 z-50 animate-in fade-in slide-in-from-top-2 text-slate-200">
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider px-2.5 py-1">Switch User Role</p>
              {rolesConfig.map((r) => (
                <button
                  key={r.role}
                  onClick={() => {
                    switchRole(r.role);
                    setIsRoleMenuOpen(false);
                  }}
                  className={`w-full flex items-center justify-between px-2.5 py-2 rounded-xl text-xs font-medium transition-all ${
                    activeRole === r.role
                      ? 'bg-indigo-950/80 text-indigo-300 font-semibold border border-indigo-800/50'
                      : 'hover:bg-slate-700/60 text-slate-200'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    {r.icon}
                    <span>{r.label}</span>
                  </div>
                  {activeRole === r.role && <CheckCircle2 className="w-3.5 h-3.5 text-indigo-400" />}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Light / Dark Mode Theme Toggle Button */}
        <button
          onClick={toggleTheme}
          className="p-2 text-slate-300 hover:bg-slate-800 rounded-xl transition-all duration-200 cursor-pointer active:scale-90"
          title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
        >
          {theme === 'dark' ? (
            <Sun className="w-4 h-4 text-amber-400 animate-in spin-in-180 duration-300" />
          ) : (
            <Moon className="w-4 h-4 text-slate-300 animate-in spin-in-180 duration-300" />
          )}
        </button>

        {/* Notifications Bell */}
        <div className="relative">
          <button
            onClick={() => setIsNotifyOpen(!isNotifyOpen)}
            className="relative p-2 text-slate-300 hover:bg-slate-800 rounded-xl transition-colors"
            title="Notifications"
          >
            <Bell className="w-4 h-4" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-indigo-500 ring-2 ring-slate-900" />
          </button>

          {isNotifyOpen && (
            <div className="absolute right-0 mt-2 w-80 bg-slate-800 border border-slate-700 rounded-2xl shadow-2xl p-3 z-50 animate-in fade-in slide-in-from-top-2 text-slate-200">
              <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-700">
                <h4 className="font-semibold text-xs text-white">Recent Notifications</h4>
                <span className="text-[10px] text-indigo-400 font-medium cursor-pointer">Mark all read</span>
              </div>
              <div className="space-y-2 max-h-60 overflow-y-auto">
                {messages.map((m) => (
                  <div key={m.id} className="p-2 bg-slate-900/60 rounded-xl text-xs border border-slate-700/50">
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-slate-200">{m.title}</span>
                      <span className="text-[10px] text-slate-400">{m.timestamp.split(' ')[0]}</span>
                    </div>
                    <p className="text-slate-400 text-[11px] mt-0.5 line-clamp-2">{m.message}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* User Profile Avatar */}
        <div className="flex items-center gap-2 pl-2 border-l border-slate-800">
          <img
            src={currentUser.avatar}
            alt={currentUser.name}
            className="w-8 h-8 rounded-full object-cover ring-2 ring-indigo-500/40"
          />
          <div className="hidden lg:block text-left">
            <h4 className="text-xs font-semibold text-slate-200 leading-tight">{currentUser.name}</h4>
            <p className="text-[10px] text-slate-400 capitalize">{activeRole.replace('_', ' ')}</p>
          </div>
        </div>
      </div>
    </header>
  );
};
