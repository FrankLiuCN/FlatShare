
-- --------------------------------------------------
-- Entity Designer DDL Script for SQL Server 2005, 2008, 2012 and Azure
-- --------------------------------------------------
-- Date Created: 12/03/2015 21:27:09
-- Generated from EDMX file: C:\Asp.net\FlatShare\FlatShare.Web\Models\FlatShareDBModel.edmx
-- --------------------------------------------------

SET QUOTED_IDENTIFIER OFF;
GO
USE [FlatShare];
GO
IF SCHEMA_ID(N'dbo') IS NULL EXECUTE(N'CREATE SCHEMA [dbo]');
GO

-- --------------------------------------------------
-- Dropping existing FOREIGN KEY constraints
-- --------------------------------------------------


-- --------------------------------------------------
-- Dropping existing tables
-- --------------------------------------------------

IF OBJECT_ID(N'[dbo].[Outlay]', 'U') IS NOT NULL
    DROP TABLE [dbo].[Outlay];
GO
IF OBJECT_ID(N'[dbo].[PayItem]', 'U') IS NOT NULL
    DROP TABLE [dbo].[PayItem];
GO
IF OBJECT_ID(N'[dbo].[PayUserShare]', 'U') IS NOT NULL
    DROP TABLE [dbo].[PayUserShare];
GO
IF OBJECT_ID(N'[dbo].[UserAccount]', 'U') IS NOT NULL
    DROP TABLE [dbo].[UserAccount];
GO

-- --------------------------------------------------
-- Creating all tables
-- --------------------------------------------------

-- Creating table 'PayItem'
CREATE TABLE [dbo].[PayItem] (
    [RowID] int IDENTITY(1,1) NOT NULL,
    [ItemName] nvarchar(100)  NOT NULL,
    [Remark] nvarchar(250)  NULL,
    [LogicalDelete] bit  NULL,
    [LastUpdatedBy] int  NULL,
    [LastUpdatedDate] datetime  NULL
);
GO

-- Creating table 'UserAccount'
CREATE TABLE [dbo].[UserAccount] (
    [RowID] int IDENTITY(1,1) NOT NULL,
    [UserName] nvarchar(10)  NOT NULL,
    [LoginName] nvarchar(20)  NOT NULL,
    [Password] nvarchar(20)  NOT NULL,
    [Telephone] nvarchar(20)  NULL,
    [Remark] nvarchar(250)  NULL,
    [LogicalDelete] bit  NULL,
    [LastUpdatedBy] int  NOT NULL,
    [LastUpdatedDate] datetime  NOT NULL
);
GO

-- Creating table 'PayUserShare'
CREATE TABLE [dbo].[PayUserShare] (
    [RowID] int IDENTITY(1,1) NOT NULL,
    [ShareUserID] nvarchar(50)  NULL,
    [ShareUserName] nvarchar(50)  NULL
);
GO

-- Creating table 'Outlay'
CREATE TABLE [dbo].[Outlay] (
    [RowID] int IDENTITY(1,1) NOT NULL,
    [PayMoney] decimal(18,2)  NOT NULL,
    [PayItemID] int  NOT NULL,
    [PayDate] datetime  NOT NULL,
    [ShareID] int  NOT NULL,
    [Remark] nvarchar(250)  NULL,
    [LogicalDelete] bit  NULL,
    [LastUpdatedBy] int  NOT NULL,
    [LastUpdatedDate] datetime  NOT NULL
);
GO

-- --------------------------------------------------
-- Creating all PRIMARY KEY constraints
-- --------------------------------------------------

-- Creating primary key on [RowID] in table 'PayItem'
ALTER TABLE [dbo].[PayItem]
ADD CONSTRAINT [PK_PayItem]
    PRIMARY KEY CLUSTERED ([RowID] ASC);
GO

-- Creating primary key on [RowID] in table 'UserAccount'
ALTER TABLE [dbo].[UserAccount]
ADD CONSTRAINT [PK_UserAccount]
    PRIMARY KEY CLUSTERED ([RowID] ASC);
GO

-- Creating primary key on [RowID] in table 'PayUserShare'
ALTER TABLE [dbo].[PayUserShare]
ADD CONSTRAINT [PK_PayUserShare]
    PRIMARY KEY CLUSTERED ([RowID] ASC);
GO

-- Creating primary key on [RowID] in table 'Outlay'
ALTER TABLE [dbo].[Outlay]
ADD CONSTRAINT [PK_Outlay]
    PRIMARY KEY CLUSTERED ([RowID] ASC);
GO

-- --------------------------------------------------
-- Creating all FOREIGN KEY constraints
-- --------------------------------------------------

-- --------------------------------------------------
-- Script has ended
-- --------------------------------------------------