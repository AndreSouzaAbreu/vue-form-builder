/**
 * Capitalize the first letter and separate words by space
 *
 * @param {string} str
 * @return {sting}
 */
export function toTitleCase(str) {
    return str.charAt(0).toUpperCase() +
        str.slice(1).replace(/[-_]/g, " ").replace(/([a-z])([A-Z])/g, "$1 $2")
}

/**
 * Capitalize the given string
 *
 * @param {string} str
 * @return {string}
 */
export function capitalize(str) {
	return str.charAt(0).toUpperCase() + str.slice(1)
}

/**
 * Deep copy the given object.
 *
 * @param  {Object} object
 * @return {Object}
 */
export function deepCopy(object) {
	if (object === null || typeof object !== 'object')
		return object

	let copy = Array.isArray(object) ? [] : {}

	Object.keys(object).forEach(key => copy[key] = deepCopy(object[key]))

	return copy
}

/**
 * Delete null properties of an object
 *
 * @param {Object} object
 * @return {void}
 */
export function deleteNullProps(object) {
	for (let key in object) {
		if (object[key] === "" || object[key] === null || typeof object[key] === "undefined")
			delete object[key]
	}
}

/**
 * Return whether a variable is an array
 *
 * @param {*} $variable
 * @return {Boolean}
 */
export function is_array($var) {
	return Array.isArray($var)
}

/**
 * Return whether a variable is an object
 *
 * @param {*} $variable
 * @return {Boolean}
 */
export function is_object($var) {
	return (typeof $var === "object") && !(is_array($var)) && $var !== null
}

/**
 * Return whether a variable is a string
 *
 * @param {*} $variable
 * @return {Boolean}
 */
export function is_string($var) {
	return typeof $var === "string"
}

/**
 * Reduce array values to object with keys equal to values
 *
 * @param {Array} array
 * @return {Object}
 */
export function reduceArrayToObject(array) {
	return array.reduce((object, value) => {
		object[value] = value
		return object
	}, {})
}
