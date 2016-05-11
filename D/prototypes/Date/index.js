import constructors from '../../constructors';
import formats from './formats';
import Super from '../Super';
import Num from '../Number';
import Str from '../String';
import { isDate, defineProperties } from '../../libs';

const NativeDate = global.Date;
const coeffs = {
	c: 1,
	s: 1000,
	m: 60000,
	h: 3600000,
	d: 86400000,
	w: 604800000,
	M: 2592000000,
	y: 31536000000
};
const daysOfTheWeekNames = {
	0: 'Sunday',
	1: 'Monday',
	2: 'Tuesday',
	3: 'Wednesday',
	4: 'Thursday',
	5: 'Friday',
	6: 'Saturday'
};
const daysOfTheWeekAliases = {
	0: 'Sun',
	1: 'Mon',
	2: 'Tue',
	3: 'Wed',
	4: 'Thu',
	5: 'Fri',
	6: 'Sat'
};
const monthsNames = {
	0: 'January',
	1: 'February',
	2: 'March',
	3: 'April',
	4: 'May',
	5: 'June',
	6: 'Jule',
	7: 'August',
	8: 'September',
	9: 'October',
	10: 'November',
	11: 'December'
};
const monthsAliases = {
	0: 'Jan',
	1: 'Feb',
	2: 'Mar',
	3: 'Apr',
	4: 'May',
	5: 'Jun',
	6: 'Jul',
	7: 'Aug',
	8: 'Sep',
	9: 'Oct',
	10: 'Nov',
	11: 'Dec'
};

export class Date extends Super {
	constructor(date = new NativeDate()) {
		super(date);
	}

  static now() {
    return now();
  }

	add(what, number) {
		const date = this.$;

		if (isInvalid(date)) {
			return invalidDate();
		}

		if (arguments.length >= 2) {
			what = { [what]: number };
		}

		what = new Super(what).$;

		let increment = 0;

		for (let key in what) {
			if (what.hasOwnProperty(key)) {
				const coeff = coeffs[key];

				if (!coeff) {
					return invalidDate();
				}

				increment += coeff * what[key];
			}
		}

		date.setTime(date.getTime() + increment);

    return this;
	}
	expires(value) {
		return new Num(this.$ - now()).timeout(value);
	}
	format(string, prefix = '') {
		string = new Str(new Super(string).$);
		prefix = String(new Super(prefix).$);

		for (const f in formats) {
			if (formats.hasOwnProperty(f)) {
        const format = formats[f];

        string = string.replaceString(prefix + format.format, format.match(this, 'get'));
			}
		}

		return string.$;
	}
	formatUTC(string, prefix = '') {
		string = new Str(new Super(string).$);
		prefix = String(new Super(prefix).$);

		for (const f in formats) {
			if (formats.hasOwnProperty(f)) {
        const format = formats[f];

				string = string.replaceString(prefix + format.format, format.match(this, 'getUTC'));
			}
		}

		return string.$;
	}
	get(what) {
		const date = this.$;

		switch (what) {
			case 'c':
				return date.getMilliseconds();
			case 's':
				return date.getSeconds();
			case 'm':
				return date.getMinutes();
			case 'h':
				return date.getHours();
			case 'd':
				return date.getDate();
			case 'dw':
				return date.getDay();
			case 'dwa':
				return daysOfTheWeekAliases[date.getDay()];
			case 'dwn':
				return daysOfTheWeekNames[date.getDay()];
			case 'M':
				return date.getMonth() + 1;
			case 'Ma':
				return monthsAliases[date.getMonth()];
			case 'Mn':
				return monthsNames[date.getMonth()];
			case 'y':
				return date.getFullYear();
		}
	}
	getUTC(what) {
		const date = this.$;

		switch (what) {
			case 'c':
				return date.getUTCMilliseconds();
			case 's':
				return date.getUTCSeconds();
			case 'm':
				return date.getUTCMinutes();
			case 'h':
				return date.getUTCHours();
			case 'd':
				return date.getUTCDate();
			case 'dw':
				return date.getUTCDay();
			case 'dwa':
				return daysOfTheWeekAliases[date.getUTCDay()];
			case 'dwn':
				return daysOfTheWeekNames[date.getUTCDay()];
			case 'M':
				return date.getUTCMonth() + 1;
			case 'Ma':
				return monthsAliases[date.getUTCMonth()];
			case 'Mn':
				return monthsNames[date.getUTCMonth()];
			case 'y':
				return date.getUTCFullYear();
		}
	}
	isAfter(date) {
		date = new NativeDate(new Super(date).$);

		return date.getTime() < this.$.getTime();
	}
	isBefore(date) {
		date = new NativeDate(new Super(date).$);

		return date.getTime() > this.$.getTime();
	}
  isBetween(date1, date2) {
    const time = this.$.getTime();

    date1 = new NativeDate(new Super(date1).$);
    date2 = new NativeDate(new Super(date2).$);

    return time > date1.getTime() && time < date2.getTime();
  }
	isInvalid() {
		return isInvalid(this.$);
	}
	isPassed() {
		return now() > this.$.getTime();
	}
	ofOne(what, secondDate) {
    if (!(what in coeffs) || what === 'w') {
      return false;
    }

		secondDate = date(secondDate);

    let started;

    for (const w in coeffs) {
      if (coeffs.hasOwnProperty(w)) {
        if (w === what) {
          started = true;
        }

        if (!started || w === 'w') {
          continue;
        }

        if (this.get(w) !== secondDate.get(w)) {
          return false;
        }
      }
    }

		return true;
	}
	set(what, number) {
		const date = this.$;

		if (isInvalid(date)) {
			return this;
		}

		if (arguments.length >= 2) {
			what = { [what]: number };
		}

		what = new Super(what).$;

		for (const key in what) {
			if (what.hasOwnProperty(key)) {
				const value = what[key];

				switch (key) {
					case 'c':
						date.setMilliseconds(value);
						continue;
					case 's':
						date.setSeconds(value);
						continue;
					case 'm':
						date.setMinutes(value);
						continue;
					case 'h':
						date.setHours(value);
						continue;
					case 'd':
						date.setDate(value);
						continue;
					case 'M':
						date.setMonth(value - 1);
						continue;
					case 'y':
						date.setFullYear(value);
				}
			}
		}

		return this;
	}
	setUTC(what, number) {
		const date = this.$;

		if (isInvalid(date)) {
			return this;
		}

		if (arguments.length >= 2) {
			what = { [what]: number };
		}

		what = new Super(what).$;

		for (const key in what) {
			if (what.hasOwnProperty(key)) {
				const value = what[key];

				switch (key) {
					case 'c':
						date.setUTCMilliseconds(value);
						continue;
					case 's':
						date.setUTCSeconds(value);
						continue;
					case 'm':
						date.setUTCMinutes(value);
						continue;
					case 'h':
						date.setUTCHours(value);
						continue;
					case 'd':
						date.setUTCDate(value);
						continue;
					case 'M':
						date.setUTCMonth(value - 1);
						continue;
					case 'y':
						date.setUTCFullYear(value);
				}
			}
		}

		return this;
	}
	time(time) {
		const date = this.$;

		if (arguments.length) {
			date.setTime(time);
		}

		return date.getTime();
	}
	toLocaleString() {
		return this.$.toLocaleString();
	}
	toString() {
		return this.$.toString();
	}
	valueOf() {
		return this.$.valueOf();
	}
}

function invalidDate() {
	return new Date('a');
}
function isInvalid(date) {
	return date.toString() === 'Invalid Date';
}

constructors[1].push({
	check: isDate,
	cls: Date
});

export function now() {
  return NativeDate.now();
}

export function date(date) {
  if (!arguments.length) {
    return new Date(new NativeDate());
  }

  date = new Super(date).$;

  return new Date(new NativeDate(date));
}

export default Date;