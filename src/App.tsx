import React, { useState } from 'react';
import { SchoolProvider, useSchool } from './context/SchoolContext';
import { Sidebar, NavTab } from './components/Sidebar';
import { Navbar } from './components/Navbar';
import { ToastContainer } from './components/ToastContainer';
import { GlobalSearchModal } from './components/GlobalSearchModal';
import { AIChatbotModal } from './components/AIChatbotModal';

// Dashboards
import { SchoolAdminDashboard } from './components/dashboards/SchoolAdminDashboard';
import { SuperAdminDashboard } from './components/dashboards/SuperAdminDashboard';
import { TeacherDashboard } from './components/dashboards/TeacherDashboard';
import { StudentDashboard } from './components/dashboards/StudentDashboard';
import { ParentDashboard } from './components/dashboards/ParentDashboard';

// Modules
import { AdmissionsModule } from './components/modules/AdmissionsModule';
import { StudentsModule } from './components/modules/StudentsModule';
import { TeachersModule } from './components/modules/TeachersModule';
import { AttendanceModule } from './components/modules/AttendanceModule';
import { ExaminationModule } from './components/modules/ExaminationModule';
import { HomeworkModule } from './components/modules/HomeworkModule';
import { TimetableModule } from './components/modules/TimetableModule';
import { FeesModule } from './components/modules/FeesModule';
import { LibraryModule } from './components/modules/LibraryModule';
import { TransportModule } from './components/modules/TransportModule';
import { HostelModule } from './components/modules/HostelModule';
import { HRModule } from './components/modules/HRModule';
import { InventoryModule } from './components/modules/InventoryModule';
import { AccountsModule } from './components/modules/AccountsModule';
import { Sparkles, MessageSquare, BarChart2, Settings, ShieldCheck } from 'lucide-react';

const MainLayout: React.FC = () => {
  const { activeRole } = useSchool();
  const [activeTab, setActiveTab] = useState<NavTab>('dashboard');
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [isAIChatOpen, setIsAIChatOpen] = useState(false);

  const handleNavigateTab = (tab: NavTab) => {
    if (tab === 'ai_copilot') {
      setIsAIChatOpen(true);
      return;
    }
    setActiveTab(tab);
  };

  const renderActiveTabContent = () => {
    switch (activeTab) {
      case 'dashboard':
        switch (activeRole) {
          case 'super_admin':
            return <SuperAdminDashboard onNavigateTab={handleNavigateTab} onOpenCopilot={() => setIsAIChatOpen(true)} />;
          case 'school_admin':
            return <SchoolAdminDashboard onNavigateTab={handleNavigateTab} onOpenCopilot={() => setIsAIChatOpen(true)} />;
          case 'teacher':
            return <TeacherDashboard onNavigateTab={handleNavigateTab} onOpenCopilot={() => setIsAIChatOpen(true)} />;
          case 'student':
            return <StudentDashboard onNavigateTab={handleNavigateTab} onOpenCopilot={() => setIsAIChatOpen(true)} />;
          case 'parent':
            return <ParentDashboard onNavigateTab={handleNavigateTab} onOpenCopilot={() => setIsAIChatOpen(true)} />;
          default:
            return <SchoolAdminDashboard onNavigateTab={handleNavigateTab} onOpenCopilot={() => setIsAIChatOpen(true)} />;
        }
      case 'admissions':
        return <AdmissionsModule />;
      case 'students':
        return <StudentsModule />;
      case 'teachers':
        return <TeachersModule />;
      case 'attendance':
        return <AttendanceModule />;
      case 'exams':
        return <ExaminationModule />;
      case 'homework':
        return <HomeworkModule />;
      case 'timetable':
        return <TimetableModule />;
      case 'fees':
        return <FeesModule />;
      case 'library':
        return <LibraryModule />;
      case 'transport':
        return <TransportModule />;
      case 'hostel':
        return <HostelModule />;
      case 'hr':
        return <HRModule />;
      case 'inventory':
        return <InventoryModule />;
      case 'accounts':
        return <AccountsModule />;
      case 'communication':
        return (
          <div className="p-8 bg-white dark:bg-slate-800 rounded-3xl border border-slate-200 dark:border-slate-700 shadow-sm space-y-4 text-center">
            <MessageSquare className="w-12 h-12 text-indigo-600 mx-auto" />
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">Broadcast Communication Hub</h3>
            <p className="text-xs text-slate-500 max-w-md mx-auto">
              Automated SMS, WhatsApp & Email notifications triggered via Gemini AI routines.
            </p>
          </div>
        );
      case 'reports':
        return (
          <div className="p-8 bg-white dark:bg-slate-800 rounded-3xl border border-slate-200 dark:border-slate-700 shadow-sm space-y-4 text-center">
            <BarChart2 className="w-12 h-12 text-indigo-600 mx-auto" />
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">Academic Analytics & PDF Exporter</h3>
            <p className="text-xs text-slate-500 max-w-md mx-auto">
              Custom report generator with term comparisons and attendance distribution metrics.
            </p>
          </div>
        );
      case 'settings':
        return (
          <div className="p-8 bg-white dark:bg-slate-800 rounded-3xl border border-slate-200 dark:border-slate-700 shadow-sm space-y-4 text-center">
            <Settings className="w-12 h-12 text-indigo-600 mx-auto" />
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">System Settings & Role Permissions</h3>
            <p className="text-xs text-slate-500 max-w-md mx-auto">
              Configure campus branding, API integrations, Firestore rules, and access control.
            </p>
          </div>
        );
      default:
        return <SchoolAdminDashboard onNavigateTab={handleNavigateTab} onOpenCopilot={() => setIsAIChatOpen(true)} />;
    }
  };

  return (
    <div className="flex h-screen w-full bg-[#F8FAFC] dark:bg-slate-950 font-sans text-slate-900 dark:text-slate-100 overflow-hidden">
      {/* Sidebar Navigation */}
      <Sidebar
        activeTab={activeTab}
        setActiveTab={handleNavigateTab}
        isCollapsed={isSidebarCollapsed}
        setIsCollapsed={setIsSidebarCollapsed}
        isOpenMobile={isMobileSidebarOpen}
        setIsOpenMobile={setIsMobileSidebarOpen}
      />

      {/* Main Content Body */}
      <div className="flex-1 flex flex-col h-screen overflow-hidden">
        {/* Top Navbar */}
        <Navbar
          onToggleSidebar={() => setIsMobileSidebarOpen(!isMobileSidebarOpen)}
          onOpenAIChat={() => setIsAIChatOpen(true)}
          onOpenCopilotModule={() => handleNavigateTab('ai_copilot')}
        />

        {/* Scrollable View Area */}
        <main className="flex-1 overflow-y-auto p-4 lg:p-8 space-y-6">
          {renderActiveTabContent()}
        </main>

        {/* Sleek Bottom Micro-Interaction Status Bar */}
        <footer className="h-10 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-t border-slate-200 dark:border-slate-800 px-6 lg:px-8 flex items-center justify-between text-[10px] font-bold text-slate-400 tracking-widest shrink-0">
          <div className="flex items-center gap-6 uppercase">
            <span className="flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" /> SYSTEM UPTIME: 99.99%
            </span>
            <span className="hidden sm:inline text-slate-400">LAST BACKUP: 2 MINS AGO</span>
          </div>
          <div className="flex items-center gap-4">
            <span className="hover:text-indigo-600 dark:hover:text-indigo-400 cursor-pointer transition-colors">DOCS</span>
            <span className="hover:text-indigo-600 dark:hover:text-indigo-400 cursor-pointer transition-colors">SUPPORT</span>
            <span className="text-slate-200 dark:text-slate-700">|</span>
            <span className="text-slate-700 dark:text-slate-300 font-mono">VER 2026.08.06</span>
          </div>
        </footer>
      </div>

      {/* Overlays & Modals */}
      <ToastContainer />
      <GlobalSearchModal />
      <AIChatbotModal isOpen={isAIChatOpen} onClose={() => setIsAIChatOpen(false)} />
    </div>
  );
};

export default function App() {
  return (
    <SchoolProvider>
      <MainLayout />
    </SchoolProvider>
  );
}
