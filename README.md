# hangul.js

Hangul.js는 한글의 자/모음 분리와 분리된 자/모음을 결합시키는 라이브러리입니다.

## 사용법

- Hangul.seperate(string)

  ```javascript
  Hangul.seperate("안녕하세요!")
  >> ["ㅇ", "ㅏ", "ㄴ", "ㄴ", "ㅕ", "ㅇ", "ㅎ", "ㅏ", "ㅅ", "ㅔ", "ㅇ", "ㅛ", "!"]
  ```
  
- Hangul.seperateToObject(string)

  ```javascript
  Hangul.seperateToOjbect("안녕하세요!")
  >> [{isHangul:true, initial:"ㅇ", medial:"ㅏ", final:"ㄴ", char:"안"},
      {isHangul:true, initial:"ㄴ", medial:"ㅕ", final:"ㅇ", char:"녕"},
      //...
      {isHangul:true, initial:"ㅇ", medial:"ㅛ", final:"", char:"요"},
      {isHangul:false, char:"!"}]
     
  ```
  
- Hangul.combine(string)

  ```javascript
  Hangul.combine("ㅇㅏㄴㄴㅕㅇㅎㅏㅅㅔㅇㅛ!")
  >> "안녕하세요!"
  ```
