import { useEffect, useState, useRef } from "react";
import { notification } from "antd";

export interface ItemProps {
    _modified: number;
    _mby: string;
    _created: number;
    _state: number;
    _cby: string;
    _id: string;
    [key: string]: any;
}

export function useItem <T extends ItemProps>(model: string, id: string): [T|null, boolean, string | null, () => void] {
    const [item, setItem] = useState<T|null>(null);
    const [loading, setLoading] = useState<boolean>(true); 
    const [error, setError] = useState<string | null>(null);
    const abortControllerRef = useRef<AbortController | null>(null);

    useEffect(() => {
        if(!!model && !!id){
            handleItem();
        }
        return () => abortControllerRef?.current?.abort();
    }, [model, id]);

    const handleItem = () => {
        abortControllerRef?.current?.abort();
        abortControllerRef.current = new AbortController();
        setLoading(true);
        setError(null);
        fetch(`/management/api/content/item/${model}/${id}`, { signal: abortControllerRef.current.signal })
            .then(res => {
                if (!res.ok)
                    throw new Error(`Erro na requisição: ${res.statusText}`);
                return res.json();
            })
                .then(data => { 
                    setItem(data); 
                    setLoading(false); 
                })
            .catch((err: Error) => {
                if (err.name === 'AbortError')
                    return console.warn(`Chamada cancelada para o item ${model} ${id}`);
                console.error(`Falha ao consultar item ${model} ${id}`, err) 
                notification.error({ message: `Falha ao consultar item ${model} ${id}`, description: err?.message ?? "Erro desconhecido" });
                setError(err?.message ?? "Erro desconhecido");
                setLoading(false);
            });
    };

    return [item, loading, error, handleItem];
};

export function useItems <T extends ItemProps>(model: string): [T[], boolean, string | null, () => void] {
    const [items, setItems] = useState<T[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const abortControllerRef = useRef<AbortController | null>(null);

    useEffect(() => {
        if(!!model){
            handleItems(); 
        }
        return () => abortControllerRef?.current?.abort();
    }, [model]);

    const handleItems = () => {
        abortControllerRef?.current?.abort();
        abortControllerRef.current = new AbortController();
        setLoading(true);
        setError(null);
        fetch(`/management/api/content/items/${model}`, { signal: abortControllerRef.current.signal })
            .then(res => {
                if (!res.ok)
                    throw new Error(`Erro na requisição: ${res.statusText}`);
                return res.json();
            })
                .then(data => { 
                    setItems(data);
                    setLoading(false); 
                })
            .catch((err: Error) => {  
                if (err.name === 'AbortError')
                    return console.warn(`Chamada cancelada para os items ${model}`);
                console.error(`Falha ao consultar items ${model}`, err) 
                notification.error({ message: `Falha ao consultar items ${model}`, description: err?.message ?? "Erro desconhecido" });
                setError(err?.message ?? "Erro desconhecido");
            })
        .finally(() => setLoading(false));
    };

    return [items, loading, error, handleItems];
};