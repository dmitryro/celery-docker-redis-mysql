FROM mysql:latest

EXPOSE 3306

ENV MYSQL_DATABASE=maindb
ENV MYSQL_ROOT_PASSWORD=secret
ADD schema/my.cnf /docker-entrypoint-initdb.d/my.cnf
ADD schema/schema.sql /docker-entrypoint-initdb.d/00-schema.sql
