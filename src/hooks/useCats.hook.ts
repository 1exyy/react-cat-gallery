import { useState, useEffect, useCallback } from 'react';

interface Cat {
    id: string;
    url: string;
    width: number;
    height: number;
}

interface UseCatsParams {
    limit?: number;
    autoGet?: boolean;
}

export const useCats = ({limit = 10, autoGet = false }: UseCatsParams) => {
    const [cats, setCats] = useState<Cat[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);
    const [fetchTrigger, setFetchTrigger] = useState(0);
    const [autoUpdateInterval, setAutoUpdateInterval] = useState<NodeJS.Timeout | null>(null);

    const fetchCats = useCallback(async () => {
        setLoading(true);
        setError(null);

        try {
            const response = await fetch(
                `https://api.thecatapi.com/v1/images/search?limit=${limit}`,
                {
                }
            );

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data: Cat[] = await response.json();
            setCats(data);
        } catch (err) {
            setError(err instanceof Error ? err : new Error('Unknown error'));
        } finally {
            setLoading(false);
        }
    }, [limit]);

    useEffect(() => {
        fetchCats();
    }, [fetchCats, fetchTrigger]);

    useEffect(() => {
        if (autoGet && !loading) {
            const interval = setInterval(() => {
                fetchCats();
            }, 5000);
            setAutoUpdateInterval(interval);

            return () => {
                if (interval) clearInterval(interval);
            };
        }

        return () => {
            if (autoUpdateInterval) clearInterval(autoUpdateInterval);
        };
    }, [autoGet, loading, fetchCats]);

    const refreshCats = useCallback(() => {
        setFetchTrigger(prev => prev + 1);
    }, []);

    useEffect(() => {
        return () => {
            if (autoUpdateInterval) clearInterval(autoUpdateInterval);
        };
    }, [autoUpdateInterval]);

    return { cats, loading, error, refreshCats };
};