import { useState, useCallback, useRef, useEffect } from 'react';
import toast from 'react-hot-toast';

interface QueueItem {
    text: string;
    isRaw: boolean;
    id: number;
}

// Declare ResponsiveVoice type
declare global {
    interface Window {
        responsiveVoice: {
            speak: (text: string, voice: string, options?: {
                onstart?: () => void;
                onend?: () => void;
                onerror?: (error: any) => void;
                rate?: number;
                pitch?: number;
                volume?: number;
            }) => void;
            cancel: () => void;
            isPlaying: () => boolean;
            voiceSupport: () => boolean;
        };
    }
}

// Global state logic
let globalQueue: QueueItem[] = [];
let isGlobalProcessing = false;
let listeners: (() => void)[] = [];

// Helper to notify all listeners (hooks)
const notifyListeners = () => {
    listeners.forEach(listener => listener());
};

const processGlobalQueue = () => {
    if (globalQueue.length === 0) {
        isGlobalProcessing = false;
        notifyListeners();
        return;
    }

    if (isGlobalProcessing) {
        return;
    }

    const nextItem = globalQueue[0];

    isGlobalProcessing = true;
    notifyListeners();

    // If isRaw is true, speak the text exactly as is
    // Otherwise, construct the parent announcement sentence
    const text = nextItem.isRaw
        ? nextItem.text
        : `ولي أمر الطالب ${nextItem.text} في الانتظار بالخارج`;

    if (window.responsiveVoice) {
        window.responsiveVoice.speak(text, 'Arabic Female', {
            rate: 0.9,
            pitch: 1,
            volume: 1,
            onstart: () => { },
            onend: () => {
                globalQueue = globalQueue.slice(1);
                isGlobalProcessing = false;
                notifyListeners();

                // Process next immediately
                setTimeout(processGlobalQueue, 100);
            },
            onerror: () => {
                toast.error('حدث خطأ في النطق الصوتي');
                globalQueue = globalQueue.slice(1);
                isGlobalProcessing = false;
                notifyListeners();
                setTimeout(processGlobalQueue, 100);
            }
        });
    } else {
        isGlobalProcessing = false;
    }
};

export const useResponsiveVoiceSpeech = () => {
    const [, forceUpdate] = useState({});
    const [supported, setSupported] = useState(false);

    useEffect(() => {
        // Support check
        const checkSupport = () => {
            if (window.responsiveVoice && window.responsiveVoice.voiceSupport()) {
                setSupported(true);
            } else {
                setTimeout(checkSupport, 100);
            }
        };
        checkSupport();

        // Subscribe to global changes
        const listener = () => forceUpdate({});
        listeners.push(listener);

        return () => {
            listeners = listeners.filter(l => l !== listener);
        };
    }, []);

    const speakText = useCallback((text: string, isRaw: boolean = false) => {
        if (!supported && !window.responsiveVoice) {
            toast.error('جاري تحميل خدمة الصوت...');
            return;
        }

        const newItem: QueueItem = {
            text,
            isRaw,
            id: Date.now(),
        };

        globalQueue.push(newItem);
        notifyListeners();

        if (globalQueue.length === 1 && !isGlobalProcessing) {
            toast.success(`جاري النداء: ${text}`);
            processGlobalQueue();
        } else {
            // Trigger processing in case it stopped but queue has items
            if (!isGlobalProcessing) processGlobalQueue();
        }
    }, [supported]);

    const cancel = useCallback(() => {
        if (window.responsiveVoice) {
            window.responsiveVoice.cancel();
        }
        globalQueue = [];
        isGlobalProcessing = false;
        notifyListeners();
        toast('تم إيقاف النداء');
    }, []);

    return {
        speakText,
        speaking: isGlobalProcessing,
        cancel,
        supported,
        queueLength: globalQueue.length,
    };
};
