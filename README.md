# DJ-stream Coding convention



### 1. 가독성
- 세미콜론 생략

- 블럭 생략 금지  
(화살표 함수에서 `return` 을 생략하는 경우는 가능)
``` js
// no
if(true) console.log()
```

- 연산자 앞뒤 여백 필수  
	- `,` `:` 의 경우는 뒤에만 줌  
	- 괄호가 중첩될 경우 가장 바깥 괄호만 여백을 줌
``` js
if( a > f(b, c) )
```

- 탭은 블럭단위로 할 것  
	- 새 블럭이 생성될 경우 무조건 개행  
	- 괄호 뒤에서 바로 개행이 일어날 경우 여백생략
``` js
// no
result = f( {
			key: value
		} )
// no
result = f({ key: value })

// yes
result = f({
	key: value
})
```
---

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
const UPPER_UNDER = 5000
// 생성자
const Person = () => {
	/* */
}
```
---
### 3. 주석  
docblockr 패키지 사용  
모든 생성자와 함수에 주석을 달아줄 것
``` js
/**
 * 5초 후에 콜백을 실행
 * @param  {Function} callback [description]
 * @return {Number}            타이머 id
 */
const after5seconds = ( callback ) => setTimeout( callback, 5000 )
```
---

기타사항은 전체적으로 아래 링크를 따를 것  
https://github.com/tipjs/javascript-style-guide
