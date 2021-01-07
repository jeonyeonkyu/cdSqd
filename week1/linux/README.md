
# linux



### linux 설치

+ 우분투 20.04이상 버전을 설치한다

 http://ftp.kaist.ac.kr/ubuntu-cd/

 ![1](https://user-images.githubusercontent.com/61257242/103844256-d0bce680-50dc-11eb-8ab7-76d15fa11812.png)



+ 무료 가상환경을 설치한다

  VirtualBox : https://www.virtualbox.org

![2](https://user-images.githubusercontent.com/61257242/103844453-49bc3e00-50dd-11eb-9c35-6b6f2afd45d3.png)





+ 설치가 완료되면 새로만들기 클릭

![3](https://user-images.githubusercontent.com/61257242/103844565-78d2af80-50dd-11eb-9f57-5a9bb0471c1b.png)

+ 이후 참고사이트를 따라한다

[설치 참고사이트](https://dog-developers.tistory.com/37)

[설치 참고영상](https://www.youtube.com/watch?v=K7IWOmC9mwM&list=PLq8wAnVUcTFU9zLWK-dHWrvTJ0PF8Y0Sf&index=8&ab_channel=%EB%89%B4%EB%A0%89%EC%B2%98)





### ssh 설치

+ ssh 설치 및 설정
+ ```sudo apt-get install openssh-server``` 로 설치
+ ```sudo vim /etc/ssh/sshd_config``` 에서 ssh 서버 설정하기...

[ssh설치 및 설정 참고사이트](http://programmingskills.net/archives/315)



+ window에서는 putty를 다운로드 해서 접속해야한다
+ putty 설치~





### ssh 접속

+ VM 에서 할당받은 IP주소 ```ifconfig``` 로 확인

[참고 사이트](https://hongku.tistory.com/179)

+ 왼쪽 위에 환경설정 클릭

![image](https://user-images.githubusercontent.com/61257242/103876141-a425c080-5116-11eb-8dbf-6e3930a5c834.png)

+ 네트워크 탭 클릭후 오른쪽에 설정버튼 클릭 후 포트 포워딩 클릭

![image](https://user-images.githubusercontent.com/61257242/103876236-c0c1f880-5116-11eb-859e-8a0bedbfa480.png)


+ 포트 포워딩 규칙 설정

![image](https://user-images.githubusercontent.com/61257242/103876285-ccadba80-5116-11eb-875e-93c4da2d6849.png)






### 사용자생성

+ ``` sudo user add -m user01``` 아이디 생성
+ ```sudo passwd user01``` 

사용자 id ``` user01 ``` 로 만들고 ```user01``` 에 대한 패스워드를 만든다

![image](https://user-images.githubusercontent.com/61257242/103876589-2ada9d80-5117-11eb-8e94-f3d0022d705c.png)


[사용자 생성 참고사이트](https://withcoding.com/101)





### putty 접속

+ 로컬의 IP 주소와 아까 입력한 호스트의 Port번호를 입력한 후 Open

![image](https://user-images.githubusercontent.com/61257242/103876686-5067a700-5117-11eb-9464-e27f19617eb3.png)

+ 이후 로그인 창에서 아까 만들었던 유저인 ```user01``` 로 로그인



+ ```mkdir backup``` backup 폴더 생성

![image](https://user-images.githubusercontent.com/61257242/103876763-6a08ee80-5117-11eb-8af3-605367d0ad08.png)

  

+ ```chmod [권한 값][디렉토리명]``` 명령어를 통해 디렉토리의 접근 권한 설정

![image](https://user-images.githubusercontent.com/61257242/103876836-8147dc00-5117-11eb-8003-979ecc652043.png)

+ date 출력해보기

![image](https://user-images.githubusercontent.com/61257242/103876872-8dcc3480-5117-11eb-88f7-ce0d55357b62.png)
