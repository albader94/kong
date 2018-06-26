USE Kong;
INSERT INTO Purchase Values (default, 'Bob@bob.net', 'good_password', '1111-2222-3333-4444', 'CU BOULDER, Boulder CO', '80303');
INSERT INTO Purchase Values (default, 'test@bob.net', 'pass', '0000-5555-3333-9999', 'Engineering Center, Boulder CO', '80918');
INSERT INTO Purchase Values (default, 'user@bob.net', 'bad_password', '1596-9999-3333-4444', 'Denver, Boulder CO', '80303');
SELECT * FROM Purchase