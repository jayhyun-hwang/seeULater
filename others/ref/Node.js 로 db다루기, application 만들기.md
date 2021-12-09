Node.js 로 db다루기, application 만들기
===============

**MySQL**

Mysql 접속 : mysql -uroot -p

db만들기 : create database something;

```
ex) CREATE DATABASE o2 CHARACTER SET utf8 COLLATE utf8_general_ci;
```

db보기 : show databases;

db사용하기 : use something;

현재 사용중이 db 확인하기 :  select database();

table 보기 : show tables;

**table 생성 : create table**

```mysql
ex) CREATE TABLE `topic` (
	`id` int(11) NOT NULL AUTO_INCREMENT,
	`title` varchar(100) NOT NULL,
	`description` text NOT NULL,
	`author` varchar(30) NOT NULL,
	PRIMARY KEY (id)
	) ENGINE=innoDB DEFAULT CHARSET=utf8;
```

id : 각 행들을 식별할 수 있게하는 식별자

Auto_increment : id를 따로 설정해주지 않으면, 자동으로 숫자가 1씩 늘어나는 방식



**데이터 추가 : INSERT**

```mysql
INSERT INTO topic (title, description, author) VALUES('JavaScript', 'Computer language for web.', 'abel');
//topic 이라는 테이블에 title, description, author정보를 추가한다.
//topic의 순서와, values의 값의 순서는 일치해야한다.
```



**데이터 가져오기 : SELECT**

```Mysql
SELECT * FROM topic;
// * 모든 정보
```

식별자(id)가 중요한 이유( 특정한 행을 알기 위해 )

```mysql
SELECT * FROM topic WHERE id=2;
//id가 2인 행을 가져온다.
```



**데이터 수정 : UPDATE**

```Mysql
UPDATE topic SET title='something' WHERE id=1;
//id 값이 1인 title의 이름을 something으로 수정한다.

UPDATE topic SET title='something', description='something is..' WHERE id=1;
//title과 description을 동시에 수정할 수 있다.

**중요**
만약 WHERE문을 까먹는다면, 큰일이 날 수 있다. 모든 정보가 다 바뀌어 버린다.(데이터 유실)
-> 서버는 항상 겸손하고 경건해야한다.
```



**데이터 삭제 : DELETE**

```mysql
DELETE FROM topic WHERE id=1;
//만약, 여기서도 WHERE문을 빠뜨렸다, 그럼 다 지워지는거다, 조용히 짐 싸서 집가면 된다. 
```

----------------

Node-MySQL
============

참고 : https://github.com/mysqljs/mysql

**DB connection**

```javascript
var mysql = require('mysql');
var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : '1111',
    database : 'o2'
});

connection.connect();

var sql = 'SELECT * FROM topic';
connection.query(sql, function (err, rows, fields) {
  if (err) console.log(err);
  console.log('rows', rows); //row는 배열이다.
  console.log('fields', fields); //fields는 컬럼을 의미한다.
});

connection.end();//접속이 끊긴다.
```



**node-mysql : SELECT, INSERT, UPDATE, DELETE**

**SELECT**

```javascript
var sql = 'SELECT * FROM topic';
conn.query(sql, function(err, rows, fields){//row는 '행'이라는 뜻이다.
  if(err){
      console.log(err);
  } else {
      for(var i = 0; i < rows.length; i++){
        console.log(rows[i].title + " : " + rows[i].description);
      }
  }
});
```

```Javascript
var sql = 'SELECT * FROM topic WHERE id=?'; 
var params = [1];
conn.query(sql, params, function(err, rows, fields){//두번째 인자에 배열로 된 값을 넣어줄 수 있다.
  if(err){
      console.log(err);
  } else {
        console.log(rows[i].title + " : " + rows[i].description);
      }
  }
});
```

**INSERT**

```javascript
var sql = 'INSERT INTO topic (title, description, author) VALUES("Express", "Web framework", "jacob")';
conn.query(sql, function(err, rows, fields){
    if(err) console.log(err);
    console.log(rows.insertId); // insertId는 auto_increment설정해 놓았다.(고유한 식별자를 알아낼 수 있는 방법이다.)
});
```

```javascript
//sql문을 하드코딩 하지 않고, ? 라는 치환자를 두어 코딩함
var sql = 'INSERT INTO topic (title, description, author) VALUES(?, ?, ?)';
var params = ['Supervisor', 'Watcher', 'graphittie'];//파라미터를 값들로 줌(배열로 생성)
conn.query(sql, params, function(err, rows, fields){// 쿼리문 두번째 인자로 파라미터로 전달함(값들을 치환시켜서 실행함. 보안과도 밀접한 관계가 있음(sql injection attack))
    if(err) console.log(err);
    console.log(rows.insertId);
});
```



**UPDATE**

```Javascript
var sql = 'UPDATE topic SET title="?", author="?" WHERE id=?';
var params = ['npm', 'ggu', 2];
conn.query(sql, params, function(err, rows, fields){
    if(err) console.log(err);
    console.log(rows);
});
```



**DELETE**

```javascript
var sql = 'DELETE FROM topic WHERE id="?"';
var params = [6]; // 숫자는 없앨 id 값을 넣으면 된다.
conn.query(sql, params, function(err, rows, fields){
    if(err) console.log(err);
    console.log(rows);
});
```

-----------

### MySQL + Node JS  WebApp

```datanase_plan.text
// database_plan.text

get('topic/') : view.ejs // 리스트 가져오기 SELECT
get('topic/:id') : view.ejs

get('topic/add') : add.ejs // 데이터 추가 INSERT
  post('topic/add')
  get('topic/:id') //redirection 시킬것임

get('topic/:id/edit') : edit.ejs //수정? UPDATE
  post('topic/:id/edit')
  get('topic/:id') //redirection

get('topic/:id/delete') : delete.ejs // 삭제 DELETE
  post('topic/:id/delete') // delete 쿼리를 db에 날린다.
  get('topic/') //메인페이지 redirect

```



```Javascript
// app_mysql.js
var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var fs = require('fs');
var mysql = require('mysql');		// node-mysql을 install하고 모듈을 불러와야한다.
var conn = mysql.createConnection({ // mysql과 connection하는 부분
    host     : 'localhost',
    user     : 'root',
    password : 'xxxxxxx',
    database : 'o2'
});
app.use(bodyParser.urlencoded({ extended: false }));
app.set('views', './views_mysql');
app.set('view engine', 'ejs');

app.get('/topic/add', function(req, res){ //add 페이지 불러오기
    var sql = 'SELECT id,title FROM topic'; // topic의 모든 id와 title 불러오기
    conn.query(sql, function(err, topics, fields){
      if(err){
        console.log(err);
        res.status(500).send('Internal Server Error')
      }
        res.render('add', { topics: topics }); //topics라는 배열안에 JSON형식으로 데이터들이 담겨있음. topics라는 변수에 데이터를 담아 add.ejs로 넘겨준다.
    });
});
app.post('/topic/add', function(req, res){ // add.ejs에서 form태그의 post방식으로 데이터를 받는다.
    var title = req.body.title;				//	request 객체의 body객체의 title값.
    var description = req.body.description;
    var author = req.body.author;
    var sql = 'INSERT INTO topic (title, description, author) VALUES(?, ?, ?)';// INSERT 쿼리를 통해 데이터를 추가한다. VALUES의 물음표는 아래의 함수의 두번째 인자로 전달할 수 있다.
    var params = [title, description, author];// 사용자에게 request받은 값들.
    conn.query(sql, params, function(err, result, fields){ // db에 query를 날린다. 1번째 인자로 sql문과, 배열 안에 담긴 값들, 그리고 함수를 전달한다.
        if(err) {
          console.log(err); //에러가 있다면, 보안을 위해 콘솔에 err로그를 찍고,
          res.status(500).send('Internal Server Error'); //사용자에게는 err로그를 보여주지 않는다.
        }
        console.log('The file has been saved!');//데이터가 db에 잘 저장 되었다면, 콘솔에 성공이라 찍는다.
        res.redirect('/topic/'+result.insertId);//새로운 데이터가 insert될때, 자동으로 생기는 id가 있는데, query 함수의 두번째 인자인 result 객체에서 insertId라는 키로 그 값인 id를 찾을 수 있다. 그것을 통하여 새로 생긴 데이터의 화면을 바로 띄워줄 수 있다.
    });
});
app.get(['/topic/:id/edit'], function(req, res){// 수정기능
    var sql = 'SELECT id,title FROM topic';	// 일단, 글 목록을 불러온다.(edit페이지에도 글목록은 항상 존재)
    conn.query(sql, function(err, topics, fields){
      var id = req.params.id; // request받은 id값
      if(id){
        var sql = 'SELECT * FROM topic WHERE id=?';// id값을 통하여 수정하려고 하는 특정 데이터만 불러온다.
        conn.query(sql, [id], function(err, topic, fields){//[id] : 사용자로부터 받은 id
          if(err) {
            console.log(err);
            res.status(500).send('Internal Server Error');
          } else {
            res.render('edit', {topics : topics, topic : topic[0] });//topic은 배열안에 담긴 객체로 들어오기 때문에, topic[0]으로 데이터를 객체만 전달한다.(전달한 데이터를 통해서 현재 수정하려고 하는 데이터를 화면에 뿌려준다.)
          }
        });
      } else {//id가 없을 경우 반환한다.
        console.log(err);
        res.send('There is no id.');
      }
    });
});
app.post('/topic/:id/edit', function(req, res){
    var sql = 'UPDATE topic SET title=?, description=?, author=? WHERE id=?';//수정하는 쿼리문(where가 매우 중요! 없으면, 다 똑같이 수정됨 큰일남.)
    var title = req.body.title; // 사용자가 다시 입력한 title. req객체의 body객체의 title키로 접근가능
    var description = req.body.description;
    var author = req.body.author;
    var id = req.params.id;//url의 파라미터로 id 값을 얻을 수 있다.
    conn.query(sql, [title, description, author, id], function(err, result, fields){
      if(err) {
        console.log(err);
        res.status(500).send('Internal Server Error');
      } else {
        res.redirect('/topic/'+id)// 수정한 페이지로 이동
      }
    });
});
app.get('/topic/:id/delete', function(req, res){
    var sql = 'SELECT id,title FROM topic'; // 전체 글목록 보여주기
    var id = req.params.id;
    conn.query(sql, function(err, topics, fields){
      var sql = 'SELECT * FROM topic WHERE id=?'; // 선택한 글 보여주기(id값을 통하여 접근가능)
      conn.query(sql, [id], function(err, topic){
          if(err){
            console.log(err);
            res.status(500).send('Internal Sever Error');
          } else {
            if(topic.length === 0){// 선택한 글이 없다면 에러를 띄운다
              console.log('There is no record');
              res.status(500).send('Internal Sever Error');
            } else {
              res.render('delete', {topics:topics, topic:topic[0]});// delete페이지로 렌더해준다.(글 목록 객체와 삭제할 글을 넘겨줌)
            }
          }
      });
  });
});
app.post('/topic/:id/delete', function(req, res){ //form태그를 통하여 post 방식으로 데이터를 전달 받는다.
    var id = req.params.id;
    var sql = 'DELETE FROM topic WHERE id=?'; //DELETE sql문. WHERE를 빠뜨리면 조용히 집에 가야한다.
    conn.query(sql, [id], function(err, result){
      if(err) console.log(err);
      res.redirect('/topic');//데이터를 삭제한 후, 메인페이지로 리다이렉트 해준다.
    });
});
app.get(['/topic','/topic/:id'], function(req, res){//메인페이지(id값을 통하여 글 내용을 볼 수 있음)
    var sql = 'SELECT id,title FROM topic'; //전체 글목록 가져오기
    conn.query(sql, function(err, topics, fields){
      var id = req.params.id; // request받은 id값
      if(id){// 글을 선택 했을때.
        var sql = 'SELECT * FROM topic WHERE id=?';
        conn.query(sql, [id], function(err, topic, fields){//[id] : 사용자로부터 받은 id
          if(err) {
            console.log(err);
            res.status(500).send('Internal Server Error');
          } else {
            res.render('view', {topics : topics, topic : topic[0] });
          }
        });
      } else {// 글을 선택하지 않았을때.(메인페이지만 보여준다.)
        res.render('view', {topics : topics, topic : undefined })//topic의 데이터가 없어도 topic을 명시해 주지 않는다면 ejs가 오류를 낸다.
      }
    });
});
app.listen(3000, function(){
    console.log("Connected localhost:3000");
});

```



```ejs
//view.ejs
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title></title>
  </head>
  <body>
    <h1><a href='/topic'>Server Side Javascript</a></h1>
    <ol>
      <% for(var i = 0; i< topics.length; i++){%> // 전달 받은 topics를 통하여 글목록 보여주기
        <li>
          <a href='/topic/<%= topics[i].id %>'> // 링크를 누르면, db에 저장된 각 글의 id 값을 통하여 아래의 article 태그 안에 글의 상세 내용을 보여주게 한다.
            <%= topics[i].title %>
          </a>
        </li>
      <% }; %>
    </ol>
    <article>
      <% if(topic){ %> // 글 목록을 눌렀을때, topic객체를 get방식으로 넘겨 받을 수 있고,
        <h2><%= topic.title %></h2>  topic 객체의 title키를 통하여 제목을 알 수 있고,
        <p> <%= topic.description %> </p> description키를 통하여 내용을 알 수 있고,
        <p><%= 'by ' + topic.author %></p> 	author키를 통하여 저자를 알 수 있다.
      <% } else { %> // 글 목록을 누를지 않았을때,(id 값이 없을때 환영한다는 내용을 띄운다.)
        <h2>Welcome</h2>
         This is server side javascript tutorial.
      <% } %>
    </article>
    <ul>
        <li><a href="/topic/add">add</a></li> // '/topic/add'라우터로 연결(get방식)
      <% if(topic){ %> // get방식으로 전달 받은 데이터중에, topic이 있다면, 수정버튼과 삭제버튼을 보여준다.
        <li><a href='/topic/<%= topic.id %>/edit'>edit</a></li>
        <li><a href="/topic/<%= topic.id %>/delete">delete</a></li>
      <% } %>
    </ul>
  </body>
</html>

```

```ejs
//add.ejs

<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title></title>
  </head>
  <body>
    <h1><a href='/topic'>Server Side Javascript</a></h1>
    <ol>
      <% for(var i = 0; i<topics.length; i++){%> // 글목록 보여주기
        <li>
          <a href='/topic/<%= topics[i].id %>'>
            <%= topics[i].title %>
          </a>
        </li>
      <% }; %>
    </ol>
    <article>
      <form action="/topic/add" method="post">  //form태그를 통하여 데이터를 post 방식으로 전달
        <p><input type="text" name="title" placeholder="title"></p>
        <p><textarea name="description" placeholder="description"></textarea></p>
        <p><input type="text" name="author" placeholder="author"></p>
        <p><input type="submit"></p>
      </form>
    </article>
  </body>
</html>
```

```ejs
//edit.ejs

<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title></title>
  </head>
  <body>
    <h1><a href='/topic'>Server Side Javascript</a></h1>
    <ol>
      <% for(var i = 0; i<topics.length; i++){%>
        <li>
          <a href='/topic/<%= topics[i].id %>'>
            <%= topics[i].title %>
          </a>
        </li>
      <% }; %>
    </ol>
    <article>
      <form action="/topic/<%= topic.id %>/edit" method="post">
        <p><input type="text" name="title" value='<%= topic.title %>' placeholder="title" ></p> // value를 통하여 전달받은 topic객체의(수정해야할) 데이터를 표시할 수 있다.
        <p><textarea name="description" rows="6" cols="50" placeholder="description"><%= topic.description %></textarea></p>// textarea는 태그들 사이에 데이터를 입력해야 표시가능.(	rows는 행이고, cols는 열이다 이걸 통하여 textarea의 크기를 조정한다. )
        <p><input type="text" name="author" value='<%= topic.author %>' placeholder="author"></p>
        <p><input type="submit"></p>
      </form>
    </article>
    <ul>
        <li><a href="/topic/add">add</a></li>
    </ul>
  </body>
</html>

```

```ejs
//delete.ejs

<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title></title>
  </head>
  <body>
    <h1><a href='/topic'>Server Side Javascript</a></h1>
    <ol>
      <% for(var i = 0; i<topics.length; i++){%>
        <li>
          <a href='/topic/<%= topics[i].id %>'>
            <%= topics[i].title %>
          </a>
        </li>
      <% }; %>
    </ol>
    <article>
      <h1>DELETE? <%= topic.title %> </h1> 
      <form action='/topic/<%= topic.id %>/delete' method="post"> //post메소드를 사용한다.(왜????)
        <p><input type="submit" value="YES"></p>
      </form>
      <a href='/topic/<%= topic.id %>'>no</a>
    </article>
  </body>
</html>

```

