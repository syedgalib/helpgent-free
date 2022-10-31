const find = (data, keyChain) => {
    return keyChain
        .split('.')
        .map((key) => key.trim())
        .reduce((data, key) => data?.[key], data);
};

export function useCoreData(key = null) {
    const coreData = window?.wpWaxCustomerSupportApp_CoreScriptData;
    if (!coreData) {
        return {};
    }

    if (!key) {
        return coreData;
    }

    if (key.includes('.')) {
        return find(coreData, key);
    }

    return coreData?.[key];
}
