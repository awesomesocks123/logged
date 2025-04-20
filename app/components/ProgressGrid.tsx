'use client'
import { shallow } from "@liveblocks/client";
import { useEffect, useState, useMemo } from "react";
import { eachDayOfInterval, format, isSameDay, subDays, isValid } from "date-fns";
import { useStorage } from "../liveblocks.config";

const GRID_DAYS = 365; // Show 1 year of activity
const SQUARE_SIZE = 12;
const SQUARE_GAP = 4;

export default function ProgressGrid() {
    // 1. Memoize the card data transformation
    const cards = useStorage(root => {
        const cards = root.cards;
        if (!cards) return [];
        
        // Return stable references for unchanged cards
        return cards.map(c => ({
            name: c.name,
            id: c.id,
            createdAt: c.createdAt // Only include what we need
        }));
    }, shallow);

    // 2. Memoize the processed activity data
    const activityData = useMemo(() => {
        if (!cards || cards.length === 0) return {};

        const counts: Record<string, number> = {};
        cards.forEach(card => {
            try {
                if (!card.createdAt) return;
                
                const date = new Date(card.createdAt);
                if (!isValid(date)) return;
                
                const dateKey = format(date, 'yyyy-MM-dd');
                counts[dateKey] = (counts[dateKey] || 0) + 1;
            } catch (error) {
                console.error('Error processing card:', error);
            }
        });
        return counts;
    }, [cards]); // Only recompute when cards actually change

    // 3. Memoize grid calculations
    const { gridDays, today } = useMemo(() => {
        const today = new Date();
        return {
            today,
            gridDays: eachDayOfInterval({
                start: subDays(today, GRID_DAYS),
                end: today
            })
        };
    }, []);

    const getColorIntensity = (count: number) => {
        if (!count) return 'bg-gray-100';
        if (count <= 2) return 'bg-blue-200';
        if (count <= 4) return 'bg-blue-300';
        if (count <= 6) return 'bg-blue-400'; 
        return 'bg-blue-500';
    }

    if (!cards) {
        return <div className="p-4 bg-white rounded-lg shadow">Loading activity data...</div>;
    }

    return (
        <div className="p-4 bg-white rounded-lg shadow">
            <h3 className="text-lg font-semibold mb-4">Task Activity</h3>
            <div 
                className="grid grid-flow-col grid-rows-7 gap-1 overflow-x-auto pb-2"
                style={{
                    gridTemplateColumns: `repeat(${Math.ceil(GRID_DAYS/7)}, ${SQUARE_SIZE}px)`,
                    gridAutoFlow: 'column',
                    width: 'fit-content'
                }}
            >
                {gridDays.map((day, index) => {
                    const dateKey = format(day, 'yyyy-MM-dd');
                    const count = activityData[dateKey] || 0;
                    const isToday = isSameDay(day, today);
                    
                    return (
                        <div 
                            key={index}
                            className={`
                                ${getColorIntensity(count)} 
                                ${isToday ? 'border border-blue-700' : ''}
                                rounded-sm
                            `}
                            style={{
                                width: SQUARE_SIZE,
                                height: SQUARE_SIZE,
                            }}
                            title={`${format(day, 'MMM d, yyyy')}: ${count} tasks`}
                        />
                    );
                })}
            </div>
            <div className="flex justify-between mt-2 text-xs text-gray-500">
                <span>Less</span>
                <div className="flex gap-1">
                    <div className="w-3 h-3 bg-gray-100 rounded-sm" />
                    <div className="w-3 h-3 bg-blue-200 rounded-sm" />
                    <div className="w-3 h-3 bg-blue-300 rounded-sm" />
                    <div className="w-3 h-3 bg-blue-400 rounded-sm" />
                    <div className="w-3 h-3 bg-blue-500 rounded-sm" />
                </div>
                <span>More</span>
            </div>
        </div>
    );
}