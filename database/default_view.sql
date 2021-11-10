delimiter //
create procedure `default_view` ()
begin
   select t.*, u.username creator 
   from tasks t, users u 
   where t.creator = u.id 
   and t.complete = 0;
end
//