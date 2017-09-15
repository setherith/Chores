delimiter //
CREATE PROCEDURE `get_most_common` ()
BEGIN
   select count(1), `name`
   from tasks
   group by `name`
   order by count(1) desc;
END
//