# 프로세스와 스레드

+ worker를 쓰려고 노력했는데 비동기 방식으로 데이터를 주고받아서 Promise와 then, async, await를 계속 찾아보았다

+ 원하는대로 코드가 나오지 않았고 삽질을 많이했지만 비동기 프로세스에 대해서 좀더 알게 된 것 같다

![ezgif com-gif-maker](https://user-images.githubusercontent.com/61257242/105496186-7ccb1800-5d00-11eb-88cb-de2d8b636956.gif)

+ 중간에 MaxListenersExceededWarning: Possible EventEmitter memory leak detected. 이런 오류가 뜨는데 이벤트 리스너가 10개가 넘어서 그렇다고한다
+ node.js의 이벤트 리스터는 기본적으로 10개 까지 연결이 가능하다고 하는데 worker는 어려운 것 같다