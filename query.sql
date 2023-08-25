CREATE DATABASE example;

CREATE TABLE
    examples(
        id VARCHAR PRIMARY KEY,
        name VARCHAR NOT NULL,
        image VARCHAR NOT NULL
    );

SELECT * FROM examples;
SELECT * FROM examples WHERE id = 'g78e-37c4c-3c653';
SELECT * FROM examples WHERE id = '68bf-573xx-02c7w';
INSERT INTO examples(id,name,image)VALUES ('g78e-37c4c-3c653','kaos','kaos.img');
INSERT INTO examples(id,name,image)VALUES ('68bf-573xx-02c7w','kemeja','kemeja.img');
UPDATE examples
SET
    name = 'kaos putih',
    image = 'kaosputih.img'
WHERE id = 'g78e-37c4c-3c653';
DELETE FROM examples WHERE id='68bf-573xx-02c7w';


------------------------------------------------------------

CREATE TABLE
    users(
        id varchar primary key,
        email varchar not null,
        password varchar not null,
        fullname varchar,
        role varchar
    );

SELECT * FROM users WHERE email='(email.name)' 
INSERT INTO
    users(
        id,
        email,
        password,
        fullname,
        role
    )
VALUES (
        '783dq-7hd8q-7d87q',
        'blabla@gmail.com',
        'pw123',
        'blablablabla',
        'FE'
    );
DELETE FROM users WHERE id='id.users';