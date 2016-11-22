# DJ-stream Coding convention

이 문서의 존재의의는 가독성 때문이므로 오히려 가독성이 떨어진다고 생각될 경우 엄격하게 지킬 필요는 없습니다!
<br>

### 1. 가독성
- 세미콜론 생략

- 연산자 앞뒤 여백 필수  
	- `,` `:` 의 경우는 뒤에만 줌  
	- 가장 바깥 괄호만 여백을 주고 중첩된건 생략 가능

``` js
if( a > f(b, c) )
```

- 블럭 생략 금지  
	- 화살표 함수에서 `return` 을 생략하는 경우는 가능

``` js
// no
if(true) console.log()
```

- 들여쓰기는 블럭단위로 할 것  
	- 새 블럭이 생성될 경우 무조건 개행  
	- 괄호 뒤에서 바로 개행이 일어날 경우 여백생략  

``` js
// no
result = f({
			key: value
		})
// no
result = f({ key: value })

// yes
result = f({
	key: value
})
```

- 메소드체인은 들여쓰지 말 것

``` js
// no
arr.map()
	.reduce()

// yes
arr.map()
.reduce()
```

- 모듈 추가는 코드 가장 위에서 일괄적으로 하고 2줄 개행해주세요.


``` js
// modules
const express = require('express')
const bodyParser = require('body-parser')


let start
```


<br>

### 2. 변수 선언

- `var` 금지  
가급적 `const` 를 사용

- `function` 금지  
대신 함수인지 식인지 구분하기 힘드므로 가급적 이름을 동사로 만들 것

``` js
// no
function sum(a,b){
	return a+b;
}

// yes
const sum = ( a, b ) => a + b
```

-  문자열  
	- 변수가 없으면 작은따옴표  
	- 변수가 있으면 템플릿 리터럴 (+ 연산자 금지)

``` js
str = 'test'
str = `test ${ x }`
```

- 명명법

``` js
let camelCase
// 전역 상수
const UPPER_UNDER
// 클래스
class Person
```

- 생성자 (그냥 ES6 클래스 씁시다..)  
	- 멤버변수는 반드시 앞에 `_` 를 붙일 것  
	- 절대 외부에서 멤버변수로 직접 접근하지 말 것

``` js
class User {
	constructor( name ){
		this._name = name
	}

	set name( str ){
		this._name = str
	}

	get familyName(){
		return this._name.split(' ')[0]
	}
}
```


<br>

### 3. 주석  
- `docblockr` 패키지 사용  
- 모든 함수에 주석을 달아줄 것  
- `getter` / `setter` 는 함수처럼 동작하지 않으므로 타입만 적을 것

``` js
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
```


<br>

### 4. 파일 관리  
- 클래스 하나에 한 파일을 할당  
- 외부모듈을 추가할 경우 `npm --save` 옵션을 사용하고 `package.json` 을 커밋

```
dev/
|
|--view/
|  |--js/
|  |--css/
|  |--img/
|  |--index.html
|
|--files/
|  |--test.mp3
|
|--node_modules/
|
|--custom_modules/
|
|--router/
|  |--user.js
|
|--server.js
|--socket.js
|--package.json
```



<br>

기타사항은 전체적으로 아래 링크를 따를 것  
https://github.com/tipjs/javascript-style-guide
