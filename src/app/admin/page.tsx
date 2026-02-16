"use client";
import React, { useEffect, useState } from 'react';
import { subscribeToAuthChanges } from '@/lib/firebase/auth';
import type { User } from 'firebase/auth';
import LoginForm from '@/components/admin/LoginForm';
import Dashboard from '@/components/admin/Dashboard';

export const dynamic = 'force-dynamic';

export default function AdminPage() {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = subscribeToAuthChanges((currentUser) => {
            setUser(currentUser);
            setLoading(false);
        });
        return () => unsubscribe();
    }, []);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-slate-100">
                <div className="w-10 h-10 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin"></div>
            </div>
        );
    }

    if (!user) {
        return <LoginForm />;
    }

    return <Dashboard user={user} />;
}
