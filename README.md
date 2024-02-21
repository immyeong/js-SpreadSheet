## SpreadSheet App 구현

(ROW와 COL은 10으로 픽스하고 구현)

### HTML/CSS
 - export button
 - cell status
 - cellContainer

### JavaScript
 - ROWS 값과 COLS 값 하드코딩, spreadSheet 배열 생성

 - class Cell
     cell 객체의 인스턴스를 생성하는 클래스
     isHeader -> header 부분 제어
     disabled -> header 부분 접근 제한 기능
     data -> innerText를 받음
     row -> row값 받음
     column -> column값 받음
     active -> true 일때 하이라이트 기본값은 false

 - initSpreadSheet 
     -각각의 Cell 객체값을 생성하여 spreadSheet에 데이터 생성
     -데이터를 기반으로 drawSheet 함수를 사용하여 화면에 송출

 - drawSheet
     - spreadSheet의 들어가있는 cell 객체의 값들을 cellContainer에 append하여 화면에 송출하는 함수
     - spreadSheet 배열에 들어가있는 모든 요소를 순회하며 append함

 - createCellEl
     -파라미터로 cell을 받아 cell요소를 return함
     -cellContainer에 입력할 cell요소 생성하는 함수
     -cell요소 생성시 header부분 제어를 위해서 cell.isHeader값이 true라면 class에 header 추가하고 disabled로 접근 막음
     -cellEl event
      -만들어진 cell요소를 클릭할때 handleCellClick함수 호출
      -만들어진 Cell요소의 innerText를 바꿀때 handleCellChange함수 호출
    
 - handleCellClick
     - 요소 클릭 시 헤더 부분 css변경하는 함수

 - handleClearActiveState
     - 요소 클릭 시 변경되어있던 헤더 부분을 재클릭시 없애주는 함수
     - 모든 요소를 돌아다니며 spreadSheet[i][0], spreadSheet[0][j] 로 클릭 한 곳의 rowHeader과 colHeader의 active를 제거하여 css 제거

 - handleCellChange
     - 요소 Input 변경 시 Input값을 데이터로 반환하는 함수

 - exportBtn.addEventListener
    - 상단의 export버튼을 클릭할 때 현재 각각의 요소들에 들어있는 data값을 반환하는 함수
    - csv 문자열에 data들을 ,으로 구분하여 넣은 후 a 태그를 이용하여 버튼을 누를 시에 즉시 csv파일로 변경함.

