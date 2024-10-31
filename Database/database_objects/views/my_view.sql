--liquibase formatted sql
--changeset hendrik:he1 runOnChange:true stripComments:false
create or replace force editionable view my_view (val, another_val) as
select
    1 as val,
    10 as another_val
from dual
;

comment on table my_view is 'An example view for showing how to create a view in Liquibase';
