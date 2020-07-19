import {deepCopy, deleteNullProps, is_array, is_object, is_string} from './helpers'
import {Requester} from '@andresouzaabreu/crud-ajax'

export default class Form extends Requester {
	/**
	 * Create a new Form instance.
	 *
	 * @return {void}
	 */
	constructor(_originalData = {}) {
		super()

		Object.assign(this, {
			// The attributes to send with the request
			_attributes: Object.keys(_originalData),

			// The attributes that are mass assignable:
			_fillable: Object.keys(_originalData),

			// Whether to omit null attributes with the request:
			_omitNull: false,

			// The attributes that should never be sent with the request:
			_omitted: [],

			// The attributes that should be cleared after each request
			_secretes: ["password", "password_confirmation"]
		})

		this._originalData = {..._originalData};
		this.fill(_originalData)
	}

	/**
     * Executes callback after a request
	 *
	 * @return {void}
     */
	afterRequest() {
		this.clearSecretes()
	}

	/**
	 * Clear each secrete attribute
	 *
	 * @return {Object} this
	 */
	clearSecretes() {
		for (let secrete of this._secretes) {
			if (! this.hasOwnProperty(secrete))
				continue
			if (is_string(this[secrete]))
				this[secrete] = ""
			else if (is_array(this[secrete]))
				this[secrete] = []
			else if (is_object(this[secrete]))
				this[secrete] = {}
			else
				this[secrete] = null
		}
		return this
	}

	/**
	 * Fill attributes that are mass assignable
	 *
	 * @param {Object} data
	 * @return {Object} this
	 */
	fill(data) {
		for (let attribute in data) {
			if (this._fillable.includes(attribute))
				this[attribute] = deepCopy(data[attribute])
		}

		return this
	}

	/**
	 * Reset attributes to the Original data.
	 *
	 * @return {Object} this
	 */
	reset() {
		this._attributes.forEach(attribute => {
			if (typeof this._originalData[attribute] !== "undefined")
				this[attribute] = deepCopy(this._originalData[attribute])
			else
				this[attribute] = ""
		})
		return this
	}

	/**
	 * Sync original data after a successful request
	 *
	 * @return {Object} this
	 */
	syncOriginalData() {
		this._attributes.forEach(attribute => {
			if (! this._secretes.includes(attribute))
				this._originalData[attribute] = this[attribute]
		})

		return this
	}

	/**
	 * Get the attributes that should be sent with the request
	 *
	 * @method {String} method delete|get|patch|post|put
	 * @return {Object}
	 */
	getData(method) {
		if (method === "get" || method === "delete")
			return {}

		let {_attributes, _omitNull, _omitted} = this

		let data = _attributes
					.filter(attribute => ! _omitted.includes(attribute))
					.reduce((data, attribute) => ({...data, [attribute]: this[attribute]}), {})

		if (_omitNull)
			deleteNullProps(data)

		return data
	}
}


/**
 * Generate dynamic methods to send ajax requests
 */
["delete", "get", "patch", "post", "put"].forEach(method => {
	Form.prototype[method] = function (url, data= {}, config = {}) {
		return this.sendRequest(method, url, {...this.getData(method), ...data}, config)
	}
})
