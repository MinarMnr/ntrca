class SharedDataHelper {

	getYear(start = 2000, end = 2050) {
		let years = [];
		while(start <= end) {
			years.push({
				id: start,
				value: `${start}`
			});
			start++;
		}
		return years;
	}

	cleanObject(obj) {
		return Object.entries(obj).reduce((a, [k, v]) => ((v == null || v == '') ? a : (a[k] = v, a)), {});
	}

}

export const SharedData = new SharedDataHelper();