# 미션1 데이터 100만개 넣기

### 테이블 생성

+ user_log 테이블을 만들어준다

![mysql1](https://user-images.githubusercontent.com/61257242/106113245-9c938d80-6191-11eb-8713-0982cb4fb1d1.png)

+ id는 AUTO_INCREMENT 를 줘서 자동으로 1씩 증가하게 만들고
+ nickname은 varchar(64) -> 길이가 64로 제한된 이름 (가변길이라서 64보다 적게 쓰면 그에 맞게 할당된다)
+ money는 dec(10, 2) ->  소수점 앞의 숫자는 최대 10개, 소수점 뒤의 숫자는 최대 2를 의미
+  last_visit 는 datetime ->  날짜와 시간을 같이 나타내는 타입이다



### 100만건의 데이터를 넣기 위한 프로시저 생성하기

[참고(stackoverflow)](https://stackoverflow.com/questions/25098747/how-to-generate-1000000-rows-with-random-data/25099275)

``` mysql
DELIMITER $$
CREATE PROCEDURE makeData()
BEGIN
  DECLARE i INT DEFAULT 0;
  WHILE i < 1000000 DO
    INSERT INTO `user_log` (`nickname`,`money`,`last_visit`) VALUES (
      (concat((select nickname from makeRandomNickname order by rand() limit 1), CHAR(FLOOR(RAND() * 1000 % 26) + 65), CHAR(FLOOR(RAND() * 1000 % 26) + 65), CHAR(FLOOR(RAND() * 1000 % 26) + 65),(FLOOR(rand() * (10000 - 1000) + 1000))),
       (rand()*(100000-1)+1),
       (FROM_UNIXTIME(UNIX_TIMESTAMP('2021-01-01 00:00:01')+FLOOR(RAND()*2592000)))
    );
    SET i = i + 1;
  END WHILE;
END$$
DELIMITER ;
```

``` mysql
call makeData();
```

+ makeData() 라는 이름으로 프로시저를 만드는데
+ 100만번 반복한다



랜덤한 이름 100개를 만들려고 makeRandomNickname라는 테이블을 생성하여 데이터를 데이터 100개를 넣어줬다 (이름은 코드스쿼드 멤버들로 생성해줬다)

+ 테이블에서 생성한 데이터를 다른 곳에 넣어줄려면 [참고](http://www.webmadang.net/database/database.do?action=read&boardid=4003&page=1&seq=15) 

``` mysql
(select nickname from makeRandomNickname order by rand() limit 1);
```



+ 그리고 닉네임 + 랜덤 문자열3개, 랜덤 숫자 4자리 를 만들려고 concat을 사용했다 [참고](https://pafy.tistory.com/17)

``` mysql
CONCAT(CHAR(FLOOR(RAND() * 1000 % 26) + 65),CHAR(FLOOR(RAND() * 1000 % 26) + 65),CHAR(FLOOR(RAND() * 1000 % 26) + 65));
```

위와 같이하면 랜덤한 문자열 3개를 더해줄 수 있다



+ 랜덤한 숫자4자리는 ▼ [참고](https://ellapresso.tistory.com/13)

``` mysql
(FLOOR(rand() * (10000 - 1000) + 1000));
```



위의 3개를 합치면 닉네임을 완성할 수 있다



+ 돈 100000원 이하는 ▼ 

``` mysql
(rand()*(100000-1)+1);
```



+ datetime 은 위의 stackoverflow를 참고하였는데

``` mysql
(FROM_UNIXTIME(UNIX_TIMESTAMP('2021-01-01 00:00:01')+FLOOR(RAND()*2592000)));
```

2592000은 30일 * 24시간 * 60분 * 60초 이다



그리고 프로시저 호출!!

``` mysql
call makeData();
```

이후 1시간째 먹통이다....


너무 오래걸려서 그만 했다 인터넷의 글을 보니 13시간 걸렸다고 한 글이 있어서 autocommit을 해제하고 하니 2분정도 후에 완료되었다

![image](https://user-images.githubusercontent.com/61257242/106126842-3dd61000-61a1-11eb-9a19-8bb8614038b7.png)

[autocommit해제링크](https://slobell.com/blogs/41)
[13시간 걸린 글](https://m.blog.naver.com/PostView.nhn?blogId=bbh1988&logNo=220315268988&proxyReferer=https:%2F%2Fwww.google.com%2F)

처음에 autocommit 되어있는상태로 돌리다가 강제종료했는데 23만건이 들어가있어서 총 123만건이 되었다

![ezgif com-gif-maker (3)](https://user-images.githubusercontent.com/61257242/106129037-3dd70f80-61a3-11eb-9764-8e1b0dfa1682.gif)



