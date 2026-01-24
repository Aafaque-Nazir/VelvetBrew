"use client";
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/Button';
import { Save, Shield, Database, Bell } from 'lucide-react';

export default function AdminSettingsPage() {
    const [loading, setLoading] = useState(false);
    const [settings, setSettings] = useState({ maintenanceMode: false });

    useEffect(() => {
        // Fetch current settings
        fetch('/api/admin/settings')
            .then(res => res.json())
            .then(data => setSettings(data))
            .catch(err => console.error(err));
    }, []);

    const handleSave = async () => {
        setLoading(true);
        try {
            const res = await fetch('/api/admin/settings', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(settings)
            });
            
            if (res.ok) {
                alert("Settings saved successfully!");
                window.location.reload(); // Refresh to reflect global changes (like layout check)
            }
        } catch (error) {
             alert("Failed to save settings");
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="max-w-4xl">
             <div className="mb-8">
                <h1 className="text-3xl font-bold text-white">Settings</h1>
                <p className="text-white/40">Configure system preferences and security.</p>
            </div>

            <div className="space-y-6">
                {/* General Settings */}
                <Section title="General Preference" icon={<Database size={20} />}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                         <div className="space-y-2">
                            <label className="text-xs font-bold text-white/40 uppercase tracking-widest">Store Name</label>
                            <input disabled value="VelvetBrew" className="w-full bg-black/40 border border-white/10 rounded-xl p-4 text-white opacity-50 cursor-not-allowed"/>
                        </div>
                        <div className="space-y-2">
                            <label className="text-xs font-bold text-white/40 uppercase tracking-widest">Support Email</label>
                            <input defaultValue="hello@velvetbrew.com" className="w-full bg-black/40 border border-white/10 rounded-xl p-4 text-white focus:border-bronze-500 outline-none"/>
                        </div>
                    </div>
                </Section>

                {/* Notifications */}
                <Section title="Admin Notifications" icon={<Bell size={20} />}>
                    <div className="space-y-4">
                        <Toggle label="Email me when a new order arrives" defaultChecked />
                        <Toggle label="Email me when stock is low" />
                        <Toggle label="Weekly performance report" defaultChecked />
                    </div>
                </Section>

                 {/* Security */}
                <Section title="Security & Access" icon={<Shield size={20} />}>
                     <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-xl flex items-center justify-between">
                         <div>
                             <h4 className="text-red-500 font-bold mb-1">Maintenance Mode</h4>
                             <p className="text-red-400/60 text-sm">Disable the store for customers temporarily.</p>
                         </div>
                         <div className="h-6 w-11 relative">
                            <Toggle 
                                label="" 
                                checked={settings.maintenanceMode} 
                                onChange={(val) => setSettings({...settings, maintenanceMode: val})}
                            />
                         </div>
                     </div>
                </Section>

                <div className="pt-6 border-t border-white/5 flex justify-end">
                    <Button onClick={handleSave} className="gap-2 min-w-[150px]">
                        {loading ? 'Saving...' : <><Save size={18} /> Save Changes</>}
                    </Button>
                </div>
            </div>
        </div>
    )
}

function Section({ title, icon, children }) {
    return (
        <div className="bg-[#151515] border border-white/5 rounded-2xl p-6 md:p-8">
            <div className="flex items-center gap-3 mb-6">
                <div className="text-bronze-500">{icon}</div>
                <h2 className="text-xl font-bold text-white">{title}</h2>
            </div>
            {children}
        </div>
    )
}

function Toggle({ label, defaultChecked, checked, onChange }) {
    // Allow controlled or uncontrolled
    const [localChecked, setLocalChecked] = useState(defaultChecked || false);
    const isChecked = checked !== undefined ? checked : localChecked;

    const handleClick = () => {
        const newVal = !isChecked;
        setLocalChecked(newVal);
        if (onChange) onChange(newVal);
    }

    return (
        <div className="flex items-center justify-between group cursor-pointer" onClick={handleClick}>
            {label && <span className="text-white/80 group-hover:text-white transition-colors">{label}</span>}
             <div className={`h-6 w-11 rounded-full relative transition-colors ${isChecked ? 'bg-bronze-500' : 'bg-white/10'}`}>
                <div className={`absolute top-1 w-4 h-4 bg-black rounded-full shadow-sm transition-all ${isChecked ? 'right-1' : 'left-1'}`} />
            </div>
        </div>
    )
}
