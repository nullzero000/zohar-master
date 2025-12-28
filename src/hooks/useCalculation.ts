import { useCallback } from 'react';
import { useGematriaStore } from '@/stores/gematriaStore';
import { getHebrewValue, getMiluyExpansion } from '@/lib/gematriaUtils';

interface LevelResult {
    chars: string[];
    totalValue: number;
    reducedValue: number;
}

export const useCalculation = () => {
    const { useSofitMode, setCalculationData } = useGematriaStore();

    /**
     * Helper to reduce a number to 1-9 (Mispar Katan)
     */
    const getReducedValue = (n: number): number => {
        if (n === 0) return 0;
        let sum = n;
        while (sum > 9) {
            sum = String(sum).split('').reduce((acc, d) => acc + parseInt(d), 0);
        }
        return sum;
    };

    /**
     * Process a list of characters into a Level Result
     */
    const processLevel = useCallback((chars: string[]): LevelResult => {
        let total = 0;
        
        chars.forEach(char => {
            // Here we pass the 'useSofitMode' flag. 
            // If the expansion contains a Sofit char (e.g. Mem -> Mem + Mem Sofit),
            // and the mode is ON, it will calculate as 40 + 600 = 640.
            total += getHebrewValue(char, useSofitMode);
        });

        return {
            chars,
            totalValue: total,
            reducedValue: getReducedValue(total)
        };
    }, [useSofitMode]); // Re-create if mode changes

    /**
     * Main Trigger Function
     */
// Inside useCalculation.ts

const calculateAll = useCallback((text: string) => {
    if (!text.trim()) {
        setCalculationData({
            levels: [],
            // FIX: Provide a valid empty object instead of null
            analysis: {
                mixedColor: 'transparent',
                mixedColorName: '',
                frequencyMap: {},
                dominant: '',
                total: 0
            }, 
            total: 0,
            reduced: 0
        });
        return;
    }
    // ... rest of the function

        // --- LEVEL 0: ROOT (Standard Input) ---
        // Clean input: remove spaces for pure math, or keep them? 
        // Usually, Gematria ignores spaces. Let's filter for valid Hebrew.
        const rootChars = text.split('').filter(c => c !== ' ');
        const level0 = processLevel(rootChars);

        // --- LEVEL 1: MILUY (Expansion) ---
        // Iterate root chars -> expand each -> flatten array
        const level1Chars = rootChars.flatMap(char => getMiluyExpansion(char));
        const level1 = processLevel(level1Chars);

        // --- LEVEL 2: MILUY OF MILUY (Recursive Expansion) ---
        // Iterate Level 1 chars -> expand each -> flatten
        const level2Chars = level1Chars.flatMap(char => getMiluyExpansion(char));
        const level2 = processLevel(level2Chars);

        // --- COMMIT TO STORE ---
        setCalculationData({
            levels: [
                { level: 0, ...level0 },
                { level: 1, ...level1 },
                { level: 2, ...level2 }
            ],
            // Analysis placeholders (we will build the analyzer next)
            analysis: {
                mixedColor: 'transparent',
                mixedColorName: 'N/A',
                frequencyMap: {},
                dominant: '',
                total: level0.totalValue
            },
            total: level0.totalValue,
            reduced: level0.reducedValue
        });

    }, [useSofitMode, processLevel, setCalculationData]);

    return { calculateAll };
};