# MySQL Docker

## Docker MySQL 설치

[참고](http://jmlim.github.io/docker/2019/07/30/docker-mysql-setup/)

[참고영상](https://www.youtube.com/watch?v=FZLpsjNbMg8)

### MySQL Docker 이미지 다운로드

``` dockerfile
docker pull mysql:5.7
```

MySQL 5.7 태그 이미지를 다운로드한다



### Docker MySQL 컨테이너 생성 및 실행

``` dockerfile
docker run -d -p 3306:3306 -e MYSQL_ROOT_PASSWORD=1004 --name mysql5 mysql:5.7 --character-set-server=utf8mb4 --collation-server=utf8mb4_unicode_ci
```

뒤에 --charcter-set... 을 넣어줘야지 한글이 깨지지 않는다고 한다



### Docker 컨테이너 목록 출력

``` dockerfile
docker ps -a
```



### MySQL 컨테이너 bash 쉘 접속

``` dockerfile
docker exec -it mysql5 bash
```



### MySQL 서버 접속

``` dockerfile
mysql -u root -p
```





## DB 생성

[참고](https://futurists.tistory.com/11)

### 데이터 베이스 생성

``` mysql
CREATE DATABASE study_db default CHARACTER SET UTF8;
SHOW DATABAS
```



### 데이터 베이스를 사용할 사용자 추가 (GRANT PRIVILEGES)

```mysql
GRANT ALL PRIVILEGES ON study_db.* TO study_user@localhost IDENTIFIED BY 'study'; 
EXIT; 
mysql -u study_user -p 
USE study_db;
```



+ ALL PRIVILEGES는 데이터 베이스에 대한 모든 권한이다
+ ON study_db.* 권한 대상은 study_db 이다
+ TO study_user@localhost 사용 권한을 받는 사용자는 study_user이며( 없는 유저라면 새롭게 생성) localhost는 말 그대로 로컬에서만 연결 가능(127.0.0.1)
+ IDENTIFIED BY 'study' 사용자의 비밀번호 설정