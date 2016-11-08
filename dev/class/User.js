/**
 * 유저 클래스
 * @type {Class}
 */
class User {
	/**
	 * 유저 클래스 생성
	 * @param {String} name 이름
	 */
	constructor( name ){
		this._name = name
	}

	/**
	 * 풀네임
	 * @type {String}
	 */
	get name(){
 		return this._name
 	}
	set name( name ){
		this._name = name
	}

	/**
	 * 성
	 * @type {String}
	 */
	get familyName(){
		return this._name.split(' ')[0]
	}
}

module.exports = User
