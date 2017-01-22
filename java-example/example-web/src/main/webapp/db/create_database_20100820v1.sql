

/*==============================================================*/
/* Table: example_order                                       */
/*==============================================================*/
create table example_order  (
   id                 INTEGER                          not null,
   userId             INTEGER,
   orderName          varchar(50),
   status             INTEGER(2),
   created            date,
   modified           date,
   constraint PK_EXAMPLE_ORDER primary key (id)
);

/*==============================================================*/
/* Table: example_user                                        */
/*==============================================================*/
create table example_user  (
   id                 INTEGER                          not null,
   userAccount        varchar(60),
   userType           INTEGER(2),
   created            date,
   modified           date,
   constraint PK_EXAMPLE_USER primary key (id)
);
/*==============================================================*/
/* Table: example_example                                        */
/*==============================================================*/
create table example_example (
  id                 INTEGER                          not null,
  name        varchar(60),
  type           INTEGER(2),
  created            date,
  modified           date,
  constraint PK_EXAMPLE_USER primary key (id)
)

create table sys_user  (
  Id                 INTEGER                          not null,
  organization_id             INTEGER,
  username          varchar(100),
  password             VARCHAR(100),
  salt            VARCHAR(100),
  role_ids           VARCHAR(100),
  locked           TINYINT,
  constraint PK_EXAMPLE_ORDER primary key (id)
)
