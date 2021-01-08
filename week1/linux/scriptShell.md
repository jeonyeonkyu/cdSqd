## 쉘 스크립트



### 폴더 생성 

```nano makefolder.sh```  명령어 입력 

+ day1 ~ day16 만들기

```sh
#!/bin/bash

for i in {1..16}
do
	mkdir day$i
one
```

![image](https://user-images.githubusercontent.com/61257242/104005449-7ad56500-51e8-11eb-8b23-c82e3237618e.png)



+ 만든 폴더 확인

![image](https://user-images.githubusercontent.com/61257242/104005492-8de83500-51e8-11eb-9b28-05a78b7c5d29.png)



### cs파일 생성

+ cs파일을 day1 ~ day11 폴더에만 넣기    (aa1.cs , aa2.cs ...)

  ``` shell
  #!/bin/bash
  
  for i in {1..11}
  do
  	touch aa$i.cs
  	mv aa$i.cs day$i
  done
  ```

  ``` //day1에는 있고 day12에는 없음```

![image](https://user-images.githubusercontent.com/61257242/104005522-9b052400-51e8-11eb-874f-f25b15e4b011.png)



### .cs 파일 찾아서 zip파일에 담아 backup 폴더로 복사하기

``` shell
#!/bin/bash

zipName=backup_$(date +%Y%m%d)
folderList=$(find -name "day*")
files=()
for folder in $folderList; do
	csList=$(find $folder -name "*.cs")
	if [ $csList ]; then
		for csFile in $csList; do
			files+="${csFile} "
		done
	else 
		echo ${folder} is empty
	fi
done

zip -r $zipName.zip $files[@] | scp -P 15022 "$zipName".zip user01@192.168.56.1:/home/user01/backup
```



+ 만든 csAutoZip.sh파일 ```sh csAutoZip.sh 명령어로 실행 ```

![image](https://user-images.githubusercontent.com/61257242/104005561-a8221300-51e8-11eb-868a-b2af2404fbc3.png)



+ 생성된 backup.zip 파일 확인

![image](https://user-images.githubusercontent.com/61257242/104005598-b53f0200-51e8-11eb-9665-d7422b814a52.png)