# DJ-stream
###Coding convention!

- 세미콜론 생략

- var 금지  
const, let 사용  
let의 사용을 줄일 것

- 여백 필수  
쉼표는 뒤에만 줌
``` js
if( a > b )
f( a, b )
```

- 블럭 생략 금지  
화살표 함수에서 return을 생략하는 경우는 가능
``` js
// no
if( true ) console.log()
```

-  문자열 표현  
변수가 없으면 작은따옴표  
변수가 있으면 템플릿 리터럴 (+ 연산자 금지)
``` js
str = 'test'
str = `test ${ x }`
```

- function 금지
``` js
// no
function f(a,b){
	return a+b;
}

// yes
const f = ( a, b ) => a + b
```
