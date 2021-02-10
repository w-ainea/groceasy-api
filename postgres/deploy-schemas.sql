-- deploy database tables

\i '/docker-entrypoint-initdb.d/tables/register.sql'
\i '/docker-entrypoint-initdb.d/tables/users.sql'
\i '/docker-entrypoint-initdb.d/tables/categories.sql'
\i '/docker-entrypoint-initdb.d/tables/images.sql'
\i '/docker-entrypoint-initdb.d/tables/products.sql'

\i '/docker-entrypoint-initdb.d/seed/seed.sql'