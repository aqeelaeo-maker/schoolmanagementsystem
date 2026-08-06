import React from 'react';
import { useSchool } from '../../context/SchoolContext';
import { Package, Search, Plus } from 'lucide-react';

export const InventoryModule: React.FC = () => {
  const { inventory } = useSchool();

  return (
    <div className="space-y-6 animate-in fade-in">
      <div className="p-6 rounded-3xl bg-gradient-to-r from-indigo-900 via-blue-900 to-slate-900 text-white shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <span className="px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider rounded-lg bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
            Inventory & Asset Management 2026
          </span>
          <h2 className="text-2xl font-black mt-2 tracking-tight">School Equipment & Supplies Stock</h2>
          <p className="text-xs text-indigo-200 mt-1">
            Track lab equipment, sports gear, IT hardware, uniforms, and stationary stock levels.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {inventory.map((item) => (
          <div
            key={item.id}
            className="p-5 bg-white dark:bg-slate-800 rounded-3xl border border-slate-200/80 dark:border-slate-700/80 shadow-xs flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="px-2 py-0.5 text-[10px] font-bold rounded bg-indigo-100 text-indigo-700 dark:bg-indigo-950/60 dark:text-indigo-300">
                  {item.category}
                </span>
                <span className="text-[10px] text-slate-400 font-mono">Room: {item.location}</span>
              </div>

              <h4 className="font-bold text-sm text-slate-900 dark:text-white mb-1">{item.itemName}</h4>
              <p className="text-xs text-slate-400 mb-3">Unit Price: ${item.unitPrice}</p>

              <div className="p-2.5 rounded-2xl bg-slate-50 dark:bg-slate-700/40 text-xs font-semibold flex justify-between">
                <span className="text-slate-400">In Stock:</span>
                <span className="text-indigo-600 font-bold">{item.quantity} Units</span>
              </div>
            </div>

            <button className="mt-4 w-full py-1.5 bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 text-slate-700 dark:text-slate-200 font-bold text-xs rounded-xl">
              Restock Item
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
