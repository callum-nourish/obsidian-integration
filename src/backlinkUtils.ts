export const normalizeBacklinkKey = (rawValue?: string): string => {
	if (!rawValue) {
		return "";
	}
	let normalized = rawValue.trim();
	if (normalized.startsWith("[[")) {
		normalized = normalized.slice(2);
	}
	if (normalized.endsWith("]]")) {
		normalized = normalized.slice(0, -2);
	}
	return normalized.trim();
};

export const fileContainsKeyBacklink = (
	contents: string,
	normalizedKey: string,
): boolean => {
	const trimmedKey = normalizedKey.trim();
	if (!trimmedKey) {
		return true;
	}
	const haystack = contents.toLowerCase();
	const needle = `[[${trimmedKey.toLowerCase()}]]`;
	return haystack.includes(needle);
};
