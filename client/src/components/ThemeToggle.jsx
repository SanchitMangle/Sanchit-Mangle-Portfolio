import React, { useEffect, useState } from 'react'
import { Moon, Sun } from 'lucide-react'
import { cn } from '../lib/utils.js'
import { motion, AnimatePresence } from 'framer-motion'

const ThemeToggle = () => {
    const [theme, setTheme] = useState('dark')

    useEffect(() => {
        const storedTheme = localStorage.getItem('theme')
        const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches

        if (storedTheme === 'dark' || (!storedTheme && systemPrefersDark)) {
            setTheme('dark')
            document.documentElement.classList.add('dark')
            document.documentElement.classList.remove('light')
        } else {
            setTheme('light')
            document.documentElement.classList.remove('dark')
            document.documentElement.classList.add('light')
        }
    }, [])

    const toggleTheme = () => {
        const newTheme = theme === 'dark' ? 'light' : 'dark'
        setTheme(newTheme)

        if (newTheme === 'dark') {
            document.documentElement.classList.add('dark')
            document.documentElement.classList.remove('light')
        } else {
            document.documentElement.classList.remove('dark')
            document.documentElement.classList.add('light')
        }

        localStorage.setItem('theme', newTheme)
    }

    return (
        <button
            className={cn(
                "p-2.5 rounded-full transition-all duration-300 relative border border-white/10 overflow-hidden group",
                theme === 'dark'
                    ? "bg-white/5 hover:bg-white/10 text-primary"
                    : "bg-black/5 hover:bg-black/10 text-amber-500"
            )}
            onClick={toggleTheme}
            aria-label="Toggle Theme"
        >
            <AnimatePresence mode="wait" initial={false}>
                <motion.div
                    key={theme}
                    initial={{ y: -20, opacity: 0, rotate: -90 }}
                    animate={{ y: 0, opacity: 1, rotate: 0 }}
                    exit={{ y: 20, opacity: 0, rotate: 90 }}
                    transition={{ duration: 0.2 }}
                >
                    {theme === 'dark' ? (
                        <Moon className='w-5 h-5' fill="currentColor" />
                    ) : (
                        <Sun className='w-5 h-5' fill="currentColor" />
                    )}
                </motion.div>
            </AnimatePresence>

            {/* Hover Glow Effect */}
            <div className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-primary/10 blur-xl" />
        </button>
    )
}

export default ThemeToggle
