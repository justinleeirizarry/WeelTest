import { useCallback } from 'react';
import merchants from '../data/merchants.json';
import categories from '../data/categories.json';

const useDataLookup = () => {
    const getMerchantName = useCallback((merchantId) => {
        const merchant = merchants.find((m) => m.id === merchantId);
        return merchant ? merchant.name : '';
    }, []);

    const getCategoryName = useCallback((categoryId) => {
        const category = categories.find((c) => c.id === categoryId);
        return category ? category.name : '';
    }, []);

    return { getMerchantName, getCategoryName };
};

export default useDataLookup;