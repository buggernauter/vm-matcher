export const setLocalStorage = <TValue>(key: string, value: TValue) => {
	localStorage.setItem(key, JSON.stringify(value));
};

export const getLocalStorage = <TFallback>(key: string, fallback: TFallback): TFallback => {
	try {
		const value = localStorage.getItem(key);
		if (!value) {
			return fallback;
		}
		return JSON.parse(value);
	} catch {
		return fallback;
	}
};

export const removeLocalStorage = (key: string) => {
	localStorage.removeItem(key);
};
